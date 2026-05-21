import statsImg from "@/assets/stats-player.png";
const stats = [
  { value: "20+", label: "PPG" },
  { value: "16+", label: "RPG" },
  { value: "3+", label: "BPG" },
  { value: "24+", label: "DOUBLE-DOUBLES" },
  {
    value: "26",
    label: ["REBOUNDS", "SINGLE GAME"],
  },
];
export default function StatsSection() {
  return (
    <section className="border-y border-white/5 relative overflow-hidden py-4">
      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 flex">
        <div className="flex flex-col w-full lg:w-[70%]">
          {/* title */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-condensed font-semibold  text-base xl:text-xl tracking-widest text-white uppercase">
              BY THE NUMBERS
            </h3>
            <div className="h-px w-12 bg-kh-pink "></div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-y-10 ">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center relative after:content-[''] after:hidden lg:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-12 after:bg-white/10
        ${index < 3 ? "w-1/3 lg:w-1/5 border-r border-white/10" : ""}
        ${index === 3 ? "w-1/2 lg:w-1/5 mt-10 lg:mt-0 border-r border-white/10" : ""}
        ${index === 4 ? "w-1/2 lg:w-1/5 mt-10 lg:mt-0 text-center" : ""}
        ${index === stats.length - 1 ? "border-0" : ""}
      `}
              >
                <div className="font-display text-5xl lg:text-7xl xl:text-8xl text-white leading-none">
                  {item.value}
                </div>

                <div className="font-condensed font-semibold text-sm lg:text-base tracking-widest text-kh-pink mt-2 uppercase px-4 lg:px-0 text-center">
                  {Array.isArray(item.label)
                    ? item.label.map((line, i) => <div key={i}>{line}</div>)
                    : item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Info Box */}
        <div className="w-full lg:w-[30%] flex flex-col sm:flex-row items-center gap-6 bg-kh-dark p-4 rounded border border-white/5">
          <div className="w-24 h-full  overflow-hidden shrink-0 ">
            <img
              src={statsImg}
              alt="Stats Avatar"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.classList.add(
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
          <div className="flex flex-col justify-center gap-4 h-full ">
            <div className="font-condensed font-semibold text-lg tracking-widest text-white uppercase leading-snug text-center sm:text-left">
              STATS UPDATED
              <br />
              THROUGHOUT
              <br />
              THE SEASON.
            </div>
            <span className="w-[60%]  bg-kh-pink h-0.5 rounded-full block"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
