"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./nav-links";

export function MobileNav({ name, order }: { name: string; order?: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="md:hidden bg-dark text-white p-4 flex justify-between items-center fixed top-0 w-full z-30 shadow-md">
        <h1 className="font-bold text-lg truncate">{name}</h1>
        <button onClick={() => setOpen(true)} className="text-2xl focus:outline-none" aria-label="Buka menu">
          <Menu />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 bg-dark z-40 flex flex-col pt-16">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Tutup menu"
          >
            <X />
          </button>
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-white mb-2">
              {initials(name)}
            </div>
            <h2 className="text-white font-bold px-4 text-center">{name}</h2>
          </div>
          <nav className="flex-1 w-full overflow-y-auto">
            <NavLinks onNavigate={() => setOpen(false)} order={order} />
          </nav>
        </div>
      )}
    </>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
