import { ContactHero } from "./components/ContactHero";
import { ContactFormSection } from "./components/ContactFormSection";
import { MapSection } from "./components/MapSection";
import { WorkTogether } from "./components/WorkTogether";
import { useContact } from "@/hooks/useContact";

export default function ContactPage() {
  const { data, isLoading } = useContact();
  return (
    <div className="bg-kh-dark min-h-screen">
      <title>Contact | Kennedy Harris</title>
      <meta
        name="description"
        content="Get in touch with Kennedy Harris. Contact for media inquiries, endorsements, or partnership opportunities. Reach out directly through the official contact form."
      />
      <meta
        name="keywords"
        content="Kennedy Harris Contact, Contact Us, Media Inquiries, Endorsements, Partnerships"
      />
      <meta property="og:title" content="Contact | Kennedy Harris" />
      <meta
        property="og:description"
        content="Get in touch with Kennedy Harris. Contact for media inquiries, endorsements, or partnership opportunities."
      />
      <meta property="og:image" content="URL_TO_CONTACT_IMAGE" />
      <meta property="og:url" content="https://YOUR_DOMAIN.com/contact" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="Contact | Kennedy Harris" />
      <meta
        name="twitter:description"
        content="Get in touch with Kennedy Harris. Contact for media inquiries, endorsements, or partnership opportunities."
      />
      ``
      <meta name="twitter:image" content="URL_TO_CONTACT_IMAGE" />
      <meta name="twitter:card" content="summary_large_image" />
      <ContactHero
        contactDetails={data?.directReachout || null}
        isLoading={isLoading}
      />
      <ContactFormSection
        data={data?.getInTouch || null}
        isLoading={isLoading}
      />
      <MapSection />
      <WorkTogether />
    </div>
  );
}
