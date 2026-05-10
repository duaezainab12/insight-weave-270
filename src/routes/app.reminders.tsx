import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bell, Check, Trash2, Clock, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { storage } from "@/services/storage";
import type { Reminder } from "@/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reminders")({
  component: RemindersPage,
});

function RemindersPage() {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const refresh = () => {
    if (user) setReminders(storage.listReminders(user.id));
  };

  useEffect(() => {
    refresh();
  }, [user]);

  const today = new Date().toISOString().slice(0, 10);

  const todaySchedule = useMemo(() => {
    const items: { reminder: Reminder; time: string; key: string }[] = [];
    reminders
      .filter((r) => r.active && r.startDate <= today && today <= r.endDate)
      .forEach((r) => {
        r.times.forEach((t) => items.push({ reminder: r, time: t, key: `${today}|${t}` }));
      });
    return items.sort((a, b) => a.time.localeCompare(b.time));
  }, [reminders, today]);

  const toggleTaken = (r: Reminder, key: string) => {
    const updated: Reminder = {
      ...r,
      taken: { ...r.taken, [key]: !r.taken[key] },
    };
    storage.saveReminder(updated);
    refresh();
  };

  const toggleActive = (r: Reminder) => {
    storage.saveReminder({ ...r, active: !r.active });
    refresh();
  };

  const remove = (id: string) => {
    storage.deleteReminder(id);
    toast.success("Reminder removed");
    refresh();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Reminders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your daily medication and stay on schedule.
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Today's schedule</h2>
        {todaySchedule.length === 0 ? (
          <div className="glass rounded-2xl py-10 text-center">
            <Clock className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              No reminders scheduled for today.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {todaySchedule.map((s, i) => {
              const taken = !!s.reminder.taken[s.key];
              return (
                <motion.div
                  key={s.reminder.id + s.time}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`glass flex items-center gap-4 rounded-2xl p-4 transition-all ${
                    taken ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-mint">
                    <span className="text-[10px] uppercase tracking-wider text-primary/70">
                      {s.time.split(":")[0] >= "12" ? "PM" : "AM"}
                    </span>
                    <span className="font-display text-sm font-semibold text-primary">
                      {s.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${taken ? "line-through text-muted-foreground" : ""}`}
                    >
                      {s.reminder.medicineName}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.reminder.dosage}</div>
                  </div>
                  <Button
                    size="sm"
                    variant={taken ? "outline" : "default"}
                    onClick={() => toggleTaken(s.reminder, s.key)}
                  >
                    <Check className="mr-1 h-3.5 w-3.5" />
                    {taken ? "Taken" : "Mark taken"}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">All reminders</h2>
        {reminders.length === 0 ? (
          <div className="glass rounded-2xl py-10 text-center">
            <Bell className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              No reminders yet. Create some from a prescription analysis.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {reminders.map((r) => (
              <div key={r.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    <span className="font-medium">{r.medicineName}</span>
                  </div>
                  <Switch checked={r.active} onCheckedChange={() => toggleActive(r)} />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {r.dosage} · {r.times.join(", ")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {r.startDate} → {r.endDate}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-3 h-7 px-2 text-destructive hover:text-destructive"
                  onClick={() => remove(r.id)}
                >
                  <Trash2 className="mr-1 h-3 w-3" /> Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
