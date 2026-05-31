import ContactForm from "@/components/common/ContactForm";
import BottomInfoBar from "./components/BottomInfoBar";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import HighlightAndSchedule from "./components/HighlightAndSchedule";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import { useQuery } from "@tanstack/react-query";
import { homeService } from "@/api/services";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-active"],
    queryFn: homeService.getActiveHome,
    staleTime: Infinity,
  });
  const { frist_img, second_img } = data || {};
  return (
    <div className="flex flex-col w-full bg-kh-dark min-h-screen">
      <HeroSection heroImage={frist_img} />
      <BottomInfoBar />
      <AboutSection second_img={second_img} />
      <StatsSection stats={data} isLoading={isLoading} />
      <HighlightAndSchedule />
      <GallerySection />
      <ContactForm />
    </div>
  );
}
