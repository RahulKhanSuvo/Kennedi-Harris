import { ContactHero } from "./components/ContactHero";
import { ContactFormSection } from "./components/ContactFormSection";
import { MapSection } from "./components/MapSection";
import { WorkTogether } from "./components/WorkTogether";

export default function ContactPage() {
  return (
    <div className="bg-kh-dark min-h-screen">
      <ContactHero />
      <ContactFormSection />
      <MapSection />
      <WorkTogether />
    </div>
  );
}
