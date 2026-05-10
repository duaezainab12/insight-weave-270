import { Bell, Moon, Search, Sun } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AIAssistant } from "@/components/ai-assistant";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/70 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search insights, users, regions..." className="h-9 pl-8" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-destructive p-0 text-[9px]">
            3
          </Badge>
        </Button>
        <Avatar className="h-8 w-8 ring-2 ring-primary/30">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">AI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
          <AIAssistant />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
