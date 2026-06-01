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
      <title>Kennedy Harris | K.H.</title>
      <meta
        name="description"
        content="Kennedy Harris - Professional Basketball Player. Elite guard with exceptional scoring, playmaking, and defensive skills. Follow his journey, watch highlights, and see game stats."
      />
      <meta
        name="keywords"
        content="Kennedy Harris, Basketball, Athlete, Pro Basketball, PG, Shooting Guard, Basketball Highlights, Game Stats, Career"
      />
      <meta property="og:title" content="Kennedy Harris | K.H." />
      <meta
        property="og:description"
        content="Kennedy Harris - Professional Basketball Player. Elite guard with exceptional scoring, playmaking, and defensive skills."
      />
      <meta property="og:image" content="URL_TO_HERO_IMAGE" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="Kennedy Harris | K.H." />
      <meta
        name="twitter:description"
        content="Kennedy Harris - Professional Basketball Player. Elite guard with exceptional scoring, playmaking, and defensive skills."
      />
      <meta name="twitter:image" content="URL_TO_HERO_IMAGE" />
      <meta name="twitter:card" content="summary_large_image" />
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
