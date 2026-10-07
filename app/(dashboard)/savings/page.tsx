import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SavingsCard from "@/components/finance/SavingsCard";
import SavingsForm from "@/components/finance/SavingsForm";
import SavingsList from "@/components/finance/SavingsList";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SavingsFormData {
  amount: number;
  note?: string;
  date: string;
}

export default async function SavingsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;
  const { edit } = await searchParams;

  const records = await prisma.savingsRecord.findMany({
    where: { userId },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
  const savings = records.map((record) => ({
    id: record.id,
    amount: Number(record.amount),
    note: record.note ?? undefined,
    date: record.date.toISOString().slice(0, 10),
  }));
  const editingSaving = savings.find((saving) => saving.id === edit);
  const totalSavings = savings.reduce(
    (total, saving) => total + saving.amount,
    0,
  );

  async function saveSaving(id: string | null, data: SavingsFormData) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    if (
      !Number.isFinite(data.amount) ||
      data.amount <= 0 ||
      typeof data.date !== "string" ||
      Number.isNaN(new Date(data.date).getTime())
    )
      throw new Error("Invalid savings data");

    const savingData = {
      amount: data.amount,
      note: typeof data.note === "string" ? data.note.trim() || null : null,
      date: new Date(`${data.date}T00:00:00.000Z`),
    };
    if (id) {
      const result = await prisma.savingsRecord.updateMany({
        where: { id, userId: authenticatedUserId },
        data: savingData,
      });
      if (result.count === 0) throw new Error("Savings record not found");
    } else {
      await prisma.savingsRecord.create({
        data: { ...savingData, userId: authenticatedUserId },
      });
    }
    revalidatePath("/savings");
    redirect("/savings");
  }

  async function deleteSaving(id: string) {
    "use server";
    const authenticatedUserId = await getAuthenticatedUserId();
    if (!authenticatedUserId) throw new Error("Unauthorized");
    await prisma.savingsRecord.deleteMany({
      where: { id, userId: authenticatedUserId },
    });
    revalidatePath("/savings");
  }

  async function startEditing(saving: { id: string }) {
    "use server";
    redirect(`/savings?edit=${encodeURIComponent(saving.id)}`);
  }

  async function cancelEditing() {
    "use server";
    redirect("/savings");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Savings
        </h1>
        <p className="mt-2 text-slate-600">
          Track the money you set aside and monitor your total savings.
        </p>
      </header>

      <section aria-label="Savings overview" className="mb-8">
        <SavingsCard name="Total saved" savings={totalSavings} />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="savings-form-heading"
        >
          <div className="mb-4">
            <h2
              id="savings-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingSaving ? "Edit savings" : "Add a savings record"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Record an amount you have added to your savings.
            </p>
          </div>
          <SavingsForm
            key={`saving-${editingSaving?.id ?? "new"}`}
            saving={editingSaving}
            onSubmit={saveSaving.bind(null, editingSaving?.id ?? null)}
            onCancel={cancelEditing}
          />
        </section>

        <section
          className="lg:col-span-2"
          aria-labelledby="savings-list-heading"
        >
          <div className="mb-4">
            <h2
              id="savings-list-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Savings records
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {savings.length} {savings.length === 1 ? "record" : "records"}{" "}
              tracked
            </p>
          </div>
          <SavingsList
            savings={savings}
            onEdit={startEditing}
            onDelete={deleteSaving}
          />
        </section>
      </div>
    </main>
  );
}
