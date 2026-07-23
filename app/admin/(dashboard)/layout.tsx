import Link from "next/link";
import { ENTITIES } from "@/lib/entities";
import { logout } from "../actions";
import { LogOut, LayoutDashboard, UserRound } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-dark text-white flex flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-slate-700">
          <h1 className="font-bold text-lg">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Website Profil TBK</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <UserRound className="w-4 h-4" /> Profil
          </Link>
          <div className="pt-3 mt-3 border-t border-slate-700 text-xs uppercase tracking-wide text-slate-500 px-4">
            Data
          </div>
          {ENTITIES.map((e) => (
            <Link
              key={e.slug}
              href={`/admin/${e.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {e.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link href="/" className="block text-xs text-slate-400 hover:text-white">
            Lihat situs publik
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 bg-slate-50 p-6 md:p-10">{children}</main>
    </div>
  );
}
