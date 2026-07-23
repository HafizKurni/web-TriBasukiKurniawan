"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, FileText, ExternalLink, X } from "lucide-react";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,application/pdf";

function isPdf(url: string) {
  return url.toLowerCase().endsWith(".pdf");
}

export function FileUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengunggah file");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah file");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {url && isPdf(url) ? (
            <FileText className="w-8 h-8 text-red-500" />
          ) : url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageUp className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ImageUp className="w-4 h-4" />
              )}
              {uploading ? "Mengunggah..." : url ? "Ganti File" : "Pilih Gambar / PDF"}
            </button>
            {url && (
              <>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  title="Lihat file"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>
                <button
                  type="button"
                  onClick={() => setUrl("")}
                  className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
                  title="Hapus file"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP, GIF (maks 5MB) atau PDF (maks 10MB)</p>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
