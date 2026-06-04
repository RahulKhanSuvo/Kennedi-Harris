import { Timeline } from "./components/Timeline";
import ContactForm from "@/components/common/ContactForm";
import AthleteBanner from "@/components/common/AthleteBanner";
import { BeyondTheGame } from "./components/BeyondTheGame";
import { AboutHero } from "./components/AboutHero";
import { useActiveAbout } from "@/hooks/useAbout";
import Preloader from "@/components/common/Preloader";
import { useActiveGallery } from "@/hooks/useGallery";

export default function About() {
  const { data: aboutData, isLoading: aboutIsLoading } = useActiveAbout();
  const { data: galleryData, isLoading: galleryIsLoading } = useActiveGallery();

  if (aboutIsLoading || galleryIsLoading) {
    return <Preloader />;
  }
  return (
    <main>
      <title>About | Kennedy Harris</title>
      <meta
        name="description"
        content="Learn more about Kennedy Harris, his journey, and his mission."
      />
      <meta
        name="keywords"
        content="Kennedy Harris, About, Journey, Mission, Basketball"
      />
      <meta property="og:title" content="About Kennedy Harris | K.H." />
      <meta
        property="og:description"
        content="Learn more about Kennedy Harris, his journey, and his mission."
      />
      <AboutHero dHeroImage={aboutData?.bannerImgUrl} />
      <Timeline data={aboutData} />
      <BeyondTheGame data={galleryData} />
      <AthleteBanner />
      <ContactForm />
    </main>
  );
}
