import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#344054] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Ready to Start Your Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-cyan-100">
          Create an account today and start building healthier habits while
          taking control of your finances.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex rounded-lg bg-rose-600 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}