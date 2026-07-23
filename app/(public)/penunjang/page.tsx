import { prisma } from "@/lib/db";

export const metadata = { title: "Penunjang — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function PenunjangPage() {
  const [skills, certifications] = await Promise.all([
    prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <section className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Keahlian Teknis</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {skills.length === 0 ? (
            <p className="text-center py-4 text-slate-400 italic">Belum ada data.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-1">{s.category}</h4>
                  <p className="text-sm text-slate-600">{s.items}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Sertifikasi &amp; Pelatihan Profesional</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {certifications.length === 0 ? (
            <p className="text-center py-8 text-slate-400 italic">Belum ada data.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {certifications.map((c) => (
                <li key={c.id} className="p-4 flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <h4 className="font-medium text-slate-800">{c.title}</h4>
                    {c.provider && <p className="text-sm text-slate-500">{c.provider}</p>}
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded whitespace-nowrap">
                    {c.year}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
