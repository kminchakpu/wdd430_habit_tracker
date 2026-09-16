import Link from "next/link";

const footerLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/privacy",
    label: "Privacy",
  },
  {
    href: "/terms",
    label: "Terms",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">
              HT
            </div>
            <div>
              <Link href="/" className="font-bold text-slate-900">
                Habit Tracker
              </Link>
              <p className="mt-1 text-sm text-slate-500">
                Build Better Habits. Live a Better You.
              </p>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-center text-sm text-slate-500 lg:text-right">
            © {currentYear} Habit Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}