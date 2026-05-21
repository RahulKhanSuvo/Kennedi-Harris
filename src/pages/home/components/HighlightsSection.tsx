import { Play, ArrowRight } from "lucide-react";
import highlightMain from "@/assets/highlight-main.png";
import highlight1 from "@/assets/highlight-1.png";

export default function HighlightsSection() {
  return (
    <section id="highlights" className="py-20 bg-kh-dark relative">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Video Area */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
              LATEST HIGHLIGHTS
            </h3>

            <div className="relative w-full aspect-video bg-kh-dark-2 rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
              <img
                src={highlightMain}
                alt="Main Highlight"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-kh-gray font-condensed">VIDEO PLACEHOLDER</div><div class="absolute inset-0 flex items-center justify-center"><div class="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/40"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div></div>';
                }}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/20 group-hover:bg-kh-pink/20 group-hover:border-kh-pink transition-colors">
                  <Play
                    className="text-white group-hover:text-kh-pink ml-2"
                    size={32}
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            <h4 className="font-condensed font-bold text-lg tracking-widest text-white uppercase mt-2">
              OFFICIAL HIGHLIGHT REEL
            </h4>
          </div>

          {/* Right Sidebar Playlist */}
          <div className="w-full lg:w-1/3 flex flex-col pt-10">
            <div className="flex flex-col gap-4">
              {/* Item 1 */}
              <div className="flex gap-4 group cursor-pointer p-2 rounded hover:bg-white/5 transition-colors">
                <div className="relative w-32 aspect-video bg-kh-dark-2 rounded overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={highlight1}
                    alt="Highlight 1"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center border border-white/50 group-hover:border-kh-pink group-hover:bg-kh-pink/20">
                      <Play
                        className="text-white ml-1"
                        size={12}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-white font-sans font-medium line-clamp-2 leading-snug group-hover:text-kh-pink transition-colors">
                    vs. Team Elite
                    <br />
                    Atlanta, GA
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 group cursor-pointer p-2 rounded hover:bg-white/5 transition-colors">
                <div className="relative w-32 aspect-video bg-kh-dark-2 rounded overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={highlight1}
                    alt="Highlight 2"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center border border-white/50 group-hover:border-kh-pink group-hover:bg-kh-pink/20">
                      <Play
                        className="text-white ml-1"
                        size={12}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-white font-sans font-medium line-clamp-2 leading-snug group-hover:text-kh-pink transition-colors">
                    AAU Championship Highlights
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 group cursor-pointer p-2 rounded hover:bg-white/5 transition-colors">
                <div className="relative w-32 aspect-video bg-kh-dark-2 rounded overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={highlight1}
                    alt="Highlight 3"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center border border-white/50 group-hover:border-kh-pink group-hover:bg-kh-pink/20">
                      <Play
                        className="text-white ml-1"
                        size={12}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-white font-sans font-medium line-clamp-2 leading-snug group-hover:text-kh-pink transition-colors">
                    Shot Blocking Highlights
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-kh-pink/30 hover:border-kh-pink rounded overflow-hidden group cursor-pointer transition-colors bg-kh-pink/5">
              <a
                href="#"
                className="flex items-center justify-between p-4 font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase"
              >
                VIEW FULL HIGHLIGHTZ PROFILE
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
