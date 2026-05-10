import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number;
  delta: number;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function KpiCard({ label, value, delta, suffix, prefix, icon, delay = 0 }: KpiCardProps) {
  const positive = delta >= 0;
  return (
    <Card
      className="glass relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {prefix}
            {value.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            {suffix}
          </p>
          <div
            className={cn(
              "mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}% vs last week
          </div>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
