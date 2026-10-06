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

    console.log("Attempting to delete exercise with ID:", id);

    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      console.log("Exercise not found with ID:", id);
      return NextResponse.json(
        { message: "Exercise not found" },
        { status: 404 }
      );
    }

    if (exercise.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.exercise.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Exercise deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return NextResponse.json(
      { message: "Unable to delete exercise" },
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

    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      return NextResponse.json(
        { message: "Exercise not found" },
        { status: 404 }
      );
    }

    if (exercise.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const updateData: any = {};

    if (typeof body.name === "string") {
      updateData.name = body.name.trim();
    }
    if (typeof body.duration === "number") {
      updateData.duration = body.duration;
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

    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Exercise updated successfully", exercise: updatedExercise },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json(
      { message: "Unable to update exercise" },
      { status: 500 }
    );
  }
}
