import { useEffect } from "react";
import { AboutHero } from "./components/AboutHero";
import { Timeline } from "./components/Timeline";
import { ByTheNumbers } from "./components/ByTheNumbers";
import { CoreValues } from "./components/CoreValues";
import { BeyondTheGame } from "./components/BeyondTheGame";

export default function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <AboutHero />
      <Timeline />
      <ByTheNumbers />
      <CoreValues />
      <BeyondTheGame />
    </main>
  );
}
