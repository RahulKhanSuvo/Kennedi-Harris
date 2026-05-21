import AboutSection from "./components/AboutSection";
import BottomInfoBar from "./components/BottomInfoBar";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import HighlightsSection from "./components/HighlightsSection";
import PartnersSection from "./components/PartnersSection";
import ScheduleSection from "./components/ScheduleSection";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-kh-dark min-h-screen">
      <HeroSection />
      <BottomInfoBar />
      <AboutSection />
      <StatsSection />
      <HighlightsSection />
      <ScheduleSection />
      <GallerySection />
      <PartnersSection />
    </div>
  );
}
