// import { NavigationTabs } from "./components/NavigationTabs";
import { SeasonStats } from "./components/SeasonStats";
import TopPlayCategories from "./components/TopPlayCategories";
// import { SubscribeSection } from "./components/SubscribeSection";
import HeroSection from "./components/HeroSection";
import TestimonialSlider from "./components/TestimonialSlider";
import HighlightsSection from "./components/HighlightsSection";
import Preloader from "@/components/common/Preloader";
import { useActiveHighlight } from "@/hooks/useHighlights";
import { useHome } from "@/hooks/useHome";

export default function Highlights() {
  const { data: activeHighlights } = useActiveHighlight();
  const { data: homeData, isLoading: homeLoading } = useHome();
  const mainUrl = activeHighlights?.MainVideo_url;
  if (activeHighlights) return <Preloader />;

  return (
    <main className="min-h-screen text-foreground flex flex-col w-full">
      <title>Highlights | Kennedy Harris</title>
      <meta
        name="description"
        content="Watch Kennedy Harris in action! Career highlights, game-winning plays, and electrifying moments from the court. See why he's making waves in the game."
      />
      <meta
        name="keywords"
        content="Kennedy Harris, Basketball Highlights, Game Highlights, Sports Highlights, Athlete Highlights, Best Plays, Dunks, Crossovers"
      />
      <meta
        property="og:title"
        content="Kennedy Harris - Highlights | Game-Winning Plays"
      />
      <meta
        property="og:description"
        content="Watch Kennedy Harris dominate the court! Career highlights, game-winning plays, and electrifying moments."
      />
      <meta property="og:image" content="URL_TO_HIGHLIGHTS_THUMBNAIL" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com/highlights" />
      <meta property="og:type" content="video.other" />
      <meta property="og:video:url" content={mainUrl} />
      <meta property="og:video:secure_url" content={mainUrl} />
      <meta property="og:video:width" content="1920" />
      <meta property="og:video:height" content="1080" />
      <meta property="og:video:type" content="video/mp4" />
      <meta
        name="twitter:title"
        content="Kennedy Harris - Highlights | Game-Winning Plays"
      />
      <meta
        name="twitter:description"
        content="Watch Kennedy Harris dominate the court! Career highlights, game-winning plays, and electrifying moments."
      />
      <meta name="twitter:image" content="URL_TO_HIGHLIGHTS_THUMBNAIL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://YOUR_DOMAIN.com/highlights" />
      <HeroSection mainUrl={mainUrl} />
      {/* <NavigationTabs /> */}
      {/* <FeaturedHighlightsSection></FeaturedHighlightsSection> */}
      <HighlightsSection />

      <SeasonStats stats={homeData?.NUMBERS} isLoading={homeLoading} />
      <TopPlayCategories />
      {/* <SubscribeSection /> */}
      <TestimonialSlider />
    </main>
  );
}
