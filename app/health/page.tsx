import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/auth";
import HealthContent from "@/app/health/HealthContent";

export default async function HealthPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/login");
  }

  return <HealthContent />;
}
