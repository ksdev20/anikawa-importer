import type {
  AnalyzeRequest,
  AnimeImportData,
  AnimeImportEpisode,
  AnimeImportSeason,
  AnalyzeResponse,
  ImportSourceType,
  ResolvedSource,
} from "@/types/import";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const ANILIST_URL = "https://graphql.anilist.co";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const REQUEST_TIMEOUT = 12_000;
const MAX_SOURCES = 20;
const MAX_PLAYLIST_VIDEOS = 500;

interface TmdbFindResponse {
  tv_results?: TmdbTv[];
  movie_results?: TmdbMovie[];
}

interface TmdbTv {
  id: number;
  name?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  first_air_date?: string;
  status?: string;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  vote_average?: number;
  popularity?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  seasons?: Array<{
    id: number;
    season_number: number;
    name?: string;
    episode_count?: number;
  }>;
}

interface TmdbMovie {
  id: number;
  title?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  status?: string;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  vote_average?: number;
  popularity?: number;
  runtime?: number | null;
}

interface TmdbSeason {
  season_number: number;
  name?: string;
  episode_count?: number;
  episodes?: Array<{
    id: number;
    episode_number: number;
    name?: string;
    overview?: string;
    air_date?: string | null;
    still_path?: string | null;
    runtime?: number | null;
  }>;
}

interface AniListResponse {
  data?: {
    Media?: {
      id: number;
      idMal?: number | null;
      title?: {
        romaji?: string | null;
        english?: string | null;
        native?: string | null;
      };
      description?: string | null;
      episodes?: number | null;
      duration?: number | null;
      averageScore?: number | null;
      popularity?: number | null;
      status?: string | null;
      startDate?: {
        year?: number | null;
      } | null;
      genres?: string[];
      coverImage?: {
        large?: string | null;
        extraLarge?: string | null;
      } | null;
      bannerImage?: string | null;
    } | null;
  };
}

interface YoutubePlaylistResponse {
  nextPageToken?: string;
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: {
        default?: {
          url?: string;
        };
        medium?: {
          url?: string;
        };
        high?: {
          url?: string;
        };
      };
      resourceId?: {
        videoId?: string;
      };
    };
  }>;
}

interface YoutubeVideoResponse {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: {
        default?: {
          url?: string;
        };
        medium?: {
          url?: string;
        };
        high?: {
          url?: string;
        };
      };
    };
  }>;
}

interface SourceAnalysis {
  source: ResolvedSource;
  tmdbTv?: TmdbTv;
  tmdbMovie?: TmdbMovie;
  aniList?: NonNullable<NonNullable<AniListResponse["data"]>["Media"]>;
  youtubeEpisodes?: AnimeImportEpisode[];
  warnings: string[];
}

function getEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = import.meta.env[name];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with HTTP ${response.status}.`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeInput(value: string): string {
  return value.trim();
}

function detectSourceType(value: string): ImportSourceType {
  const input = normalizeInput(value);
  const lower = input.toLowerCase();

  if (!input) {
    return "unknown";
  }

  if (
    lower.includes("themoviedb.org") ||
    lower.includes("tmdb.org") ||
    lower.startsWith("tmdb:")
  ) {
    return "tmdb";
  }

  if (
    lower.includes("imdb.com") ||
    lower.startsWith("imdb:") ||
    /^tt\d+$/i.test(input)
  ) {
    return "imdb";
  }

  if (lower.includes("anilist.co") || lower.startsWith("anilist:")) {
    return "anilist";
  }

  if (
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    lower.startsWith("youtube:")
  ) {
    return "youtube";
  }

  return "unknown";
}

function extractTmdbId(value: string): string | undefined {
  const input = normalizeInput(value);

  const rawMatch = input.match(/^tmdb:(\d+)$/i);

  if (rawMatch) {
    return rawMatch[1];
  }

  if (/^\d+$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);

    const match = url.pathname.match(/\/(?:tv|movie)\/(\d+)/i);

    return match?.[1];
  } catch {
    return undefined;
  }
}

function extractImdbId(value: string): string | undefined {
  const input = normalizeInput(value);

  const rawMatch = input.match(/^imdb:(tt\d+)$/i);

  if (rawMatch) {
    return rawMatch[1];
  }

  const directMatch = input.match(/\b(tt\d+)\b/i);

  if (directMatch) {
    return directMatch[1];
  }

  return undefined;
}

function extractAniListId(value: string): string | undefined {
  const input = normalizeInput(value);

  const rawMatch = input.match(/^anilist:(\d+)$/i);

  if (rawMatch) {
    return rawMatch[1];
  }

  try {
    const url = new URL(input);

    const match = url.pathname.match(/\/anime\/(\d+)/i);

    return match?.[1];
  } catch {
    return undefined;
  }
}

function extractYouTubeId(value: string): {
  playlistId?: string;
  videoId?: string;
} {
  const input = normalizeInput(value);

  try {
    const url = new URL(input);

    const playlistId = url.searchParams.get("list") ?? undefined;

    const videoId = url.searchParams.get("v") ?? undefined;

    if (url.hostname.includes("youtu.be")) {
      return {
        playlistId,
        videoId: url.pathname.slice(1) || videoId,
      };
    }

    return {
      playlistId,
      videoId,
    };
  } catch {
    const playlistMatch = input.match(/(?:playlist:|list=)([A-Za-z0-9_-]+)/i);

    const videoMatch = input.match(/(?:video:|v=)([A-Za-z0-9_-]+)/i);

    return {
      playlistId: playlistMatch?.[1],
      videoId: videoMatch?.[1],
    };
  }
}

function resolveSource(value: string): ResolvedSource {
  const input = normalizeInput(value);
  const type = detectSourceType(input);

  let id: string | undefined;

  if (type === "tmdb") {
    id = extractTmdbId(input);
  }

  if (type === "imdb") {
    id = extractImdbId(input);
  }

  if (type === "anilist") {
    id = extractAniListId(input);
  }

  if (type === "youtube") {
    const youtube = extractYouTubeId(input);

    id = youtube.playlistId ?? youtube.videoId;
  }

  return {
    input,
    type,
    id,
    url: input.startsWith("http") ? input : undefined,
  };
}

function getYear(date?: string): number | undefined {
  if (!date) {
    return undefined;
  }

  const year = Number(date.slice(0, 4));

  return Number.isFinite(year) ? year : undefined;
}

function imageUrl(path?: string | null): string | undefined {
  if (!path) {
    return undefined;
  }

  return `https://image.tmdb.org/t/p/original${path}`;
}

function dedupeEpisodes(episodes: AnimeImportEpisode[]): AnimeImportEpisode[] {
  const seen = new Set<string>();

  return episodes.filter((episode) => {
    const key =
      episode.youtubeVideoId ??
      `${episode.episodeNumber}:${episode.title ?? ""}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

async function fetchTmdbById(
  id: string,
  apiKey: string,
): Promise<{
  tv?: TmdbTv;
  movie?: TmdbMovie;
}> {
  const tvUrl =
    `${TMDB_BASE_URL}/tv/${encodeURIComponent(id)}` +
    `?api_key=${encodeURIComponent(apiKey)}` +
    `&language=en-US`;

  const movieUrl =
    `${TMDB_BASE_URL}/movie/${encodeURIComponent(id)}` +
    `?api_key=${encodeURIComponent(apiKey)}` +
    `&language=en-US`;

  let tvError: unknown = null;

  try {
    const tv = await fetchJson<TmdbTv>(tvUrl);

    if (tv?.id) {
      return { tv };
    }
  } catch (error) {
    tvError = error;
  }

  try {
    const movie = await fetchJson<TmdbMovie>(movieUrl);

    if (movie?.id) {
      return { movie };
    }
  } catch (movieError) {
    if (tvError instanceof Error) {
      throw new Error(`TMDB lookup failed for ${id}: ${tvError.message}`);
    }

    throw movieError;
  }

  return {};
}

async function fetchTmdbByImdb(
  imdbId: string,
  apiKey: string,
): Promise<{
  tv?: TmdbTv;
  movie?: TmdbMovie;
}> {
  const url =
    `${TMDB_BASE_URL}/find/${encodeURIComponent(imdbId)}` +
    `?api_key=${encodeURIComponent(apiKey)}` +
    `&external_source=imdb_id` +
    `&language=en-US`;

  const result = await fetchJson<TmdbFindResponse>(url);

  const tv = result.tv_results?.[0];

  if (tv) {
    return {
      tv,
    };
  }

  const movie = result.movie_results?.[0];

  if (movie) {
    return {
      movie,
    };
  }

  return {};
}

async function fetchTmdbSeason(
  tvId: number,
  seasonNumber: number,
  apiKey: string,
): Promise<TmdbSeason | null> {
  try {
    return await fetchJson<TmdbSeason>(
      `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}` +
        `?api_key=${encodeURIComponent(apiKey)}` +
        `&language=en-US`,
    );
  } catch {
    return null;
  }
}

async function fetchTmdbEpisodes(
  tv: TmdbTv,
  apiKey: string,
): Promise<AnimeImportSeason[]> {
  const seasons =
    tv.seasons?.filter((season) => season.season_number >= 0) ?? [];

  const results = await Promise.all(
    seasons.map(async (season) => {
      const fullSeason = await fetchTmdbSeason(
        tv.id,
        season.season_number,
        apiKey,
      );

      const episodes: AnimeImportEpisode[] = (fullSeason?.episodes ?? []).map(
        (episode) => ({
          episodeNumber: episode.episode_number,
          title: episode.name,
          overview: episode.overview,
          airDate: episode.air_date ?? undefined,
          thumbnail: imageUrl(episode.still_path),
        }),
      );

      return {
        seasonNumber: season.season_number,
        title: season.name,
        episodeCount: fullSeason?.episode_count ?? season.episode_count,
        episodes,
      };
    }),
  );

  return results;
}

async function fetchAniList(
  id: string,
): Promise<NonNullable<NonNullable<AniListResponse["data"]>["Media"]> | null> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        description
        episodes
        duration
        averageScore
        popularity
        status
        startDate {
          year
        }
        genres
        coverImage {
          large
          extraLarge
        }
        bannerImage
      }
    }
  `;

  const result = await fetchJson<AniListResponse>(ANILIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        id: Number(id),
      },
    }),
  });

  return result.data?.Media ?? null;
}

async function fetchYouTubePlaylist(
  playlistId: string,
  apiKey: string,
): Promise<AnimeImportEpisode[]> {
  const episodes: AnimeImportEpisode[] = [];
  let pageToken: string | undefined;

  while (episodes.length < MAX_PLAYLIST_VIDEOS) {
    const params = new URLSearchParams({
      part: "snippet",
      maxResults: "50",
      playlistId,
      key: apiKey,
    });

    if (pageToken) {
      params.set("pageToken", pageToken);
    }

    const result = await fetchJson<YoutubePlaylistResponse>(
      `${YOUTUBE_BASE_URL}/playlistItems?${params.toString()}`,
    );

    for (const item of result.items ?? []) {
      const videoId = item.snippet?.resourceId?.videoId;

      if (!videoId) {
        continue;
      }

      episodes.push({
        episodeNumber: episodes.length + 1,
        title: item.snippet?.title,
        overview: item.snippet?.description,
        airDate: item.snippet?.publishedAt,
        thumbnail:
          item.snippet?.thumbnails?.high?.url ??
          item.snippet?.thumbnails?.medium?.url ??
          item.snippet?.thumbnails?.default?.url,
        youtubeVideoId: videoId,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }

    if (!result.nextPageToken || !result.items?.length) {
      break;
    }

    pageToken = result.nextPageToken;
  }

  return episodes;
}

async function analyzeSource(
  source: ResolvedSource,
  tmdbApiKey?: string,
  youtubeApiKey?: string,
): Promise<SourceAnalysis> {
  const warnings: string[] = [];

  if (source.type === "unknown") {
    return {
      source,
      warnings: [`Could not identify source: ${source.input}`],
    };
  }

  if (source.type === "tmdb") {
    if (!tmdbApiKey) {
      return {
        source,
        warnings: ["TMDB API key is not configured."],
      };
    }

    if (!source.id) {
      return {
        source,
        warnings: [`Could not extract a TMDB ID from: ${source.input}`],
      };
    }

    try {
      const isMovie = /\/movie\/\d+/i.test(source.input);

      const endpoint = isMovie
        ? `/movie/${encodeURIComponent(source.id)}`
        : `/tv/${encodeURIComponent(source.id)}`;

      if (isMovie) {
        const movie = await fetchJson<TmdbMovie>(
          `${TMDB_BASE_URL}${endpoint}` +
            `?api_key=${encodeURIComponent(tmdbApiKey)}` +
            `&language=en-US`,
        );

        return {
          source,
          tmdbMovie: movie,
          warnings,
        };
      }

      const tv = await fetchJson<TmdbTv>(
        `${TMDB_BASE_URL}${endpoint}` +
          `?api_key=${encodeURIComponent(tmdbApiKey)}` +
          `&language=en-US`,
      );

      return {
        source,
        tmdbTv: tv,
        warnings,
      };
    } catch (error) {
      return {
        source,
        warnings: [
          `TMDB request failed for ${source.id}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        ],
      };
    }
  }

  if (source.type === "imdb") {
    if (!tmdbApiKey) {
      return {
        source,
        warnings: ["TMDB API key is required to resolve IMDb IDs."],
      };
    }

    if (!source.id) {
      return {
        source,
        warnings: [`Could not extract an IMDb ID from: ${source.input}`],
      };
    }

    try {
      const result = await fetchTmdbByImdb(source.id, tmdbApiKey);

      if (!result.tv && !result.movie) {
        warnings.push(`Could not resolve IMDb ID ${source.id} through TMDB.`);
      }

      return {
        source,
        tmdbTv: result.tv,
        tmdbMovie: result.movie,
        warnings,
      };
    } catch (error) {
      warnings.push(
        `IMDb resolution failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );

      return {
        source,
        warnings,
      };
    }
  }

  if (source.type === "anilist") {
    if (!source.id) {
      return {
        source,
        warnings: [`Could not extract an AniList ID from: ${source.input}`],
      };
    }

    try {
      const aniList = await fetchAniList(source.id);

      if (!aniList) {
        warnings.push(`AniList could not find ID ${source.id}.`);
      }

      return {
        source,
        aniList: aniList ?? undefined,
        warnings,
      };
    } catch (error) {
      warnings.push(
        `AniList request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );

      return {
        source,
        warnings,
      };
    }
  }

  if (source.type === "youtube") {
    if (!youtubeApiKey) {
      return {
        source,
        warnings: ["YouTube API key is not configured."],
      };
    }

    const { playlistId } = extractYouTubeId(source.input);

    if (!playlistId) {
      warnings.push(
        "YouTube source is not a playlist. Episode collection was skipped.",
      );

      return {
        source,
        warnings,
      };
    }

    try {
      const youtubeEpisodes = await fetchYouTubePlaylist(
        playlistId,
        youtubeApiKey,
      );

      if (youtubeEpisodes.length === 0) {
        warnings.push("The YouTube playlist contains no readable videos.");
      }

      return {
        source,
        youtubeEpisodes,
        warnings,
      };
    } catch (error) {
      warnings.push(
        `YouTube request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );

      return {
        source,
        warnings,
      };
    }
  }

  return {
    source,
    warnings,
  };
}

function buildAnimeData(analyses: SourceAnalysis[]): AnimeImportData {
  const tmdbTv = analyses.find((item) => item.tmdbTv)?.tmdbTv;

  const tmdbMovie = analyses.find((item) => item.tmdbMovie)?.tmdbMovie;

  const aniList = analyses.find((item) => item.aniList)?.aniList;

  const youtubeEpisodes = analyses.flatMap(
    (item) => item.youtubeEpisodes ?? [],
  );

  const title =
    tmdbTv?.name ??
    tmdbMovie?.title ??
    aniList?.title?.english ??
    aniList?.title?.romaji ??
    aniList?.title?.native ??
    "";

  const overview =
    tmdbTv?.overview ||
    tmdbMovie?.overview ||
    aniList?.description ||
    undefined;

  const genres =
    tmdbTv?.genres?.map((genre) => genre.name) ??
    aniList?.genres ??
    tmdbMovie?.genres?.map((genre) => genre.name) ??
    [];

  const seasons: AnimeImportSeason[] = [];

  if (tmdbTv) {
    const tmdbSeasons = analyses.find((item) => item.tmdbTv?.id === tmdbTv.id);

    if (tmdbSeasons) {
      // Episodes are fetched below in the
      // request handler.
    }
  }

  if (youtubeEpisodes.length > 0) {
    seasons.push({
      seasonNumber: 1,
      title: "Season 1",
      episodeCount: youtubeEpisodes.length,
      episodes: dedupeEpisodes(youtubeEpisodes),
    });
  }

  return {
    title,

    titleEnglish: aniList?.title?.english ?? undefined,

    titleJapanese: aniList?.title?.native ?? undefined,

    overview,

    posterPath:
      imageUrl(tmdbTv?.poster_path ?? tmdbMovie?.poster_path) ??
      aniList?.coverImage?.extraLarge ??
      aniList?.coverImage?.large ??
      undefined,

    backdropPath:
      imageUrl(tmdbTv?.backdrop_path ?? tmdbMovie?.backdrop_path) ??
      aniList?.bannerImage ??
      undefined,

    year:
      getYear(tmdbTv?.first_air_date ?? tmdbMovie?.release_date) ??
      aniList?.startDate?.year ??
      undefined,

    status: tmdbTv?.status ?? tmdbMovie?.status ?? aniList?.status ?? undefined,

    genres,

    score:
      tmdbTv?.vote_average ??
      tmdbMovie?.vote_average ??
      (aniList?.averageScore ? aniList.averageScore / 10 : undefined),

    popularity:
      tmdbTv?.popularity ??
      tmdbMovie?.popularity ??
      aniList?.popularity ??
      undefined,

    episodes:
      tmdbTv?.number_of_episodes ??
      aniList?.episodes ??
      youtubeEpisodes.length ??
      undefined,

    durationMinutes:
      tmdbTv?.episode_run_time?.[0] ??
      tmdbMovie?.runtime ??
      aniList?.duration ??
      undefined,

    sources: analyses.map((analysis) => analysis.source),

    seasons,
  };
}

async function enrichTmdbSeasons(
  data: AnimeImportData,
  analyses: SourceAnalysis[],
  apiKey?: string,
): Promise<void> {
  if (!apiKey) {
    return;
  }

  const tv = analyses.find((item) => item.tmdbTv)?.tmdbTv;

  if (!tv) {
    return;
  }

  try {
    const seasons = await fetchTmdbEpisodes(tv, apiKey);

    const youtubeEpisodes = data.seasons
      .flatMap((season) => season.episodes)
      .filter((episode) => episode.youtubeVideoId);

    for (const season of seasons) {
      for (const episode of season.episodes) {
        const youtubeEpisode = youtubeEpisodes.find(
          (youtube) => youtube.episodeNumber === episode.episodeNumber,
        );

        if (youtubeEpisode) {
          episode.youtubeVideoId = youtubeEpisode.youtubeVideoId;

          episode.youtubeUrl = youtubeEpisode.youtubeUrl;
        }
      }
    }

    data.seasons = seasons;

    if (youtubeEpisodes.length > 0 && seasons.length > 0) {
      const allTmdbEpisodes = seasons.flatMap((season) => season.episodes);

      for (const youtubeEpisode of youtubeEpisodes) {
        const alreadyExists = allTmdbEpisodes.some(
          (episode) => episode.youtubeVideoId === youtubeEpisode.youtubeVideoId,
        );

        if (alreadyExists) {
          continue;
        }

        const season = seasons.find((item) => item.seasonNumber === 1);

        season?.episodes.push(youtubeEpisode);
      }
    }
  } catch (error) {
    console.error("TMDB season enrichment failed:", error);
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = (await request.json()) as AnalyzeRequest;

    if (!body || !Array.isArray(body.sources)) {
      return Response.json(
        {
          success: false,
          error: "Invalid request. Expected a sources array.",
        } satisfies AnalyzeResponse,
        {
          status: 400,
        },
      );
    }

    if (body.sources.length > MAX_SOURCES) {
      return Response.json(
        {
          success: false,
          error: `Maximum ${MAX_SOURCES} sources are allowed per import.`,
        } satisfies AnalyzeResponse,
        {
          status: 400,
        },
      );
    }

    const values = body.sources
      .filter((source) => source && typeof source.value === "string")
      .map((source) => normalizeInput(source.value))
      .filter(Boolean);

    if (values.length === 0) {
      return Response.json(
        {
          success: false,
          error: "At least one source is required.",
        } satisfies AnalyzeResponse,
        {
          status: 400,
        },
      );
    }

    const uniqueValues = [
      ...new Map(values.map((value) => [value.toLowerCase(), value])).values(),
    ];

    const sources = uniqueValues.map(resolveSource);

    const tmdbApiKey = getEnv("TMDB_API_KEY");

    const youtubeApiKey = getEnv("YOUTUBE_API_KEY", "YOUTUBE_API_KEY_SERVER");

    const analyses = await Promise.all(
      sources.map((source) => analyzeSource(source, tmdbApiKey, youtubeApiKey)),
    );

    const data = buildAnimeData(analyses);

    await enrichTmdbSeasons(data, analyses, tmdbApiKey);

    const warnings = [...analyses.flatMap((analysis) => analysis.warnings)];

    if (!data.title) {
      warnings.push(
        "No anime metadata could be resolved. Add a valid TMDB, IMDb, or AniList source.",
      );
    }

    return Response.json({
      success: true,
      data,
      warnings: warnings.length > 0 ? [...new Set(warnings)] : undefined,
    } satisfies AnalyzeResponse);
  } catch (error) {
    console.error("[IMPORT_ANALYZE]", error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze import sources.",
      } satisfies AnalyzeResponse,
      {
        status: 500,
      },
    );
  }
}
