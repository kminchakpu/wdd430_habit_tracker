import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SavingsRequestBody {
  amount?: number;
  note?: string;
  date?: string;
}

function parseDate(value?: string) {
  if (!value) {
    return null;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }
    const savingsRecords = await prisma.savingsRecord.findMany({
      where: {
        userId,
      },
      orderBy: [
        {
          date: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
    const savings = savingsRecords.map((record) => ({
      id: record.id,
      amount: Number(record.amount),
      note: record.note ?? "",
      date: record.date.toISOString().split("T")[0],
    }));
    return NextResponse.json(savings);
  } catch (error) {
    console.error("GET /api/savings error:", error);
    return NextResponse.json(
      { message: "Unable to retrieve savings records." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }
    const body = (await request.json()) as SavingsRequestBody;
    const amount = Number(body.amount);
    const note = body.note?.trim() || null;
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than zero." },
        { status: 400 }
      );
    }
    const date = parseDate(body.date);
    if (!date) {
      return NextResponse.json(
        { message: "A valid date is required." },
        { status: 400 }
      );
    }
    const savingsRecord = await prisma.savingsRecord.create({
      data: {
        userId,
        amount,
        note,
        date,
      },
    });
    return NextResponse.json(
      {
        id: savingsRecord.id,
        amount: Number(savingsRecord.amount),
        note: savingsRecord.note ?? "",
        date: savingsRecord.date.toISOString().split("T")[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/savings error:", error);
    return NextResponse.json(
      { message: "Unable to create savings record." },
      { status: 500 }
    );
  }
}