import { Timeline } from "./components/Timeline";
import ContactForm from "@/components/common/ContactForm";
import AthleteBanner from "@/components/common/AthleteBanner";
import { BeyondTheGame } from "./components/BeyondTheGame";
import { AboutHero } from "./components/AboutHero";

export default function About() {
  return (
    <main className="">
      <AboutHero />
      <Timeline />
      <BeyondTheGame />
      <AthleteBanner />
      <ContactForm />
    </main>
  );
}
