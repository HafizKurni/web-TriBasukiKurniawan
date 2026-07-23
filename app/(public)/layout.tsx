import { prisma } from "@/lib/db";
import { getPublicNavOrder } from "@/lib/page-meta-actions";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";
import { AdminFab } from "./admin-fab";

// Halaman publik query database secara langsung; database hanya tersedia saat
// container berjalan (bukan saat image di-build), jadi jangan coba di-prerender statis.
export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, navOrder] = await Promise.all([prisma.profile.findFirst(), getPublicNavOrder()]);
  const name = profile?.name ?? "Tri Basuki Kurniawan";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-64 bg-dark text-white flex-col h-screen sticky top-0 shadow-2xl z-20 hidden md:flex shrink-0">
        <div className="p-6 border-b border-slate-700 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold mb-4 shadow-lg border-4 border-slate-700 overflow-hidden">
            {profile?.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <h1 className="text-xl font-bold text-center">{name}</h1>
          <p className="text-sm text-slate-400 mt-1 text-center">Profil Akademik</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <NavLinks order={navOrder} />
        </nav>

        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
          &copy; {new Date().getFullYear()} {name}.
        </div>
      </aside>

      <MobileNav name={name} order={navOrder} />

      <main className="flex-1 bg-slate-50 mt-14 md:mt-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>

      <AdminFab />
    </div>
  );
}
