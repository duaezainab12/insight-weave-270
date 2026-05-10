import { useCallback, useState, type DragEvent } from "react";
import { Upload, FileImage, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  onFile: (file: File) => void;
  file: File | null;
  onClear: () => void;
}

export function FileDropzone({ onFile, file, onClear }: Props) {
  const [drag, setDrag] = useState(false);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer.files?.[0];
      if (f) validateAndSet(f);
    },
    []
  );

  const validateAndSet = (f: File) => {
    const ok = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"];
    if (!ok.includes(f.type)) {
      alert("Please upload a PNG, JPG, WEBP, or PDF file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      alert("File too large. Max 10 MB.");
      return;
    }
    onFile(f);
  };

  if (file) {
    const url = URL.createObjectURL(file);
    const isImg = file.type.startsWith("image/");
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative overflow-hidden rounded-2xl p-4"
      >
        <button
          onClick={() => {
            URL.revokeObjectURL(url);
            onClear();
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 shadow-soft hover:bg-background"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-muted sm:w-48">
            {isImg ? (
              <img src={url} alt={file.name} className="h-full w-full object-contain" />
            ) : (
              <FileImage className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Selected file
            </div>
            <div className="font-medium">{file.name}</div>
            <div className="text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB · {file.type}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-12 text-center transition-all",
        drag
          ? "border-primary bg-mint/30 shadow-mint"
          : "border-border bg-card hover:border-primary/50 hover:bg-mint/10"
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-mint shadow-mint">
        <Upload className="h-7 w-7 text-primary" />
      </div>
      <div>
        <div className="font-display text-lg font-semibold">Drop your prescription here</div>
        <div className="mt-1 text-sm text-muted-foreground">
          or click to browse · PNG, JPG, WEBP, PDF · max 10 MB
        </div>
      </div>
      <Button type="button" variant="outline" className="mt-2 pointer-events-none">
        Choose file
      </Button>
      <input
        type="file"
        accept="image/*,application/pdf"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) validateAndSet(f);
        }}
      />
    </label>
  );
}
