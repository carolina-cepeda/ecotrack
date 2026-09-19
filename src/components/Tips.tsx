/**
 * EcoTrack - Tips Component
 * Displays brief suggestions for reducing carbon emissions
 * based on detected activity categories.
 *
 * Props:
 *  - tips: array of tip strings to display
 */
 import { ReactElement } from "react";

 export interface TipsProps {
   tips: string[];
 }

 export const Tips: ReactElement<TipsProps> = ({ tips }) => {
   if (tips.length === 0) {
     return null;
   }

   return (
     <div className="mt-6 p-4 rounded-lg bg-green-50 border-l-4 border-green-500">
       <h4 className="font-medium text-green-800 mb-2">💡 Consejos para reducir tu huella:</h4>
       <ul className="text-sm text-green-700 space-y-1">
         {tips.map((tip, index) => (
           <li key={index}>{tip}</li>
         ))}
       </ul>
     </div>
   );
 };