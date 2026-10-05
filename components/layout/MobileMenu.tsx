"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/health",
    label: "Health",
  },
  {
    href: "/finances",
    label: "Finances",
  },
  {
    href: "/analytics",
    label: "Analytics",
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <nav
      id="mobile-navigation"
      className="border-t border-slate-200 bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
          <Link
            href="/login"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Log In
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}