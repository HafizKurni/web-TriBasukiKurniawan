import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/lib/auth";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";
  const isAdminRoute = path.startsWith("/admin");

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("admin_session")?.value;
  const session = await decryptSession(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
