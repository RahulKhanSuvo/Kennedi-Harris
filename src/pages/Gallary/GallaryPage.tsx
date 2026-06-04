import { GalleryHero } from "./components/GalleryHero";
import { InstagramSection } from "./components/InstagramSection";
import { GalleryGrid } from "./components/GalleryGrid";
import { GalleryHeritage } from "./components/GalleryHeritage";
import { useActiveGallery } from "@/hooks/useGallery";
import Preloader from "@/components/common/Preloader";

export default function GallaryPage() {
  const { data, isLoading } = useActiveGallery();
  console.log(data);
  // Scroll to top on mount
  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <title>Gallery | Kennedy Harris</title>
      <meta
        name="description"
        content="Watch Kennedy Harris in action! Career highlights, game-winning plays, and electrifying moments from the court. See why he's making waves in the game."
      />
      <meta
        name="keywords"
        content="Kennedy Harris, Basketball Highlights, Game Highlights, Sports Highlights, Athlete Highlights, Best Plays, Dunks, Crossovers"
      />
      <meta
        property="og:title"
        content="Kennedy Harris - Highlights | Game-Winning Plays"
      />
      <meta
        property="og:description"
        content="Watch Kennedy Harris dominate the court! Career highlights, game-winning plays, and electrifying moments."
      />
      <meta property="og:image" content="URL_TO_HIGHLIGHTS_THUMBNAIL" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com/highlights" />
      <meta property="og:type" content="video.other" />

      <meta
        name="twitter:title"
        content="Kennedy Harris - Highlights | Game-Winning Plays"
      />
      <meta
        name="twitter:description"
        content="Watch Kennedy Harris dominate the court! Career highlights, game-winning plays, and electrifying moments."
      />
      <meta name="twitter:image" content="URL_TO_HIGHLIGHTS_THUMBNAIL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://YOUR_DOMAIN.com/highlights" />
      <GalleryHero
        bannerFristImg={data?.bannerFristImg}
        bannerSecondImg={data?.bannerSecondImg}
      />
      <GalleryGrid data={data?.photos} />
      <GalleryHeritage mentorshipImgUrl={data?.mentorshipImgUrl} />
      <InstagramSection />
    </main>
  );
}
