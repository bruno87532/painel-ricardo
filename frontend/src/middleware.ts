import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose"

type Payload = {
  exp: number;
}

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("access_token")?.value
  const currentTime = Math.floor(Date.now() / 1000)

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")

  if (isAuthRoute) {
    if (token) {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
      const newPayload = payload as Payload
      if (newPayload && newPayload.exp > currentTime) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    }
  }

  return NextResponse.next()
}
