import { ArrowUpRight } from "lucide-react";
import Container from "@/components/common/Container";

export default function SocialRow() {
  const socials = [
    {
      id: 1,
      name: "INSTAGRAM",
      handle: "@kennediharrishoops",
      href: "https://instagram.com/kennediharrishoops",
      brandGlow:
        "group-hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.15)] group-hover:border-pink-500/30",
      iconAccent:
        "text-pink-500 bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "TIKTOK",
      handle: "@kennediharrishoops",
      href: "https://tiktok.com/@KennediHarrisHoops",
      brandGlow:
        "group-hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.15)] group-hover:border-cyan-400/30",
      iconAccent:
        "text-cyan-400 bg-cyan-400/10 border-cyan-400/20 group-hover:bg-cyan-400 group-hover:text-black",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "X (TWITTER)",
      handle: "@kennedihoops",
      href: "https://x.com/kennedihoops",
      brandGlow:
        "group-hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.08)] group-hover:border-white/20",
      iconAccent:
        "text-white bg-white/5 border-white/10 group-hover:bg-white group-hover:text-black",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "YOUTUBE",
      handle: "KennediHarrisHoops",
      href: "https://youtube.com/@KennediHarrisHoops",
      brandGlow:
        "group-hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.15)] group-hover:border-red-500/30",
      iconAccent:
        "text-red-500 bg-red-500/10 border-red-500/20 group-hover:bg-red-500 group-hover:text-white",
      Icon: ({ className }: { className?: string }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-kh-dark border-t border-white/5 relative overflow-hidden">
      {/* Soft atmospheric background accent */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[250px] bg-kh-pink/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Headline Unit */}
        <div className="flex flex-col gap-1 text-center lg:text-left shrink-0">
          <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-xs">
            SOCIAL CHANNELS
          </span>
          <p className="text-white/40 text-xs md:text-sm font-sans font-light tracking-wide">
            Follow Kennedi's journey on and off the court.
          </p>
        </div>

        {/* Right Action Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 w-full max-w-5xl">
          {socials.map((social) => {
            const IconComponent = social.Icon;
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm ${social.brandGlow}`}
              >
                {/* Left alignment block: Icon + Labels */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Native Brand Colored Icon Mask */}
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0 ${social.iconAccent}`}
                  >
                    <IconComponent className="w-4.5 h-4.5 stroke-[1.75]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="font-condensed font-black text-[10px] tracking-widest text-white/30 uppercase">
                      {social.name}
                    </span>
                    <span className="text-white text-xs font-sans font-medium truncate mt-0.5 group-hover:text-white transition-colors">
                      {social.handle}
                    </span>
                  </div>
                </div>

                {/* Micro Action Arrow Element */}
                <div className="w-5 h-5 rounded-md border border-white/5 bg-black/20 flex items-center justify-center text-white/20 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white/60 transition-all duration-300 ml-2 shrink-0">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
