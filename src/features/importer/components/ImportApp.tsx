import ImportInput from "./ImportInput";

export default function ImportApp() {
  return (
    <main className="import-page">
      <div className="import-container">
        <header className="import-header">
          <div className="import-brand">
            <div className="import-brand-mark">
              A
            </div>

            <span className="import-brand-name">
              AniKawa
            </span>
          </div>

          <div className="import-heading">
            <p className="import-eyebrow">
              DATA PIPELINE
            </p>

            <h1 className="import-title">
              Import anime.
              <span> Everything else is automatic.</span>
            </h1>

            <p className="import-description">
              Paste an anime URL or identifier and let AniKawa
              fetch, map, enrich, and generate the content.
            </p>
          </div>
        </header>

        <ImportInput />
      </div>
    </main>
  );
}