interface FinancialSummaryProps {
  income: number;
  expenses: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FinancialSummary({
  income,
  expenses,
}: FinancialSummaryProps) {
  const balance = income - expenses;

  return (
    <section
      aria-labelledby="financial-summary-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2
          id="financial-summary-heading"
          className="text-lg font-bold text-slate-900"
        >
          Financial Summary
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your financial activity this month
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-green-700">
            Income
          </p>
          <p className="mt-2 text-xl font-bold text-green-800">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Expenses
          </p>
          <p className="mt-2 text-xl font-bold text-red-800">
            {formatCurrency(expenses)}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Balance
          </p>
          <p
            className={`mt-2 text-xl font-bold ${
              balance >= 0
                ? "text-blue-800"
                : "text-red-700"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Income remaining
          </span>
          <span
            className={`text-sm font-semibold ${
              balance >= 0
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {income > 0
              ? `${Math.round((balance / income) * 100)}%`
              : "0%"}
          </span>
        </div>
      </div>
    </section>
  );
}