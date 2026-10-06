import WaterCard from "./WaterCard";

interface Water {
  id: string;
  amount: number;
  date: string;
}

interface WaterListProps {
  waterLogs: Water[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  unit?: string;
}

export default function WaterList({
  waterLogs,
  onEdit,
  onDelete,
  unit = "ml",
}: WaterListProps) {
  if (waterLogs.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-100 p-8 text-center">
        <p className="text-sm text-slate-500">
          No water intake recorded yet. Add your first entry to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {waterLogs.map((water) => (
        <WaterCard
          key={water.id}
          {...water}
          unit={unit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
