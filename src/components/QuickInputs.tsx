import { useCallback } from "react";

interface QuickInput {
  label: string;
  text: string;
}

const EXAMPLES: QuickInput[] = [
  { label: "200 kWh de luz", text: "Hoy usamos 200 kWh de electricidad" },
  { label: "5 camionetas", text: "Hoy usamos 5 camionetas de reparto" },
  { label: "3 bolsas de residuos", text: "Generamos 3 bolsas de residuos operativos" },
];

interface QuickInputsProps {
  onInsert: (text: string) => void;
}

export function QuickInputs({ onInsert }: QuickInputsProps) {
  const handleClick = useCallback(
    (text: string) => {
      onInsert(text);
    },
    [onInsert],
  );

  return (
    <div className="flex flex-wrap gap-2">
      {EXAMPLES.map((example) => (
        <button
          key={example.label}
          type="button"
          onClick={() => handleClick(example.text)}
          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
        >
          {example.label}
        </button>
      ))}
    </div>
  );
}
