import { Pill, AlertTriangle, RotateCcw, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Medicine } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { speak } from "@/services/ai";

export function MedicineCard({ medicine, index }: { medicine: Medicine; index: number }) {
  const text = `${medicine.name}. ${medicine.purpose}. Take ${medicine.dosage}, ${medicine.frequency} for ${medicine.duration}.`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-2xl p-5 shadow-soft hover:shadow-emerald transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-mint">
            <Pill className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">
              {medicine.name}
            </h3>
            <Badge variant="secondary" className="mt-1 text-[10px] uppercase tracking-wider">
              {medicine.category}
            </Badge>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => speak(text)}
          title="Read aloud"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{medicine.purpose}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3 text-center">
        <Stat label="Dose" value={medicine.dosage} />
        <Stat label="Frequency" value={medicine.frequency} />
        <Stat label="Duration" value={medicine.duration} />
      </div>

      <Section title="Side Effects" icon={<AlertTriangle className="h-3.5 w-3.5" />}>
        {medicine.sideEffects.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </Section>
      <Section title="Warnings" icon={<AlertTriangle className="h-3.5 w-3.5 text-warning" />}>
        {medicine.warnings.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </Section>
      <Section title="Alternatives" icon={<RotateCcw className="h-3.5 w-3.5" />}>
        {medicine.alternatives.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </Section>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {title}
      </div>
      <ul className="ml-1 list-inside list-disc space-y-0.5 text-sm text-foreground/80">
        {children}
      </ul>
    </div>
  );
}
