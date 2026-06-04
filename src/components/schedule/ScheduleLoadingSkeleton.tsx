export function ScheduleLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-14 bg-kh-dark-2 border border-white/5 animate-pulse rounded"
        />
      ))}
    </div>
  );
}
