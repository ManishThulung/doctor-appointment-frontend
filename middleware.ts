import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./types/enums.types";

export async function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogged");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (isLogin) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
  // if (request.nextUrl.pathname.startsWith("/auth/employer/login")) {
  //   if (isLogin) {
  //     return NextResponse.rewrite(new URL("/", request.url));
  //   }
  // }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const isLogin = request.cookies.get("isLogged");
    const role = request.cookies.get("role");
    if (isLogin?.value && role?.value) {
      if (
        role?.value === Role.SuperAdmin ||
        role?.value === Role.Admin ||
        role?.value === Role.Doctor
      ) {
        return NextResponse.rewrite(
          new URL(request.nextUrl.pathname, request.url)
        );
      } else {
        // return NextResponse.rewrite(new URL("/unauthorized", request.url));
        return NextResponse.rewrite(new URL("/login", request.url));
      }
    } else {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }

  // if (request.nextUrl.pathname.startsWith("/dashboard/job-seeker")) {
  //   const isLogin = request.cookies.get("logged");
  //   if (isLogin) {
  //     return NextResponse.rewrite(
  //       new URL(request.nextUrl.pathname, request.url),
  //     );
  //   } else {
  //     return NextResponse.rewrite(
  //       new URL("/auth/job-seeker/login/", request.url),
  //     );
  //   }
  // }

  // i have done this because employer cant access index page i.e ('/')
  // so employer will be redirected to employer dashboard
  // if (request.nextUrl.pathname === "/") {
  //   if (isLogin) {
  //     const role = request.cookies.get("role");
  //     const decryptedData = decryptData(role?.value as string);
  //     if (decryptedData === ROLE.Employer) {
  //       return NextResponse.rewrite(
  //         new URL("/dashboard/employer", request.url),
  //       );
  //     }
  //   }
  // }
}
