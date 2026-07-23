"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

function str(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!name || !title || !bio) {
    throw new Error("Nama, jabatan, dan bio wajib diisi.");
  }

  const data = {
    name,
    title,
    bio,
    photoUrl: str(formData, "photoUrl"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    address: str(formData, "address"),
    scopusUrl: str(formData, "scopusUrl"),
    scopusHIndex: str(formData, "scopusHIndex"),
    scholarUrl: str(formData, "scholarUrl"),
    scholarHIndex: str(formData, "scholarHIndex"),
  };

  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/admin/profile");
  revalidatePath("/", "layout");
  redirect("/admin/profile?saved=1");
}
