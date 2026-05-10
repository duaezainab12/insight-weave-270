import type { User, UserRole } from "@/types";
import { storage } from "./storage";

// Mock auth — replace with Firebase / Lovable Cloud Auth.
export const auth = {
  current: () => storage.getUser(),
  signIn: async (email: string, _password: string): Promise<User> => {
    await new Promise((r) => setTimeout(r, 500));
    const user: User = {
      id: btoa(email).slice(0, 12),
      email,
      name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
      role: "patient",
    };
    storage.setUser(user);
    return user;
  },
  signInWithGoogle: async (): Promise<User> => {
    await new Promise((r) => setTimeout(r, 500));
    const user: User = {
      id: "google_demo",
      email: "demo@medvision.ai",
      name: "Demo User",
      role: "patient",
    };
    storage.setUser(user);
    return user;
  },
  signOut: () => storage.setUser(null),
  updateProfile: (patch: Partial<User>) => {
    const u = storage.getUser();
    if (!u) return null;
    const next = { ...u, ...patch };
    storage.setUser(next);
    return next;
  },
  setRole: (role: UserRole) => auth.updateProfile({ role }),
};
