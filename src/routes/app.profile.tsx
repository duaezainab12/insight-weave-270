import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Stethoscope, Save } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/services/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "patient");

  if (!user) return null;

  const save = () => {
    const next = auth.updateProfile({ name, role });
    if (next) setUser(next);
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-4 ring-mint/30">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-display text-xl font-semibold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>Role</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <RoleCard
                active={role === "patient"}
                icon={<User className="h-5 w-5" />}
                label="Patient"
                desc="Track my prescriptions"
                onClick={() => setRole("patient")}
              />
              <RoleCard
                active={role === "doctor"}
                icon={<Stethoscope className="h-5 w-5" />}
                label="Doctor"
                desc="Manage patient records"
                onClick={() => setRole("doctor")}
              />
            </div>
          </div>
          <Button onClick={save} className="shadow-emerald">
            <Save className="mr-2 h-4 w-4" /> Save changes
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold">Privacy & data</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          MedVision AI stores prescription data locally in your browser by default. Connect
          a backend (Lovable Cloud or Firebase) to sync across devices and enable encrypted
          cloud storage.
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  active,
  icon,
  label,
  desc,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition-all ${
        active
          ? "border-primary bg-mint/30 shadow-mint"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            active ? "bg-gradient-mint text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}
