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

const items: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/pendidikan", label: "Pendidikan", icon: GraduationCap },
  { href: "/pengalaman", label: "Pengalaman Kerja", icon: Briefcase },
  { href: "/pengajaran", label: "Pengajaran", icon: Presentation },
  { href: "/penelitian", label: "Penelitian", icon: FlaskConical },
  { href: "/pengabdian", label: "Pengabdian", icon: HandHeart },
  { href: "/penunjang", label: "Penunjang", icon: Award },
  { href: "/kontak", label: "Kontak", icon: Mail },
];

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1 px-4">
      {items.map(({ href, label, icon: Icon }) => {
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
