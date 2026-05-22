import heroPlayer from "../../../assets/hero-player.png";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 hero-glow-blue opacity-50 pointer-events-none"></div>
      <div
        className="absolute inset-0 hero-glow-pink opacity-50 pointer-events-none"
        style={{ left: "-20%", top: "20%" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm">
            Highlights
          </span>

          <h1 className="font-display text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight">
            <span className="block text-white">KENNEDI</span>
            <span className="block text-kh-pink">HARRIS</span>
          </h1>

          <h2 className="font-condensed text-2xl md:text-3xl text-white uppercase mt-4 max-w-md leading-tight font-bold">
            WATCH MY BEST PLAYS ON THE COURT
          </h2>

          <p className="text-gray-400 mt-2 max-w-md text-sm md:text-base leading-relaxed">
            Game highlights, top performances, and unforgettable moments.
          </p>
        </div>

        {/* Right Content - Player Image & Number */}
        <div className="relative flex justify-center items-center lg:justify-end animate-fade-in-up delay-200">
          <div className="relative z-10">
            <img
              src={heroPlayer}
              alt="Kennedi Harris #30"
              className="h-[400px] md:h-[500px] lg:h-[600px] object-contain object-bottom drop-shadow-[0_0_30px_rgba(26,64,200,0.4)]"
            />
          </div>
          {/* Outline Number Behind */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[250px] md:text-[350px] lg:text-[450px] outline-text-pink opacity-40 -z-10 leading-none select-none tracking-tighter">
            30
          </div>
        </div>
      </div>
    </section>
  );
}
