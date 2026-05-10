// AI service abstraction. Mock implementation that simulates an LLM extracting
// structured medicine data, interactions, and summaries from raw OCR text.
// Swap analyzePrescription() with a real call to Lovable AI Gateway / OpenAI / Gemini.

import type { DrugInteraction, Medicine } from "@/types";

const MEDICINE_DB: Record<string, Omit<Medicine, "dosage" | "frequency" | "duration">> = {
  paracetamol: {
    name: "Paracetamol",
    purpose: "Relieves mild to moderate pain and reduces fever.",
    sideEffects: ["Nausea", "Rash", "Liver issues with overdose"],
    warnings: ["Do not exceed 4g per day", "Avoid alcohol", "Caution with liver disease"],
    alternatives: ["Ibuprofen", "Aspirin"],
    category: "Analgesic",
  },
  amoxicillin: {
    name: "Amoxicillin",
    purpose: "Antibiotic used to treat bacterial infections.",
    sideEffects: ["Diarrhea", "Nausea", "Allergic rash"],
    warnings: ["Complete the full course", "Inform doctor of penicillin allergy"],
    alternatives: ["Azithromycin", "Cephalexin"],
    category: "Antibiotic",
  },
  ibuprofen: {
    name: "Ibuprofen",
    purpose: "Reduces inflammation, pain, and fever.",
    sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
    warnings: ["Take with food", "Avoid in kidney disease", "May increase bleeding risk"],
    alternatives: ["Paracetamol", "Naproxen"],
    category: "NSAID",
  },
  metformin: {
    name: "Metformin",
    purpose: "Controls blood sugar in type 2 diabetes.",
    sideEffects: ["GI upset", "Metallic taste", "Vitamin B12 deficiency"],
    warnings: ["Avoid in kidney impairment", "Hold before contrast imaging"],
    alternatives: ["Glipizide", "Sitagliptin"],
    category: "Antidiabetic",
  },
  atorvastatin: {
    name: "Atorvastatin",
    purpose: "Lowers cholesterol and reduces cardiovascular risk.",
    sideEffects: ["Muscle pain", "Headache", "Elevated liver enzymes"],
    warnings: ["Report unexplained muscle pain", "Avoid grapefruit juice"],
    alternatives: ["Rosuvastatin", "Simvastatin"],
    category: "Statin",
  },
  omeprazole: {
    name: "Omeprazole",
    purpose: "Reduces stomach acid for ulcers and reflux.",
    sideEffects: ["Headache", "Diarrhea", "Long-term: B12/Mg deficiency"],
    warnings: ["Long-term use linked to bone fractures"],
    alternatives: ["Pantoprazole", "Ranitidine"],
    category: "PPI",
  },
  amlodipine: {
    name: "Amlodipine",
    purpose: "Lowers high blood pressure and treats angina.",
    sideEffects: ["Ankle swelling", "Flushing", "Dizziness"],
    warnings: ["Avoid grapefruit", "Rise slowly to prevent dizziness"],
    alternatives: ["Lisinopril", "Losartan"],
    category: "Calcium Channel Blocker",
  },
  azithromycin: {
    name: "Azithromycin",
    purpose: "Antibiotic for respiratory and skin infections.",
    sideEffects: ["Nausea", "Diarrhea", "QT prolongation"],
    warnings: ["Caution with heart rhythm disorders"],
    alternatives: ["Amoxicillin", "Doxycycline"],
    category: "Antibiotic",
  },
  cetirizine: {
    name: "Cetirizine",
    purpose: "Relieves allergy symptoms (sneezing, itching, runny nose).",
    sideEffects: ["Drowsiness", "Dry mouth"],
    warnings: ["May impair driving"],
    alternatives: ["Loratadine", "Fexofenadine"],
    category: "Antihistamine",
  },
};

const INTERACTIONS: DrugInteraction[] = [
  {
    drugs: ["ibuprofen", "amlodipine"],
    severity: "medium",
    description: "NSAIDs may reduce the antihypertensive effect of amlodipine.",
    recommendation: "Monitor blood pressure if used together for more than a few days.",
  },
  {
    drugs: ["atorvastatin", "azithromycin"],
    severity: "high",
    description: "Increased risk of muscle damage (rhabdomyolysis) when combined.",
    recommendation: "Avoid combination if possible; consult prescriber immediately.",
  },
  {
    drugs: ["metformin", "ibuprofen"],
    severity: "low",
    description: "Slight risk of impaired kidney function affecting metformin clearance.",
    recommendation: "Stay well hydrated and monitor kidney function periodically.",
  },
  {
    drugs: ["omeprazole", "amoxicillin"],
    severity: "low",
    description: "Often co-prescribed (e.g. H. pylori). No major concern.",
    recommendation: "Take as directed.",
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fakeSchedule(): Pick<Medicine, "dosage" | "frequency" | "duration"> {
  return {
    dosage: pick(["250 mg", "500 mg", "1 tablet", "10 mg", "5 ml"]),
    frequency: pick([
      "Once daily",
      "Twice daily",
      "Three times daily",
      "Every 8 hours",
      "At bedtime",
    ]),
    duration: pick(["5 days", "7 days", "10 days", "14 days", "Ongoing"]),
  };
}

export interface AnalysisResult {
  medicines: Medicine[];
  interactions: DrugInteraction[];
  summary: string;
  dailyInstructions: string[];
  doctorName?: string;
  patientName?: string;
  date?: string;
}

export async function analyzePrescription(ocrText: string): Promise<AnalysisResult> {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 900));

  const lower = ocrText.toLowerCase();
  const detectedKeys = Object.keys(MEDICINE_DB).filter((k) => lower.includes(k));

  // Always show at least 2 medicines for demo coherence
  const keys =
    detectedKeys.length >= 2
      ? detectedKeys
      : Array.from(
          new Set([
            ...detectedKeys,
            ...["amoxicillin", "paracetamol", "omeprazole"].slice(
              0,
              3 - detectedKeys.length
            ),
          ])
        );

  const medicines: Medicine[] = keys.map((k) => ({
    ...MEDICINE_DB[k],
    ...fakeSchedule(),
  }));

  const interactions = INTERACTIONS.filter(
    (i) => keys.includes(i.drugs[0]) && keys.includes(i.drugs[1])
  );

  const summary =
    `Your prescription includes ${medicines.length} medicine${medicines.length > 1 ? "s" : ""}: ` +
    medicines.map((m) => m.name).join(", ") +
    ". " +
    (interactions.length
      ? `We detected ${interactions.length} potential interaction${interactions.length > 1 ? "s" : ""} you should be aware of. `
      : "No significant drug interactions were detected. ") +
    "Take each medicine as instructed, complete the full course where indicated, and contact your doctor if you experience unusual symptoms.";

  const dailyInstructions = medicines.flatMap((m) => [
    `${m.name} ${m.dosage} — ${m.frequency} for ${m.duration}.`,
  ]);

  // Try to pull doctor/patient/date heuristically
  const doctorMatch = ocrText.match(/dr\.?\s+([a-z][a-z\s.]{2,30})/i);
  const patientMatch = ocrText.match(/(?:name|patient)[:\s]+([a-z][a-z\s.]{2,30})/i);
  const dateMatch = ocrText.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/);

  return {
    medicines,
    interactions,
    summary,
    dailyInstructions,
    doctorName: doctorMatch?.[1]?.trim(),
    patientName: patientMatch?.[1]?.trim(),
    date: dateMatch?.[1],
  };
}

export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
