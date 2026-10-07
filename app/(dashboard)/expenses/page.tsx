import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ExpenseCard from "@/components/finance/ExpenseCard";
import ExpenseFilters from "@/components/finance/ExpenseFilters";
import ExpenseForm from "@/components/finance/ExpenseForm";
import ExpenseList from "@/components/finance/ExpenseList";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFilterValues {
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

const DEFAULT_CATEGORIES = [
  "Housing",
  "Utilities",
  "Groceries",
  "Transportation",
  "Healthcare",
  "Dining",
  "Entertainment",
  "Shopping",
  "Education",
  "Other",
];

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<{
    edit?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: string;
    maxAmount?: string;
  }>;
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;

  const params = await searchParams;
  const records = await prisma.expenseRecord.findMany({
    where: { userId },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
  const expenses = records.map((record) => ({
    id: record.id,
    description: record.note ?? "",
    amount: Number(record.amount),
    category: record.category,
    date: record.date.toISOString().slice(0, 10),
  }));
  const editingExpense = expenses.find((expense) => expense.id === params.edit);
  const filters: ExpenseFilterValues = {
    category: params.category,
    startDate: params.startDate,
    endDate: params.endDate,
    minAmount: params.minAmount ? Number(params.minAmount) : undefined,
    maxAmount: params.maxAmount ? Number(params.maxAmount) : undefined,
  };
  const categories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...expenses.map((expense) => expense.category),
    ]),
  ).sort();
  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category && expense.category !== filters.category) return false;
    if (filters.startDate && expense.date < filters.startDate) return false;
    if (filters.endDate && expense.date > filters.endDate) return false;
    if (filters.minAmount !== undefined && expense.amount < filters.minAmount)
      return false;
    if (filters.maxAmount !== undefined && expense.amount > filters.maxAmount)
      return false;
    return true;
  });

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const currentYear = String(now.getFullYear());
  const monthlyExpenses = expenses
    .filter((expense) => expense.date.startsWith(currentMonth))
    .reduce((total, expense) => total + expense.amount, 0);
  const yearlyRecords = expenses.filter((expense) =>
    expense.date.startsWith(currentYear),
  );
  const yearlyExpenses = yearlyRecords.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const categoryBreakdown = Array.from(
    yearlyRecords.reduce((totals, expense) => {
      totals.set(
        expense.category,
        (totals.get(expense.category) ?? 0) + expense.amount,
      );
      return totals;
    }, new Map<string, number>()),
  )
    .map(([name, amount]) => ({
      name,
      amount,
      percentage:
        yearlyExpenses > 0 ? Math.round((amount / yearlyExpenses) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  async function saveExpense(id: string | null, data: ExpenseFormData) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    if (
      typeof data.description !== "string" ||
      !Number.isFinite(data.amount) ||
      data.amount <= 0 ||
      typeof data.category !== "string" ||
      !data.category.trim() ||
      typeof data.date !== "string" ||
      Number.isNaN(new Date(data.date).getTime())
    )
      throw new Error("Invalid expense data");

    const expenseData = {
      amount: data.amount,
      category: data.category.trim(),
      note: data.description.trim() || null,
      date: new Date(`${data.date}T00:00:00.000Z`),
    };
    if (id) {
      const result = await prisma.expenseRecord.updateMany({
        where: { id, userId: authenticatedUserId },
        data: expenseData,
      });
      if (result.count === 0) throw new Error("Expense not found");
    } else {
      await prisma.expenseRecord.create({
        data: { ...expenseData, userId: authenticatedUserId },
      });
    }
    revalidatePath("/expenses");
    redirect("/expenses");
  }

  async function deleteExpense(id: string) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    await prisma.expenseRecord.deleteMany({
      where: { id, userId: authenticatedUserId },
    });
    revalidatePath("/expenses");
  }

  async function startEditing(expense: { id: string }) {
    "use server";
    redirect(`/expenses?edit=${encodeURIComponent(expense.id)}`);
  }

  async function updateFilters(nextFilters: ExpenseFilterValues) {
    "use server";
    const search = new URLSearchParams();
    if (nextFilters.category) search.set("category", nextFilters.category);
    if (nextFilters.startDate) search.set("startDate", nextFilters.startDate);
    if (nextFilters.endDate) search.set("endDate", nextFilters.endDate);
    if (nextFilters.minAmount !== undefined)
      search.set("minAmount", String(nextFilters.minAmount));
    if (nextFilters.maxAmount !== undefined)
      search.set("maxAmount", String(nextFilters.maxAmount));
    redirect(`/expenses${search.size ? `?${search}` : ""}`);
  }

  async function cancelEditing() {
    "use server";
    redirect("/expenses");
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Expenses
        </h1>
        <p className="mt-2 text-slate-600">
          Track your spending, review category totals, and stay on top of your
          budget.
        </p>
      </header>

      <section aria-label="Expense summary" className="mb-8">
        <ExpenseCard
          totalMonthly={monthlyExpenses}
          totalYearly={yearlyExpenses}
          categoryBreakdown={categoryBreakdown}
        />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="expense-form-heading"
        >
          <div className="mb-4">
            <h2
              id="expense-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingExpense ? "Edit expense" : "Add an expense"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Record the amount, category, and date of a purchase.
            </p>
          </div>
          <ExpenseForm
            key={`expense-${editingExpense?.id ?? "new"}`}
            expense={editingExpense}
            categories={categories}
            onSubmit={saveExpense.bind(null, editingExpense?.id ?? null)}
            onCancel={cancelEditing}
          />
        </section>

        <section
          className="space-y-4 lg:col-span-2"
          aria-labelledby="expense-list-heading"
        >
          <div className="mb-4">
            <h2
              id="expense-list-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Expense history
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing {filteredExpenses.length} of {expenses.length}{" "}
              {expenses.length === 1 ? "expense" : "expenses"}
            </p>
          </div>
          <ExpenseFilters
            key={JSON.stringify(filters)}
            categories={categories}
            onFilterChange={updateFilters}
            onReset={updateFilters.bind(null, {})}
          />
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={startEditing}
            onDelete={deleteExpense}
          />
        </section>
      </div>
    </main>
  );
}
