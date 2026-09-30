import type { Metadata } from "next";
import { Play, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAuthenticatedUserId } from "@/lib/auth";

const play = Play({
  variable: "--font-play",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Habit Tracker",
    template: "%s | Habit Tracker",
  },
  description:
    "Build healthier habits, track your daily activities, and manage your personal finances with Habit Tracker.",
  openGraph: {
    title: "Habit Tracker",
    description:
      "Build healthier habits, track your daily activities, and manage your personal finances with Habit Tracker.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Habit Tracker - Healthier habits. Smarter finances.",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const userId = await getAuthenticatedUserId();
  const isAuthenticated = Boolean(userId);

  return (
    <html
      lang="en"
      className={`${play.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header isAuthenticated={isAuthenticated} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}