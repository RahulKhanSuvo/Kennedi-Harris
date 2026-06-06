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
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-6 xl:items-stretch justify-between">
        {/* Highlights */}
        <div className="w-full xl:flex-1 min-w-0">
          <HighlightsSection highlights={highlights} />
        </div>

        {/* Schedule - It will now perfectly stretch to match the Highlights height */}
        <div className="w-full xl:w-[420px] 2xl:w-[480px] shrink-0">
          <ScheduleSection />
        </div>
      </div>
    </Container>
  );
}
