import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = { userId };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const exercises = await prisma.exercise.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json(
      { message: "Unable to fetch exercises" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const duration = typeof body.duration === "number" ? body.duration : 0;
    const calories = typeof body.calories === "number" ? body.calories : 0;
    const date = typeof body.date === "string" ? body.date : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : null;

    if (!name) {
      return NextResponse.json(
        { message: "Exercise name is required", field: "name" },
        { status: 400 }
      );
    }

    if (duration <= 0) {
      return NextResponse.json(
        { message: "Duration must be greater than 0", field: "duration" },
        { status: 400 }
      );
    }

    if (calories < 0) {
      return NextResponse.json(
        { message: "Calories cannot be negative", field: "calories" },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { message: "Date is required", field: "date" },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.create({
      data: {
        userId,
        name,
        duration,
        calories,
        date: new Date(date),
        notes,
      },
    });

    return NextResponse.json(
      { message: "Exercise created successfully", exercise },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating exercise:", error);
    return NextResponse.json(
      { message: "Unable to create exercise" },
      { status: 500 }
    );
  }
}
