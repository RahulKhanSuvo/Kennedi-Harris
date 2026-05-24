import { useEffect } from "react";
// import { NavigationTabs } from "./components/NavigationTabs";
import { SeasonStats } from "./components/SeasonStats";
import TopPlayCategories from "./components/TopPlayCategories";
// import { SubscribeSection } from "./components/SubscribeSection";
import HeroSection from "./components/HeroSection";
import TestimonialSlider from "./components/TestimonialSlider";
import HighlightsSection from "./components/HighlightsSection";

export default function Highlights() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen text-foreground flex flex-col w-full">
      <HeroSection />
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
