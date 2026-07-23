import { prisma } from "@/lib/db";
import { getPageMeta } from "@/lib/page-meta-actions";
import { AttachmentLink } from "../_components/attachment-link";

export const metadata = { title: "Pengalaman Kerja — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function PengalamanPage() {
  const [data, meta] = await Promise.all([
    prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
    getPageMeta("experience"),
  ]);

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{meta.title}</h2>
      {meta.description && <p className="text-slate-500 text-sm mb-6">{meta.description}</p>}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {data.length === 0 ? (
          <p className="text-center py-8 text-slate-400 italic">Belum ada data pengalaman.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {data.map((item) => (
              <li key={item.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-slate-800">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-primary"
                        >
                          {item.position}
                        </a>
                      ) : (
                        item.position
                      )}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">{item.institution}</p>
                    {item.fileUrl && <AttachmentLink url={item.fileUrl} className="mt-2 max-w-xs" />}
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                      item.current
                        ? "bg-green-100 text-green-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.period}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
