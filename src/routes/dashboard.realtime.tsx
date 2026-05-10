import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Wifi } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/realtime")({
  head: () => ({ meta: [{ title: "Real-Time · AI Insights Dashboard" }] }),
  component: Realtime,
});

const initial = [
  { id: 1, type: "info", text: "New prediction batch processed (842 records)", time: "now" },
  { id: 2, type: "warn", text: "Latency spike on inference pod #3", time: "12s" },
  { id: 3, type: "ok", text: "Healthcheck passed for all regions", time: "44s" },
];

function Realtime() {
  const [feed, setFeed] = useState(initial);
  const [cpu, setCpu] = useState(42);
  const [mem, setMem] = useState(61);
  const [net, setNet] = useState(78);

  useEffect(() => {
    const t = setInterval(() => {
      setCpu((v) => Math.max(10, Math.min(95, v + (Math.random() - 0.5) * 10)));
      setMem((v) => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 6)));
      setNet((v) => Math.max(20, Math.min(99, v + (Math.random() - 0.5) * 8)));
      setFeed((f) => [
        {
          id: Date.now(),
          type: ["info", "warn", "ok"][Math.floor(Math.random() * 3)],
          text: ["Inference completed", "New session started", "Model retrained slice", "Anomaly cleared"][Math.floor(Math.random() * 4)],
          time: "now",
        },
        ...f.slice(0, 9),
      ]);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Real-time monitoring</h1>
        <p className="text-sm text-muted-foreground">Live system health and event stream.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "CPU", icon: Cpu, val: cpu },
          { label: "Memory", icon: Database, val: mem },
          { label: "Network", icon: Wifi, val: net },
        ].map((m) => (
          <Card key={m.label} className="glass">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <m.icon className="h-4 w-4 text-primary" />
                  {m.label}
                </div>
                <span className="text-xl font-semibold">{Math.round(m.val)}%</span>
              </div>
              <Progress value={m.val} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" />Event stream</CardTitle>
          <Badge variant="outline" className="gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />Live</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feed.map((e) => (
              <li key={e.id} className="flex items-center gap-3 rounded-lg border p-3 animate-fade-in">
                {e.type === "warn" ? <AlertTriangle className="h-4 w-4 text-warning" /> : e.type === "ok" ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Activity className="h-4 w-4 text-primary" />}
                <span className="flex-1 text-sm">{e.text}</span>
                <span className="text-[11px] text-muted-foreground">{e.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
