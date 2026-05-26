import { Timeline } from "./components/Timeline";
// import { ByTheNumbers } from "./components/ByTheNumbers";
// import { CoreValues } from "./components/CoreValues";
import Container from "@/components/common/Container";
import ContactForm from "@/components/common/ContactForm";
import AthleteBanner from "@/components/common/AthleteBanner";
import { BeyondTheGame } from "./components/BeyondTheGame";
import { AboutHero } from "./components/AboutHero";

export default function About() {
  return (
    <main className="">
      <AboutHero />
      <Timeline />
      <Container className="py-3">
        <div className="  bg-kh-dark relative z-10">
          {/* <ByTheNumbers /> */}
          {/* <CoreValues /> */}
          <BeyondTheGame />
        </div>
      </Container>
      <AthleteBanner />
      <ContactForm />
    </main>
  );
}
