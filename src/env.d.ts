/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TMDB_API_KEY: string;
  readonly YOUTUBE_API_KEY: string;
  readonly OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}