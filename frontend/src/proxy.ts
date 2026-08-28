import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // Antes do merge na main: remover esta excecao ou validar a estrategia de acesso em desenvolvimento.
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const user = await getToken({ req });
  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/produtos/:path*"] };
