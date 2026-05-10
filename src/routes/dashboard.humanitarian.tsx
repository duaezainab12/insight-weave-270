import { createFileRoute } from "@tanstack/react-router";
import { Globe2, GraduationCap, HeartPulse, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { regionData } from "@/lib/mock-data";
import { TrendChart } from "@/components/charts";

export const Route = createFileRoute("/dashboard/humanitarian")({
  head: () => ({ meta: [{ title: "Humanitarian · AI Insights Dashboard" }] }),
  component: Humanitarian,
});

function Humanitarian() {
  const totalChildren = regionData.reduce((a, b) => a + b.children, 0);
  const totalSchools = regionData.reduce((a, b) => a + b.schools, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Globe2 className="h-6 w-6 text-primary" /> Humanitarian intelligence
          </h1>
          <p className="text-sm text-muted-foreground">Education, child welfare, and resource allocation insights.</p>
        </div>
        <Badge className="bg-gradient-primary">UNICEF-style demo</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass">
          <CardContent className="p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5" /> Schools tracked
            </div>
            <p className="text-3xl font-semibold">{totalSchools.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <HeartPulse className="h-3.5 w-3.5" /> Children reached
            </div>
            <p className="text-3xl font-semibold">{(totalChildren / 1_000_000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> AI risk model
            </div>
            <p className="text-3xl font-semibold">v3.2 · 96.4%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Region risk overview</CardTitle>
          <p className="text-xs text-muted-foreground">Composite score from education, nutrition, WASH and healthcare signals.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionData.map((r) => (
            <div key={r.region}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{r.region}</span>
                <span className="text-muted-foreground">
                  {r.schools.toLocaleString()} schools · {(r.children / 1000).toFixed(0)}K children · risk {(r.risk * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={r.risk * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource allocation forecast</CardTitle>
          <p className="text-xs text-muted-foreground">Predicted demand vs current capacity (next 30 days)</p>
        </CardHeader>
        <CardContent><TrendChart /></CardContent>
      </Card>
    </div>
  );
}
