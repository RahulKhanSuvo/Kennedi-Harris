import QuickInfo from "./components/QuickInfo";
import AboutAndAssets from "./components/AboutAndAssets";
import FeaturedPhotos from "./components/FeaturedPhotos";
import BioAndAccomplishments from "./components/BioAndAccomplishments";
import SocialRow from "./components/SocialRow";
import MediaKitHeroSection from "./components/MediaKitHero";

export default function MediaKit() {
  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <title>Media Kit | Kennedy Harris</title>
      <meta
        name="description"
        content="Official Media Kit for Kennedy Harris. Download photos, access stats, and get essential information about the professional basketball player."
      />
      <meta
        name="keywords"
        content="Kennedy Harris Media Kit, Basketball Assets, Athlete Photos, Player Information, PR Kit"
      />
      <meta property="og:title" content="Kennedy Harris - Official Media Kit" />
      <meta
        property="og:description"
        content="Official Media Kit for Kennedy Harris. Download photos, access stats, and get essential information."
      />
      <meta property="og:image" content="URL_TO_HERO_IMAGE" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com/media-kit" />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:title"
        content="Kennedy Harris - Official Media Kit"
      />
      <meta
        name="twitter:description"
        content="Official Media Kit for Kennedy Harris. Download photos, access stats, and get essential information."
      />
      <meta name="twitter:image" content="URL_TO_HERO_IMAGE" />
      <meta name="twitter:card" content="summary_large_image" />
      <MediaKitHeroSection />
      <QuickInfo />
      <AboutAndAssets />
      <FeaturedPhotos />
      <BioAndAccomplishments />
      <SocialRow />
    </main>
  );
}
