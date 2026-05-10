// OCR service abstraction. Currently uses Tesseract.js for real in-browser OCR.
// Can be swapped for Google Vision API or backend OCR by replacing extractText().

export interface OcrResult {
  text: string;
  confidence: number;
}

export async function extractText(
  file: File,
  onProgress?: (pct: number) => void
): Promise<OcrResult> {
  // PDFs: extract first page rendering would require pdf.js. For MVP we OCR images
  // directly; for PDFs we still pass to Tesseract which handles common cases poorly.
  // Real backend would use a PDF-aware pipeline.
  if (file.type === "application/pdf") {
    // graceful fallback: return placeholder so UI works
    onProgress?.(100);
    return {
      text:
        "[PDF detected] Please upload an image (PNG/JPG) for best OCR accuracy. " +
        "Backend pipeline (Google Vision / Tesseract server) will handle PDFs in production.",
      confidence: 0,
    };
  }

  const Tesseract = (await import("tesseract.js")).default;
  const { data } = await Tesseract.recognize(file, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });
  return { text: data.text, confidence: Math.round(data.confidence) };
}
