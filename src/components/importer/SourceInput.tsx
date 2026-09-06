import type { ClipboardEvent, KeyboardEvent } from "react";

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

import type { AnalyzeResponse, ImportSource } from "@/types/import";

import {
  MAX_SOURCE_LENGTH,
  MAX_SOURCES,
  getSourceDescription,
  validateSource,
} from "./importer";

interface SourceInputProps {
  sources: ImportSource[];
  isAnalyzing: boolean;

  error: string | null;
  successMessage: string | null;
  result: AnalyzeResponse | null;

  sourceCount: number;
  canAnalyze: boolean;

  onUpdateSource: (id: string, value: string) => void;
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>, sourceId: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onDismissError: () => void;
}

export default function SourceInput({
  sources,
  isAnalyzing,
  error,
  successMessage,
  result,
  sourceCount,
  canAnalyze,
  onUpdateSource,
  onAddSource,
  onRemoveSource,
  onPaste,
  onInputKeyDown,
  onAnalyze,
  onClear,
  onDismissError,
}: SourceInputProps) {
  return (
    <section className="import-form-panel" aria-labelledby="import-panel-title">
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
                      onUpdateSource(source.id, event.target.value)
                    }
                    onPaste={(event) => onPaste(event, source.id)}
                    onKeyDown={onInputKeyDown}
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
                  onClick={() => onRemoveSource(source.id)}
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
            onClick={onDismissError}
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
              {result.warnings.map((warning, index) => (
                <li key={`${warning}-${index}`}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="import-panel-footer">
        <div className="import-panel-actions">
          <button
            type="button"
            onClick={onAddSource}
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
              onClick={onClear}
              className="import-clear-button"
              disabled={isAnalyzing}
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onAnalyze}
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
  );
}
