import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trendData, categoryData, heatmap } from "@/lib/mock-data";

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--popover-foreground)",
    fontSize: 12,
  },
} as const;

export function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={trendData}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="predictions" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
        <Area type="monotone" dataKey="users" stroke="var(--chart-2)" strokeWidth={2} fill="url(#g2)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CategoryPie() {
  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Tooltip {...tooltipStyle} />
        <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
          {categoryData.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} stroke="var(--background)" strokeWidth={2} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function AccuracyBar() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={trendData.slice(-12)}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis domain={[90, 100]} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="accuracy" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Heatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex gap-1 pl-10 mb-1">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="w-4 text-center text-[9px] text-muted-foreground">
              {i % 4 === 0 ? i : ""}
            </div>
          ))}
        </div>
        {heatmap.map((row, r) => (
          <div key={r} className="flex items-center gap-1 mb-1">
            <div className="w-10 text-[10px] text-muted-foreground">{days[r]}</div>
            {row.map((cell, c) => {
              const opacity = Math.min(1, cell.v / 140 + 0.08);
              return (
                <div
                  key={c}
                  className="h-4 w-4 rounded-[3px] transition-transform hover:scale-125"
                  style={{ backgroundColor: `color-mix(in oklab, var(--chart-1) ${opacity * 100}%, transparent)` }}
                  title={`${days[r]} ${c}:00 — ${cell.v}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
