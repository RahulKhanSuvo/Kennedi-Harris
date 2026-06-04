export function ScheduleErrorState() {
  return (
    <div className="p-8 text-center bg-red-950/20 border border-red-500/10 rounded-2xl">
      <p className="text-red-400 font-condensed uppercase tracking-wider text-sm">
        Failed to retrieve schedule data. Please try again later.
      </p>
    </div>
  );
}
