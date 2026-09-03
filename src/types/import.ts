export type ImportSourceType =
  | "tmdb"
  | "imdb"
  | "anilist"
  | "youtube"
  | "unknown";

export interface ImportSource {
  id: string;
  value: string;
}

export interface ResolvedSource {
  input: string;
  type: ImportSourceType;
  id?: string;
  url?: string;
}

export interface AnimeImportData {
  title: string;
  titleJapanese?: string;
  titleEnglish?: string;

  overview?: string;

  posterPath?: string;
  backdropPath?: string;

  year?: number;
  status?: string;

  genres: string[];

  score?: number;
  popularity?: number;

  episodes?: number;
  durationMinutes?: number;

  sources: ResolvedSource[];

  seasons: AnimeImportSeason[];
}

export interface AnimeImportSeason {
  seasonNumber: number;
  title?: string;
  episodeCount?: number;

  episodes: AnimeImportEpisode[];
}

export interface AnimeImportEpisode {
  episodeNumber: number;
  title?: string;
  overview?: string;

  airDate?: string;

  thumbnail?: string;

  youtubeVideoId?: string;
  youtubeUrl?: string;
}

export interface AnalyzeRequest {
  sources: ImportSource[];
}

export interface AnalyzeResponse {
  success: boolean;

  data?: AnimeImportData;

  error?: string;

  warnings?: string[];
}
