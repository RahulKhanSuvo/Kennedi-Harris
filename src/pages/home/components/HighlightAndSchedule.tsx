import Container from "@/components/common/Container";
import HighlightsSection from "./HighlightsSection";
import ScheduleSection from "./ScheduleSection";
import type { HighlightData } from "@/types";

export default function HighlightAndSchedule({
  highlights,
}: {
  highlights: HighlightData | null;
}) {
  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-12 items-start justify-between">
        {/* Latest Highlights Section - Takes full width on mobile/tablet/laptop, and flexes to fill available space on xl+ */}
        <div className="w-full xl:flex-1 min-w-0">
          <HighlightsSection highlights={highlights} />
        </div>

        {/* Upcoming Schedule Section - Takes full width on mobile/tablet/laptop, and has a dedicated width on xl+ */}
        <div className="w-full xl:w-[420px] 2xl:w-[480px] shrink-0">
          <ScheduleSection />
        </div>
      </div>
    </Container>
  );
}
