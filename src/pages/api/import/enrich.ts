import type { APIRoute } from "astro";
import { GoogleGenAI } from "@google/genai";

import type {
  AnimeImportData,
  AnimeImportEpisode,
  AnimeImportSeason,
} from "@/types/import";

const MAX_BODY_SIZE = 2_000_000;
const MAX_EPISODES = 500;

interface EnrichRequest {
  data: AnimeImportData;
}

interface AIEnrichmentResult {
  overview?: string;
  titleEnglish?: string;
  titleJapanese?: string;
  genres?: string[];
  status?: string;

  seasonTitles?: Record<string, string>;

  episodeTitles?: Record<string, string>;
  episodeOverviews?: Record<string, string>;

  warnings?: string[];
}

const SYSTEM_PROMPT = `
You are an anime metadata enrichment assistant for an anime database importer.

Your job is to improve incomplete or poor-quality anime metadata using ONLY
the source data supplied by the application.

IMPORTANT RULES:

1. NEVER invent factual information when the supplied data does not support it.
2. Prefer information already present in the supplied source data.
3. You may improve wording, formatting, translations, and obvious missing metadata.
4. Do NOT change authoritative structural information:
   - season numbers
   - episode numbers
   - air dates
   - YouTube video IDs
   - YouTube URLs
   - source IDs
   - poster paths
   - backdrop paths
   - episode counts
5. Episode titles and episode overviews may be generated or improved when
   they are missing or clearly poor, but they must not introduce unsupported
   factual claims.
6. Season titles may be generated or improved when useful.
7. The main anime overview should be concise, natural, factual, and suitable
   for an anime website.
8. Do not write marketing fluff.
9. Do not mention that you are an AI.
10. Do not include Markdown in metadata fields.
11. Do not duplicate information unnecessarily.
12. Preserve Japanese titles exactly when they are already supplied.
13. If a field is already good, do not unnecessarily rewrite it.
14. If information is uncertain, omit that field and add a warning.
15. Return data matching the requested JSON structure.
`;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed || undefined;
}

function cleanStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const values = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  return values.length > 0 ? [...new Set(values)] : undefined;
}

function cleanStringRecord(
  value: unknown,
): Record<string, string> | undefined {
  if (!isObject(value)) {
    return undefined;
  }

  const result: Record<string, string> = {};

  for (const [key, item] of Object.entries(value)) {
    const cleaned = cleanString(item);

    if (cleaned) {
      result[key] = cleaned;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

function sanitizeResult(value: unknown): AIEnrichmentResult {
  if (!isObject(value)) {
    throw new Error("AI returned an invalid result.");
  }

  return {
    overview: cleanString(value.overview),

    titleEnglish: cleanString(value.titleEnglish),

    titleJapanese: cleanString(value.titleJapanese),

    genres: cleanStringArray(value.genres),

    status: cleanString(value.status),

    seasonTitles: cleanStringRecord(value.seasonTitles),

    episodeTitles: cleanStringRecord(value.episodeTitles),

    episodeOverviews: cleanStringRecord(value.episodeOverviews),

    warnings: cleanStringArray(value.warnings),
  };
}

function buildEpisodeKey(
  seasonNumber: number,
  episodeNumber: number,
): string {
  return `${seasonNumber}:${episodeNumber}`;
}

function buildAnimeContext(data: AnimeImportData) {
  const seasons = data.seasons
    .slice(0, 100)
    .map((season: AnimeImportSeason) => ({
      seasonNumber: season.seasonNumber,

      title: season.title,

      episodeCount: season.episodeCount,

      episodes: season.episodes
        .slice(0, MAX_EPISODES)
        .map((episode: AnimeImportEpisode) => ({
          episodeNumber: episode.episodeNumber,

          title: episode.title,

          overview: episode.overview,

          airDate: episode.airDate,
        })),
    }));

  return {
    title: data.title,

    titleJapanese: data.titleJapanese,

    titleEnglish: data.titleEnglish,

    overview: data.overview,

    year: data.year,

    status: data.status,

    genres: data.genres,

    score: data.score,

    popularity: data.popularity,

    episodes: data.episodes,

    durationMinutes: data.durationMinutes,

    seasons,
  };
}

function validateInput(data: unknown): data is AnimeImportData {
  if (!isObject(data)) {
    return false;
  }

  if (typeof data.title !== "string" || !data.title.trim()) {
    return false;
  }

  if (!Array.isArray(data.seasons)) {
    return false;
  }

  return true;
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error("AI returned an empty response.");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue below in case the model wrapped JSON in a code block.
  }

  const withoutCodeFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(withoutCodeFence);
  } catch {
    // Continue with object extraction.
  }

  const start = withoutCodeFence.indexOf("{");
  const end = withoutCodeFence.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI returned invalid JSON.");
  }

  const jsonCandidate = withoutCodeFence.slice(start, end + 1);

  return JSON.parse(jsonCandidate);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!request.body) {
      return Response.json(
        {
          success: false,
          error: "Request body is required.",
        },
        {
          status: 400,
        },
      );
    }

    const contentLength = request.headers.get("content-length");

    if (
      contentLength &&
      Number.isFinite(Number(contentLength)) &&
      Number(contentLength) > MAX_BODY_SIZE
    ) {
      return Response.json(
        {
          success: false,
          error: "Request is too large.",
        },
        {
          status: 413,
        },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "Invalid JSON body.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isObject(body) || !validateInput(body.data)) {
      return Response.json(
        {
          success: false,
          error: "Invalid anime import data.",
        },
        {
          status: 400,
        },
      );
    }

    const apiKey = import.meta.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");

      return Response.json(
        {
          success: false,
          error: "AI enrichment is not configured on the server.",
        },
        {
          status: 500,
        },
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const animeContext = buildAnimeContext(body.data);

    const prompt = `
Enrich the following anime metadata.

Return a JSON object using this structure:

{
  "overview": "string",
  "titleEnglish": "string",
  "titleJapanese": "string",
  "genres": ["string"],
  "status": "string",
  "seasonTitles": {
    "1": "string"
  },
  "episodeTitles": {
    "1:1": "string"
  },
  "episodeOverviews": {
    "1:1": "string"
  },
  "warnings": ["string"]
}

IMPORTANT:

- Omit fields that should not be changed or added.
- Do not return null.
- Do not invent unsupported facts.
- seasonTitles keys MUST be season numbers as strings.
- episodeTitles keys MUST use "seasonNumber:episodeNumber".
- episodeOverviews keys MUST use "seasonNumber:episodeNumber".
- Return ONLY valid JSON.
- Do not wrap the JSON in Markdown or code fences.

Anime data:

${JSON.stringify(animeContext)}
`;

    const response = await ai.models.generateContent({
      // Use the fast/cheap model for bulk enrichment.
      model: "gemini-3.6-flash",

      contents: prompt,

      config: {
        systemInstruction: SYSTEM_PROMPT,

        responseMimeType: "application/json",

        temperature: 0.2,
      },
    });

    const outputText = response.text;

    if (!outputText) {
      return Response.json(
        {
          success: false,
          error: "AI returned an empty response.",
        },
        {
          status: 502,
        },
      );
    }

    let parsed: unknown;

    try {
      parsed = extractJson(outputText);
    } catch (error) {
      console.error(
        "Failed to parse Gemini enrichment response:",
        outputText,
      );

      const message =
        error instanceof Error
          ? error.message
          : "AI returned invalid JSON.";

      return Response.json(
        {
          success: false,
          error: message,
        },
        {
          status: 502,
        },
      );
    }

    const result = sanitizeResult(parsed);

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Gemini AI enrichment failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown AI enrichment error.";

    return Response.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
};