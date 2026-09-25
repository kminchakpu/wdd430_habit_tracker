import React from "react";

interface HabitFormProps {
  mode: "create" | "edit";
}

const HabitForm = ({ mode }: HabitFormProps) => {
  return (
    <div className="bg-slate-100 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="mb-6 font-play text-3xl font-bold text-slate-900 sm:text-4xl">
            {mode === "create" ? "Create Habit" : "Edit Habit"}
          </h1>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Habit Name
              </label>

              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe your habit..."
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="frequency"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Frequency
              </label>

              <select
                id="frequency"
                name="frequency"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="" disabled>
                  Select frequency
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Start Date
              </label>

              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="goal"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Goal
              </label>

              <input
                type="text"
                id="goal"
                name="goal"
                placeholder="30 minutes"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="reminder"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Reminder
              </label>

              <input
                type="time"
                id="reminder"
                name="reminder"
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="">Select a category</option>
                <option value="health">Health</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              {mode === "create" ? "Create Habit" : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;