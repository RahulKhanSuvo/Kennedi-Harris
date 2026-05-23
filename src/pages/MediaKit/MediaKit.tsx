import { useEffect } from "react";
import MediaKitHero from "./components/MediaKitHero";
import QuickInfo from "./components/QuickInfo";
import AboutAndAssets from "./components/AboutAndAssets";
import FeaturedPhotos from "./components/FeaturedPhotos";
import BioAndAccomplishments from "./components/BioAndAccomplishments";
import SocialRow from "./components/SocialRow";

export default function MediaKit() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <MediaKitHero />
      <QuickInfo />
      <AboutAndAssets />
      <FeaturedPhotos />
      <BioAndAccomplishments />
      <SocialRow />
    </main>
  );
}
