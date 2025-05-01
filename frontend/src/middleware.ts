import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const data = await auth();

  if (!data && req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}