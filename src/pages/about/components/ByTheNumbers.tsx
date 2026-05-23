import { BsDribbble } from "react-icons/bs";

export function ByTheNumbers() {
  return (
    <section className="py-16 border-y border-white/5 bg-kh-dark">
      <div className="container mx-auto px-6">
        <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm block mb-8">
          By The Numbers
        </span>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Stat Items */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-start w-full lg:w-3/4 gap-8 lg:gap-12 px-0 lg:px-4">
            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl text-white">
                20+
              </span>
              <span className="font-condensed font-bold text-kh-pink tracking-widest mt-1">
                PPG
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl text-white">
                16+
              </span>
              <span className="font-condensed font-bold text-kh-pink tracking-widest mt-1">
                RPG
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl text-white">
                3+
              </span>
              <span className="font-condensed font-bold text-kh-pink tracking-widest mt-1">
                BPG
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-5xl md:text-6xl text-white">
                24+
              </span>
              <span className="font-condensed font-bold text-kh-pink tracking-widest mt-1">
                DOUBLE-DOUBLES
              </span>
            </div>

            <div className="flex flex-col max-w-[120px]">
              <span className="font-display text-5xl md:text-6xl text-white">
                31
              </span>
              <span className="font-condensed font-bold text-kh-pink tracking-widest mt-1 text-sm">
                REBOUNDS IN A SINGLE GAME
              </span>
            </div>
          </div>

          {/* Final Text Block */}
          <div className="w-full lg:w-1/4 pt-8 lg:pt-0 lg:pl-12 flex flex-col items-start lg:items-center text-left lg:text-center">
            <div className="w-12 h-12 rounded-full border border-kh-pink flex items-center justify-center text-kh-pink mb-4">
              <BsDribbble className="w-6 h-6" />
            </div>
            <p className="font-condensed font-bold text-lg md:text-xl text-white uppercase tracking-wider leading-tight">
              RELENTLESS ON BOTH ENDS.
              <br />
              LEADER BY EXAMPLE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
