import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Pill,
  Bell,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { storage } from "@/services/storage";
import type { Prescription, Reminder } from "@/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/")({
  component: Overview,
});

function Overview() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (!user) return;
    setPrescriptions(storage.listPrescriptions(user.id));
    setReminders(storage.listReminders(user.id));
  }, [user]);

  const totalMeds = prescriptions.reduce((s, p) => s + p.medicines.length, 0);
  const totalInteractions = prescriptions.reduce((s, p) => s + p.interactions.length, 0);

  const stats = [
    { label: "Prescriptions", value: prescriptions.length, icon: FileText },
    { label: "Active Medicines", value: totalMeds, icon: Pill },
    { label: "Reminders", value: reminders.filter((r) => r.active).length, icon: Bell },
    { label: "Interactions Found", value: totalInteractions, icon: ShieldAlert },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your personal medication intelligence dashboard.
          </p>
        </div>
        <Link to="/app/upload">
          <Button className="shadow-emerald">
            <Upload className="mr-2 h-4 w-4" /> New prescription
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 font-display text-3xl font-semibold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent prescriptions</h2>
            <Link to="/app/history" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          {prescriptions.length === 0 ? (
            <Empty />
          ) : (
            <ul className="divide-y">
              {prescriptions.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    to="/app/analysis/$id"
                    params={{ id: p.id }}
                    className="flex items-center gap-4 py-3 hover:bg-muted/40 -mx-3 px-3 rounded-lg transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-mint">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{p.fileName}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(p.uploadedAt).toLocaleString()} ·{" "}
                        {p.medicines.length} medicine{p.medicines.length !== 1 && "s"}
                      </div>
                    </div>
                    {p.interactions.length > 0 && (
                      <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
                        {p.interactions.length} alert{p.interactions.length > 1 && "s"}
                      </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Health tips</h2>
          </div>
          <ul className="space-y-3 text-sm text-foreground/85">
            <li>💧 Drink a full glass of water with each medicine.</li>
            <li>⏰ Set reminders to maintain consistent dosing.</li>
            <li>🥗 Some medicines work better with or without food.</li>
            <li>📋 Always finish prescribed antibiotic courses.</li>
            <li>🩺 Consult your doctor for any unexpected side effects.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-xl border-2 border-dashed py-10 text-center">
      <Pill className="mx-auto h-10 w-10 text-muted-foreground/50" />
      <p className="mt-3 text-sm text-muted-foreground">
        No prescriptions yet. Upload one to get started.
      </p>
      <Link to="/app/upload" className="mt-4 inline-block">
        <Button size="sm" variant="outline">
          <Upload className="mr-2 h-3.5 w-3.5" /> Upload prescription
        </Button>
      </Link>
    </div>
  );
}
