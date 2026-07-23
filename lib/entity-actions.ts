"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { getEntity, type FieldConfig } from "@/lib/entities";

type PrismaDelegate = {
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  update: (args: { where: { id: number }; data: Record<string, unknown> }) => Promise<unknown>;
  delete: (args: { where: { id: number } }) => Promise<unknown>;
};

function getDelegate(model: string): PrismaDelegate {
  return (prisma as unknown as Record<string, PrismaDelegate>)[model];
}

function coerceValue(field: FieldConfig, formData: FormData) {
  if (field.type === "checkbox") {
    return formData.get(field.name) === "on";
  }
  const raw = formData.get(field.name);
  const value = raw === null ? "" : String(raw).trim();
  if (field.type === "number") {
    return value === "" ? 0 : Number(value);
  }
  if (value === "" && !field.required) return null;
  return value;
}

function buildData(fields: FieldConfig[], formData: FormData) {
  const data: Record<string, unknown> = {};
  for (const f of fields) {
    data[f.name] = coerceValue(f, formData);
  }
  return data;
}

export async function createEntity(slug: string, formData: FormData) {
  await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) throw new Error("Unknown entity: " + slug);

  await getDelegate(entity.model).create({ data: buildData(entity.fields, formData) });

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/", "layout");
  redirect(`/admin/${slug}`);
}

export async function updateEntity(slug: string, id: number, formData: FormData) {
  await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) throw new Error("Unknown entity: " + slug);

  await getDelegate(entity.model).update({
    where: { id },
    data: buildData(entity.fields, formData),
  });

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/", "layout");
  redirect(`/admin/${slug}`);
}

export async function deleteEntity(slug: string, id: number) {
  await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) throw new Error("Unknown entity: " + slug);

  await getDelegate(entity.model).delete({ where: { id } });

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/", "layout");
}

export async function reorderEntities(slug: string, orderedIds: number[]) {
  await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) throw new Error("Unknown entity: " + slug);

  const delegate = getDelegate(entity.model);
  await Promise.all(
    orderedIds.map((id, index) => delegate.update({ where: { id }, data: { sortOrder: index } }))
  );

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/", "layout");
}
