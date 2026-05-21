import {
  PlayCircle,
  FileText,
  Mail,
  Calendar,
  Ruler,
  User,
  MapPin,
  Star,
} from "lucide-react";
// import heroImg from "../../assets/hero-player.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-kh-dark hero-glow-blue">
      {/* Background large 30 */}
      <div className="absolute top-10 right-0 lg:right-10 pointer-events-none select-none z-0">
        <span className="font-display text-[300px] lg:text-[450px] leading-none outline-text-blue opacity-40">
          30
        </span>
      </div>

      <div className="max-w-[1920px] w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between pt-20">
        {/* Left Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start gap-4 animate-fade-in-up">
          <div className="font-condensed font-bold tracking-[0.2em] text-kh-pink text-sm uppercase">
            Class of 2030
          </div>

          <div className="flex flex-col -gap-4">
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[110px] leading-[0.85] text-white tracking-wider m-0">
              KENNEDI
            </h1>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[110px] leading-[0.85] text-kh-pink tracking-wider m-0">
              HARRIS
            </h1>
          </div>

          <div className="font-condensed font-bold tracking-widest text-white text-xl sm:text-2xl mt-4">
            6'2 GUARD / FORWARD
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="font-script text-4xl sm:text-5xl text-kh-pink">
              Unfinished Legacy.
            </div>
            <div className="font-condensed font-bold tracking-widest text-white text-lg sm:text-xl uppercase">
              Built daily. Proven game by game.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="btn-primary">
              <PlayCircle size={18} />
              WATCH HIGHLIGHTS
            </button>
            <button className="btn-outline">
              VIEW MEDIA KIT
              <FileText size={18} />
            </button>
            <button className="btn-outline">
              CONTACT FOR NIL / RECRUITING
              <Mail size={18} />
            </button>
          </div>
        </div>

        {/* Right Player Image */}
        <div className="w-full lg:w-[45%] h-full flex justify-end items-end relative mt-10 lg:mt-0 delay-200 animate-fade-in-up">
          {/* Decorative script text behind image */}
          <div className="absolute right-[-10%] bottom-[20%] font-script text-5xl lg:text-7xl text-kh-pink opacity-40 rotate-[-10deg] pointer-events-none select-none z-0">
            Kennedi
            <br />
            Harris
            <br />
            #30
          </div>

          <div className="relative z-10 h-[500px] lg:h-[700px] w-full flex justify-end">
            {/* The image will be placed here. Using a placeholder container if image is missing */}
            <div className="w-[80%] h-full bg-kh-blue/10 border border-kh-blue/30 rounded-lg flex items-center justify-center backdrop-blur-sm overflow-hidden">
              {/* <img
                src={heroImg}
                alt="Kennedi Harris"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement?.classList.add(
                    "flex",
                    "items-center",
                    "justify-center",
                  );
                  e.currentTarget.parentElement!.innerHTML =
                    '<div class="text-kh-gray font-condensed">IMAGE PLACEHOLDER</div>';
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="w-full border-y border-white/10 bg-[#0C0C14]/80 backdrop-blur mt-auto">
        <div className="max-w-[1920px] w-full mx-auto px-6 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between py-5 gap-y-4 text-xs font-condensed font-bold tracking-widest text-white">
          <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center lg:justify-start">
            <Calendar className="text-kh-pink" size={18} />
            CLASS OF 2030
          </div>
          <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
            <Ruler className="text-kh-pink" size={18} />
            6'2
          </div>
          <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
            <User className="text-kh-pink" size={18} />
            GUARD / FORWARD
          </div>
          <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
            <MapPin className="text-kh-pink" size={18} />
            GEORGIA
          </div>
          <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center lg:justify-end">
            <Star className="text-kh-pink" size={18} />
            NATIONAL PROSPECT
          </div>
        </div>
      </div>
    </section>
  );
}
