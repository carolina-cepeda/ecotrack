"use client";

import { useCallback, useState } from "react";
import { Results } from "@/components/Results";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { QuickInputs } from "@/components/QuickInputs";
import { analyzeText, type AnalysisResult } from "@/utils/analyzer";

const DEFAULT_TEXT = "Hoy usamos 5 camionetas de reparto y gastamos 200kWh de luz";

function SparkleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </svg>
  );
}

function Header({ totalCo2, activityCount }: { totalCo2: number; activityCount: number }) {
  const tons = totalCo2 / 1000;
  return (
    <header className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-emerald-900 dark:bg-gray-950 sm:flex-row sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold" aria-hidden="true">E</div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">EcoTrack AI</h1>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Panadería La Esquina · Huella diaria</p>
      </div>
      {totalCo2 > 0 && (
        <div className="text-center sm:text-right">
          <p className="eco-metric">{totalCo2 >= 1000 ? `${tons.toFixed(2)} t` : `${totalCo2} kg`} CO₂</p>
          <p className="text-xs text-gray-500">{activityCount} actividad{activityCount !== 1 ? "es" : ""} procesada{activityCount !== 1 ? "s" : ""}</p>
        </div>
      )}
    </header>
  );
}

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAnalyzed, setJustAnalyzed] = useState(false);

  const process = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setError("Ingresa una descripción de actividades antes de analizar.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    setResult(null);
    setJustAnalyzed(false);

    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      const analysis = analyzeText({ text: trimmed });
      setResult(analysis);
      setJustAnalyzed(true);
      setTimeout(() => setJustAnalyzed(false), 1200);
    } catch {
      setError("No se pudo analizar el texto. Intenta de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

  const reset = useCallback(() => {
    setInputText("");
    setResult(null);
    setError(null);
    setJustAnalyzed(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-8 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <Header totalCo2={result?.totalCo2 ?? 0} activityCount={result?.activities.length ?? 0} />

        <section className={`eco-card transition-all duration-500 ${justAnalyzed ? "ring-2 ring-emerald-400 dark:ring-emerald-600" : ""}`}>
          <Textarea
            value={inputText}
            onChange={(value) => {
              setInputText(value);
              setError(null);
            }}
            placeholder="Describe tus actividades en lenguaje natural, por ejemplo: 'Hoy usamos 5 camionetas de reparto y gastamos 200kWh de luz'"
            disabled={isProcessing}
            label="Actividades del día"
            hint="Escribe en español; se detectan transporte, energía, residuos y otros. Atajo: Ctrl + Enter."
          />
          <div className="mt-3">
            <QuickInputs onInsert={(text) => {
              setInputText((prev) => (prev ? `${prev} ${text}` : text));
              setError(null);
            }} />
          </div>
          {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="primary" onClick={process} loading={isProcessing} disabled={isProcessing || !inputText.trim()} iconLeft={<SparkleIcon />} fullWidth={false}>
              {isProcessing ? "Analizando..." : "Analizar e Impacto"}
            </Button>
            <div className="flex gap-2">
              {result && (
                <Button variant="outline" onClick={reset} disabled={isProcessing} iconLeft={<RefreshIcon />}>
                  Nueva entrada
                </Button>
              )}
              <Button variant="ghost" onClick={reset} disabled={isProcessing} size="sm">
                Limpiar
              </Button>
            </div>
          </div>
        </section>

        {result && (
          <section className="eco-card transition-all duration-500" aria-live="polite">
            <Results result={result} onReset={reset} />
          </section>
        )}

        <footer className="text-center text-xs text-gray-400">
          Factores de emisión simplificados con fines demostrativos.
        </footer>
      </div>
    </main>
  );
}
