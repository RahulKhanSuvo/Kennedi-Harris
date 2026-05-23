import { Link } from "react-router";
import { Check, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";

export default function BioAndAccomplishments() {
  const bioData = [
    { label: "Full Name", value: "Kennedi Harris" },
    { label: "Date of Birth", value: "February 2, 2012" },
    { label: "Height", value: "6'4\"" },
    { label: "Position", value: "Guard / Forward" },
    { label: "Class", value: "2030" },
    { label: "High School", value: "Windsor Academy" },
    { label: "Team", value: "FBC United GUAA 17U" },
    { label: "Hometown", value: "Jacksonville, Florida" },
    { label: "Academics", value: "Honor Roll" },
    { label: "Email", value: "info@kennediharrishoops.com" },
  ];

  const accomplishments = [
    "Windsor Academy Most Valuable Player - 25-26",
    "Windsor Academy Coaches Award 25-26",
    "Windsor Academy Defensive Player of the Year 25-26",
    "1st Team Regional Player 25-26",
    "1st Team State Player 25-26",
    "Honor Roll Student",
    "Community Volunteer",
  ];

  return (
    <section className="py-20 bg-kh-dark border-t border-white/5 relative">
      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-kh-pink/5 blur-[120px] rounded-full pointer-events-none"></div>

      <Container className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {/* Column 1 - Player Bio */}
        <div className="flex flex-col gap-6">
          <h3 className="font-condensed font-black text-lg md:text-xl text-white uppercase tracking-wider border-b border-white/10 pb-4">
            PLAYER BIO
          </h3>

          <div className="flex flex-col divide-y divide-white/5">
            {bioData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 text-xs md:text-sm font-sans font-light"
              >
                <span className="text-gray-400">{item.label}:</span>
                <span className="text-white font-medium text-right ml-4">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 - Player Accomplishments */}
        <div className="flex flex-col gap-6">
          <h3 className="font-condensed font-black text-lg md:text-xl text-white uppercase tracking-wider border-b border-white/10 pb-4">
            PLAYER ACCOMPLISHMENTS
          </h3>

          <ul className="flex flex-col gap-4">
            {accomplishments.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-xs md:text-sm font-sans font-light text-gray-300"
              >
                <div className="w-5 h-5 rounded-full border border-kh-pink bg-kh-pink/10 flex items-center justify-center text-kh-pink shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Press & Inquiries */}
        <div className="flex flex-col gap-6">
          <h3 className="font-condensed font-black text-lg md:text-xl text-white uppercase tracking-wider border-b border-white/10 pb-4">
            PRESS & INQUIRIES
          </h3>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans font-light mb-2">
            For media requests, interviews, or event coverage, please contact:
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-xs md:text-sm font-sans font-light">
              <div className="w-10 h-10 rounded-full border border-white/10 bg-black/30 flex items-center justify-center text-kh-pink shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
                  EMAIL
                </span>
                <a
                  href="mailto:info@kennediharrishoops.com"
                  className="text-white hover:text-kh-pink transition-colors font-medium"
                >
                  info@kennediharrishoops.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs md:text-sm font-sans font-light">
              <div className="w-10 h-10 rounded-full border border-white/10 bg-black/30 flex items-center justify-center text-kh-pink shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
                  PHONE
                </span>
                <a
                  href="tel:9042384734"
                  className="text-white hover:text-kh-pink transition-colors font-medium"
                >
                  (904) 238-4734
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs md:text-sm font-sans font-light">
              <div className="w-10 h-10 rounded-full border border-white/10 bg-black/30 flex items-center justify-center text-kh-pink shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
                  LOCATION
                </span>
                <span className="text-white font-medium">
                  Warner Robins, Georgia
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/contact"
              className="w-full btn-outline border-kh-pink text-kh-pink hover:text-white group flex items-center justify-center gap-2 text-[13px] font-condensed font-bold tracking-widest py-3.5"
            >
              CONTACT KENNEDI'S TEAM
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
