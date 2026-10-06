import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
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
    const where: Prisma.WaterWhereInput = {
      userId,
    };
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    const waterLogs = await prisma.water.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json({ waterLogs });
  } catch (error) {
    console.error("Error fetching water logs:", error);
    return NextResponse.json(
      { message: "Unable to fetch water logs" },
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
    const amount =
      typeof body.amount === "number" ? body.amount : 0;
    const date =
      typeof body.date === "string" ? body.date : "";
    if (amount <= 0) {
      return NextResponse.json(
        {
          message: "Amount must be greater than 0",
          field: "amount",
        },
        { status: 400 }
      );
    }
    if (!date) {
      return NextResponse.json(
        {
          message: "Date is required",
          field: "date",
        },
        { status: 400 }
      );
    }
    const waterLog = await prisma.water.create({
      data: {
        userId,
        amount,
        date: new Date(date),
      },
    });
    return NextResponse.json(
      {
        message: "Water log created successfully",
        waterLog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating water log:", error);
    return NextResponse.json(
      { message: "Unable to create water log" },
      { status: 500 }
    );
  }
}