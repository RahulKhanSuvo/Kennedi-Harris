import { MdOutlineInsertPhoto } from "react-icons/md";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import Container from "@/components/common/Container";

import gal1 from "@/assets/gallery/working.avif";
import gal2 from "@/assets/gallery/jump1.avif";
import gal3 from "@/assets/gallery/dribling3.avif";
import gal4 from "@/assets/gallery/jump2.avif";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function BeyondTheGame() {
  // Configured mixed-media layout slots spanning across multiple grid pathways
  const bentoItems = [
    {
      type: "image",
      src: gal1,
      span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
      alt: "On-court transition drive breakdown",
    },
    {
      type: "stat",
      span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
      icon: FiTrendingUp,
      value: "88%",
      label: "FREE THROW ACCURACY",
      bgGradient: "from-kh-pink/10 to-transparent",
    },
    {
      type: "image",
      src: gal2,
      span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
      alt: "Pre-game visual focus prep",
    },
    {
      type: "quote",
      span: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
      text: "“DON'T COUNT THE DAYS, MAKE THE DAYS COUNT.”",
      author: "WORKOUT MINDSET",
      bgGradient: "from-neutral-900 via-kh-dark-2 to-neutral-950",
    },
    {
      type: "image",
      src: gal3,
      span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
      alt: "Strength and athletic performance loading",
    },
    {
      type: "image",
      src: gal4,
      span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
      alt: "AAU match runtime film tracking",
    },
    {
      type: "infobox",
      span: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
      title: "ELITE BIO-METRICS",
      metric1: { num: '40"', label: "Vertical Jump" },
      metric2: { num: "4.4s", label: "Court Sprint" },
      icon: FiActivity,
    },
  ];

  return (
    <section className="py-3 bg-kh-dark relative overflow-hidden group/section">
      {/* Structural environment light arrays */}
      <div className="absolute left-1/4 top-1/4 w-[600px] h-[400px] bg-kh-blue/2 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute right-10 bottom-0 w-[500px] h-[300px] bg-kh-pink/2 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      <Container>
        {/* Section Header Frame */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-4xl md:text-6xl font-medium uppercase text-white">
              BEYOND THE <span className="text-kh-pink">GAME</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-sm font-sans font-light leading-relaxed md:text-right">
            A raw, behind-the-scenes look at the training matrices, metrics,
            lifestyle parameters, and moments that engineer performance.
          </p>
        </div>

        {/* Asymmetric Cinematic Mosaic Bento Framework Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[190px] gap-4">
          {bentoItems.map((item, index) => (
            <div
              key={index}
              className={`${item.span} group/frame relative overflow-hidden rounded md:rounded border border-white/5 bg-linear-to-br from-neutral-900/40 to-neutral-950/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/10`}
            >
              {/* RENDERING BLOCKS DEPENDING ON ELEMENT TYPE MATRICES */}

              {/* Archetype A: Media Image Frame */}
              {item.type === "image" && (
                <>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/frame:scale-105 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover/frame:opacity-40 transition-opacity duration-500 pointer-events-none" />
                </>
              )}

              {/* Archetype B: Numeric Stat Display Card */}
              {item.type === "stat" && (
                <div
                  className={`absolute inset-0 bg-linear-to-br ${item.bgGradient} p-6 flex flex-col justify-between h-full w-full`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon && (
                      <item.icon className="w-4 h-4 text-kh-pink" />
                    )}
                  </div>
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-1">
                      {item.value}
                    </div>
                    <div className="font-condensed text-[10px] font-bold tracking-widest text-zinc-400 uppercase leading-none">
                      {item.label}
                    </div>
                  </div>
                </div>
              )}

              {/* Archetype C: High Impact Athletic Quote Node */}
              {item.type === "quote" && (
                <div
                  className={`absolute inset-0 bg-linear-to-br ${item.bgGradient} p-7 flex flex-col justify-center gap-2 h-full w-full`}
                >
                  <p className="font-display text-xl md:text-2xl font-black italic tracking-wide text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-zinc-400 leading-tight">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-4 bg-kh-blue" />
                    <span className="font-mono text-[9px] tracking-widest text-kh-blue-light font-bold uppercase">
                      {item.author}
                    </span>
                  </div>
                </div>
              )}

              {/* Archetype D: Multi Metric Split Info Frame */}
              {item.type === "infobox" && (
                <div className="absolute inset-0 p-6 flex flex-col justify-between h-full w-full bg-neutral-950/20">
                  <div className="flex justify-between items-start w-full border-b border-white/5 pb-3">
                    <span className="font-condensed font-black text-sm tracking-widest text-zinc-300 uppercase">
                      {item.title}
                    </span>
                    {item.icon && (
                      <item.icon className="w-4 h-4 text-kh-blue-light" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="font-display text-3xl font-black italic text-white tracking-tight leading-none">
                        {item.metric1?.num}
                      </div>
                      <span className="font-sans text-[11px] text-zinc-500 font-medium">
                        {item.metric1?.label}
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-3xl font-black italic text-white tracking-tight leading-none">
                        {item.metric2?.num}
                      </div>
                      <span className="font-sans text-[11px] text-zinc-500 font-medium">
                        {item.metric2?.label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Universal Fine Ambient Inner Border Border Shines */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/0 group-hover/frame:border-white/10 transition-colors duration-500 pointer-events-none z-30" />
            </div>
          ))}
        </div>

        {/* Controlled Action Button Anchor */}
        <div className="flex items-center justify-center pt-16">
          <Button asChild variant="kh-primary" className="">
            <Link to={"/gallery"}>
              VIEW FULL GALLERY
              <MdOutlineInsertPhoto className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
