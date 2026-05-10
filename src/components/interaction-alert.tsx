import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { DrugInteraction } from "@/types";
import { cn } from "@/lib/utils";

const styles = {
  low: {
    bg: "bg-success/10 border-success/30",
    text: "text-success",
    label: "Low risk",
    icon: ShieldCheck,
  },
  medium: {
    bg: "bg-warning/10 border-warning/40",
    text: "text-warning",
    label: "Medium risk",
    icon: AlertTriangle,
  },
  high: {
    bg: "bg-destructive/10 border-destructive/40",
    text: "text-destructive",
    label: "High risk",
    icon: ShieldAlert,
  },
};

export function InteractionAlert({
  interaction,
  index,
}: {
  interaction: DrugInteraction;
  index: number;
}) {
  const s = styles[interaction.severity];
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={cn("rounded-2xl border p-4", s.bg)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.text)} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium capitalize">
              {interaction.drugs[0]} ↔ {interaction.drugs[1]}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                s.bg,
                s.text
              )}
            >
              {s.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground/80">{interaction.description}</p>
          <p className="mt-2 text-sm">
            <span className="font-medium">Recommendation: </span>
            {interaction.recommendation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
