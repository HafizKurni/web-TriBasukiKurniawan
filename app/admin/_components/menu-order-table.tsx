"use client";

import { useRef, useState, useTransition } from "react";
import { GripVertical, Loader2 } from "lucide-react";
import { reorderMenus } from "@/lib/page-meta-actions";

type MenuItem = { slug: string; title: string };

export function MenuOrderTable({ items }: { items: MenuItem[] }) {
  const [rows, setRows] = useState(items);
  const [isPending, startTransition] = useTransition();
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function handleDrop() {
    if (dragIndex.current === null) return;
    dragIndex.current = null;
    setOverIndex(null);
    startTransition(() => {
      reorderMenus(rows.map((r) => r.slug));
    });
  }

  function moveRow(from: number, to: number) {
    if (from === to) return;
    setRows((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative max-w-xl">
      {isPending && (
        <div className="absolute top-2 right-2 text-slate-400 flex items-center gap-1 text-xs bg-white/90 px-2 py-1 rounded">
          <Loader2 className="w-3 h-3 animate-spin" /> Menyimpan urutan...
        </div>
      )}
      <ul className="divide-y divide-slate-100">
        {rows.map((row, index) => (
          <li
            key={row.slug}
            draggable
            onDragStart={() => {
              dragIndex.current = index;
            }}
            onDragEnter={() => {
              if (dragIndex.current === null || dragIndex.current === index) return;
              moveRow(dragIndex.current, index);
              dragIndex.current = index;
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setOverIndex(index);
            }}
            onDragEnd={handleDrop}
            className={`flex items-center gap-3 px-4 py-3 cursor-grab active:cursor-grabbing transition-colors ${
              overIndex === index ? "bg-blue-50" : ""
            }`}
          >
            <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
            <div>
              <div className="text-sm font-medium text-slate-800">{row.title}</div>
              <div className="text-xs text-slate-400">{row.slug}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
