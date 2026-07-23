"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { GripVertical, Pencil, Loader2, Check } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { deleteEntity, reorderEntities } from "@/lib/entity-actions";

type Row = Record<string, unknown> & { id: number };

export function ReorderableTable({
  slug,
  listColumns,
  initialRows,
  fileField,
}: {
  slug: string;
  listColumns: string[];
  initialRows: Row[];
  fileField?: string;
}) {
  const [rows, setRows] = useState(initialRows);
  const [isPending, startTransition] = useTransition();
  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function handleDrop() {
    if (dragIndex.current === null) return;
    dragIndex.current = null;
    setOverIndex(null);
    startTransition(() => {
      reorderEntities(slug, rows.map((r) => r.id));
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

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="text-center py-8 text-slate-400 italic">Belum ada data.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      {isPending && (
        <div className="absolute top-2 right-2 text-slate-400 flex items-center gap-1 text-xs bg-white/90 px-2 py-1 rounded">
          <Loader2 className="w-3 h-3 animate-spin" /> Menyimpan urutan...
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <th className="p-4 font-semibold text-sm w-10" />
              {listColumns.map((col) => (
                <th key={col} className="p-4 font-semibold text-sm capitalize">
                  {col === fileField ? "Lampiran" : col}
                </th>
              ))}
              <th className="p-4 font-semibold text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr
                key={row.id}
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
                className={`hover:bg-slate-50 transition-colors cursor-grab active:cursor-grabbing ${
                  overIndex === index ? "bg-blue-50" : ""
                }`}
              >
                <td className="p-4 align-top text-slate-300">
                  <GripVertical className="w-4 h-4" />
                </td>
                {listColumns.map((col) => (
                  <td key={col} className="p-4 text-slate-700 align-top max-w-md">
                    {col === fileField ? (
                      row[col] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )
                    ) : (
                      <span className="line-clamp-2">{String(row[col] ?? "")}</span>
                    )}
                  </td>
                ))}
                <td className="p-4 text-right whitespace-nowrap align-top">
                  <Link
                    href={`/admin/${slug}/${row.id}`}
                    className="inline-flex text-slate-400 hover:text-primary transition-colors p-2"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteEntity.bind(null, slug, row.id)} className="inline">
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
