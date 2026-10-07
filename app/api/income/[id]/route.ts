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

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
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

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }
    const { id } = await context.params;
    const existingIncome = await prisma.incomeRecord.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!existingIncome) {
      return NextResponse.json(
        { message: "Income record not found." },
        { status: 404 }
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
    const updatedIncome = await prisma.incomeRecord.update({
      where: {
        id: existingIncome.id,
      },
      data: {
        source: description,
        amount,
        type: body.type,
        date,
      },
    });
    return NextResponse.json({
      id: updatedIncome.id,
      description: updatedIncome.source,
      amount: Number(updatedIncome.amount),
      type: updatedIncome.type,
      startDate: updatedIncome.date
        ? updatedIncome.date.toISOString().split("T")[0]
        : undefined,
    });
  } catch (error) {
    console.error("PATCH /api/income/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to update income record." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }
    const { id } = await context.params;
    const existingIncome = await prisma.incomeRecord.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
      },
    });
    if (!existingIncome) {
      return NextResponse.json(
        { message: "Income record not found." },
        { status: 404 }
      );
    }
    await prisma.incomeRecord.delete({
      where: {
        id: existingIncome.id,
      },
    });
    return NextResponse.json({
      message: "Income record deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/income/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to delete income record." },
      { status: 500 }
    );
  }
}