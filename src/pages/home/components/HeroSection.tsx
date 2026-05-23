import { PlayCircle, FileText, Mail } from "lucide-react";
import heroImg from "@/assets/modal/hero.png";
import Container from "@/components/common/Container";
import backgroundImage from "@/assets/backgroud/984f0b66772a4d7d8361bee6cd73b590.png";

export default function HeroSection() {
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
        <div className="w-full lg:w-[45%] flex flex-col items-start gap-2">
          <div className="font-condensed font-bold tracking-[0.2em] text-kh-pink text-sm uppercase">
            Class of 2030
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl xl:text-[200px] leading-[0.85] text-white tracking-wider">
              KENNEDI
            </h1>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl xl:text-[200px] leading-[0.85] text-kh-pink tracking-wider">
              HARRIS
            </h1>
          </div>

          <div className="font-condensed font-semibold tracking-widest text-white text-xl sm:text-2xl">
            6'4 GUARD / FORWARD
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="font-script text-4xl sm:text-5xl text-kh-pink">
              Unfinished Legacy.
            </div>
            <div className="font-condensed  tracking-widest text-white text-lg sm:text-xl uppercase">
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
