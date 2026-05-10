import type { Prescription, Reminder, User } from "@/types";

const KEYS = {
  user: "mv_user",
  prescriptions: "mv_prescriptions",
  reminders: "mv_reminders",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  // user
  getUser: () => read<User | null>(KEYS.user, null),
  setUser: (u: User | null) =>
    u ? write(KEYS.user, u) : localStorage.removeItem(KEYS.user),

  // prescriptions
  listPrescriptions: (userId: string) =>
    read<Prescription[]>(KEYS.prescriptions, []).filter((p) => p.userId === userId),
  getPrescription: (id: string) =>
    read<Prescription[]>(KEYS.prescriptions, []).find((p) => p.id === id) ?? null,
  savePrescription: (p: Prescription) => {
    const all = read<Prescription[]>(KEYS.prescriptions, []);
    const idx = all.findIndex((x) => x.id === p.id);
    if (idx >= 0) all[idx] = p;
    else all.unshift(p);
    write(KEYS.prescriptions, all);
  },
  deletePrescription: (id: string) => {
    const all = read<Prescription[]>(KEYS.prescriptions, []).filter((p) => p.id !== id);
    write(KEYS.prescriptions, all);
  },

  // reminders
  listReminders: (userId: string) => {
    const ps = read<Prescription[]>(KEYS.prescriptions, [])
      .filter((p) => p.userId === userId)
      .map((p) => p.id);
    return read<Reminder[]>(KEYS.reminders, []).filter((r) =>
      ps.includes(r.prescriptionId)
    );
  },
  saveReminder: (r: Reminder) => {
    const all = read<Reminder[]>(KEYS.reminders, []);
    const idx = all.findIndex((x) => x.id === r.id);
    if (idx >= 0) all[idx] = r;
    else all.push(r);
    write(KEYS.reminders, all);
  },
  deleteReminder: (id: string) => {
    write(
      KEYS.reminders,
      read<Reminder[]>(KEYS.reminders, []).filter((r) => r.id !== id)
    );
  },
};
