export interface SavingsRecord {
  id: string;
  amount: number;
  note?: string;
  date: string;
}

interface SavingsSummaryProps {
  savings: SavingsRecord[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function SavingsSummary({
  savings,
}: SavingsSummaryProps) {
  const totalSavings = savings.reduce(
    (total, saving) => total + saving.amount,
    0
  );

  const recentSavings = [...savings]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 3);

  return (
    <section
      aria-labelledby="savings-summary-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="savings-summary-heading"
            className="text-lg font-bold text-slate-900"
          >
            Savings Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your current savings activity
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total Savings
          </p>

          <p className="mt-1 text-2xl font-bold text-green-700">
            {formatCurrency(totalSavings)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-700">
          Recent Savings
        </h3>

        {recentSavings.length === 0 ? (
          <div className="mt-4 rounded-lg bg-slate-50 p-5 text-center">
            <p className="text-sm font-medium text-slate-700">
              No savings recorded yet.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your recent savings will appear here.
            </p>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {recentSavings.map((saving) => (
              <li
                key={saving.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {saving.note?.trim() ||
                      "Savings deposit"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatDate(saving.date)}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold text-green-700">
                  {formatCurrency(saving.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}