import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/login");
  }

  return <>{children}</>;
}