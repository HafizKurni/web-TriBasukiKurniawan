import { prisma } from "@/lib/db";
import { BookOpen, FlaskConical, HandHeart, Award, Link as LinkIcon, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BerandaPage() {
  const [profile, teachingCount, publicationCount, projectCount, penunjangCount, links] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.teaching.count(),
      prisma.publication.count(),
      prisma.project.count(),
      Promise.all([prisma.skill.count(), prisma.certification.count()]).then(
        ([a, b]) => a + b
      ),
      prisma.customLink.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  if (!profile) {
    return <p className="text-slate-500 italic">Profil belum diisi.</p>;
  }

  const stats = [
    { label: "Pelatihan/Pengajaran", value: teachingCount, icon: BookOpen },
    { label: "Publikasi", value: publicationCount, icon: FlaskConical },
    { label: "Proyek Pengabdian", value: projectCount, icon: HandHeart },
    { label: "Data Penunjang", value: penunjangCount, icon: Award },
  ];

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 shadow-sm overflow-hidden shrink-0">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-slate-500">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
              <p className="text-lg text-secondary font-medium mt-1">{profile.title}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-slate-600 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {profile.email && (
                <span className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-primary" /> {profile.email}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-primary" /> {profile.phone}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {profile.scopusUrl && (
                <a
                  href={profile.scopusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> Scopus
                  {profile.scopusHIndex && ` (h-index: ${profile.scopusHIndex})`}
                </a>
              )}
              {profile.scholarUrl && (
                <a
                  href={profile.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> Google Scholar
                  {profile.scholarHIndex && ` (h-index: ${profile.scholarHIndex})`}
                </a>
              )}
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" /> {l.label}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"
                >
                  <div className="text-3xl text-primary mb-2 flex justify-center">
                    <Icon />
                  </div>
                  <div className="font-bold text-xl text-slate-800">{value}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Lihat rincian lengkap di menu{" "}
        <Link href="/pendidikan" className="underline hover:text-slate-600">
          Pendidikan
        </Link>
        ,{" "}
        <Link href="/pengalaman" className="underline hover:text-slate-600">
          Pengalaman
        </Link>
        ,{" "}
        <Link href="/pengajaran" className="underline hover:text-slate-600">
          Pengajaran
        </Link>
        ,{" "}
        <Link href="/penelitian" className="underline hover:text-slate-600">
          Penelitian
        </Link>
        ,{" "}
        <Link href="/pengabdian" className="underline hover:text-slate-600">
          Pengabdian
        </Link>{" "}
        dan{" "}
        <Link href="/penunjang" className="underline hover:text-slate-600">
          Penunjang
        </Link>
        .
      </p>
    </section>
  );
}
