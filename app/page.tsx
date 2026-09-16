
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white sm:text-6xl">
          Welcome to Habit Tracker
        </h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 sm:text-xl">
          Build better habits and track your progress with ease.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/register"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="rounded-lg border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Log In
          </a>
        </div>
      </main>
    </div>
  );
}
