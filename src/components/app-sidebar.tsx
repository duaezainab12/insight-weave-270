import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Activity,
  Globe2,
  Users,
  Settings,
  Brain,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const main = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Insights", url: "/dashboard/insights", icon: Sparkles },
  { title: "Real-Time", url: "/dashboard/realtime", icon: Activity },
  { title: "Humanitarian", url: "/dashboard/humanitarian", icon: Globe2 },
];
const admin = [
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => path === url;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">AI Insights</span>
            <span className="text-[10px] text-muted-foreground">Dashboard v3.2</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {admin.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
