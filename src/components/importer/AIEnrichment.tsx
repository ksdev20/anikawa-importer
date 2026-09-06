import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  SparkleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

import type { AnimeImportData } from "@/types/import";

export interface AIEnrichmentResult {
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

interface AIEnrichmentProps {
  data: AnimeImportData;

  result: AIEnrichmentResult | null;

  isEnriching: boolean;

  error: string | null;

  onBack: () => void;
  onStart: () => void;
  onApply: () => void;
  onDismissError: () => void;
  onContinue: () => void;
  onRegenerate: () => void;
}

export default function AIEnrichment({
  data,
  result,
  isEnriching,
  error,
  onBack,
  onStart,
  onApply,
  onDismissError,
  onContinue,
  onRegenerate
}: AIEnrichmentProps) {
  const totalEpisodes = data.seasons.reduce(
    (total, season) => total + season.episodes.length,
    0,
  );

  const hasResult = result !== null;

  const enrichedFields = [
    result?.overview,
    result?.titleEnglish,
    result?.titleJapanese,
    result?.genres?.length,
    result?.status,
    result?.seasonTitles && Object.keys(result.seasonTitles).length,
    result?.episodeTitles && Object.keys(result.episodeTitles).length,
    result?.episodeOverviews && Object.keys(result.episodeOverviews).length,
  ].filter(Boolean).length;

  return (
    <section className="import-ai">
      <header className="import-ai-header">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="import-back-button"
            disabled={isEnriching}
          >
            <ArrowLeftIcon size={18} />
            Back to review
          </button>

          <div className="import-ai-badge">
            <SparkleIcon size={16} weight="fill" />
            AI ENRICHMENT
          </div>

          <h1 className="import-review-title">
            Enrich {data.title || "this anime"}
          </h1>

          <p className="import-panel-description">
            AI will improve missing or weak metadata while keeping
            source-derived IDs, episode numbers, dates, and video information
            untouched.
          </p>
        </div>

        <div className="import-review-stat">
          <strong>{totalEpisodes}</strong>
          <span>Episodes</span>
        </div>
      </header>

      {error && (
        <div className="import-status import-status-error" role="alert">
          <WarningCircleIcon size={20} weight="fill" />

          <span>{error}</span>

          <button
            type="button"
            onClick={onDismissError}
            className="import-status-dismiss"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {!hasResult && !isEnriching && (
        <div className="import-ai-grid">
          <section className="import-section">
            <div className="import-section-heading">
              <span>01</span>
              <h3>What AI will improve</h3>
            </div>

            <div className="import-ai-feature-list">
              <div className="import-ai-feature">
                <div className="import-ai-feature-icon">
                  <SparkleIcon size={19} />
                </div>

                <div>
                  <strong>Description</strong>
                  <p>
                    Improve the anime overview and fill missing descriptions
                    where possible.
                  </p>
                </div>
              </div>

              <div className="import-ai-feature">
                <div className="import-ai-feature-icon">
                  <SparkleIcon size={19} />
                </div>

                <div>
                  <strong>Titles & genres</strong>
                  <p>
                    Clean up alternate titles and normalize genre information.
                  </p>
                </div>
              </div>

              <div className="import-ai-feature">
                <div className="import-ai-feature-icon">
                  <SparkleIcon size={19} />
                </div>

                <div>
                  <strong>Episode metadata</strong>
                  <p>Improve missing episode titles and descriptions.</p>
                </div>
              </div>

              <div className="import-ai-feature">
                <div className="import-ai-feature-icon">
                  <SparkleIcon size={19} />
                </div>

                <div>
                  <strong>Season information</strong>
                  <p>
                    Fill or improve missing season names without changing season
                    numbers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="import-section">
            <div className="import-section-heading">
              <span>02</span>
              <h3>What AI will not change</h3>
            </div>

            <div className="import-ai-protected">
              <div>
                <CheckCircleIcon size={19} weight="fill" />
                Episode numbers
              </div>

              <div>
                <CheckCircleIcon size={19} weight="fill" />
                Air dates
              </div>

              <div>
                <CheckCircleIcon size={19} weight="fill" />
                TMDB / AniList / IMDb IDs
              </div>

              <div>
                <CheckCircleIcon size={19} weight="fill" />
                YouTube video IDs
              </div>

              <div>
                <CheckCircleIcon size={19} weight="fill" />
                Poster & backdrop sources
              </div>
            </div>
          </section>
        </div>
      )}

      {isEnriching && (
        <section className="import-section import-ai-loading">
          <div className="import-ai-loading-icon">
            <SparkleIcon size={30} weight="fill" />
          </div>

          <h2>AI is enriching your data...</h2>

          <p>
            Analyzing {data.title || "the anime"} and improving available
            metadata.
          </p>

          <div className="import-ai-progress">
            <div className="import-ai-progress-bar" />
          </div>

          <div className="import-ai-loading-status">
            <CircleNotchIcon size={17} className="import-spinner" />
            <span>This may take a few seconds</span>
          </div>
        </section>
      )}

      {hasResult && !isEnriching && (
        <>
          <section className="import-section">
            <div className="import-section-heading-row">
              <div className="import-section-heading">
                <span>03</span>
                <h3>AI suggestions</h3>
              </div>

              <div className="import-ai-result-count">
                {enrichedFields} fields improved
              </div>
            </div>

            <div className="import-ai-results">
              {result.overview && (
                <div className="import-ai-result">
                  <div className="import-ai-result-header">
                    <div>
                      <span>Description</span>
                      <strong>Suggested overview</strong>
                    </div>

                    <CheckCircleIcon size={19} weight="fill" />
                  </div>

                  <p>{result.overview}</p>
                </div>
              )}

              {result.titleEnglish && (
                <div className="import-ai-result">
                  <div className="import-ai-result-header">
                    <div>
                      <span>English title</span>
                      <strong>{result.titleEnglish}</strong>
                    </div>

                    <CheckCircleIcon size={19} weight="fill" />
                  </div>
                </div>
              )}

              {result.titleJapanese && (
                <div className="import-ai-result">
                  <div className="import-ai-result-header">
                    <div>
                      <span>Japanese title</span>
                      <strong>{result.titleJapanese}</strong>
                    </div>

                    <CheckCircleIcon size={19} weight="fill" />
                  </div>
                </div>
              )}

              {result.genres && result.genres.length > 0 && (
                <div className="import-ai-result">
                  <div className="import-ai-result-header">
                    <div>
                      <span>Genres</span>
                      <strong>{result.genres.join(", ")}</strong>
                    </div>

                    <CheckCircleIcon size={19} weight="fill" />
                  </div>
                </div>
              )}

              {result.status && (
                <div className="import-ai-result">
                  <div className="import-ai-result-header">
                    <div>
                      <span>Status</span>
                      <strong>{result.status}</strong>
                    </div>

                    <CheckCircleIcon size={19} weight="fill" />
                  </div>
                </div>
              )}

              {result.seasonTitles &&
                Object.entries(result.seasonTitles).length > 0 && (
                  <div className="import-ai-result">
                    <div className="import-ai-result-header">
                      <div>
                        <span>Seasons</span>
                        <strong>
                          {Object.keys(result.seasonTitles).length} season
                          titles improved
                        </strong>
                      </div>

                      <CheckCircleIcon size={19} weight="fill" />
                    </div>
                  </div>
                )}

              {result.episodeTitles &&
                Object.entries(result.episodeTitles).length > 0 && (
                  <div className="import-ai-result">
                    <div className="import-ai-result-header">
                      <div>
                        <span>Episodes</span>
                        <strong>
                          {Object.keys(result.episodeTitles).length} episode
                          titles improved
                        </strong>
                      </div>

                      <CheckCircleIcon size={19} weight="fill" />
                    </div>
                  </div>
                )}

              {result.episodeOverviews &&
                Object.entries(result.episodeOverviews).length > 0 && (
                  <div className="import-ai-result">
                    <div className="import-ai-result-header">
                      <div>
                        <span>Episode descriptions</span>
                        <strong>
                          {Object.keys(result.episodeOverviews).length}{" "}
                          descriptions improved
                        </strong>
                      </div>

                      <CheckCircleIcon size={19} weight="fill" />
                    </div>
                  </div>
                )}
            </div>
          </section>

          {result.warnings && result.warnings.length > 0 && (
            <div className="import-status import-status-warning" role="status">
              <WarningCircleIcon size={20} weight="fill" />

              <div>
                <strong>AI warnings</strong>

                <ul>
                  {result.warnings.map((warning, index) => (
                    <li key={`${warning}-${index}`}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <footer className="import-review-footer">
            <button
              type="button"
              onClick={onBack}
              className="import-back-button"
            >
              <ArrowLeftIcon size={18} />
              Back to review
            </button>

            <div className="import-ai-footer-actions">
              <button
                type="button"
                onClick={onRegenerate}
                className="import-secondary-button"
              >
                <SparkleIcon size={17} />
                Regenerate
              </button>

              <button
                type="button"
                onClick={() => {
                  onApply();
                  onContinue();
                }}
                className="import-continue-button"
              >
                Apply & continue
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </footer>
        </>
      )}

      {!hasResult && !isEnriching && (
        <footer className="import-review-footer">
          <button type="button" onClick={onBack} className="import-back-button">
            <ArrowLeftIcon size={18} />
            Back to review
          </button>

          <button
            type="button"
            onClick={onStart}
            className="import-continue-button"
          >
            <SparkleIcon size={18} weight="fill" />
            Start AI enrichment
            <ArrowRightIcon size={18} />
          </button>
        </footer>
      )}
    </section>
  );
}
