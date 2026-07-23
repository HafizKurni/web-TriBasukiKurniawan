import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { getEntity } from "@/lib/entities";
import { createEntity } from "@/lib/entity-actions";
import { EntityFormFields } from "../../../_components/entity-form";
import { ArrowLeft } from "lucide-react";

export default async function NewEntityPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  await requireAdmin();
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href={`/admin/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Tambah {entity.label}</h1>

      <form action={createEntity.bind(null, slug)} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <EntityFormFields fields={entity.fields} />
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
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
