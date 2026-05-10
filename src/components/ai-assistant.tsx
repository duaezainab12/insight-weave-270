import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const suggestions = [
  "Summarize this week's performance",
  "Which region has highest risk?",
  "Explain accuracy drop on Day 18",
  "Recommend resource reallocation",
];

const canned: Record<string, string> = {
  default:
    "Based on the latest data, predictions are up 28.1% week-over-week with 96.4% model accuracy. Sub-Saharan Africa shows the highest humanitarian risk score (0.62) — I recommend prioritizing nutrition and WASH supply chains there.",
};

interface Msg { role: "user" | "assistant"; content: string }

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your AI Insights assistant. Ask me anything about your dashboard." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: canned.default }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-glow transition-transform hover:scale-110",
          open && "hidden"
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)] origin-bottom-right rounded-2xl glass shadow-card transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Assistant</p>
              <p className="text-[11px] text-muted-foreground">Context-aware · Always-on</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-80 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  m.role === "user"
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the assistant..."
              className="h-9"
            />
            <Button type="submit" size="icon" className="h-9 w-9 bg-gradient-primary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
