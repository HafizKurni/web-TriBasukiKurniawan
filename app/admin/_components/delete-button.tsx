"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ confirmMessage }: { confirmMessage?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage ?? "Yakin ingin menghapus data ini?")) {
          e.preventDefault();
        }
      }}
      className="text-slate-400 hover:text-red-500 transition-colors p-2"
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
