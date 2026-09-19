/**
 * EcoTrack - Textarea Component
 * Reusable textarea for user input with consistent styling.
 *
 * Props:
 *  - value: current text value
 *  - onChange: change handler
 *  - placeholder: optional placeholder text
 *  - disabled: whether textarea is disabled
 */
 import { ReactElement } from "react";

 export interface TextareaProps {
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
   disabled?: boolean;
 }

 export const Textarea: ReactElement = ({
   value,
   onChange,
   placeholder = "Describe tus actividades diarias (ej: 'Hoy comí carne y viajé 20km en bus')",
   disabled,
 }) => (
   <textarea
     value={value}
     onChange={(e) => onChange(e.target.value)}
     placeholder={placeholder}
     disabled={disabled}
     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
     rows={4}
     style={{
       fontFamily: "inherit",
       fontSize: "1rem",
       resize: "vertical",
     }}
   />
 );