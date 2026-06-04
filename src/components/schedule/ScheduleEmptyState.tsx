import { CalendarOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScheduleEmptyStateProps {
  onCreateClick: () => void;
}

export function ScheduleEmptyState({ onCreateClick }: ScheduleEmptyStateProps) {
  return (
    <div className="text-center p-12 bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl space-y-4">
      <CalendarOff size={48} className="mx-auto text-zinc-600 animate-pulse" />
      <h3 className="font-display text-xl uppercase tracking-wide">
        No Games Scheduled
      </h3>
      <p className="text-sm text-zinc-500 max-w-sm mx-auto font-condensed uppercase tracking-wider">
        Add upcoming games to populate the public schedule board.
      </p>
      <Button
        onClick={onCreateClick}
        className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl border-none cursor-pointer"
      >
        Schedule First Game
      </Button>
    </div>
  );
}
