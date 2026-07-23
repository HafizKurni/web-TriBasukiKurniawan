"use client";

import { useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { ImageUp, Loader2, X, Check } from "lucide-react";
import { getCroppedImageBlob } from "./crop-image";

export function ProfilePhotoField({
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

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageSrc(URL.createObjectURL(file));
  }

  function closeCropper() {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setCroppedAreaPixels(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSave() {
    if (!imageSrc || !croppedAreaPixels) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels);
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengunggah foto");
      setUrl(data.url);
      closeCropper();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah foto");
      setUploading(false);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageUp className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <ImageUp className="w-4 h-4" />
            {url ? "Ganti Foto" : "Pilih Foto"}
          </button>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP, atau GIF (maks 5MB)</p>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="relative w-full h-80 bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>
            <div className="p-4 space-y-3">
              <label className="block text-xs text-slate-500">
                Perbesar
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeCropper}
                  disabled={uploading}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-medium border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-60"
                >
                  <X className="w-4 h-4" /> Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={uploading}
                  className="flex items-center gap-1 bg-primary hover:bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {uploading ? "Mengunggah..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
