import HighlightsSection from "./HighlightsSection";
import ScheduleSection from "./ScheduleSection";

export default function HighlightAndSchedule() {
  return (
    <section className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 py-3.5">
      <div className="flex gap-6">
        <HighlightsSection />
        <ScheduleSection />
      </div>
    </section>
  );
}
