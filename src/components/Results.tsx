import { AnalysisResult } from "@/utils/analyzer";
import { Button } from "./Button";

interface ResultsProps {
  result: AnalysisResult;
  onReset?: () => void;
}

const categoryColors = {
  Transporte: "bg-blue-100 text-blue-700 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-300",
  Energía: "bg-amber-100 text-amber-700 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300",
  Residuos: "bg-purple-100 text-purple-700 ring-purple-600/20 dark:bg-purple-950 dark:text-purple-300",
  Otros: "bg-gray-100 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300",
};

function formatCo2(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(2)} toneladas`;
  return `${value} kg`;
}

export function Results({ result, onReset }: ResultsProps) {
  const { activities, totalCo2, tips } = result;
  const maxCo2 = Math.max(...activities.map((a) => a.estimatedCo2), 1);

  return (
    <div className="space-y-5">
      <div className="eco-card">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Huella estimada total</h3>
            <p className="eco-metric mt-1">{formatCo2(totalCo2)} CO₂</p>
          </div>
          <span className="eco-badge self-start">{activities.length} actividad{activities.length !== 1 ? "es" : ""} detectada{activities.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Desglose por categoría</h4>
        {activities.map((act, index) => (
          <div key={index} className="eco-card">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{act.activity}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ring-inset ${categoryColors[act.category as keyof typeof categoryColors] ?? categoryColors.Otros}`}>{act.category}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {act.quantity} {act.unit} × factor {act.factor} kg CO₂
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{act.estimatedCo2} kg</p>
                <div className="eco-progress mt-1.5 w-20 sm:w-28">
                  <div className="eco-progress-fill" style={{ width: `${Math.round((act.estimatedCo2 / maxCo2) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tips.length > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
          <h4 className="mb-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">Recomendaciones AI</h4>
          <ul className="space-y-1 text-sm text-emerald-700 dark:text-emerald-300">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {onReset && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onReset}>
            Nueva entrada
          </Button>
        </div>
      )}
    </div>
  );
}
