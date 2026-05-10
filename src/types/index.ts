export type UserRole = "patient" | "doctor";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
  sideEffects: string[];
  warnings: string[];
  alternatives: string[];
  category: string;
}

export interface DrugInteraction {
  drugs: [string, string];
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
}

export interface Prescription {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  doctorName?: string;
  patientName?: string;
  date?: string;
  ocrText: string;
  ocrConfidence: number;
  medicines: Medicine[];
  interactions: DrugInteraction[];
  summary: string;
  dailyInstructions: string[];
  status: "processing" | "complete" | "error";
}

export interface Reminder {
  id: string;
  prescriptionId: string;
  medicineName: string;
  dosage: string;
  times: string[]; // HH:mm
  startDate: string;
  endDate: string;
  taken: Record<string, boolean>; // key: date|time
  active: boolean;
}
