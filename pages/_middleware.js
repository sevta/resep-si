import { NextResponse } from "next/server";

export function middleware(req) {
  const cookies = req.cookies;
  const url = req.nextUrl;

  if (url.href === "/login") {
    if (cookies.strapi_token) {
      return NextResponse.redirect("/");
    }
  } else {
    if (!cookies.strapi_token) {
      return NextResponse.redirect("/login");
    }
  }
  return NextResponse.next();
}
