"use client";

import { useRouter, useSearchParams } from "next/navigation";

import PeriodSelector, {
  type DashboardPeriod,
} from "./PeriodSelector";

interface DashboardPeriodSelectorProps {
  value: DashboardPeriod;
}

export default function DashboardPeriodSelector({
  value,
}: DashboardPeriodSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (period: DashboardPeriod) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("period", period);

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <PeriodSelector
      value={value}
      onChange={handleChange}
    />
  );
}