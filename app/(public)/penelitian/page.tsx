import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "Penelitian — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

const CATEGORIES: { key: string; label: string }[] = [
  { key: "ALL", label: "Semua" },
  { key: "BOOK", label: "Buku" },
  { key: "BOOK_CHAPTER", label: "Book Chapter" },
  { key: "JOURNAL_INTL", label: "Jurnal Internasional" },
  { key: "JOURNAL_NATIONAL", label: "Jurnal Nasional" },
  { key: "CONF_INTL", label: "Konferensi Internasional" },
  { key: "CONF_NATIONAL", label: "Konferensi Nasional" },
  { key: "PATENT", label: "Paten" },
];

export default async function PenelitianPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const active = kategori && CATEGORIES.some((c) => c.key === kategori) ? kategori : "ALL";

  const [interests, publications] = await Promise.all([
    prisma.researchInterest.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.publication.findMany({
      where: active === "ALL" ? undefined : { category: active },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    }),
  ]);

  return (
    <section className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Minat Riset</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {interests.length === 0 ? (
            <p className="text-center py-4 text-slate-400 italic">Belum ada data.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interests.map((i) => (
                <li key={i.id} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-primary">•</span>
                  {i.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Publikasi</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={c.key === "ALL" ? "/penelitian" : `/penelitian?kategori=${c.key}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active === c.key
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {publications.length === 0 ? (
            <p className="text-center py-8 text-slate-400 italic">Belum ada data publikasi.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {publications.map((p) => (
                <li key={p.id} className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {p.title}
                        </a>
                      ) : (
                        p.title
                      )}
                    </p>
                    <span className="shrink-0 text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600">
                      {p.year}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
