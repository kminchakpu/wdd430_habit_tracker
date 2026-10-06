import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Attempting to delete meal with ID:", id);

    const meal = await prisma.meal.findUnique({
      where: { id },
    });

    if (!meal) {
      console.log("Meal not found with ID:", id);
      return NextResponse.json(
        { message: "Meal not found" },
        { status: 404 }
      );
    }

    if (meal.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.meal.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Meal deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting meal:", error);
    return NextResponse.json(
      { message: "Unable to delete meal" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    const { id } = await params;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const meal = await prisma.meal.findUnique({
      where: { id },
    });

    if (!meal) {
      return NextResponse.json(
        { message: "Meal not found" },
        { status: 404 }
      );
    }

    if (meal.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const updateData: any = {};

    if (typeof body.name === "string") {
      updateData.name = body.name.trim();
    }
    if (typeof body.calories === "number") {
      updateData.calories = body.calories;
    }
    if (typeof body.date === "string") {
      updateData.date = new Date(body.date);
    }
    if (typeof body.notes === "string") {
      updateData.notes = body.notes.trim() || null;
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Meal updated successfully", meal: updatedMeal },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating meal:", error);
    return NextResponse.json(
      { message: "Unable to update meal" },
      { status: 500 }
    );
  }
}
