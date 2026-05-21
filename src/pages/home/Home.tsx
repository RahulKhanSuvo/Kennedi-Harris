import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import HighlightsScheduleSection from "@/components/home/HighlightsScheduleSection";
import GalleryPartnersSection from "@/components/home/GalleryPartnersSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="bg-kh-dark min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <HighlightsScheduleSection />
      <GalleryPartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
