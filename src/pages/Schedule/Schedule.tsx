import { SeasonSchedule } from "./components/SeasonSchedule";
// import { UpcomingEvents } from "./components/UpcomingEvents";
import { SubscribeBanner } from "./components/SubscribeBanner";
import ScheduleHero from "./components/ScheduleHero";
import useSchedule from "@/hooks/useSchedule";
export default function Schedule() {
  const { data, isLoading } = useSchedule();
  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <title>Schedule | Kennedy Harris</title>
      <meta
        name="description"
        content="Follow Kennedy Harris's basketball season schedule. View upcoming games, past results, and live updates. Never miss a moment from the court!"
      />
      <meta
        name="keywords"
        content="Kennedy Harris Schedule, Basketball Schedule, Game Calendar, Live Updates, Upcoming Games"
      />
      <meta
        property="og:title"
        content="Kennedy Harris - Game Schedule & Updates"
      />
      <meta
        property="og:description"
        content="Follow Kennedy Harris's basketball season schedule. View upcoming games, past results, and live updates."
      />
      <meta property="og:image" content="URL_TO_SCHEDULE_IMAGE" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com/schedule" />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:title"
        content="Kennedy Harris - Game Schedule & Updates"
      />
      <meta
        name="twitter:description"
        content="Follow Kennedy Harris's basketball season schedule. View upcoming games, past results, and live updates."
      />
      <meta name="twitter:image" content="URL_TO_SCHEDULE_IMAGE" />
      <meta name="twitter:card" content="summary_large_image" />
      <ScheduleHero data={data?.data || []} isLoading={isLoading} />
      <SeasonSchedule data={data?.data || []} isLoading={isLoading} />
      {/* <UpcomingEvents /> */}
      <SubscribeBanner />
    </main>
  );
}
