// import { NavigationTabs } from "./components/NavigationTabs";
import { SeasonStats } from "./components/SeasonStats";
import TopPlayCategories from "./components/TopPlayCategories";
// import { SubscribeSection } from "./components/SubscribeSection";
import HeroSection from "./components/HeroSection";
import TestimonialSlider from "./components/TestimonialSlider";
import HighlightsSection from "./components/HighlightsSection";
import { useQuery } from "@tanstack/react-query";
import { highlightsService } from "@/api/services";
import Preloader from "@/components/common/Preloader";

export default function Highlights() {
  const { data: activeHighlights, isLoading: isActiveHighlightsLoading } =
    useQuery({
      queryKey: ["active-media"],
      queryFn: highlightsService.getActiveHighlights,
      staleTime: Infinity,
    });
  const mainUrl = activeHighlights?.MainVideo_url;
  if (isActiveHighlightsLoading) return <Preloader />;

  return (
    // seo

    <main className="min-h-screen text-foreground flex flex-col w-full">
      <HeroSection mainUrl={mainUrl} />
      {/* <NavigationTabs /> */}
      {/* <FeaturedHighlightsSection></FeaturedHighlightsSection> */}
      <HighlightsSection />

      <SeasonStats />
      <TopPlayCategories />
      {/* <SubscribeSection /> */}
      <TestimonialSlider />
    </main>
  );
}
