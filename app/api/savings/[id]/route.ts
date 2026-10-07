import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SavingsRequestBody {
  amount?: number;
  note?: string;
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
    const existingSavings =
      await prisma.savingsRecord.findFirst({
        where: {
          id,
          userId,
        },
      });
    if (!existingSavings) {
      return NextResponse.json(
        { message: "Savings record not found." },
        { status: 404 }
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
    const updatedSavings =
      await prisma.savingsRecord.update({
        where: {
          id: existingSavings.id,
        },
        data: {
          amount,
          note,
          date,
        },
      });
    return NextResponse.json({
      id: updatedSavings.id,
      amount: Number(updatedSavings.amount),
      note: updatedSavings.note ?? "",
      date: updatedSavings.date.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("PATCH /api/savings/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to update savings record." },
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
    const existingSavings =
      await prisma.savingsRecord.findFirst({
        where: {
          id,
          userId,
        },
        select: {
          id: true,
        },
      });
    if (!existingSavings) {
      return NextResponse.json(
        { message: "Savings record not found." },
        { status: 404 }
      );
    }
    await prisma.savingsRecord.delete({
      where: {
        id: existingSavings.id,
      },
    });
    return NextResponse.json({
      message: "Savings record deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/savings/[id] error:", error);
    return NextResponse.json(
      { message: "Unable to delete savings record." },
      { status: 500 }
    );
  }
}