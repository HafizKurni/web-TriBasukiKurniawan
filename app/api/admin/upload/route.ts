import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getSession } from "@/lib/auth";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB
const UPLOADS_DIR = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Format file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, atau PDF" },
      { status: 400 }
    );
  }
  const isPdf = file.type === "application/pdf";
  const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `Ukuran file maksimal ${isPdf ? "10MB" : "5MB"}` },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name) || (isPdf ? ".pdf" : ".jpg");
  const filename = `${randomUUID()}${ext}`;
  await mkdir(UPLOADS_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOADS_DIR, filename), buffer);

  return NextResponse.json({ url: `/api/uploads/${filename}` });
}
