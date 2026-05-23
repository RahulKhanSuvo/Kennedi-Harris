import { Link } from "react-router";
import {
  ArrowRight,
  Trophy,
  Sparkles,
  Contact2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
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
    <section className="py-24 bg-kh-dark border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute right-[-10%] top-0 w-[500px] h-[500px] bg-kh-blue/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute left-[-5%] bottom-0 w-[400px] h-[400px] bg-kh-pink/[0.03] blur-[130px] rounded-full pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Section: Player Bio Data Table (Takes up 5 columns on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs">
                DATA SPECIFICATIONS
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-tight mb-8">
              PLAYER <span className="text-kh-pink">VITAL STATISTICS</span>
            </h3>

            {/* Premium minimalist data layout */}
            <div className="flex flex-col gap-1.5">
              {bioData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-3 text-xs md:text-sm font-sans rounded-lg bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] hover:border-white/5 transition-all duration-200 group"
                >
                  <span className="text-white/40 group-hover:text-white/60 transition-colors font-light">
                    {item.label}
                  </span>
                  <span className="text-white font-medium text-right ml-4 tracking-wide group-hover:text-kh-pink transition-colors">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Split Accomplishments & Inquiry Cards (Takes up 7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-between">
          {/* Top Half: Accomplishments Grid */}
          <div className="border border-white/5 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/[0.01] group-hover:text-white/[0.02] transition-colors pointer-events-none">
              <Trophy className="w-32 h-32 stroke-[1]" />
            </div>

            <div className="flex items-center gap-2 mb-6 text-kh-pink">
              <Trophy className="w-4 h-4 stroke-[2]" />
              <span className="font-condensed tracking-[0.2em] uppercase font-black text-xs">
                ACCOLADES & MILESTONES
              </span>
            </div>

            {/* Asymmetric multi-column award list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accomplishments.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/[0.03] hover:border-kh-pink/20 transition-all duration-300"
                >
                  <div className="w-5 h-5 rounded bg-kh-pink/10 flex items-center justify-center text-kh-pink shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-white/80 text-xs font-sans font-light leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Half: Premium Contact Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border border-white/5 rounded-xl bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent p-6 md:p-8">
            {/* Context Pitch */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/50">
                <Contact2 className="w-4 h-4" />
                <span className="font-condensed tracking-[0.2em] uppercase font-bold text-xs">
                  PRESS INQUIRIES
                </span>
              </div>
              <p className="text-white/50 text-xs font-sans font-light leading-relaxed pr-2">
                For recruitment updates, media schedules, and access requests,
                bridge direct coordination channels.
              </p>
            </div>

            {/* Channels & Action Trigger */}
            <div className="md:col-span-7 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6">
              <div className="grid grid-cols-1 gap-3">
                {/* Email Item */}
                <a
                  href="mailto:info@kennediharrishoops.com"
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg border border-white/5 bg-white/[0.02] group-hover:border-kh-pink/30 group-hover:bg-kh-pink/5 flex items-center justify-center text-white/40 group-hover:text-kh-pink transition-all duration-300 shrink-0">
                    <Mail className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[9px] tracking-widest font-condensed font-bold uppercase">
                      SECURE LINK
                    </span>
                    <span className="text-white/80 group-hover:text-white font-sans text-xs transition-colors tracking-wide">
                      info@kennediharrishoops.com
                    </span>
                  </div>
                </a>

                {/* Phone Item */}
                <a
                  href="tel:9042384734"
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg border border-white/5 bg-white/[0.02] group-hover:border-kh-pink/30 group-hover:bg-kh-pink/5 flex items-center justify-center text-white/40 group-hover:text-kh-pink transition-all duration-300 shrink-0">
                    <Phone className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[9px] tracking-widest font-condensed font-bold uppercase">
                      COMMUNICATION
                    </span>
                    <span className="text-white/80 group-hover:text-white font-sans text-xs transition-colors tracking-wide">
                      (904) 238-4734
                    </span>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-9 h-9 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 shrink-0">
                    <MapPin className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[9px] tracking-widest font-condensed font-bold uppercase">
                      BASE HUB
                    </span>
                    <span className="text-white/80 font-sans text-xs tracking-wide">
                      Warner Robins, Georgia
                    </span>
                  </div>
                </div>
              </div>

              {/* Redesigned Button Anchor */}
              <div className="mt-2">
                <Link
                  to="/contact"
                  className="w-full relative overflow-hidden rounded-lg border border-kh-pink text-white font-condensed font-black text-xs tracking-[0.25em] py-3.5 transition-all duration-300 group flex items-center justify-center gap-2 bg-kh-pink/10 hover:bg-kh-pink shadow-md shadow-kh-pink/5"
                >
                  CONTACT KENNEDI'S TEAM
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
