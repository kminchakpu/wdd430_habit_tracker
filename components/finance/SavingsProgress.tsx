"use client";

interface SavingsProgressProps {
  amount: number;
  goal: number;
}

export default function SavingsProgress({
  amount,
  goal,
}: SavingsProgressProps) {
  const safeGoal = goal > 0 ? goal : 0;
  const progress = safeGoal > 0 ? Math.min((amount / safeGoal) * 100, 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-900 text-sm font-semibold">
          Savings Progress
        </span>

        <span className="text-emerald-600 text-sm font-semibold">
          {progress.toFixed(0)}%
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-slate-500 text-xs mt-2">
        $
        {amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        of $
        {safeGoal.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}
