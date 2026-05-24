import { SeasonSchedule } from "./components/SeasonSchedule";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { SubscribeBanner } from "./components/SubscribeBanner";
import ScheduleHero from "./components/ScheduleHero";

export default function Schedule() {
  // Scroll to top on mount

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <ScheduleHero />
      <SeasonSchedule />
      <UpcomingEvents />
      <SubscribeBanner />
    </main>
  );
}
