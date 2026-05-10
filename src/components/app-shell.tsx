import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Pill,
  Upload,
  History,
  Bell,
  User,
  LogOut,
  Activity,
  Stethoscope,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Overview", icon: Activity, exact: true },
  { to: "/app/upload", label: "Upload", icon: Upload },
  { to: "/app/reminders", label: "Reminders", icon: Bell },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/profile", label: "Profile", icon: User },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <div className="flex min-h-screen w-full bg-background bg-hero">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar text-sidebar-foreground transition-transform md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-mint shadow-mint">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold tracking-tight">
              MedVision <span className="text-mint">AI</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-mint/70">
              Healthcare Intelligence
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-sidebar-accent text-mint shadow-soft"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-2">
            <Avatar className="h-9 w-9 ring-2 ring-mint/30">
              <AvatarFallback className="bg-gradient-mint text-primary text-xs font-semibold">
                {user?.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user?.name}</div>
              <div className="truncate text-[11px] capitalize text-mint/70">
                {user?.role}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/70 hover:text-mint"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Welcome back, <span className="text-foreground">{user?.name}</span>
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
