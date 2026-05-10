export const kpis = [
  { key: "users", label: "Total Users", value: 48293, delta: 12.4, prefix: "" },
  { key: "predictions", label: "AI Predictions", value: 1284902, delta: 28.1, prefix: "" },
  { key: "sessions", label: "Active Sessions", value: 1842, delta: 4.7, prefix: "" },
  { key: "accuracy", label: "Model Accuracy", value: 96.4, delta: 1.2, prefix: "", suffix: "%" },
];

export const trendData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  predictions: Math.round(20000 + Math.sin(i / 3) * 6000 + i * 800 + Math.random() * 2000),
  users: Math.round(1200 + Math.cos(i / 4) * 300 + i * 25 + Math.random() * 150),
  accuracy: +(94 + Math.sin(i / 5) * 2 + Math.random()).toFixed(2),
}));

export const categoryData = [
  { name: "Education", value: 38 },
  { name: "Health", value: 27 },
  { name: "Nutrition", value: 18 },
  { name: "Protection", value: 11 },
  { name: "WASH", value: 6 },
];

export const regionData = [
  { region: "Sub-Saharan Africa", schools: 12420, children: 842000, risk: 0.62 },
  { region: "South Asia", schools: 9870, children: 1240000, risk: 0.48 },
  { region: "MENA", schools: 4310, children: 320000, risk: 0.55 },
  { region: "Latin America", schools: 3870, children: 410000, risk: 0.31 },
  { region: "East Asia", schools: 5200, children: 690000, risk: 0.27 },
];

export const heatmap = Array.from({ length: 7 }, (_, r) =>
  Array.from({ length: 24 }, (_, c) => ({
    d: r,
    h: c,
    v: Math.round(Math.random() * 100 + (c > 8 && c < 20 ? 60 : 0)),
  }))
);

export const activityFeed = [
  { id: 1, type: "prediction", text: "Risk model flagged 12 schools in Region 4", time: "2m ago" },
  { id: 2, type: "user", text: "Aisha joined as Analyst", time: "8m ago" },
  { id: 3, type: "alert", text: "Anomaly detected: nutrition supply chain", time: "21m ago" },
  { id: 4, type: "report", text: "Weekly humanitarian report generated", time: "1h ago" },
  { id: 5, type: "system", text: "Model v3.2 deployed (acc 96.4%)", time: "3h ago" },
];

export const insights = [
  {
    title: "Education access improving in Region 2",
    body: "Predicted +14% enrollment over next quarter based on resource allocation patterns.",
    tone: "success" as const,
  },
  {
    title: "Nutrition risk rising in Region 4",
    body: "Sentiment from field reports trending negative; recommend resource reallocation.",
    tone: "warning" as const,
  },
  {
    title: "Anomaly: WASH supply latency",
    body: "Delivery times increased 22% week-over-week. Investigate logistics provider.",
    tone: "danger" as const,
  },
];

export const users = [
  { name: "Aisha Khan", role: "Analyst", region: "South Asia", status: "Active" },
  { name: "Marcus Cole", role: "Admin", region: "Global", status: "Active" },
  { name: "Lina Haddad", role: "Researcher", region: "MENA", status: "Idle" },
  { name: "Diego Reyes", role: "Field Officer", region: "LATAM", status: "Active" },
  { name: "Mei Chen", role: "Engineer", region: "East Asia", status: "Offline" },
];
