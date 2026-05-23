import { useEffect } from "react";
import { GalleryHero } from "./components/GalleryHero";
import { InstagramSection } from "./components/InstagramSection";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryHeritage } from "./components/GalleryHeritage";

export default function GallaryPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <GalleryHero />
      <GalleryGrid />
      <GalleryHeritage />
      <InstagramSection />
    </main>
  );
}
