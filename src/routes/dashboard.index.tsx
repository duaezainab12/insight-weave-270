import { createFileRoute } from "@tanstack/react-router";
import { Activity, Brain, Download, Sparkles, Users } from "lucide-react";
import { KpiCard } from "@/components/kpi-card";
import { AccuracyBar, CategoryPie, Heatmap, TrendChart } from "@/components/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { activityFeed, insights, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview · AI Insights Dashboard" }] }),
  component: Overview,
});

const icons = [Users, Brain, Activity, Sparkles];

function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">Realtime snapshot of your AI ecosystem.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Export PDF</Button>
          <Button size="sm" className="bg-gradient-primary"><Download className="mr-1.5 h-3.5 w-3.5" />CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = icons[i];
          return (
            <KpiCard
              key={k.key}
              label={k.label}
              value={k.value}
              delta={k.delta}
              suffix={k.suffix}
              icon={<Icon className="h-5 w-5" />}
              delay={i * 80}
            />
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Predictions & user trend</CardTitle>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <Badge variant="outline" className="gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />Live</Badge>
          </CardHeader>
          <CardContent><TrendChart /></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By category</CardTitle>
            <p className="text-xs text-muted-foreground">Programme distribution</p>
          </CardHeader>
          <CardContent><CategoryPie /></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Model accuracy</CardTitle>
            <p className="text-xs text-muted-foreground">Rolling 12-day window</p>
          </CardHeader>
          <CardContent><AccuracyBar /></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />AI-generated insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((i) => (
              <div key={i.title} className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (i.tone === "success" ? "bg-success" : i.tone === "warning" ? "bg-warning" : "bg-destructive")
                    }
                  />
                  <p className="text-sm font-medium">{i.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{i.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity heatmap</CardTitle>
            <p className="text-xs text-muted-foreground">Predictions per hour, last 7 days</p>
          </CardHeader>
          <CardContent><Heatmap /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Activity feed</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-gradient-primary" />
                <div className="flex-1">
                  <p className="text-sm">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
