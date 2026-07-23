import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { getEntity } from "@/lib/entities";
import { ReorderableTable } from "../../_components/reorderable-table";
import { Plus } from "lucide-react";

export default async function EntityListPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  await requireAdmin();
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  const delegate = (
    prisma as unknown as Record<
      string,
      { findMany: (args: unknown) => Promise<(Record<string, unknown> & { id: number })[]> }
    >
  )[entity.model];
  const rows = await delegate.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-slate-800">{entity.label}</h1>
        <Link
          href={`/admin/${slug}/new`}
          className="bg-primary hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Data
        </Link>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Seret baris (ikon <span className="inline-block align-middle">⠿</span>) untuk mengubah
        urutan tampil di situs publik.
      </p>

      <ReorderableTable slug={slug} listColumns={entity.listColumns} initialRows={rows} />
    </div>
  );
}
