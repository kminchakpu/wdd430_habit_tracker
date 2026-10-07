import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ExpenseRequestBody {
  description?: string;
  amount?: number;
  category?: string;
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
    const expenseRecords = await prisma.expenseRecord.findMany({
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
    const expenses = expenseRecords.map((record) => ({
      id: record.id,
      description: record.note ?? "",
      amount: Number(record.amount),
      category: record.category,
      date: record.date.toISOString().split("T")[0],
    }));
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("GET /api/expenses error:", error);
    return NextResponse.json(
      { message: "Unable to retrieve expense records." },
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
    const body = (await request.json()) as ExpenseRequestBody;
    const description = body.description?.trim();
    const category = body.category?.trim();
    const amount = Number(body.amount);
    if (!description) {
      return NextResponse.json(
        { message: "Description is required." },
        { status: 400 }
      );
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than zero." },
        { status: 400 }
      );
    }
    if (!category) {
      return NextResponse.json(
        { message: "Category is required." },
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
    const expenseRecord = await prisma.expenseRecord.create({
      data: {
        userId,
        amount,
        category,
        note: description,
        date,
      },
    });
    return NextResponse.json(
      {
        id: expenseRecord.id,
        description: expenseRecord.note ?? "",
        amount: Number(expenseRecord.amount),
        category: expenseRecord.category,
        date: expenseRecord.date.toISOString().split("T")[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/expenses error:", error);
    return NextResponse.json(
      { message: "Unable to create expense record." },
      { status: 500 }
    );
  }
}