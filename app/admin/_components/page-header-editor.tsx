"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updatePageMeta } from "@/lib/page-meta-actions";

export function PageHeaderEditor({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updatePageMeta(slug, formData);
        }}
        className="mb-4 bg-white border border-slate-200 rounded-lg p-4 space-y-3"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Judul Menu</label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg font-bold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Deskripsi Singkat
          </label>
          <textarea
            name="description"
            defaultValue={description}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-primary hover:bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" /> Batal
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mb-2 group">
      <div className="flex items-start justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="opacity-60 hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100 shrink-0"
          title="Edit judul & deskripsi"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
        </button>
      </div>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
  );
}
