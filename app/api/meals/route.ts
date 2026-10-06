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

    const meals = await prisma.meal.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { message: "Unable to fetch meals" },
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
    const calories = typeof body.calories === "number" ? body.calories : 0;
    const date = typeof body.date === "string" ? body.date : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : null;

    if (!name) {
      return NextResponse.json(
        { message: "Meal name is required", field: "name" },
        { status: 400 }
      );
    }

    if (calories <= 0) {
      return NextResponse.json(
        { message: "Calories must be greater than 0", field: "calories" },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { message: "Date is required", field: "date" },
        { status: 400 }
      );
    }

    const meal = await prisma.meal.create({
      data: {
        userId,
        name,
        calories,
        date: new Date(date),
        notes,
      },
    });

    return NextResponse.json(
      { message: "Meal created successfully", meal },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating meal:", error);
    return NextResponse.json(
      { message: "Unable to create meal" },
      { status: 500 }
    );
  }
}
