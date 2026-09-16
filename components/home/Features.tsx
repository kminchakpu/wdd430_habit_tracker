const features = [
  {
    icon: "♥",
    title: "Track Healthy Habits",
    description:
      "Record healthy meals, exercise activities, and daily water intake.",
  },
  {
    icon: "₦",
    title: "Manage Finances",
    description:
      "Track your income, expenses, savings, and financial activity.",
  },
  {
    icon: "▥",
    title: "See Your Progress",
    description:
      "Understand your progress with dashboards, charts, streaks, and insights.",
  },
  {
    icon: "✓",
    title: "All in One Place",
    description:
      "Manage your health and financial progress from one secure application.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
            Everything You Need
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Build better habits in one place
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Keep your health and financial goals organized without switching
            between multiple applications.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="text-center"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-700">
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}