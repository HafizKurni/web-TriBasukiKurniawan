"use client";

import { useEffect, useState } from "react";
import { FileText, X } from "lucide-react";

export function AttachmentLink({ url, className = "" }: { url?: string | null; className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!url) return null;

  const isPdf = url.toLowerCase().endsWith(".pdf");

  return (
    <>
      {isPdf ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex items-center gap-1 text-sm text-primary hover:underline ${className}`}
        >
          <FileText className="w-4 h-4" /> Lihat Lampiran (PDF)
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={`block ${className}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Lampiran"
            className="w-full h-40 object-cover rounded-lg border border-slate-200 hover:opacity-90 transition-opacity"
          />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
          {isPdf ? (
            <iframe
              src={url}
              className="w-[90vw] h-[90vh] bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="Lampiran"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
