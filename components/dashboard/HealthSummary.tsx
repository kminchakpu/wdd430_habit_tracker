interface HealthProgress {
  current: number;
  goal: number;
}

interface ExerciseSummary {
  duration: number;
  caloriesBurned: number;
}

interface HealthSummaryProps {
  calories: HealthProgress;
  exercise: ExerciseSummary;
  water: HealthProgress;
}

function getProgressPercentage(
  current: number,
  goal: number
) {
  if (goal <= 0) {
    return 0;
  }

  return Math.min(
    Math.max((current / goal) * 100, 0),
    100
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(value);
}

export default function HealthSummary({
  calories,
  exercise,
  water,
}: HealthSummaryProps) {
  const calorieProgress =
    getProgressPercentage(
      calories.current,
      calories.goal
    );

  const waterProgress =
    getProgressPercentage(
      water.current,
      water.goal
    );

  return (
    <section
      aria-labelledby="health-summary-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2
          id="health-summary-heading"
          className="text-lg font-bold text-slate-900"
        >
          Health Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your health activity for the selected
          period
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                Calories
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {formatNumber(
                  calories.current
                )}{" "}
                /{" "}
                {formatNumber(
                  calories.goal
                )}{" "}
                kcal
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {Math.round(
                calorieProgress
              )}
              %
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Calorie progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              calorieProgress
            )}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${calorieProgress}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-700">
            Exercise
          </h3>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {formatNumber(
                  exercise.duration
                )}{" "}
                min
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatNumber(
                  exercise.caloriesBurned
                )}{" "}
                kcal burned
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Selected period
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                Water
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {formatNumber(
                  water.current
                )}{" "}
                /{" "}
                {formatNumber(
                  water.goal
                )}{" "}
                ml
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {Math.round(
                waterProgress
              )}
              %
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Water progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              waterProgress
            )}
          >
            <div
              className="h-full rounded-full bg-cyan-500 transition-all"
              style={{
                width: `${waterProgress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}