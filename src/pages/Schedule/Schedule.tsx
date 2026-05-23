import { useEffect } from "react";
import { ScheduleHero } from "./components/ScheduleHero";
import { SeasonSchedule } from "./components/SeasonSchedule";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { SubscribeBanner } from "./components/SubscribeBanner";

export default function Schedule() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <ScheduleHero />
      <SeasonSchedule />
      <UpcomingEvents />
      <SubscribeBanner />
    </main>
  );
}
