export interface DetectedActivity {
  activity: string;
  category: string;
  quantity: number;
  unit: string;
  factor: number;
  estimatedCo2: number;
  rawMatch: string;
}

export interface AnalysisResult {
  activities: DetectedActivity[];
  totalCo2: number;
  tips: string[];
}

export interface AnalysisInput {
  text: string;
}

interface EmissionRule {
  category: string;
  labels: string[];
  factor: number;
  unitLabel: string;
}

const RULES: EmissionRule[] = [
  {
    category: "Transporte",
    labels: ["camioneta", "camionetas", "furgoneta", "furgonetas", "coche", "autos", "auto", "moto", "bus", "tren", "avión", "avion", "vehículo", "vehiculos", "transporte"],
    factor: 0.2,
    unitLabel: "vehículo",
  },
  {
    category: "Energía",
    labels: ["kwh", "kwh de luz", "kwh de electricidad", "kwh electricidad", "kwh luz", "electricidad", "luz", "gas", "energía", "energia"],
    factor: 0.42,
    unitLabel: "kWh",
  },
  {
    category: "Residuos",
    labels: ["bolsa", "bolsas", "basura", "residuo", "residuos", "reciclaje", "desecho", "desechos", "papel", "plástico", "plastico"],
    factor: 0.05,
    unitLabel: "bolsa",
  },
  {
    category: "Otros",
    labels: ["envío", "envios", "refrigeración", "refrigeracion", "papel", "compra", "compras"],
    factor: 0.15,
    unitLabel: "operación",
  },
];

function normalizeText(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function extractQuantityNear(text: string, keyword: string, maxDistance = 30): number {
  const idx = text.toLowerCase().search(keyword);
  if (idx === -1) return 1;
  const start = Math.max(0, idx - maxDistance);
  const window = text.slice(start, idx);
  const matches = window.match(/(\d+(?:[.,]\d+)?)\s*$/);
  if (!matches) return 1;
  return Number(matches[1].replace(",", "."));
}

function detectActivities(text: string): DetectedActivity[] {
  const normalized = normalizeText(text);
  const results: DetectedActivity[] = [];

  for (const rule of RULES) {
    for (const label of rule.labels) {
      const pattern = label.replace(/[^a-z0-9]+/g, "\\s*");
      const regex = new RegExp(pattern, "i");
      if (regex.test(normalized)) {
        const match = normalized.match(regex);
        const matchedWord = match ? match[0] : label;
        const quantity = extractQuantityNear(text, matchedWord);
        results.push({
          activity: matchedWord,
          category: rule.category,
          quantity,
          unit: rule.unitLabel,
          factor: rule.factor,
          estimatedCo2: Math.round(rule.factor * quantity * 100) / 100,
          rawMatch: matchedWord,
        });
        break;
      }
    }
  }

  const seen = new Set<string>();
  return results.filter((r) => {
    const key = `${r.category}-${r.activity}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function calculateTotal(activities: DetectedActivity[]): number {
  return activities.reduce((sum, act) => sum + act.estimatedCo2, 0);
}

function getTipsByCategories(categories: Set<string>): string[] {
  const tips: string[] = [];
  if (categories.has("Transporte")) {
    tips.push("Consolida rutas de reparto y evalúa vehículos eléctricos o compartidos.");
  }
  if (categories.has("Energía")) {
    tips.push("Revisa consumo fuera de horario pico y migra a iluminación LED eficiente.");
  }
  if (categories.has("Residuos")) {
    tips.push("Implementa separación de residuos y reduce materiales de un solo uso.");
  }
  if (categories.has("Otros")) {
    tips.push("Optimiza procesos operativos y prefiere proveedores con certificaciones ambientales.");
  }
  if (tips.length === 0) {
    tips.push("🌱 Cada pequeño cambio cuenta. Comienza por una acción sostenible esta semana.");
  }
  return tips.slice(0, 3);
}

export function analyzeText(input: AnalysisInput): AnalysisResult {
  const activities = detectActivities(input.text);
  const total = calculateTotal(activities);
  const categories = new Set(activities.map((a) => a.category));
  const tips = getTipsByCategories(categories);
  return {
    activities,
    totalCo2: Math.round(total * 100) / 100,
    tips,
  };
}
