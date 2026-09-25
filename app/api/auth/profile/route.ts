import { NextResponse } from "next/server";

import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  isValidEmail,
  isValidName,
  normalizeEmail,
} from "@/lib/validation";

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Authentication required.",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User profile not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get profile error:", error);

    return NextResponse.json(
      {
        message: "Unable to load your profile.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Authentication required.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? normalizeEmail(body.email)
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

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "That email address is already in use.",
          field: "email",
        },
        { status: 409 },
      );
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully.",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      {
        message: "Unable to update your profile.",
      },
      { status: 500 },
    );
  }
}