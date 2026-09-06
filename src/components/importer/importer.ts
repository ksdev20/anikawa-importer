import type { ImportSource, ImportSourceType } from "@/types/import";

export const MAX_SOURCES = 20;
export const MAX_SOURCE_LENGTH = 2048;

export const INITIAL_SOURCE: ImportSource = {
  id: "source-0",
  value: "",
};

export const SOURCE_LABELS: Record<ImportSourceType, string> = {
  tmdb: "TMDB",
  imdb: "IMDb",
  anilist: "AniList",
  youtube: "YouTube",
  unknown: "Source",
};

export function createSource(): ImportSource {
  return {
    id: crypto.randomUUID(),
    value: "",
  };
}

export function normalizeInput(value: string): string {
  return value.trim();
}

export function detectSourceType(value: string): ImportSourceType {
  const input = normalizeInput(value).toLowerCase();

  if (!input) {
    return "unknown";
  }

  if (
    input.includes("themoviedb.org") ||
    input.includes("tmdb.org") ||
    input.includes("tmdb:")
  ) {
    return "tmdb";
  }

  if (
    input.includes("imdb.com") ||
    input.startsWith("imdb:") ||
    /^tt\d+$/i.test(input)
  ) {
    return "imdb";
  }

  if (input.includes("anilist.co") || input.includes("anilist:")) {
    return "anilist";
  }

  if (
    input.includes("youtube.com") ||
    input.includes("youtu.be") ||
    input.includes("youtube:")
  ) {
    return "youtube";
  }

  return "unknown";
}

export function isLikelyUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSourceDescription(value: string): string {
  const type = detectSourceType(value);

  if (type !== "unknown") {
    return SOURCE_LABELS[type];
  }

  const normalized = normalizeInput(value);

  if (!normalized) {
    return "Empty";
  }

  if (isLikelyUrl(normalized)) {
    return "URL";
  }

  if (/^tt\d+$/i.test(normalized)) {
    return "IMDb";
  }

  if (/^tmdb:\d+$/i.test(normalized)) {
    return "TMDB";
  }

  if (/^\d+$/.test(normalized)) {
    return "ID";
  }

  return "Source";
}

export function validateSource(value: string): string | null {
  const normalized = normalizeInput(value);

  if (!normalized) {
    return "Enter a source.";
  }

  if (normalized.length > MAX_SOURCE_LENGTH) {
    return `Source must be ${MAX_SOURCE_LENGTH} characters or less.`;
  }

  if (normalized.startsWith("javascript:")) {
    return "Invalid source.";
  }

  return null;
}
