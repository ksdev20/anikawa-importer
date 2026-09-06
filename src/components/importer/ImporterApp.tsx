import { useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";

import AIEnrichment, { type AIEnrichmentResult } from "./AIEnrichment";
import ReviewPanel from "./ReviewPanel";
import SourceInput from "./SourceInput";
import {
  INITIAL_SOURCE,
  MAX_SOURCES,
  createSource,
  normalizeInput,
} from "./importer";

import type {
  AnalyzeResponse,
  AnimeImportData,
  ImportSource,
} from "@/types/import";

type ImporterStep = "sources" | "review" | "ai";

export default function ImporterApp() {
  const [step, setStep] = useState<ImporterStep>("sources");

  const [sources, setSources] = useState<ImportSource[]>([INITIAL_SOURCE]);

  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const [reviewData, setReviewData] = useState<AnimeImportData | null>(null);

  const [aiResult, setAiResult] = useState<AIEnrichmentResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateSource = (id: string, value: string) => {
    setSources((current) =>
      current.map((source) =>
        source.id === id
          ? {
              ...source,
              value,
            }
          : source,
      ),
    );

    setError(null);
    setSuccessMessage(null);
  };

  const addSource = () => {
    setSources((current) => {
      if (current.length >= MAX_SOURCES) {
        return current;
      }

      return [...current, createSource()];
    });

    setError(null);
    setSuccessMessage(null);
  };

  const removeSource = (id: string) => {
    setSources((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.filter((source) => source.id !== id);
    });

    setError(null);
    setSuccessMessage(null);
  };

  const clearSources = () => {
    setSources([INITIAL_SOURCE]);
    setResult(null);
    setReviewData(null);
    setAiResult(null);

    setError(null);
    setAiError(null);
    setSuccessMessage(null);

    setStep("sources");
  };

  const handleSourcePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    sourceId: string,
  ) => {
    const pastedText = event.clipboardData.getData("text");

    if (!pastedText.includes("\n")) {
      return;
    }

    event.preventDefault();

    const pastedSources = pastedText
      .split(/\r?\n/)
      .map((value) => normalizeInput(value))
      .filter(Boolean);

    if (pastedSources.length === 0) {
      return;
    }

    setSources((current) => {
      const sourceIndex = current.findIndex((source) => source.id === sourceId);

      if (sourceIndex === -1) {
        return current;
      }

      const firstPastedSource = pastedSources[0];

      if (!firstPastedSource) {
        return current;
      }

      const next = [...current];

      next[sourceIndex] = {
        ...next[sourceIndex],
        value: firstPastedSource,
      };

      const additionalSources = pastedSources
        .slice(1, MAX_SOURCES - next.length + 1)
        .map((value) => ({
          ...createSource(),
          value,
        }));

      return [...next, ...additionalSources];
    });

    setError(null);
    setSuccessMessage(null);
  };

  const handleSourceKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    void handleAnalyze();
  };

  const handleAnalyze = async () => {
    setError(null);
    setSuccessMessage(null);

    const validSources = sources
      .map((source) => ({
        ...source,
        value: normalizeInput(source.value),
      }))
      .filter((source) => source.value);

    if (validSources.length === 0) {
      setError("Add at least one source.");
      return;
    }

    setSources(validSources);

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/import/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sources: validSources,
        }),
      });

      const data: AnalyzeResponse = await response.json();

      if (!response.ok || !data.success || !data.data) {
        throw new Error(data.error || "Failed to analyze sources.");
      }

      setResult(data);
      setReviewData(data.data);
      setStep("review");

      setSuccessMessage(
        "Sources analyzed successfully. Review the imported data below.",
      );
    } catch (err) {
      console.error("Analyze failed:", err);

      setError(
        err instanceof Error ? err.message : "Failed to analyze sources.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToSources = () => {
    setStep("sources");
    setError(null);
    setAiError(null);
    setSuccessMessage(null);
  };

  const handleContinueToAI = () => {
    if (!reviewData) {
      return;
    }

    setError(null);
    setAiError(null);
    setSuccessMessage(null);
    setAiResult(null);

    setStep("ai");
  };

  const handleStartAI = async () => {
    if (!reviewData) {
      return;
    }

    setIsEnriching(true);
    setAiError(null);
    setAiResult(null);

    try {
      const response = await fetch("/api/import/enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: reviewData,
        }),
      });

      const data: {
        success: boolean;
        result?: AIEnrichmentResult;
        error?: string;
      } = await response.json();

      if (!response.ok || !data.success || !data.result) {
        throw new Error(data.error || "AI enrichment failed.");
      }

      setAiResult(data.result);
    } catch (err) {
      console.error("AI enrichment failed:", err);

      setAiError(err instanceof Error ? err.message : "AI enrichment failed.");
    } finally {
      setIsEnriching(false);
    }
  };

  const handleApplyAI = () => {
    if (!reviewData || !aiResult) {
      return;
    }

    const enrichedData: AnimeImportData = {
      ...reviewData,

      overview: aiResult.overview?.trim() || reviewData.overview,

      titleEnglish: aiResult.titleEnglish?.trim() || reviewData.titleEnglish,

      titleJapanese: aiResult.titleJapanese?.trim() || reviewData.titleJapanese,

      genres:
        aiResult.genres && aiResult.genres.length > 0
          ? aiResult.genres
          : reviewData.genres,

      status: aiResult.status?.trim() || reviewData.status,

      seasons: reviewData.seasons.map((season) => {
        const seasonTitle =
          aiResult.seasonTitles?.[String(season.seasonNumber)];

        return {
          ...season,

          title: seasonTitle?.trim() || season.title,

          episodes: season.episodes.map((episode) => {
            const episodeKey = `${season.seasonNumber}:${episode.episodeNumber}`;

            const episodeTitle = aiResult.episodeTitles?.[episodeKey];

            const episodeOverview = aiResult.episodeOverviews?.[episodeKey];

            return {
              ...episode,

              title: episodeTitle?.trim() || episode.title,

              overview: episodeOverview?.trim() || episode.overview,
            };
          }),
        };
      }),
    };

    setReviewData(enrichedData);

    setSuccessMessage("AI enrichment applied successfully.");

    setStep("review");
  };

  const handleRegenerateAI = () => {
    setAiResult(null);
    setAiError(null);

    void handleStartAI();
  };

  const handleDismissAIError = () => {
    setAiError(null);
  };

  const handleContinueFromAI = () => {
    if (!reviewData) {
      return;
    }

    setSuccessMessage("AI enrichment complete. The final import step is next.");

    setStep("review");
  };

  return (
    <main className="importer-page">
      <div className="importer-container">
        <header className="importer-hero">
          <div className="importer-brand">
            <div className="importer-brand-icon">AK</div>

            <span className="importer-brand-name">AniKawa Importer</span>
          </div>

          <div className="importer-hero-content">
            <span className="importer-hero-badge">Anime data pipeline</span>

            <h1 className="importer-title">Import anime data faster.</h1>

            <p className="importer-description">
              Connect your sources, review the data, enrich it with AI, and
              prepare it for AniKawa.
            </p>
          </div>
        </header>

        {step === "sources" && (
          <SourceInput
            sources={sources}
            isAnalyzing={isAnalyzing}
            error={error}
            successMessage={successMessage}
            result={result}
            sourceCount={sources.length}
            canAnalyze={sources.some((source) => normalizeInput(source.value))}
            onUpdateSource={updateSource}
            onAddSource={addSource}
            onRemoveSource={removeSource}
            onPaste={handleSourcePaste}
            onInputKeyDown={handleSourceKeyDown}
            onAnalyze={() => void handleAnalyze()}
            onClear={clearSources}
            onDismissError={() => setError(null)}
          />
        )}

        {step === "review" && reviewData && (
          <ReviewPanel
            data={reviewData}
            onChange={(data) => {
              setReviewData(data);
              setSuccessMessage(null);
            }}
            onBack={handleBackToSources}
            onContinue={handleContinueToAI}
          />
        )}

        {step === "ai" && reviewData && (
          <AIEnrichment
            data={reviewData}
            result={aiResult}
            isEnriching={isEnriching}
            error={aiError}
            onBack={() => setStep("review")}
            onStart={() => void handleStartAI()}
            onApply={handleApplyAI}
            onDismissError={handleDismissAIError}
            onContinue={handleContinueFromAI}
            onRegenerate={handleRegenerateAI}
          />
        )}
      </div>
    </main>
  );
}
