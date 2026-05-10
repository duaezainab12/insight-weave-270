import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { users } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/users")({
  head: () => ({ meta: [{ title: "Users · AI Insights Dashboard" }] }),
  component: Users,
});

function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">Manage team members and roles.</p>
        </div>
        <Button className="bg-gradient-primary"><Plus className="mr-1.5 h-4 w-4" />Invite</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Team</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {u.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-muted-foreground">{u.region}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        u.status === "Active" ? "border-success/40 text-success" :
                        u.status === "Idle" ? "border-warning/40 text-warning" :
                        "border-muted text-muted-foreground"
                      }
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
