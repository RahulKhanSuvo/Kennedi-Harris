import Container from "@/components/common/Container";
import HighlightsSection from "./HighlightsSection";
import ScheduleSection from "./ScheduleSection";

export default function HighlightAndSchedule() {
  return (
    <Container className=" py-3.5">
      <div className="flex flex-col md:flex-row gap-6">
        <HighlightsSection />
        <ScheduleSection />
      </div>
    </Container>
  );
}
