import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { auth } from "@/services/auth";

interface Ctx {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  signOut: () => void;
}

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserState(auth.current());
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser: (u) => setUserState(u),
        signOut: () => {
          auth.signOut();
          setUserState(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
