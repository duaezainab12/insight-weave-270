import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Stethoscope,
  ScanLine,
  Brain,
  ShieldAlert,
  Bell,
  History,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedVision AI — Smarter, Safer Prescriptions" },
      {
        name: "description",
        content:
          "Upload any prescription and get instant AI-powered medicine explanations, interaction warnings, and patient-friendly summaries.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: ScanLine,
    title: "OCR Extraction",
    body: "Tesseract-powered text recognition turns blurry handwritten prescriptions into clean, structured data.",
  },
  {
    icon: Brain,
    title: "AI Medicine Insights",
    body: "Plain-language explanations, dosing, side effects, and alternatives — for every medicine.",
  },
  {
    icon: ShieldAlert,
    title: "Interaction Detection",
    body: "Identifies risky drug combinations with low / medium / high severity ratings before you take them.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    body: "Personalized medication schedules with daily tracking and notification-ready architecture.",
  },
  {
    icon: History,
    title: "Encrypted History",
    body: "Every prescription is stored, searchable, and downloadable as a patient report.",
  },
  {
    icon: Sparkles,
    title: "Voice Assistant",
    body: "Listen to your prescription summary read aloud with built-in text-to-speech.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background bg-hero">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-emerald">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-base font-semibold leading-none">
                MedVision <span className="text-primary">AI</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Healthcare Intelligence
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#trust" className="hover:text-foreground">Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="shadow-emerald">
                Get started <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <span className="flex h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
            HIPAA-ready architecture · Powered by AI
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Understand every prescription in
            <span className="text-gradient"> seconds.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            MedVision AI scans your prescription, explains every medicine in plain language,
            flags dangerous interactions, and builds a personalized medication plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" className="shadow-emerald">
                Analyze a prescription <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#how">
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            {["End-to-end encrypted", "No data shared", "Doctor & patient roles"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero card preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="glass overflow-hidden rounded-3xl shadow-emerald">
            <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
              <div className="rounded-2xl bg-muted/60 p-5">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Extracted prescription
                </div>
                <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90">
{`Dr. M. Rahman
Patient: Sarah K.
Date: 14/05/2026

Rx
1. Amoxicillin 500mg — 1 cap, 3x/day, 7 days
2. Paracetamol 500mg — 1 tab, every 6h prn
3. Omeprazole 20mg — 1 cap, before breakfast`}
                </pre>
                <div className="mt-3 flex items-center gap-2 text-xs text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 96% OCR confidence
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border bg-card p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                    AI Summary
                  </div>
                  <p className="mt-2 text-sm">
                    You have a 7-day course of antibiotics. Take Amoxicillin every 8 hours,
                    finish all doses. Use Paracetamol only when needed for fever or pain.
                    Omeprazole protects your stomach — take it 30 min before breakfast.
                  </p>
                </div>
                <div className="rounded-2xl border bg-warning/10 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-warning">
                    <ShieldAlert className="h-3.5 w-3.5" /> 1 interaction detected
                  </div>
                  <p className="mt-1.5 text-sm">
                    Paracetamol + alcohol may increase liver strain. Avoid alcohol during
                    treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Capabilities
          </div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            A complete medication intelligence layer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built like a real healthcare SaaS — modular, scalable, and production-ready.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 shadow-soft transition-shadow hover:shadow-emerald"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-mint">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Upload", b: "Drag and drop a prescription image or PDF." },
            { n: "02", t: "Analyze", b: "Our AI extracts text and structures every medicine." },
            { n: "03", t: "Act", b: "Get summaries, interaction alerts, and reminders." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="font-display text-5xl font-bold text-primary/20">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="mx-auto max-w-7xl px-6 py-24">
        <div className="glass rounded-3xl p-10 text-center shadow-emerald">
          <h2 className="font-display text-3xl font-semibold">
            Built with care. Designed for clinicians and patients.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Encrypted storage, role-based access for doctors and patients, and a strict
            no-sharing data policy. MedVision AI augments — it never replaces — your physician.
          </p>
          <Link to="/login" className="mt-6 inline-block">
            <Button size="lg" className="shadow-emerald">
              Try MedVision AI free
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} MedVision AI. For educational use.</div>
          <div>Not a substitute for professional medical advice.</div>
        </div>
      </footer>
    </div>
  );
}
