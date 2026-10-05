import Link from "next/link";

interface HabitCardProps {
  name: string;
  category: string;
  href: string;
  description: string;
}

export default function HabitCard({
  name,
  category,
  href,
  description,
}: HabitCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <h2 className="font-play text-xl font-bold text-slate-900">
          {name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {category}
        </p>
        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}  
      </div>

      <div className="mt-5">
        <Link
          href={href}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          View Tracker
        </Link>
      </div>
    </div>
  );
}