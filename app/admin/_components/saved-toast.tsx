"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export function SavedToast({ message = "Berhasil disimpan" }: { message?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const saved = searchParams.get("saved");

  useEffect(() => {
    if (!saved) return;

    setVisible(true);
    router.replace(pathname, { scroll: false });

    const hideTimer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  if (!saved) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <CheckCircle2 className="w-5 h-5 text-green-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
