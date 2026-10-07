import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ExpenseRequestBody {
  description?: string;
  amount?: number;
  category?: string;
  date?: string;
}

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
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
    const existingExpense =
      await prisma.expenseRecord.findFirst({
        where: {
          id,
          userId,
        },
      });
    if (!existingExpense) {
      return NextResponse.json(
        { message: "Expense record not found." },
        { status: 404 }
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
    const updatedExpense =
      await prisma.expenseRecord.update({
        where: {
          id: existingExpense.id,
        },
        data: {
          amount,
          category,
          note: description,
          date,
        },
      });
    return NextResponse.json({
      id: updatedExpense.id,
      description: updatedExpense.note ?? "",
      amount: Number(updatedExpense.amount),
      category: updatedExpense.category,
      date: updatedExpense.date.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("PATCH /api/expenses/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to update expense record." },
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
    const existingExpense =
      await prisma.expenseRecord.findFirst({
        where: {
          id,
          userId,
        },
        select: {
          id: true,
        },
      });
    if (!existingExpense) {
      return NextResponse.json(
        { message: "Expense record not found." },
        { status: 404 }
      );
    }
    await prisma.expenseRecord.delete({
      where: {
        id: existingExpense.id,
      },
    });
    return NextResponse.json({
      message: "Expense record deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/expenses/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to delete expense record." },
      { status: 500 }
    );
  }
}