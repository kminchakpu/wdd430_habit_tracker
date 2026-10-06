import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const firstName = user.name.trim().split(/\s+/)[0];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Your Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome, {firstName}!
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Track your daily habits and stay on top of your health
            and finances from one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold text-green-700">
                HEALTH
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Health Tracking
              </h2>

              <p className="mt-2 text-slate-600">
                Build healthier habits by keeping track of your
                meals, exercise, and daily water intake.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/meals"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-green-500 hover:bg-green-50"
              >
                <span>Track Meals</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/exercise"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-green-500 hover:bg-green-50"
              >
                <span>Track Exercise</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/water"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-green-500 hover:bg-green-50"
              >
                <span>Track Water</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <Link
              href="/health"
              className="mt-6 inline-flex font-semibold text-green-700 transition hover:text-green-800 hover:underline"
            >
              View health overview
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-700">
                FINANCE
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Finance Tracking
              </h2>

              <p className="mt-2 text-slate-600">
                Manage your finances by recording your income,
                expenses, and savings.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/income"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span>Track Income</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/expenses"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span>Track Expenses</span>
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/savings"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-4 font-medium text-slate-800 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <span>Track Savings</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#1d2939] px-6 py-7 text-white">
          <h2 className="text-xl font-bold">
            Small habits create meaningful progress.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Keep your records up to date so you can better understand
            your health and financial habits over time.
          </p>
        </div>
      </div>
    </section>
  );
}