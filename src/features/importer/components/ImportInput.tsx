import { ArrowRightIcon, LinkIcon } from "@phosphor-icons/react";

export default function ImportInput() {
  return (
    <section className="import-card">
      <div className="import-card-header">
        <div className="import-card-icon">
          <LinkIcon size={24} weight="bold" />
        </div>

        <div>
          <h2 className="import-card-title">Add anime</h2>

          <p className="import-card-description">
            Paste an AniList, MAL, TMDB URL or an anime identifier.
          </p>
        </div>
      </div>

      <div className="import-input-group">
        <textarea
          className="import-textarea"
          placeholder={`https://anilist.co/anime/154587
https://myanimelist.net/anime/...`}
          rows={8}
        />

        <div className="import-actions">
          <p className="import-hint">One anime per line.</p>

          <button type="button" className="import-submit">
            Process anime
            <ArrowRightIcon size={20} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
