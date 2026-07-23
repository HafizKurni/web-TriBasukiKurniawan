"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  Briefcase,
  Presentation,
  FlaskConical,
  HandHeart,
  Award,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS_BY_HREF: Record<string, { label: string; icon: LucideIcon }> = {
  "/": { label: "Beranda", icon: Home },
  "/pendidikan": { label: "Pendidikan", icon: GraduationCap },
  "/pengalaman": { label: "Pengalaman Kerja", icon: Briefcase },
  "/pengajaran": { label: "Pengajaran", icon: Presentation },
  "/penelitian": { label: "Penelitian", icon: FlaskConical },
  "/pengabdian": { label: "Pengabdian", icon: HandHeart },
  "/penunjang": { label: "Penunjang", icon: Award },
  "/kontak": { label: "Kontak", icon: Mail },
};

const DEFAULT_ORDER = [
  "/pendidikan",
  "/pengalaman",
  "/pengajaran",
  "/penelitian",
  "/pengabdian",
  "/penunjang",
];

export function NavLinks({
  onNavigate,
  order = DEFAULT_ORDER,
}: {
  onNavigate?: () => void;
  order?: string[];
}) {
  const pathname = usePathname();
  const hrefs = ["/", ...order, "/kontak"];

  return (
    <ul className="space-y-1 px-4">
      {hrefs.map((href) => {
        const item = ITEMS_BY_HREF[href];
        if (!item) return null;
        const { label, icon: Icon } = item;
        const active = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                active
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
