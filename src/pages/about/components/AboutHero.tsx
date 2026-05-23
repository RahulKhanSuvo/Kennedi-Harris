import { Play } from "lucide-react";
import heroImg from "@/assets/modal/hero.png";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center  overflow-hidden hero-glow-blue">
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* opacity */}
      <div className="absolute inset-0 z-0 bg-black/70"></div>
      {/* Background large 11 */}
      <div className="absolute top-20 right-0 lg:right-10 pointer-events-none select-none z-0">
        <span className="font-display text-[300px] lg:text-[450px] leading-none outline-text-blue ">
          11
        </span>
      </div>

      <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between pt-16">
        {/* Left Content */}
        <div className="flex flex-col gap-6 animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.2em] uppercase font-bold text-lg">
            About Kennedi
          </span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl leading-[0.85] tracking-tight">
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
              At 6'4", she impacts the game on both ends of the floor with the
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

        {/* Right Player Image */}
        <div className="w-full lg:w-[55%] h-full flex justify-start items-start relative">
          <div
            className="absolute bottom-[-10%] left-[25%] -translate-x-1/2 pointer-events-none
                  h-[300px] w-[300px] rounded-full 
                  bg-[#ec4899] opacity-30 blur-[80px]"
          ></div>
          <div
            className="absolute bottom-0 right-0 pointer-events-none
                  h-[400px] w-[500px] rounded-tl-[100px]
                  bg-linear-to-br from-[#06b6d4] to-[#3b82f6] opacity-25 blur-[100px]"
          ></div>
          {/* Decorative script text behind image */}
          <div className="absolute right-[5%] bottom-[20%] font-script text-5xl lg:text-7xl text-kh-pink rotate-[-10deg] z-30">
            Kennedi
            <br />
            Harris
            <br />
            <span className="text-white">#11</span>
          </div>

          <div className="relative z-10  w-full flex justify-start">
            <div className="w-[80%] flex items-center justify-center overflow-hidden">
              <img
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
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
