import { prisma } from "@/lib/db";
import { GraduationCap, Calendar } from "lucide-react";
import { getPageMeta } from "@/lib/page-meta-actions";
import { AttachmentLink } from "../_components/attachment-link";

export const metadata = { title: "Pendidikan — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function PendidikanPage() {
  const [data, meta] = await Promise.all([
    prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
    getPageMeta("education"),
  ]);

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{meta.title}</h2>
      {meta.description && <p className="text-slate-500 text-sm mb-6">{meta.description}</p>}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6">
          {data.length === 0 ? (
            <p className="text-center py-8 text-slate-400 italic">Belum ada data pendidikan.</p>
          ) : (
            <div className="space-y-6">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-primary flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-primary"
                        >
                          {item.level}
                        </a>
                      ) : (
                        item.level
                      )}
                    </h3>
                    <div className="text-primary font-medium">{item.institution}</div>
                    {(item.faculty || item.major) && (
                      <div className="text-slate-600 text-sm mt-1">
                        {item.faculty}
                        {item.faculty && item.major ? " — " : ""}
                        {item.major}
                      </div>
                    )}
                    {item.location && (
                      <div className="text-slate-500 text-sm mt-1">{item.location}</div>
                    )}
                    <div className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {item.period}
                    </div>
                    {item.fileUrl && <AttachmentLink url={item.fileUrl} className="mt-3 max-w-xs" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
