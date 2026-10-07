import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type IncomeType = "fixed" | "variable";

interface IncomeRequestBody {
  description?: string;
  amount?: number;
  type?: IncomeType;
  startDate?: string;
}

function isValidIncomeType(type: string): type is IncomeType {
  return type === "fixed" || type === "variable";
}

function parseOptionalDate(value?: string) {
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
    const incomeRecords = await prisma.incomeRecord.findMany({
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
    const income = incomeRecords.map((record) => ({
      id: record.id,
      description: record.source,
      amount: Number(record.amount),
      type: record.type,
      startDate: record.date
        ? record.date.toISOString().split("T")[0]
        : undefined,
    }));
    return NextResponse.json(income);
  } catch (error) {
    console.error("GET /api/income error:", error);
    return NextResponse.json(
      { message: "Unable to retrieve income records." },
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
    const body = (await request.json()) as IncomeRequestBody;
    const description = body.description?.trim();
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
    if (!body.type || !isValidIncomeType(body.type)) {
      return NextResponse.json(
        {
          message:
            "Income type must be either fixed or variable.",
        },
        { status: 400 }
      );
    }
    const date = parseOptionalDate(body.startDate);
    if (body.startDate && !date) {
      return NextResponse.json(
        { message: "Start date is invalid." },
        { status: 400 }
      );
    }
    const incomeRecord = await prisma.incomeRecord.create({
      data: {
        userId,
        source: description,
        amount,
        type: body.type,
        date,
      },
    });
    return NextResponse.json(
      {
        id: incomeRecord.id,
        description: incomeRecord.source,
        amount: Number(incomeRecord.amount),
        type: incomeRecord.type,
        startDate: incomeRecord.date
          ? incomeRecord.date.toISOString().split("T")[0]
          : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/income error:", error);
    return NextResponse.json(
      { message: "Unable to create income record." },
      { status: 500 }
    );
  }
}