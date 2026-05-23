import { useEffect } from "react";
import QuickInfo from "./components/QuickInfo";
import AboutAndAssets from "./components/AboutAndAssets";
import FeaturedPhotos from "./components/FeaturedPhotos";
import BioAndAccomplishments from "./components/BioAndAccomplishments";
import SocialRow from "./components/SocialRow";
import MediaKitHeroSection from "./components/MediaKitHero";

export default function MediaKit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <MediaKitHeroSection />
      <QuickInfo />
      <AboutAndAssets />
      <FeaturedPhotos />
      <BioAndAccomplishments />
      <SocialRow />
    </main>
  );
}
