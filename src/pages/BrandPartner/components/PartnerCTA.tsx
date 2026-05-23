import { ArrowRight, Handshake } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="border-y border-white/5 py-16 bg-kh-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-kh-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-kh-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="relative flex items-center justify-center shrink-0 mb-2">
          <div className="absolute inset-0 border border-kh-pink/30 rounded-full scale-[1.3] animate-pulse-glow"></div>
          <div className="absolute inset-0 border border-kh-pink/50 rounded-full scale-[1.15]"></div>
          <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-black/50 text-kh-pink">
            <Handshake className="w-7 h-7" />
          </div>
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide max-w-xl">
          LET'S BUILD SOMETHING GREAT TOGETHER.
        </h2>
        <p className="text-gray-400 text-sm max-w-lg leading-relaxed font-sans font-light">
          Interested in becoming a partner or sponsor? Let's connect and create
          impact both on and off the court.
        </p>

        <div className="mt-4">
          <button className="btn-outline border-kh-pink text-kh-pink hover:text-white group flex items-center">
            BECOME A PARTNER
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
