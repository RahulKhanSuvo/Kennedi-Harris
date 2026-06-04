import { Timeline } from "./components/Timeline";
import ContactForm from "@/components/common/ContactForm";
import AthleteBanner from "@/components/common/AthleteBanner";
import { BeyondTheGame } from "./components/BeyondTheGame";
import { AboutHero } from "./components/AboutHero";
import { useActiveAbout } from "@/hooks/useAbout";
import Preloader from "@/components/common/Preloader";

export default function About() {
  const { data, isLoading } = useActiveAbout();
  if (isLoading) {
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
      <AboutHero dHeroImage={data?.bannerImgUrl} />
      <Timeline data={data} />
      <BeyondTheGame />
      <AthleteBanner />
      <ContactForm />
    </main>
  );
}
