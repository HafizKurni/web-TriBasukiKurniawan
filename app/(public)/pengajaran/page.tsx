import { prisma } from "@/lib/db";

export const metadata = { title: "Pengajaran — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function PengajaranPage() {
  const data = await prisma.teaching.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Pengajaran &amp; Pelatihan yang Pernah Disampaikan
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-4 font-semibold text-sm">Topik / Materi</th>
                <th className="p-4 font-semibold text-sm">Instansi</th>
                <th className="p-4 font-semibold text-sm whitespace-nowrap">Tahun</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-slate-400 italic">
                    Belum ada data pengajaran.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800 align-top">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-primary"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                      {item.description && (
                        <p className="text-slate-500 text-sm mt-1 font-normal">
                          {item.description}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 align-top">{item.institution}</td>
                    <td className="p-4 text-slate-500 align-top whitespace-nowrap">
                      {item.year}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
