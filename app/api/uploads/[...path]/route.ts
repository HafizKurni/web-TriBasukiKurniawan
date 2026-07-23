import { NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filename = segments?.[0];

  // Nama file upload selalu flat (uuid + ekstensi), jadi tolak apa pun yang
  // mencoba keluar dari folder upload (path traversal) atau punya sub-path.
  if (!filename || segments.length !== 1 || filename.includes("..") || filename.includes("/")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }

    const buffer = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(fileStat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
