import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { SignJWT } from "jose";

const ADMIN_HASH = bcrypt.hashSync("oslr2026", 10);
const SECRET_KEY = new TextEncoder().encode("oslr_ultra_secure_jwt_key_2026");

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (bcrypt.compareSync(password, ADMIN_HASH)) {
      const token = await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h")
        .sign(SECRET_KEY);

      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
