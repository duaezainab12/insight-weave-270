import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Stethoscope,
  Volume2,
  Bell,
  Download,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { storage } from "@/services/storage";
import { speak, stopSpeaking } from "@/services/ai";
import type { Prescription, Reminder } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MedicineCard } from "@/components/medicine-card";
import { InteractionAlert } from "@/components/interaction-alert";
import { toast } from "sonner";

export const Route = createFileRoute("/app/analysis/$id")({
  component: AnalysisPage,
});

function AnalysisPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [p, setP] = useState<Prescription | null>(null);

  useEffect(() => {
    setP(storage.getPrescription(id));
    return () => stopSpeaking();
  }, [id]);

  if (!p) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-muted-foreground">Prescription not found.</p>
        <Link to="/app/history" className="mt-4 inline-block">
          <Button variant="outline">Back to history</Button>
        </Link>
      </div>
    );
  }

  const createReminders = () => {
    p.medicines.forEach((m) => {
      const r: Reminder = {
        id: crypto.randomUUID(),
        prescriptionId: p.id,
        medicineName: m.name,
        dosage: m.dosage,
        times: defaultTimes(m.frequency),
        startDate: new Date().toISOString().slice(0, 10),
        endDate: addDays(new Date(), parseDuration(m.duration))
          .toISOString()
          .slice(0, 10),
        taken: {},
        active: true,
      };
      storage.saveReminder(r);
    });
    toast.success(`Created ${p.medicines.length} reminder(s)`);
    navigate({ to: "/app/reminders" });
  };

  const downloadReport = () => {
    const text = buildReport(p);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medvision-${p.id.slice(0, 6)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = () => {
    if (!confirm("Delete this prescription?")) return;
    storage.deletePrescription(p.id);
    toast.success("Prescription deleted");
    navigate({ to: "/app/history" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/app/history" })}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => speak(p.summary)}>
            <Volume2 className="mr-1.5 h-4 w-4" /> Read aloud
          </Button>
          <Button variant="outline" size="sm" onClick={downloadReport}>
            <Download className="mr-1.5 h-4 w-4" /> Download
          </Button>
          <Button size="sm" onClick={createReminders} className="shadow-emerald">
            <Bell className="mr-1.5 h-4 w-4" /> Create reminders
          </Button>
          <Button variant="ghost" size="icon" onClick={remove}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 shadow-emerald"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Meta icon={User} label="Patient" value={p.patientName ?? "—"} />
          <Meta icon={Stethoscope} label="Doctor" value={p.doctorName ?? "—"} />
          <Meta
            icon={Calendar}
            label="Date"
            value={p.date ?? new Date(p.uploadedAt).toLocaleDateString()}
          />
        </div>
        <div className="mt-6 rounded-2xl bg-mint/30 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> AI Patient Summary
          </div>
          <p className="mt-2 text-foreground/90">{p.summary}</p>
        </div>
      </motion.div>

      <Tabs defaultValue="medicines">
        <TabsList>
          <TabsTrigger value="medicines">Medicines ({p.medicines.length})</TabsTrigger>
          <TabsTrigger value="interactions">
            Interactions ({p.interactions.length})
          </TabsTrigger>
          <TabsTrigger value="instructions">Daily plan</TabsTrigger>
          <TabsTrigger value="ocr">OCR text</TabsTrigger>
        </TabsList>

        <TabsContent value="medicines" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {p.medicines.map((m, i) => (
              <MedicineCard key={m.name + i} medicine={m} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="mt-4 space-y-3">
          {p.interactions.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-success" />
              <p className="mt-3 font-medium">No interactions detected</p>
              <p className="text-sm text-muted-foreground">
                Your prescribed medicines work safely together.
              </p>
            </div>
          ) : (
            p.interactions.map((i, idx) => (
              <InteractionAlert key={idx} interaction={i} index={idx} />
            ))
          )}
        </TabsContent>

        <TabsContent value="instructions" className="mt-4">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">Your daily plan</h3>
            <ul className="mt-4 space-y-3">
              {p.dailyInstructions.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-muted/50 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-mint text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="ocr" className="mt-4">
          <div className="glass rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Extracted text</h3>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                {p.ocrConfidence}% confidence
              </span>
            </div>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-muted/60 p-4 font-mono text-xs leading-relaxed">
              {p.ocrText || "(no text extracted)"}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <Icon className="h-5 w-5 text-primary" />
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium capitalize">{value}</div>
      </div>
    </div>
  );
}

function defaultTimes(freq: string): string[] {
  const f = freq.toLowerCase();
  if (f.includes("once") || f.includes("bedtime")) return ["21:00"];
  if (f.includes("twice")) return ["08:00", "20:00"];
  if (f.includes("three") || f.includes("8 hour")) return ["08:00", "14:00", "22:00"];
  return ["08:00", "20:00"];
}

function parseDuration(d: string): number {
  const m = d.match(/(\d+)/);
  return m ? parseInt(m[1]) : 7;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function buildReport(p: Prescription): string {
  return `MEDVISION AI — PRESCRIPTION REPORT
Generated: ${new Date().toLocaleString()}
File: ${p.fileName}

Patient: ${p.patientName ?? "—"}
Doctor:  ${p.doctorName ?? "—"}
Date:    ${p.date ?? new Date(p.uploadedAt).toLocaleDateString()}

═══ SUMMARY ═══
${p.summary}

═══ MEDICINES (${p.medicines.length}) ═══
${p.medicines
  .map(
    (m, i) => `
${i + 1}. ${m.name} (${m.category})
   Purpose: ${m.purpose}
   Dose: ${m.dosage} · ${m.frequency} · ${m.duration}
   Side effects: ${m.sideEffects.join(", ")}
   Warnings: ${m.warnings.join(", ")}
   Alternatives: ${m.alternatives.join(", ")}`
  )
  .join("\n")}

═══ INTERACTIONS (${p.interactions.length}) ═══
${
  p.interactions.length
    ? p.interactions
        .map(
          (i) =>
            `[${i.severity.toUpperCase()}] ${i.drugs[0]} ↔ ${i.drugs[1]}\n  ${i.description}\n  → ${i.recommendation}`
        )
        .join("\n\n")
    : "None detected."
}

═══ DAILY PLAN ═══
${p.dailyInstructions.map((d, i) => `${i + 1}. ${d}`).join("\n")}

This report is for informational purposes only and is not a substitute
for professional medical advice.`;
}
