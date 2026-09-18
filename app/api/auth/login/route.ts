import { NextResponse } from "next/server";
import { compare } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createAuthToken, getAuthCookieName } from "@/lib/auth";
import {
  isValidEmail,
  normalizeEmail,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? normalizeEmail(body.email)
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required.",
          field: "email",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Please provide a valid email address.",
          field: "email",
        },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          message: "Password is required.",
          field: "password",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const passwordIsValid = await compare(
      password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const token = await createAuthToken(user.id);

    const response = NextResponse.json(
      {
        message: "Login successful.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set({
      name: getAuthCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        message: "Unable to log in. Please try again.",
      },
      { status: 500 },
    );
  }
}