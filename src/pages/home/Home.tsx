import HeroSection from "../../components/home/HeroSection";
import AboutSection from "../../components/home/AboutSection";
import StatsSection from "../../components/home/StatsSection";
import HighlightsSection from "../../components/home/HighlightsSection";
import ScheduleSection from "../../components/home/ScheduleSection";
import GallerySection from "../../components/home/GallerySection";
import PartnersSection from "../../components/home/PartnersSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-kh-dark min-h-screen">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <HighlightsSection />
      <ScheduleSection />
      <GallerySection />
      <PartnersSection />
    </div>
  );
}
