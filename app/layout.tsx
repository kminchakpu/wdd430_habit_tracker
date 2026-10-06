import type { Metadata } from "next";
import { Play, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: "Habit Tracker - Build Healthy Habits & Track Finances",
  description: "Track your meals, exercise, water intake, income, expenses, and savings in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${play.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}