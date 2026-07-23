import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { ENTITIES } from "@/lib/entities";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const counts = await Promise.all(
    ENTITIES.map(async (e) => {
      const delegate = (prisma as unknown as Record<string, { count: () => Promise<number> }>)[
        e.model
      ];
      return { ...e, count: await delegate.count() };
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
      <p className="text-slate-500 mb-8">Ringkasan data website profil.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {counts.map((e) => (
          <Link
            key={e.slug}
            href={`/admin/${e.slug}`}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-bold text-primary">{e.count}</div>
            <div className="text-slate-600 mt-1">{e.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
