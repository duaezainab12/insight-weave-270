import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Search, FileText, Smile, Frown, Meh } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/insights")({
  head: () => ({ meta: [{ title: "AI Insights · AI Insights Dashboard" }] }),
  component: Insights,
});

function Insights() {
  const [text, setText] = useState(
    "Field reports from Region 4 indicate continued strain on nutrition supplies. Despite progress in education, healthcare access remains uneven. Logistics partners are showing improvement, though delivery times have crept up over the past two weeks."
  );
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState<{ label: string; score: number } | null>(null);
  const [query, setQuery] = useState("");

  const summarize = () => {
    setSummary(
      "Nutrition supply remains constrained in Region 4, with rising delivery times despite logistics gains. Education shows progress while healthcare access is inconsistent."
    );
    const lower = text.toLowerCase();
    const neg = (lower.match(/strain|crept|uneven|risk|drop/g) || []).length;
    const pos = (lower.match(/progress|improve|gain/g) || []).length;
    const score = Math.max(-1, Math.min(1, (pos - neg) / 5));
    setSentiment({ label: score > 0.1 ? "Positive" : score < -0.1 ? "Negative" : "Neutral", score });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Insights</h1>
        <p className="text-sm text-muted-foreground">Summarization, sentiment, and natural-language search.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />Text summarizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} />
            <Button onClick={summarize} className="bg-gradient-primary"><Sparkles className="mr-1.5 h-4 w-4" />Summarize</Button>
            {summary && (
              <div className="rounded-lg border bg-secondary/40 p-3 text-sm animate-fade-in">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Summary</p>
                {summary}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Smile className="h-4 w-4 text-primary" />Sentiment analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Run sentiment on the text above to detect tone.</p>
            {sentiment ? (
              <div className="flex items-center gap-3 rounded-lg border p-4 animate-fade-in">
                {sentiment.label === "Positive" ? <Smile className="h-8 w-8 text-success" /> : sentiment.label === "Negative" ? <Frown className="h-8 w-8 text-destructive" /> : <Meh className="h-8 w-8 text-warning" />}
                <div>
                  <p className="font-semibold">{sentiment.label}</p>
                  <p className="text-xs text-muted-foreground">Score: {sentiment.score.toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                No analysis yet — click Summarize to compute.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search className="h-4 w-4 text-primary" />Natural language query</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try: "show schools at risk in South Asia last month"'
            />
            <Button className="bg-gradient-primary">Search</Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["risk schools South Asia", "top 5 categories", "nutrition trend", "anomalies last 7d"].map((s) => (
              <Badge key={s} variant="outline" className="cursor-pointer hover:bg-accent/30">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
