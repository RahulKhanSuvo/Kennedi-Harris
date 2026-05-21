import statsImg from "@/assets/stats-player.png";

export default function StatsSection() {
  return (
    <section className="bg-kh-dark-2 py-16 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-condensed font-bold text-sm tracking-widest text-white uppercase">
            BY THE NUMBERS
          </h3>
          <div className="h-px w-12 bg-kh-pink "></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Stats Flexbox */}
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-y-10 w-full lg:w-[70%]">
            <div className="w-1/3 lg:w-1/5 flex flex-col items-center border-r border-white/10 last:border-0 lg:border-r-0 relative after:content-[''] after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-12 after:bg-white/10">
              <div className="font-display text-5xl lg:text-7xl text-white leading-none">
                20<span className="text-kh-pink">+</span>
              </div>
              <div className="font-condensed font-bold text-[10px] lg:text-xs tracking-widest text-kh-pink mt-2 uppercase">
                PPG
              </div>
            </div>

            <div className="w-1/3 lg:w-1/5 flex flex-col items-center border-r border-white/10 last:border-0 lg:border-r-0 relative after:content-[''] after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-12 after:bg-white/10">
              <div className="font-display text-5xl lg:text-7xl text-white leading-none">
                16<span className="text-kh-pink">+</span>
              </div>
              <div className="font-condensed font-bold text-[10px] lg:text-xs tracking-widest text-kh-pink mt-2 uppercase">
                RPG
              </div>
            </div>

            <div className="w-1/3 lg:w-1/5 flex flex-col items-center relative after:content-[''] after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-12 after:bg-white/10">
              <div className="font-display text-5xl lg:text-7xl text-white leading-none">
                3<span className="text-kh-pink">+</span>
              </div>
              <div className="font-condensed font-bold text-[10px] lg:text-xs tracking-widest text-kh-pink mt-2 uppercase">
                BPG
              </div>
            </div>

            <div className="w-1/2 lg:w-1/5 flex flex-col items-center mt-10 lg:mt-0 relative after:content-[''] after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-12 after:bg-white/10">
              <div className="font-display text-5xl lg:text-7xl text-white leading-none">
                24<span className="text-kh-pink">+</span>
              </div>
              <div className="font-condensed font-bold text-[10px] lg:text-xs tracking-widest text-kh-pink mt-2 uppercase">
                DOUBLE-DOUBLES
              </div>
            </div>

            <div className="w-1/2 lg:w-1/5 flex flex-col items-center mt-10 lg:mt-0 text-center">
              <div className="font-display text-5xl lg:text-7xl text-white leading-none">
                26
              </div>
              <div className="font-condensed font-bold text-[10px] lg:text-xs tracking-widest text-kh-pink mt-2 uppercase px-4 lg:px-0">
                REBOUNDS
                <br />
                SINGLE GAME
              </div>
            </div>
          </div>

          {/* Right Info Box */}
          <div className="w-full lg:w-[25%] flex flex-col sm:flex-row items-center gap-6 bg-kh-dark p-4 rounded border border-white/5">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-kh-pink">
              <img
                src={statsImg}
                alt="Stats Avatar"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                    "bg-kh-blue/20",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="text-[8px] text-kh-gray">IMG</span>';
                }}
              />
            </div>
            <div className="font-condensed font-bold text-sm tracking-widest text-white uppercase leading-snug text-center sm:text-left">
              STATS UPDATED
              <br />
              THROUGHOUT
              <br />
              THE SEASON.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
