import { prisma } from "@/lib/db";

export const metadata = { title: "Pengabdian — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function PengabdianPage() {
  const data = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Pengabdian kepada Masyarakat &amp; Instansi
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Proyek pengembangan sistem informasi dan konsultasi IT untuk instansi pemerintah, institusi
        pendidikan, dan organisasi masyarakat.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length === 0 ? (
          <p className="col-span-full text-center py-8 text-slate-400 italic bg-white rounded-xl border border-slate-200">
            Belum ada data pengabdian.
          </p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-bold text-slate-400 mb-2">{item.year}</div>
              <h3 className="font-bold text-slate-800 leading-tight mb-2">
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
              </h3>
              {item.client && <p className="text-slate-600 text-sm">{item.client}</p>}
              {item.description && (
                <p className="text-slate-500 text-sm mt-2">{item.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
