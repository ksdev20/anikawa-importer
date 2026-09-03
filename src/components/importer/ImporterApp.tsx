import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  LinkIcon,
  MagicWandIcon,
  PlusIcon,
  TrashIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react";

import type {
  AnalyzeResponse,
  ImportSource,
  ImportSourceType,
} from "@/types/import";

const MAX_SOURCES = 20;
const MAX_SOURCE_LENGTH = 2048;

const SOURCE_LABELS: Record<ImportSourceType, string> = {
  tmdb: "TMDB",
  anilist: "AniList",
  youtube: "YouTube",
  unknown: "Source",
};

function createSource(): ImportSource {
  return {
    id: crypto.randomUUID(),
    value: "",
  };
}

function normalizeInput(value: string): string {
  return value.trim();
}

function detectSourceType(value: string): ImportSourceType {
  const input = normalizeInput(value).toLowerCase();

  if (!input) {
    return "unknown";
  }

  if (
    input.includes("themoviedb.org") ||
    input.includes("tmdb.org") ||
    input.includes("tmdb")
  ) {
    return "tmdb";
  }

  if (input.includes("imdb.com") || input.startsWith("imdb:")) {
    return "unknown";
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

function isLikelyUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getSourceDescription(value: string): string {
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

function validateSource(value: string): string | null {
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

export default function ImporterApp() {
  const [sources, setSources] = useState<ImportSource[]>([createSource()]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;

      abortControllerRef.current?.abort();
    };
  }, []);

  const validSources = useMemo(() => {
    return sources.filter((source) => normalizeInput(source.value).length > 0);
  }, [sources]);

  const sourceCount = validSources.length;

  const hasInvalidSource = useMemo(() => {
    return validSources.some((source) => validateSource(source.value) !== null);
  }, [validSources]);

  const canAnalyze = sourceCount > 0 && !hasInvalidSource && !isAnalyzing;

  const updateSource = useCallback((id: string, value: string) => {
    setSources((current) =>
      current.map((source) =>
        source.id === id
          ? {
              ...source,
              value: value.slice(0, MAX_SOURCE_LENGTH),
            }
          : source,
      ),
    );

    setError(null);
    setSuccessMessage(null);
    setResult(null);
  }, []);

  const addSource = useCallback(() => {
    if (sources.length >= MAX_SOURCES) {
      setError(`You can add up to ${MAX_SOURCES} sources per import.`);

      return;
    }

    setSources((current) => [...current, createSource()]);

    setError(null);
    setSuccessMessage(null);
  }, [sources.length]);

  const removeSource = useCallback((id: string) => {
    setSources((current: any) => {
      if (current.length === 1) {
        return [
          {
            ...current[0],
            value: "",
          },
        ];
      }

      return current.filter((source: any) => source.id !== id);
    });

    setError(null);
    setSuccessMessage(null);
    setResult(null);
  }, []);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>, sourceId: string) => {
      const pastedText = event.clipboardData.getData("text");

      if (!pastedText.includes("\n")) {
        return;
      }

      event.preventDefault();

      const pastedSources = pastedText
        .split(/\r?\n/)
        .map(normalizeInput)
        .filter(Boolean)
        .slice(0, MAX_SOURCES);

      if (pastedSources.length === 0) {
        return;
      }

      setSources((current) => {
        const currentWithoutTarget = current.filter(
          (source) => source.id !== sourceId,
        );

        const newSources = pastedSources.map((value) => ({
          id: crypto.randomUUID(),
          value: value.slice(0, MAX_SOURCE_LENGTH),
        }));

        return [...currentWithoutTarget, ...newSources].slice(0, MAX_SOURCES);
      });

      setError(null);
      setSuccessMessage(null);
      setResult(null);
    },
    [],
  );

  const handleAnalyze = useCallback(async () => {
    if (!canAnalyze) {
      return;
    }

    const normalizedSources = validSources.map((source) => ({
      ...source,
      value: normalizeInput(source.value),
    }));

    const seen = new Set<string>();

    const duplicate = normalizedSources.find((source) => {
      const key = source.value.toLowerCase();

      if (seen.has(key)) {
        return true;
      }

      seen.add(key);

      return false;
    });

    if (duplicate) {
      setError("You have added the same source more than once.");

      return;
    }

    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsAnalyzing(true);
    setError(null);
    setSuccessMessage(null);
    setResult(null);

    try {
      const response = await fetch("/api/import/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sources: normalizedSources,
        }),
        signal: controller.signal,
      });

      let payload: AnalyzeResponse | null = null;

      try {
        payload = (await response.json()) as AnalyzeResponse;
      } catch {
        payload = null;
      }

      if (!response.ok) {
        throw new Error(
          payload?.error || `Import analysis failed (${response.status}).`,
        );
      }

      if (!payload?.success) {
        throw new Error(payload?.error || "Import analysis failed.");
      }

      if (!mountedRef.current) {
        return;
      }

      setResult(payload);

      const analyzedCount =
        payload.data?.sources.length ?? normalizedSources.length;

      setSuccessMessage(
        `Successfully analyzed ${analyzedCount} source${
          analyzedCount === 1 ? "" : "s"
        }.`,
      );
    } catch (caughtError) {
      if (!mountedRef.current) {
        return;
      }

      if (
        caughtError instanceof DOMException &&
        caughtError.name === "AbortError"
      ) {
        return;
      }

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while analyzing the sources.",
      );
    } finally {
      if (mountedRef.current && abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsAnalyzing(false);
      }
    }
  }, [canAnalyze, validSources]);

  const handleClear = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setIsAnalyzing(false);
    setError(null);
    setSuccessMessage(null);
    setResult(null);
    setSources([createSource()]);
  }, []);

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const currentIndex = sources.findIndex(
        (source) => source.id === event.currentTarget.dataset.sourceId,
      );

      if (currentIndex === sources.length - 1) {
        addSource();
      }
    }
  }

  return (
    <main className="importer-page">
      <div className="importer-container">
        <section className="importer-hero">
          <div className="importer-brand">
            <div className="importer-brand-icon">
              <MagicWandIcon size={24} weight="fill" />
            </div>

            <span className="importer-brand-name">AniKawa Importer</span>
          </div>

          <div className="importer-hero-content">
            <div className="importer-hero-badge">
              <CheckCircleIcon size={16} weight="fill" />

              <span>Import smarter</span>
            </div>

            <h1 className="importer-title">
              Turn scattered data into
              <span> a complete anime.</span>
            </h1>

            <p className="importer-description">
              Paste your source links. AniKawa collects metadata, episodes,
              media and external information, then prepares everything for
              AI-powered enrichment and validation.
            </p>
          </div>
        </section>

        <section
          className="import-form-panel"
          aria-labelledby="import-panel-title"
        >
          <div className="import-panel-header">
            <div>
              <p className="import-panel-eyebrow">NEW IMPORT</p>

              <h2 id="import-panel-title" className="import-panel-title">
                Add your sources
              </h2>

              <p className="import-panel-description">
                Add links, IDs, or source references. We&apos;ll identify and
                combine them automatically.
              </p>
            </div>

            <div className="import-panel-step">
              <span className="import-panel-step-number">01</span>

              <span className="import-panel-step-label">Sources</span>
            </div>
          </div>

          <div className="import-source-list" aria-live="polite">
            {sources.map((source, index) => {
              const sourceError =
                source.value.length > 0 ? validateSource(source.value) : null;

              const sourceType = getSourceDescription(source.value);

              return (
                <div key={source.id} className="import-source-row">
                  <div className="import-source-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="import-source-field-wrapper">
                    <div
                      className={`import-source-field${
                        sourceError ? " import-source-field-error" : ""
                      }`}
                    >
                      <LinkIcon
                        size={20}
                        className="import-source-field-icon"
                        aria-hidden="true"
                      />

                      <input
                        type="text"
                        value={source.value}
                        data-source-id={source.id}
                        onChange={(event) =>
                          updateSource(source.id, event.target.value)
                        }
                        onPaste={(event) => handlePaste(event, source.id)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="TMDB, IMDb, AniList, YouTube playlist, URL or ID..."
                        className="import-source-input"
                        aria-label={`Source ${index + 1}`}
                        aria-invalid={sourceError ? true : undefined}
                        maxLength={MAX_SOURCE_LENGTH}
                        autoComplete="off"
                        spellCheck={false}
                        disabled={isAnalyzing}
                      />

                      {source.value.trim() && (
                        <span
                          className="import-source-type"
                          aria-label={`Detected as ${sourceType}`}
                        >
                          {sourceType}
                        </span>
                      )}
                    </div>

                    {sourceError && (
                      <p className="import-source-error">{sourceError}</p>
                    )}
                  </div>

                  {sources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSource(source.id)}
                      className="import-source-remove"
                      aria-label={`Remove source ${index + 1}`}
                      disabled={isAnalyzing}
                    >
                      <TrashIcon size={20} aria-hidden="true" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="import-status import-status-error" role="alert">
              <WarningCircleIcon size={20} weight="fill" aria-hidden="true" />

              <span>{error}</span>

              <button
                type="button"
                onClick={() => setError(null)}
                className="import-status-dismiss"
                aria-label="Dismiss error"
              >
                <XIcon size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          {successMessage && (
            <div className="import-status import-status-success" role="status">
              <CheckCircleIcon size={20} weight="fill" aria-hidden="true" />

              <span>{successMessage}</span>
            </div>
          )}

          {result?.warnings && result.warnings.length > 0 && (
            <div className="import-status import-status-warning" role="status">
              <WarningCircleIcon size={20} weight="fill" aria-hidden="true" />

              <div>
                <strong>Some sources need attention</strong>

                <ul>
                  {result.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="import-panel-footer">
            <div className="import-panel-actions">
              <button
                type="button"
                onClick={addSource}
                className="import-add-source-button"
                disabled={isAnalyzing || sources.length >= MAX_SOURCES}
              >
                <PlusIcon size={18} aria-hidden="true" />

                <span>
                  {sources.length >= MAX_SOURCES
                    ? `Maximum ${MAX_SOURCES}`
                    : "Add another source"}
                </span>
              </button>

              {sourceCount > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="import-clear-button"
                  disabled={isAnalyzing}
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="import-analyze-button"
              aria-busy={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <CircleNotchIcon
                    size={20}
                    className="import-spinner"
                    aria-hidden="true"
                  />

                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <MagicWandIcon size={20} weight="fill" aria-hidden="true" />

                  <span>
                    {sourceCount > 0
                      ? `Analyze ${sourceCount} Source${
                          sourceCount === 1 ? "" : "s"
                        }`
                      : "Analyze & Import"}
                  </span>

                  <ArrowRightIcon size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </section>

        <section className="importer-workflow" aria-label="Import workflow">
          <div className="importer-workflow-item">
            <span className="workflow-number">01</span>

            <div>
              <h3>Collect</h3>

              <p>APIs, playlists, metadata and episode sources.</p>
            </div>
          </div>

          <div className="importer-workflow-line" aria-hidden="true" />

          <div className="importer-workflow-item">
            <span className="workflow-number">02</span>

            <div>
              <h3>Enhance</h3>

              <p>AI creates clean editorial content and descriptions.</p>
            </div>
          </div>

          <div className="importer-workflow-line" aria-hidden="true" />

          <div className="importer-workflow-item">
            <span className="workflow-number">03</span>

            <div>
              <h3>Validate</h3>

              <p>Review the result and fix anything before saving.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
