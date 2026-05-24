import { Play } from "lucide-react";
import Container from "@/components/common/Container";

import img1 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";
import img2 from "@/assets/gallery/63ce7a6eaf1e457d9d3d6b21831e11fb.png";
import img3 from "@/assets/gallery/5a4aa84e54514436ab82f7ca560e29a7.png";

const TAPE_LOGS = [
  {
    id: "01",
    title: "SCORING",
    count: "28 REELS",
    img: img1,
    metric: "24.5 PPG",
  },
  {
    id: "02",
    title: "DEFENSE",
    count: "24 REELS",
    img: img2,
    metric: "3.2 BPG",
  },
  {
    id: "03",
    title: "PLAYMAKING",
    count: "18 REELS",
    img: img3,
    metric: "8.1 APG",
  },
];

export default function TopPlayCategories() {
  return (
    <section className="relative bg-black py-24 lg:py-36 border-t border-white/5 overflow-hidden">
      <Container className="relative z-10 w-full flex flex-col gap-12">
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-cyan-400 rotate-45 animate-pulse"></div>
            <h3 className="font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase font-black">
              TOP PLAY CATEGORIES
            </h3>
          </div>
          <span className="font-display text-4xl lg:text-5xl text-white tracking-tighter uppercase leading-none">
            TOP{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-kh-pink">
              PLAY CATEGORIES
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {TAPE_LOGS.map((tape, index) => {
            const isWide = index === 1;
            return (
              <div
                key={tape.id}
                className={`group relative overflow-hidden bg-zinc-950 border border-white/10 h-[380px] lg:h-[440px] cursor-pointer transition-all duration-700 ease-out shadow-2xl ${
                  isWide ? "md:col-span-6" : "md:col-span-3"
                }`}
              >
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img
                    src={tape.img}
                    alt={tape.title}
                    className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500"></div>
                </div>

                <div className="absolute top-6 inset-x-6 z-10 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[10px] text-zinc-500 group-hover:text-cyan-400 transition-colors font-semibold tracking-widest">
                    // FEED_{tape.id}
                  </span>
                  <span className="font-mono text-[10px] text-kh-pink border border-kh-pink/20 bg-black/40 px-2 py-0.5 tracking-wider font-bold">
                    {tape.metric}
                  </span>
                </div>

                <div className="absolute bottom-6 inset-x-6 z-10 flex flex-col items-start gap-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-kh-pink font-bold uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {tape.count}
                  </span>
                  <h4 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-white leading-none uppercase">
                    {tape.title}
                  </h4>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-xs flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:border-kh-pink transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-kh-pink flex items-center justify-center text-white">
                      <Play fill="white" className="w-4 h-4 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-cyan-400 via-kh-pink to-white group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
