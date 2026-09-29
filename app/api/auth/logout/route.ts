import { NextResponse } from "next/server";

import { getAuthCookieName } from "@/lib/auth";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful.",
      },
      { status: 200 },
    );

    response.cookies.set({
      name: getAuthCookieName(),
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        message: "Unable to log out. Please try again.",
      },
      { status: 500 },
    );
  }
}