import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tri Basuki Kurniawan — Profil Akademik",
  description:
    "Profil akademik Dr. Tri Basuki Kurniawan: pendidikan, pengalaman, pengajaran, penelitian, pengabdian, dan kegiatan penunjang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-100">{children}</body>
    </html>
  );
}
