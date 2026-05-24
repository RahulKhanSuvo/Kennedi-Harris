import { OurPartners } from "./components/OurPartners";
import { PartnerTestimonials } from "./components/PartnerTestimonials";
import { PartnerCTA } from "./components/PartnerCTA";
import BrandPartnerHero from "./components/BrandHero";
import WhyPartner from "./components/WhyPartner";

export default function BrandPartner() {
  return (
    <main className="bg-kh-dark min-h-screen text-foreground flex flex-col w-full overflow-hidden">
      <BrandPartnerHero />
      <OurPartners />
      <WhyPartner />
      <PartnerTestimonials />
      <PartnerCTA />
    </main>
  );
}
