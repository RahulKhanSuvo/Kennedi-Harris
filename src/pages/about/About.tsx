import { Timeline } from "./components/Timeline";
import { ByTheNumbers } from "./components/ByTheNumbers";
import { CoreValues } from "./components/CoreValues";
import AboutHero from "./components/AboutHero";
import Container from "@/components/common/Container";
import ContactForm from "@/components/common/ContactForm";
import AthleteBanner from "@/components/common/AthleteBanner";
import { BeyondTheGame } from "./components/BeyondTheGame";

export default function About() {
  return (
    <main className="">
      <AboutHero />
      <Timeline />
      <Container className="">
        <div className=" border bg-kh-dark relative z-10">
          <ByTheNumbers />
          <CoreValues />
          <BeyondTheGame />
        </div>
      </Container>
      <AthleteBanner />
      <ContactForm />
    </main>
  );
}
