import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings · AI Insights Dashboard" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Profile, notifications and integrations.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2"><Label>Display name</Label><Input defaultValue="Aisha Khan" /></div>
          <div className="grid gap-2"><Label>Email</Label><Input defaultValue="aisha@insights.ai" /></div>
          <Button className="bg-gradient-primary">Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            ["Email notifications", true],
            ["Weekly AI report", true],
            ["Anomaly alerts", true],
            ["Beta features", false],
          ].map(([l, v]) => (
            <div key={l as string} className="flex items-center justify-between">
              <Label className="font-normal">{l}</Label>
              <Switch defaultChecked={v as boolean} />
            </div>
          ))}
          <Separator />
          <p className="text-xs text-muted-foreground">Configured locally — connect Lovable Cloud to persist settings across devices.</p>
        </CardContent>
      </Card>
    </div>
  );
}
