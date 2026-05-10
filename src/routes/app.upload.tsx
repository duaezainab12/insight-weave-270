import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ScanLine, Brain } from "lucide-react";
import { FileDropzone } from "@/components/file-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { extractText } from "@/services/ocr";
import { analyzePrescription } from "@/services/ai";
import { storage } from "@/services/storage";
import { useAuth } from "@/hooks/use-auth";
import type { Prescription } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/app/upload")({
  component: UploadPage,
});

type Stage = "idle" | "ocr" | "ai" | "done";

function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [ocrText, setOcrText] = useState("");

  const run = async () => {
    if (!file || !user) return;
    setStage("ocr");
    setProgress(0);
    setOcrText("");
    try {
      const ocr = await extractText(file, (p) => setProgress(p));
      setOcrText(ocr.text);

      setStage("ai");
      const analysis = await analyzePrescription(ocr.text);

      const id = crypto.randomUUID();
      const fileUrl = URL.createObjectURL(file);
      const prescription: Prescription = {
        id,
        userId: user.id,
        fileName: file.name,
        fileUrl,
        uploadedAt: new Date().toISOString(),
        ocrText: ocr.text,
        ocrConfidence: ocr.confidence,
        medicines: analysis.medicines,
        interactions: analysis.interactions,
        summary: analysis.summary,
        dailyInstructions: analysis.dailyInstructions,
        doctorName: analysis.doctorName,
        patientName: analysis.patientName,
        date: analysis.date,
        status: "complete",
      };
      storage.savePrescription(prescription);
      setStage("done");
      toast.success("Analysis complete");
      navigate({ to: "/app/analysis/$id", params: { id } });
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed. Please try again.");
      setStage("idle");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Upload prescription
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll OCR the document, identify medicines, and analyze interactions in seconds.
        </p>
      </div>

      <FileDropzone file={file} onFile={setFile} onClear={() => setFile(null)} />

      {stage !== "idle" && stage !== "done" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="space-y-4">
            <Step
              icon={<ScanLine className="h-4 w-4" />}
              label="Extracting text from image (OCR)"
              active={stage === "ocr"}
              done={stage !== "ocr"}
            />
            {stage === "ocr" && <Progress value={progress} className="h-1.5" />}
            <Step
              icon={<Brain className="h-4 w-4" />}
              label="Analyzing medicines & interactions"
              active={stage === "ai"}
              done={false}
            />
          </div>

          {ocrText && (
            <div className="mt-5 rounded-xl bg-muted/60 p-4">
              <div className="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Extracted text
              </div>
              <pre className="max-h-32 overflow-auto whitespace-pre-wrap font-mono text-xs text-foreground/80">
                {ocrText}
              </pre>
            </div>
          )}
        </motion.div>
      )}

      <div className="flex justify-end gap-3">
        {file && stage === "idle" && (
          <Button onClick={run} size="lg" className="shadow-emerald">
            <Sparkles className="mr-2 h-4 w-4" /> Analyze prescription
          </Button>
        )}
        {(stage === "ocr" || stage === "ai") && (
          <Button size="lg" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </Button>
        )}
      </div>
    </div>
  );
}

function Step({
  icon,
  label,
  active,
  done,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
          done
            ? "bg-success text-success-foreground"
            : active
              ? "bg-gradient-mint text-primary animate-pulse-soft"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {active ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      </div>
      <span className={active ? "font-medium" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}
