/**
 * EcoTrack - Main Page
 * Carbon footprint tracking application.
 *
 * Features:
 * - Textarea for daily activities description
 * - Process button to analyze carbon emissions
 * - Results section with activity breakdown and total CO2
 * - Tips for emission reduction
 *
 * Design:
 * - Clean, responsive layout using Tailwind CSS
 * - Mobile-first approach
 * - Smooth transitions for dynamic content
 */

import { useState } from "react";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { Results } from "@/components/Results";
import { Tips } from "@/components/Tips";
import { analyzeText, type AnalysisResult } from "@/utils/analyzer";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) {
      return;
    }

    setIsProcessing(true);
    setResult(null);

    // Simulate async processing (remove in production if analysis is synchronous)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const analysis: AnalysisResult = analyzeText({ text: inputText });
    setResult(analysis);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-blue-100"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            EcoTrack
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calcula tu huella de carbono diaria
          </p>
        </header>

        {/* Input Section */}
        <section>
          <Textarea
            value={inputText}
            onChange={setInputText}
            placeholder="Ejemplo: 'Hoy comí carne y viajé 20km en bus'"
            disabled={isProcessing}
          />
        </section>

        <section className="mt-6 flex justify-center">
          <Button
            variant="primary"
            onClick={handleProcess}
            disabled={isProcessing}
            loading={isProcessing}
          >
            {isProcessing ? "Procesando..." : "Calcular Huella"}
          </Button>
        </section>

        {/* Results Section */}
{result && <section className="mt-8">
            <Results
              activities={result.activities}
              totalCo2={result.totalCo2}
              onReset={handleReset}
            />
          </section>}
        {result && result.tips.length > 0 && (
          <section className="mt-6">
            <Tips tips={result.tips} />
          </section>
        )}
      </div>
    </main>
  );
}