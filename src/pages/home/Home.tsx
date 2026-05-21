import ContactForm from "@/components/common/ContactForm";
import AboutSection from "./components/AboutSection";
import BottomInfoBar from "./components/BottomInfoBar";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import HighlightAndSchedule from "./components/HighlightAndSchedule";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-kh-dark min-h-screen">
      <HeroSection />
      <BottomInfoBar />
      <AboutSection />
      <StatsSection />
      <HighlightAndSchedule />
      <GallerySection />
      <ContactForm />
    </div>
  );
}
