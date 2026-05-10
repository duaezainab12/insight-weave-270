import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, ChartBar, Globe2, Shield, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Insights Dashboard — Real-time AI analytics for humanitarian impact" },
      {
        name: "description",
        content:
          "Production-grade AI dashboard with real-time analytics, sentiment analysis, and humanitarian intelligence. Built for modern teams.",
      },
      { property: "og:title", content: "AI Insights Dashboard" },
      { property: "og:description", content: "Real-time AI analytics for humanitarian impact." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: ChartBar, title: "Live Analytics", desc: "Real-time KPIs, trends, and heatmaps with sub-second updates." },
  { icon: Sparkles, title: "AI Insights", desc: "Summarization, sentiment, anomaly detection, NL search." },
  { icon: Globe2, title: "Humanitarian Module", desc: "Education, health, and resource allocation intelligence." },
  { icon: Shield, title: "Enterprise Security", desc: "RBAC, audit trails, encrypted secrets, SSO ready." },
  { icon: Zap, title: "Real-Time Engine", desc: "Streaming activity feed, alerts, and system health." },
  { icon: Brain, title: "Smart Assistant", desc: "Context-aware chat that explains your data instantly." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">AI Insights</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#humanitarian" className="hover:text-foreground">Humanitarian</a>
            <a href="#cta" className="hover:text-foreground">Get started</a>
          </div>
          <Button asChild size="sm" className="bg-gradient-primary">
            <Link to="/dashboard">
              Open Dashboard <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 text-center">
          <Badge variant="outline" className="mb-6 gap-1.5 border-primary/30 bg-primary/5 text-primary">
            <Sparkles className="h-3 w-3" /> v3.2 · Now with humanitarian intelligence
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            The <span className="text-gradient">AI dashboard</span> for teams that move the world forward.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            Real-time analytics, predictive insights, and an always-on AI assistant — designed for humanitarian
            organizations, AI startups, and modern enterprises.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/dashboard">
                Launch Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#features">See features</a>
            </Button>
          </div>

          {/* Preview window */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-2xl border bg-card p-2 shadow-card">
              <div className="rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8">
                <div className="grid gap-4 md:grid-cols-4">
                  {["Users", "Predictions", "Sessions", "Accuracy"].map((l, i) => (
                    <div key={l} className="rounded-lg border bg-card p-4 text-left animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <p className="text-xs text-muted-foreground">{l}</p>
                      <p className="mt-1 text-2xl font-semibold">{["48.2K", "1.28M", "1,842", "96.4%"][i]}</p>
                      <div className="mt-2 h-1 rounded-full bg-gradient-primary opacity-80" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything you need, beautifully integrated</h2>
            <p className="mt-3 text-muted-foreground">From raw data to actionable insight in seconds.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-card animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Humanitarian */}
      <section id="humanitarian" className="border-t bg-mesh py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <Badge className="mb-4 bg-accent/15 text-accent-foreground">Humanitarian AI</Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Built for impact at <span className="text-gradient">global scale.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Visualize education access, child welfare metrics, and resource allocation. Predictive models surface
              risks before they escalate — so teams act faster, with clarity.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Education & enrollment analytics", "Child welfare risk scoring", "Nutrition supply anomaly detection", "Resource allocation predictions"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Region risk overview</p>
              <Badge variant="outline">Live</Badge>
            </div>
            <div className="space-y-3">
              {[
                ["Sub-Saharan Africa", 62],
                ["South Asia", 48],
                ["MENA", 55],
                ["Latin America", 31],
                ["East Asia", 27],
              ].map(([r, v]) => (
                <div key={r as string}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{r}</span>
                    <span className="text-muted-foreground">{v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="border-t py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to see it in action?</h2>
          <p className="mt-3 text-muted-foreground">Open the live dashboard with realistic demo data.</p>
          <Button asChild size="lg" className="mt-6 bg-gradient-primary shadow-glow">
            <Link to="/dashboard">
              Launch Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AI Insights Dashboard · Portfolio project
      </footer>
    </div>
  );
}
