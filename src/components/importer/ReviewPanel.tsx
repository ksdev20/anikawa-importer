import { useState } from "react";

import {
  ArrowLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  FilmStripIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

import type {
  AnimeImportData,
  AnimeImportEpisode,
  AnimeImportSeason,
} from "@/types/import";

import { SOURCE_LABELS } from "./importer";

interface ReviewPanelProps {
  data: AnimeImportData;

  onChange: (data: AnimeImportData) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function ReviewPanel({
  data,
  onChange,
  onBack,
  onContinue,
}: ReviewPanelProps) {
  const firstSeason = data.seasons[0];

  const [openSeasons, setOpenSeasons] = useState<Set<number>>(
    () => new Set(firstSeason ? [firstSeason.seasonNumber] : []),
  );

  function updateField<K extends keyof AnimeImportData>(
    field: K,
    value: AnimeImportData[K],
  ) {
    onChange({
      ...data,
      [field]: value,
    });
  }

  function updateSeason(
    seasonIndex: number,
    field: keyof AnimeImportSeason,
    value: AnimeImportSeason[keyof AnimeImportSeason],
  ) {
    const season = data.seasons[seasonIndex];

    if (!season) return;

    const seasons = [...data.seasons];

    seasons[seasonIndex] = {
      ...season,
      [field]: value,
    } as AnimeImportSeason;

    onChange({
      ...data,
      seasons,
    });
  }

  function updateEpisode(
    seasonIndex: number,
    episodeIndex: number,
    field: keyof AnimeImportEpisode,
    value: AnimeImportEpisode[keyof AnimeImportEpisode],
  ) {
    const season = data.seasons[seasonIndex];

    if (!season) return;

    const episode = season.episodes[episodeIndex];

    if (!episode) return;

    const episodes = [...season.episodes];

    episodes[episodeIndex] = {
      ...episode,
      [field]: value,
    } as AnimeImportEpisode;

    const seasons = [...data.seasons];

    seasons[seasonIndex] = {
      ...season,
      episodes,
    };

    onChange({
      ...data,
      seasons,
    });
  }

  function addSeason() {
    const nextSeasonNumber =
      data.seasons.length > 0
        ? Math.max(...data.seasons.map((season) => season.seasonNumber)) + 1
        : 1;

    const newSeason: AnimeImportSeason = {
      seasonNumber: nextSeasonNumber,
      title: `Season ${nextSeasonNumber}`,
      episodeCount: 0,
      episodes: [],
    };

    onChange({
      ...data,
      seasons: [...data.seasons, newSeason],
    });

    setOpenSeasons((current) => new Set([...current, nextSeasonNumber]));
  }

  function removeSeason(seasonIndex: number) {
    const season = data.seasons[seasonIndex];

    if (!season) return;

    const seasons = data.seasons.filter((_, index) => index !== seasonIndex);

    onChange({
      ...data,
      seasons,
    });

    setOpenSeasons((current) => {
      const next = new Set(current);
      next.delete(season.seasonNumber);
      return next;
    });
  }

  function addEpisode(seasonIndex: number) {
    const season = data.seasons[seasonIndex];

    if (!season) return;

    const nextEpisodeNumber =
      season.episodes.length > 0
        ? Math.max(...season.episodes.map((episode) => episode.episodeNumber)) +
          1
        : 1;

    const newEpisode: AnimeImportEpisode = {
      episodeNumber: nextEpisodeNumber,
      title: `Episode ${nextEpisodeNumber}`,
    };

    const episodes = [...season.episodes, newEpisode];

    const seasons = [...data.seasons];

    seasons[seasonIndex] = {
      ...season,
      episodeCount: episodes.length,
      episodes,
    };

    onChange({
      ...data,
      seasons,
    });
  }

  function removeEpisode(seasonIndex: number, episodeIndex: number) {
    const season = data.seasons[seasonIndex];

    if (!season) return;

    const episodes = season.episodes.filter(
      (_, index) => index !== episodeIndex,
    );

    const seasons = [...data.seasons];

    seasons[seasonIndex] = {
      ...season,
      episodeCount: episodes.length,
      episodes,
    };

    onChange({
      ...data,
      seasons,
    });
  }

  function toggleSeason(seasonNumber: number) {
    setOpenSeasons((current) => {
      const next = new Set(current);

      if (next.has(seasonNumber)) {
        next.delete(seasonNumber);
      } else {
        next.add(seasonNumber);
      }

      return next;
    });
  }

  const totalEpisodes = data.seasons.reduce(
    (total, season) => total + season.episodes.length,
    0,
  );

  return (
    <section className="import-review">
      <header className="import-review-header">
        <div>
          <button type="button" onClick={onBack} className="import-back-button">
            <ArrowLeftIcon size={18} />
            Back to sources
          </button>

          <p className="import-panel-eyebrow">REVIEW & EDIT</p>

          <h1 className="import-review-title">
            {data.title || "Untitled anime"}
          </h1>

          <p className="import-panel-description">
            Review the data we collected before sending it to AI enrichment.
          </p>
        </div>

        <div className="import-review-stat">
          <strong>{totalEpisodes}</strong>
          <span>Episodes</span>
        </div>
      </header>

      <div className="import-review-grid">
        <aside className="import-review-media">
          <div className="import-media-card">
            {data.posterPath ? (
              <img
                src={data.posterPath}
                alt={`${data.title} poster`}
                className="import-poster"
              />
            ) : (
              <div className="import-media-placeholder">
                <ImageIcon size={32} />
                <span>No poster</span>
              </div>
            )}
          </div>

          {data.backdropPath && (
            <div className="import-backdrop-card">
              <img src={data.backdropPath} alt="" className="import-backdrop" />
            </div>
          )}
        </aside>

        <div className="import-review-main">
          <section className="import-section">
            <div className="import-section-heading">
              <span>01</span>
              <h3>Anime information</h3>
            </div>

            <div className="import-fields-grid">
              <label className="import-field-label import-field-full">
                Title
                <input
                  className="import-input import-input-large"
                  value={data.title}
                  onChange={(event) => updateField("title", event.target.value)}
                />
              </label>

              <label className="import-field-label">
                English title
                <input
                  className="import-input"
                  value={data.titleEnglish ?? ""}
                  onChange={(event) =>
                    updateField("titleEnglish", event.target.value)
                  }
                />
              </label>

              <label className="import-field-label">
                Japanese title
                <input
                  className="import-input"
                  value={data.titleJapanese ?? ""}
                  onChange={(event) =>
                    updateField("titleJapanese", event.target.value)
                  }
                />
              </label>

              <label className="import-field-label">
                Year
                <input
                  type="number"
                  className="import-input"
                  value={data.year ?? ""}
                  onChange={(event) =>
                    updateField(
                      "year",
                      event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    )
                  }
                />
              </label>

              <label className="import-field-label">
                Status
                <input
                  className="import-input"
                  value={data.status ?? ""}
                  onChange={(event) =>
                    updateField("status", event.target.value)
                  }
                />
              </label>

              <label className="import-field-label">
                Score
                <input
                  type="number"
                  step="0.1"
                  className="import-input"
                  value={data.score ?? ""}
                  onChange={(event) =>
                    updateField(
                      "score",
                      event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    )
                  }
                />
              </label>

              <label className="import-field-label">
                Episodes
                <input
                  type="number"
                  className="import-input"
                  value={data.episodes ?? ""}
                  onChange={(event) =>
                    updateField(
                      "episodes",
                      event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    )
                  }
                />
              </label>

              <label className="import-field-label">
                Duration (minutes)
                <input
                  type="number"
                  className="import-input"
                  value={data.durationMinutes ?? ""}
                  onChange={(event) =>
                    updateField(
                      "durationMinutes",
                      event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    )
                  }
                />
              </label>

              <label className="import-field-label import-field-full">
                Genres
                <input
                  className="import-input"
                  value={data.genres.join(", ")}
                  onChange={(event) =>
                    updateField(
                      "genres",
                      event.target.value
                        .split(",")
                        .map((genre) => genre.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder="Action, Adventure, Fantasy"
                />
              </label>

              <label className="import-field-label import-field-full">
                Overview
                <textarea
                  className="import-textarea"
                  rows={5}
                  value={data.overview ?? ""}
                  onChange={(event) =>
                    updateField("overview", event.target.value)
                  }
                />
              </label>
            </div>
          </section>

          <section className="import-section">
            <div className="import-section-heading">
              <span>02</span>
              <h3>Connected sources</h3>
            </div>

            <div className="import-source-summary">
              {data.sources.length > 0 ? (
                data.sources.map((source, index) => (
                  <div
                    key={`${source.type}-${source.id ?? index}-${index}`}
                    className="import-source-summary-item"
                  >
                    <CheckCircleIcon size={18} weight="fill" />

                    <strong>{SOURCE_LABELS[source.type]}</strong>

                    <span>{source.id ?? source.url ?? source.input}</span>
                  </div>
                ))
              ) : (
                <div className="import-empty-state">
                  <WarningCircleIcon size={20} />

                  <div>
                    <strong>No connected sources</strong>
                    <p>No source information was returned by the analyzer.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="import-section">
            <div className="import-section-heading-row">
              <div className="import-section-heading">
                <span>03</span>
                <h3>Seasons & episodes</h3>
              </div>

              <button
                type="button"
                onClick={addSeason}
                className="import-secondary-button"
              >
                <PlusIcon size={17} />
                Add season
              </button>
            </div>

            {data.seasons.length === 0 ? (
              <div className="import-empty-state">
                <WarningCircleIcon size={20} />

                <div>
                  <strong>No seasons found</strong>

                  <p>
                    Add a season manually or provide a TMDB source with episode
                    data.
                  </p>
                </div>
              </div>
            ) : (
              <div className="import-seasons">
                {data.seasons.map((season, seasonIndex) => {
                  const isOpen = openSeasons.has(season.seasonNumber);

                  return (
                    <div
                      key={`season-${season.seasonNumber}-${seasonIndex}`}
                      className="import-season"
                    >
                      <div className="import-season-header">
                        <button
                          type="button"
                          className="import-season-toggle"
                          onClick={() => toggleSeason(season.seasonNumber)}
                          aria-expanded={isOpen}
                        >
                          <CaretRightIcon
                            size={18}
                            className={isOpen ? "import-season-arrow-open" : ""}
                          />

                          <span>Season {season.seasonNumber}</span>

                          <small>{season.episodes.length} episodes</small>
                        </button>

                        <div className="import-season-actions">
                          <button
                            type="button"
                            onClick={() => addEpisode(seasonIndex)}
                            className="import-small-button"
                          >
                            <PlusIcon size={15} />
                            Episode
                          </button>

                          <button
                            type="button"
                            onClick={() => removeSeason(seasonIndex)}
                            className="import-small-danger"
                            aria-label={`Remove season ${season.seasonNumber}`}
                          >
                            <TrashIcon size={17} />
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="import-season-body">
                          <div className="import-season-meta">
                            <label className="import-field-label">
                              Season number
                              <input
                                type="number"
                                min="0"
                                className="import-input"
                                value={season.seasonNumber}
                                onChange={(event) =>
                                  updateSeason(
                                    seasonIndex,
                                    "seasonNumber",
                                    Number(event.target.value),
                                  )
                                }
                              />
                            </label>

                            <label className="import-field-label">
                              Season title
                              <input
                                className="import-input"
                                value={season.title ?? ""}
                                onChange={(event) =>
                                  updateSeason(
                                    seasonIndex,
                                    "title",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>
                          </div>

                          {season.episodes.length === 0 ? (
                            <div className="import-empty-state">
                              <FilmStripIcon size={20} />

                              <div>
                                <strong>No episodes</strong>

                                <p>Add an episode manually.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="import-episode-list">
                              {season.episodes.map((episode, episodeIndex) => (
                                <div
                                  key={`episode-${season.seasonNumber}-${episode.episodeNumber}-${episodeIndex}`}
                                  className="import-episode"
                                >
                                  <div className="import-episode-number">
                                    {episode.episodeNumber}
                                  </div>

                                  <div className="import-episode-fields">
                                    <label className="import-field-label">
                                      Episode number
                                      <input
                                        type="number"
                                        min="1"
                                        className="import-input"
                                        value={episode.episodeNumber}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "episodeNumber",
                                            Number(event.target.value),
                                          )
                                        }
                                      />
                                    </label>

                                    <label className="import-field-label">
                                      Title
                                      <input
                                        className="import-input"
                                        value={episode.title ?? ""}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "title",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </label>

                                    <label className="import-field-label import-field-full">
                                      Air date
                                      <input
                                        type="date"
                                        className="import-input"
                                        value={episode.airDate ?? ""}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "airDate",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </label>

                                    <label className="import-field-label import-field-full">
                                      Overview
                                      <textarea
                                        className="import-textarea"
                                        rows={3}
                                        value={episode.overview ?? ""}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "overview",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </label>

                                    <label className="import-field-label import-field-full">
                                      Thumbnail
                                      <input
                                        className="import-input"
                                        value={episode.thumbnail ?? ""}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "thumbnail",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </label>

                                    <label className="import-field-label import-field-full">
                                      YouTube video ID
                                      <input
                                        className="import-input"
                                        value={episode.youtubeVideoId ?? ""}
                                        onChange={(event) =>
                                          updateEpisode(
                                            seasonIndex,
                                            episodeIndex,
                                            "youtubeVideoId",
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </label>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeEpisode(seasonIndex, episodeIndex)
                                    }
                                    className="import-small-danger"
                                    aria-label={`Remove episode ${episode.episodeNumber}`}
                                  >
                                    <TrashIcon size={17} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="import-review-footer">
        <button type="button" onClick={onBack} className="import-back-button">
          <ArrowLeftIcon size={18} />
          Back to sources
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="import-continue-button"
        >
          Continue to AI enrichment
          <ArrowLeftIcon size={18} className="rotate-180" />
        </button>
      </footer>
    </section>
  );
}
