import { useEffect } from "react";
import { BrandHero } from "./components/BrandHero";
import { OurPartners } from "./components/OurPartners";
import { WhyPartner } from "./components/WhyPartner";
import { PartnerTestimonials } from "./components/PartnerTestimonials";
import { PartnerCTA } from "./components/PartnerCTA";

export default function BrandPartner() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <BrandHero />
      <OurPartners />
      <WhyPartner />
      <PartnerTestimonials />
      <PartnerCTA />
    </main>
  );
}
