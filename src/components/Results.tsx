/**
 * EcoTrack - Results Component
 * Displays the carbon footprint calculation results
 * with activity breakdown and total.
 *
 * Props:
 *  - activities: array of detected activities with emissions
 *  - totalCo2: total estimated CO2 in kg
 *  - onReset: optional callback to reset the form
 */
 import { ReactElement } from "react";

 export interface ActivityResult {
   activity: string;
   category: string;
   estimatedCo2: number;
   rawMatch: string;
 }

 export interface ResultsProps {
   activities: ActivityResult[];
   totalCo2: number;
   onReset?: () => void;
 }

 export const Results: ReactElement<ResultsProps> = ({
   activities,
   totalCo2,
   onReset,
 }) => {
   const categoriesMap: Record<string, string> = {
     food: "Alimentación",
     transport: "Transporte",
     energy: "Energía",
     goods: "Productos",
   };

   return (
     <div className="space-y-4">
       {/* Activity breakdown */}
       {activities.length > 0 ? (
         <div>
           <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
             Desglose por actividad
           </h3>
           <div className="mt-2 space-y-2">
             {activities.map((act, index) => (
               <div
                 key={index}
                 className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
               >
                 <span className="text-sm text-gray-700">{act.activity}</span>
                 <span className="text-sm font-medium text-primary-600">
                   {act.estimatedCo2} kg CO2
                 </span>
               </div>
             ))}
           </div>
         </div>
       ) : (
         <p className="text-sm text-gray-500">
           No se identificaron actividades específicas en tu texto.
         </p>
       )}

       {/* Total */}
       <div className="pt-4 border-t border-gray-200">
         <h3 className="text-lg font-bold text-gray-900">
           Huella de carbono total: {totalCo2} kg CO2
         </h3>
         <p className="text-sm text-gray-500">
           Estimación basada en factores de emisión simplificados.
         </p>
       </div>

       {/* Reset button */}
       {onReset && (
         <Button
           variant="outline"
           onClick={onReset}
           style={{ marginTop: "1rem" }}
         >
           Nueva entrada
         </Button>
       )}
     </div>
   );
 };