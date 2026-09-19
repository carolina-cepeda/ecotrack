import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, className = "", value, onChange, ...props }: TextareaProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 ${error ? "border-red-500 focus:ring-red-500" : ""} ${className}`}
        rows={4}
        {...props}
      />
      <div className="flex items-center justify-between">
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
