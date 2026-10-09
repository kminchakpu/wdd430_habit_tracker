import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import IncomeCard from "@/components/finance/IncomeCard";
import IncomeForm from "@/components/finance/IncomeForm";
import IncomeList from "@/components/finance/IncomeList";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface IncomeFormData {
  description: string;
  amount: number;
  type: "fixed" | "variable";
  startDate?: string;
}

export default async function IncomePage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;

  const { edit } = await searchParams;
  const records = await prisma.incomeRecord.findMany({
    where: { userId },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
  const incomes = records.map((record) => ({
    id: record.id,
    description: record.source,
    amount: Number(record.amount),
    type:
      record.type === "variable" ? ("variable" as const) : ("fixed" as const),
    startDate: record.date?.toISOString().slice(0, 10),
  }));
  const editingIncome = incomes.find((income) => income.id === edit);
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const currentYear = String(now.getFullYear());
  const monthlyIncome = incomes
    .filter(
      (income) =>
        !income.startDate || income.startDate.startsWith(currentMonth),
    )
    .reduce((total, income) => total + income.amount, 0);
  const yearlyIncome = incomes
    .filter(
      (income) => !income.startDate || income.startDate.startsWith(currentYear),
    )
    .reduce((total, income) => total + income.amount, 0);

  async function saveIncome(id: string | null, data: IncomeFormData) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    if (
      typeof data.description !== "string" ||
      !data.description.trim() ||
      !Number.isFinite(data.amount) ||
      data.amount <= 0 ||
      !["fixed", "variable"].includes(data.type)
    ) {
      throw new Error("Invalid income data");
    }

    const recordData = {
      source: data.description.trim(),
      amount: data.amount,
      type: data.type,
      date: data.startDate ? new Date(`${data.startDate}T00:00:00.000Z`) : null,
    };

    if (id) {
      const result = await prisma.incomeRecord.updateMany({
        where: { id, userId: authenticatedUserId },
        data: recordData,
      });
      if (result.count === 0) throw new Error("Income record not found");
    } else {
      await prisma.incomeRecord.create({
        data: { ...recordData, userId: authenticatedUserId },
      });
    }
    revalidatePath("/income");
    redirect("/income");
  }

  async function deleteIncome(id: string) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    await prisma.incomeRecord.deleteMany({
      where: { id, userId: authenticatedUserId },
    });
    revalidatePath("/income");
  }

  async function startEditing(income: { id: string }) {
    "use server";
    redirect(`/income?edit=${encodeURIComponent(income.id)}`);
  }

  async function cancelEditing() {
    "use server";
    redirect("/income");
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Income
        </h1>
        <p className="mt-2 text-slate-600">
          Track your income sources and keep an eye on your monthly earnings.
        </p>
      </header>

      <section aria-label="Income summary" className="mb-8">
        <IncomeCard
          weeklyIncome={(monthlyIncome * 12) / 52}
          monthlyIncome={monthlyIncome}
          yearlyIncome={yearlyIncome}
        />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="income-form-heading"
        >
          <div className="mb-4">
            <h2
              id="income-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingIncome ? "Edit income source" : "Add an income source"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Enter the monthly amount you receive.
            </p>
          </div>
          <IncomeForm
            key={`income-${editingIncome?.id ?? "new"}`}
            income={editingIncome}
            onSubmit={saveIncome.bind(null, editingIncome?.id ?? null)}
            onCancel={cancelEditing}
          />
        </section>

        <section
          className="lg:col-span-2"
          aria-labelledby="income-list-heading"
        >
          <div className="mb-4">
            <h2
              id="income-list-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Income sources
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {incomes.length} {incomes.length === 1 ? "source" : "sources"}{" "}
              tracked
            </p>
          </div>
          <IncomeList
            incomes={incomes}
            onEdit={startEditing}
            onDelete={deleteIncome}
          />
        </section>
      </div>
    </main>
  );
}
