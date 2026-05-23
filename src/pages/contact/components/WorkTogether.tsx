import { Mail, ArrowRight } from "lucide-react";

export function WorkTogether() {
  const handleScrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-black via-kh-dark-2/40 to-black border-t border-b border-white/[0.04] overflow-hidden">
      {/* Premium Ambient Light Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[150px] bg-kh-pink/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[150px] bg-kh-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Structural Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="bg-white/[0.01] backdrop-blur-md border border-white/[0.03] rounded-3xl p-8 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-10 group relative overflow-hidden">
          {/* Subtle Inner Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-kh-pink/[0.02] to-kh-blue/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Left Side - Visual Icon & Rich Typography */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:max-w-3xl">
            {/* High-Contrast Glassmorphic Icon Badge */}
            <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-black/40 shrink-0 shadow-xl relative overflow-hidden transition-all duration-500 group-hover:border-kh-pink/40 group-hover:shadow-[0_0_20px_rgba(255,43,114,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
              <Mail className="w-7 h-7 text-white group-hover:text-kh-pink transition-colors duration-500 relative z-10" />
            </div>

            <div className="space-y-2">
              <span className="font-sans font-black tracking-[0.35em] text-[10px] text-kh-pink uppercase block">
                PARTNERSHIPS & COLLABORATIONS
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight font-bold uppercase leading-tight">
                LET'S BUILD SOMETHING{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-kh-pink/90 group-hover:to-kh-pink transition-all duration-500">
                  TOGETHER
                </span>
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm max-w-xl leading-relaxed">
                Whether you're an established brand, sports organization, or
                looking for camp appearances and speaking engagements, I'm open
                to exploring high-impact opportunities.
              </p>
            </div>
          </div>

          {/* Right Side - Luxury Interactive Action Button */}
          <div className="shrink-0 w-full sm:w-auto flex justify-center">
            <button
              onClick={handleScrollToForm}
              className="w-full sm:w-auto relative px-8 py-4 bg-transparent border border-white/10 hover:border-kh-pink text-white font-condensed font-black tracking-[0.2em] text-sm uppercase rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all duration-500 overflow-hidden group/btn hover:shadow-[0_0_30px_rgba(255,43,114,0.25)]"
            >
              {/* Dynamic Sliding Background Hover Strip */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-kh-pink to-[#ff4b82] -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />

              {/* Button Text & Arrow Icon Layout */}
              <span className="relative z-10 flex items-center gap-2 drop-shadow-sm group-hover/btn:text-white">
                CONNECT WITH KENNEDI
                <ArrowRight className="w-4 h-4 transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover/btn:translate-x-1.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
