import { Play } from "lucide-react";
import aboutPlayer from "../../../assets/about-player.png";

export function AboutHero() {
  return (
    <section className="relative w-full min-h-[700px] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div
        className="absolute inset-0 hero-glow-pink opacity-40 pointer-events-none"
        style={{ left: "-10%", top: "20%" }}
      ></div>
      <div
        className="absolute inset-0 hero-glow-blue opacity-40 pointer-events-none"
        style={{ left: "50%", top: "10%" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-sm">
            About Kennedi
          </span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
            <span className="block text-white">PURPOSE DRIVES.</span>
            <span className="block text-kh-pink mt-2">PASSION DEFINES.</span>
          </h1>

          <div className="text-gray-300 space-y-4 max-w-lg text-sm md:text-base leading-relaxed mt-4 font-sans font-light">
            <p>
              Kennedi Harris is a Class of 2030 basketball prospect known for
              her rare combination of size, versatility, rebounding, shot
              blocking, and guard-level skill.
            </p>
            <p>
              At 6'2", she impacts the game on both ends of the floor with the
              ability to score, defend, rebound, push the ball, and create
              opportunities for her team.
            </p>
            <p>
              Her journey is rooted in purpose, discipline, family, and legacy.
              Kennedi plays with a competitive edge and continues to develop
              into one of the most exciting young prospects in girls basketball.
            </p>
          </div>

          <div className="mt-4">
            <button className="btn-outline border-kh-pink text-kh-pink hover:text-white group">
              WATCH KENNEDI'S STORY
              <Play className="w-4 h-4 ml-2 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Content - Player Image & Number */}
        <div className="relative flex justify-center items-center animate-fade-in-up delay-200 mt-12 lg:mt-0">
          <div className="relative z-10">
            <img
              src={aboutPlayer}
              alt="Kennedi Harris"
              className="h-[500px] md:h-[650px] object-contain object-bottom drop-shadow-[0_0_20px_rgba(26,64,200,0.3)]"
            />
          </div>
          {/* Outline Number Behind */}
          <div className="absolute right-0 md:right-10 top-0 font-display text-[200px] md:text-[300px] outline-text-pink opacity-30 -z-10 leading-none select-none tracking-tighter">
            30
          </div>
          {/* Signature */}
          <div className="absolute -bottom-8 right-0 md:right-10 transform -rotate-12 z-20">
            <span className="font-script text-4xl md:text-6xl text-kh-pink drop-shadow-md">
              Kennedi
            </span>
            <br />
            <span className="font-script text-4xl md:text-6xl text-kh-pink drop-shadow-md ml-12">
              Harris{" "}
              <span className="font-sans text-2xl font-bold ml-2 opacity-80">
                #30
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
