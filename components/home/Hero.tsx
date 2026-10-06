import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="mx-auto grid min-h-145 max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-200">
            Build Better Habits
          </p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            A Healthier You,
            <span className="block">A Brighter Future</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cyan-100">
            Track your health, manage your money, and understand your progress
            — all in one simple and secure application.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-200 pb-4">
              <span className="size-3 rounded-full bg-slate-300" />
              <span className="size-3 rounded-full bg-slate-300" />
              <span className="size-3 rounded-full bg-slate-300" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DashboardPreviewCard
                title="Healthy Meals"
                value="3 / 3"
                description="Today's goal"
              />
              <DashboardPreviewCard
                title="Exercise"
                value="30 min"
                description="Today"
              />
              <DashboardPreviewCard
                title="Water"
                value="6 / 8"
                description="Cups today"
              />
              <DashboardPreviewCard
                title="Savings"
                value="₦25,000"
                description="This month"
              />
            </div>
            <div className="mt-4 rounded-xl bg-slate-100 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-semibold text-slate-800">
                  Weekly Progress
                </span>
                <span className="text-sm text-slate-500">
                  This week
                </span>
              </div>
              <div className="flex h-32 items-end gap-3">
                {[45, 70, 55, 85, 65, 90, 78].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t bg-slate-400"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DashboardPreviewCardProps {
  title: string;
  value: string;
  description: string;
}

function DashboardPreviewCard({
  title,
  value,
  description,
}: DashboardPreviewCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}