import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, FileText, Pill, ShieldAlert, Upload } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { storage } from "@/services/storage";
import type { Prescription } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (user) setPrescriptions(storage.listPrescriptions(user.id));
  }, [user]);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return prescriptions.filter(
      (p) =>
        !t ||
        p.fileName.toLowerCase().includes(t) ||
        p.ocrText.toLowerCase().includes(t) ||
        p.medicines.some((m) => m.name.toLowerCase().includes(t))
    );
  }, [prescriptions, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All your past prescriptions in one place.
          </p>
        </div>
        <Link to="/app/upload">
          <Button className="shadow-emerald">
            <Upload className="mr-2 h-4 w-4" /> Upload new
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by file, medicine, or text..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl py-16 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            {prescriptions.length === 0
              ? "No prescriptions uploaded yet."
              : "No matches for your search."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to="/app/analysis/$id"
              params={{ id: p.id }}
              className="glass group rounded-2xl p-5 transition-all hover:shadow-emerald"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-mint">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                {p.interactions.length > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold text-warning">
                    <ShieldAlert className="h-3 w-3" />
                    {p.interactions.length}
                  </span>
                )}
              </div>
              <div className="mt-4 truncate font-medium">{p.fileName}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {new Date(p.uploadedAt).toLocaleDateString()}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.medicines.slice(0, 3).map((m, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px]"
                  >
                    <Pill className="h-3 w-3" /> {m.name}
                  </span>
                ))}
                {p.medicines.length > 3 && (
                  <span className="text-[11px] text-muted-foreground">
                    +{p.medicines.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
