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

    console.log("Attempting to delete water log with ID:", id);

    const waterLog = await prisma.water.findUnique({
      where: { id },
    });

    if (!waterLog) {
      console.log("Water log not found with ID:", id);
      return NextResponse.json(
        { message: "Water log not found" },
        { status: 404 }
      );
    }

    if (waterLog.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.water.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Water log deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting water log:", error);
    return NextResponse.json(
      { message: "Unable to delete water log" },
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

    const waterLog = await prisma.water.findUnique({
      where: { id },
    });

    if (!waterLog) {
      return NextResponse.json(
        { message: "Water log not found" },
        { status: 404 }
      );
    }

    if (waterLog.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const updateData: any = {};

    if (typeof body.amount === "number") {
      updateData.amount = body.amount;
    }
    if (typeof body.date === "string") {
      updateData.date = new Date(body.date);
    }

    const updatedWaterLog = await prisma.water.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Water log updated successfully", waterLog: updatedWaterLog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating water log:", error);
    return NextResponse.json(
      { message: "Unable to update water log" },
      { status: 500 }
    );
  }
}
