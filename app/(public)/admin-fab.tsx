import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";
import { getSession } from "@/lib/auth";

export async function AdminFab() {
  const session = await getSession();
  const isLoggedIn = Boolean(session?.userId);

  return (
    <Link
      href={isLoggedIn ? "/admin" : "/admin/login"}
      title={isLoggedIn ? "Buka panel admin" : "Login admin"}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-dark text-white shadow-lg flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
    >
      {isLoggedIn ? (
        <LayoutDashboard className="w-5 h-5" />
      ) : (
        <LogIn className="w-5 h-5" />
      )}
    </Link>
  );
}
