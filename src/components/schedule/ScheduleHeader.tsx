import { CalendarDays, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScheduleHeaderProps {
  onCreateClick: () => void;
  isLoading: boolean;
}

export function ScheduleHeader({
  onCreateClick,
  isLoading,
}: ScheduleHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-white/5">
      <div>
        <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2">
          <CalendarDays className="text-kh-pink" />
          Schedule Section
        </h2>
        <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-1">
          Manage game schedules, matchups, and venue locations
        </p>
      </div>

      {!isLoading && (
        <Button
          onClick={onCreateClick}
          className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
        >
          <PlusCircle size={14} />
          Add Game
        </Button>
      )}
    </div>
  );
}
