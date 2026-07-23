import { FileText } from "lucide-react";

export function AttachmentLink({ url, className = "" }: { url?: string | null; className?: string }) {
  if (!url) return null;

  if (url.toLowerCase().endsWith(".pdf")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-sm text-primary hover:underline ${className}`}
      >
        <FileText className="w-4 h-4" /> Lihat Lampiran (PDF)
      </a>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt="Lampiran"
      className={`w-full h-40 object-cover rounded-lg border border-slate-200 ${className}`}
    />
  );
}
