"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { getEntity } from "@/lib/entities";

export async function getPageMeta(slug: string): Promise<{ title: string; description: string }> {
  const entity = getEntity(slug);
  const meta = await prisma.pageMeta.findUnique({ where: { slug } });
  return {
    title: meta?.title || entity?.defaultTitle || slug,
    description: meta?.description ?? entity?.defaultDescription ?? "",
  };
}

export async function updatePageMeta(slug: string, formData: FormData) {
  await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) throw new Error("Unknown entity: " + slug);

  const title = String(formData.get("title") ?? "").trim() || entity.defaultTitle;
  const description = String(formData.get("description") ?? "").trim();

  await prisma.pageMeta.upsert({
    where: { slug },
    create: { slug, title, description },
    update: { title, description },
  });

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/", "layout");
  redirect(`/admin/${slug}?saved=1`);
}
