import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  normalizeEmail,
} from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? normalizeEmail(body.email)
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!name) {
      return NextResponse.json(
        {
          message: "Name is required.",
          field: "name",
        },
        { status: 400 },
      );
    }

    if (!isValidName(name)) {
      return NextResponse.json(
        {
          message: "Name must contain at least 2 characters.",
          field: "name",
        },
        { status: 400 },
      );
    }

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

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters.",
          field: "password",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "An account with this email already exists.",
          field: "email",
        },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        message: "Unable to create account. Please try again.",
      },
      { status: 500 },
    );
  }
}