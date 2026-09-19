/**
 * EcoTrack - Carbon Footprint Analyzer
 * 
 * Module responsible for analyzing user-input text to identify activities
 * and estimate associated carbon emissions.
 * 
 * Follows clean code principles: pure functions, single responsibility,
 * and clear separation of concerns.
 */

 // --- Emission Factors Database ---
 // Simplified estimates in kg CO2 per unit/activity
 // These values are for demonstration purposes and should be replaced
 // with data from official sources (IPCC, EPA, etc.) for production use.
 
 interface EmissionFactor {
   category: "food" | "transport" | "energy" | "goods";
   activity: string;
   // kg CO2 per occurrence or per unit (km, portion, etc.)
   factor: number;
 }

 const EMISSION_FACTORS: EmissionFactor[] = [
   // Food categories
   { category: "food", activity: "carne", factor: 2.5 },
   { category: "food", activity: "pollo", factor: 1.9 },
   { category: "food", activity: "pescado", factor: 0.9 },
   { category: "food", activity: "vegetariano", factor: 0.5 },
   { category: "food", activity: "vegano", factor: 0.3 },

   // Transport categories (per km)
   { category: "transport", activity: "bus", factor: 0.15 },
   { category: "transport", activity: "tren", factor: 0.04 },
   { category: "transport", activity: "coche", factor: 0.2 },
   { category: "transport", activity: "moto", factor: 0.12 },
   { category: "transport", activity: "avion", factor: 0.25 },

   // Default fallback
   { category: "general", activity: "otro", factor: 1.0 },
 ];

 /**
  * Normalizes a string: lowercase, removes accents, trims whitespace.
  * Improves keyword matching reliability.
  */
 function normalizeText(text: string): string {
   return text
     .toLowerCase()
     .normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .trim();
 }

 /**
  * Detects activities from normalized text using keyword matching.
  * Returns an array of detected activity records with calculated emissions.
  */
 function detectActivities(text: string): Array<{
   activity: string;
   category: string;
   estimatedCo2: number;
   rawMatch: string;
 }> {
   const normalized = normalizeText(text);
   const results: Array<{
     activity: string;
     category: string;
     estimatedCo2: number;
     rawMatch: string;
   }> = [];

   // Search for each keyword in the normalized text
   for (const factor of EMISSION_FACTORS) {
     const regex = new RegExp(`\\b${factor.activity}\\b`, "i");
     if (regex.test(normalized)) {
       // Calculate estimated emissions: factor * presence (1 occurrence = factor)
       // In a real app, we could parse distances/quantities from the text
       const match = normalized.match(regex);
       const rawMatch = match ? match[0] : factor.activity;

       results.push({
         activity: factor.activity,
         category: factor.category,
         estimatedCo2: factor.factor,
         rawMatch,
       });
     }
   }

   // Remove duplicates if multiple factors match the same keyword group
   const seen = new Set<string>();
   return results.filter((r) => !seen.has(r.activity) && seen.add(r.activity));
 }

 /**
  * Calculates total carbon footprint from detected activities.
  */
 function calculateTotal(activities: Array<{ estimatedCo2: number }>): number {
   return activities.reduce((sum, act) => sum + act.estimatedCo2, 0);
 }

 /**
  * Generates user-friendly tips based on detected activity categories.
  */
 function getTipsByCategory(categories: Set<string>): string[] {
   const tips: string[] = [];

   if (categories.has("food")) {
     tips.push("💡 Consider reducing meat consumption; choose plant-based meals 2-3 times per week.");
   }
   if (categories.has("transport")) {
     tips.push("🚲 Opt for public transport, cycling, or walking for short distances.");
   }
   if (!categories.has("food") && !categories.has("transport")) {
     tips.push("🌱 Every small change counts! Try incorporating more vegetarian meals.");
   }

   return tips;
 }

 /**
 * Main analysis function.
 * Accepts raw user text, identifies activities, calculates emissions, and returns structured results.
 */
 export interface AnalysisResult {
   activities: Array<{
     activity: string;
     category: string;
     estimatedCo2: number;
     rawMatch: string;
   }>;
   totalCo2: number;
   tips: string[];
 }

 export interface AnalysisInput {
   text: string;
 }

 export function analyzeText(input: AnalysisInput): AnalysisResult {
   const detectedActivities = detectActivities(input.text);
   const total = calculateTotal(detectedActivities.map((a) => a));
   const categories = new Set(detectedActivities.map((a) => a.category));
   const tips = getTipsByCategory(categories);

   return {
     activities: detectedActivities,
     totalCo2: Math.round(total * 100) / 100, // Round to 2 decimal places
     tips,
   };
 }

 // --- Export types for external use ---
 export type { EmissionFactor };