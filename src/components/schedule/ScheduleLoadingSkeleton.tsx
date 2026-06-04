export function ScheduleLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-14 bg-[#0c0c14] border border-white/5 animate-pulse rounded-xl"
        />
      ))}
    </div>
  );
}
