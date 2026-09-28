import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Build Healthy Habits & Track Your Finances
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Your all-in-one solution for tracking meals, exercise, water intake, income, expenses, and savings. Start building better habits today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Secure Authentication"
            description="Create your account with our secure sign-up system. Your personal data is protected with encrypted sessions."
            link="/register"
            linkText="Get Started"
          />
          
          <FeatureCard
            title="Profile Management"
            description="Update your profile information and keep your personal details current and accurate."
            link="/login"
            linkText="Sign In"
          />
          
          <FeatureCard
            title="Coming Soon"
            description="Health tracking for meals, exercise, and water intake. Plus comprehensive financial tracking."
            link="/register"
            linkText="Join Waitlist"
          />
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, link, linkText }: { 
  title: string; 
  description: string; 
  link: string; 
  linkText: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <Link
        href={link}
        className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
      >
        {linkText}
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
