import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { getEntity } from "@/lib/entities";
import { updateEntity } from "@/lib/entity-actions";
import { EntityFormFields } from "../../../_components/entity-form";
import { ArrowLeft } from "lucide-react";

export default async function EditEntityPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  await requireAdmin();
  const { entity: slug, id } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  const delegate = (
    prisma as unknown as Record<
      string,
      { findUnique: (args: unknown) => Promise<Record<string, unknown> | null> }
    >
  )[entity.model];
  const row = await delegate.findUnique({ where: { id: Number(id) } });
  if (!row) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href={`/admin/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit {entity.label}</h1>

      <form
        action={updateEntity.bind(null, slug, Number(id))}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <EntityFormFields fields={entity.fields} values={row} />
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link
            href={`/admin/${slug}`}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-blue-900 text-white rounded-lg transition-colors font-medium"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
