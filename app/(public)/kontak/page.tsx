import { prisma } from "@/lib/db";
import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";

export const metadata = { title: "Kontak — Tri Basuki Kurniawan" };
export const dynamic = "force-dynamic";

export default async function KontakPage() {
  const [profile, links] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.customLink.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!profile) {
    return <p className="text-slate-500 italic">Profil belum diisi.</p>;
  }

  const items = [
    profile.email && { icon: Mail, label: "Email", value: profile.email },
    profile.phone && { icon: Phone, label: "Telepon", value: profile.phone },
    profile.address && { icon: MapPin, label: "Alamat", value: profile.address },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string }[];

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Kontak</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">{label}</div>
              <div className="text-slate-800 font-medium">{value}</div>
            </div>
          </div>
        ))}

        {(profile.scopusUrl || profile.scholarUrl || links.length > 0) && (
          <div className="pt-4 border-t border-slate-100">
            <div className="text-sm text-slate-500 mb-3">Tautan Profesional</div>
            <div className="flex flex-wrap gap-3">
              {profile.scopusUrl && (
                <a
                  href={profile.scopusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors text-sm"
                >
                  <LinkIcon className="w-4 h-4" /> Scopus
                </a>
              )}
              {profile.scholarUrl && (
                <a
                  href={profile.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors text-sm"
                >
                  <LinkIcon className="w-4 h-4" /> Google Scholar
                </a>
              )}
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm"
                >
                  <LinkIcon className="w-4 h-4" /> {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
