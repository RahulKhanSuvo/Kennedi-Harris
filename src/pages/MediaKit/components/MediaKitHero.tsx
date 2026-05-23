import { Download } from "lucide-react";
import heroImg from "../../../assets/me-removebg-preview.png";

export default function MediaKitHero() {
  const handleDownload = () => {
    // Open a dummy PDF or show a message
    alert("Media Kit PDF download started...");
  };

  return (
    <section className="relative w-full min-h-[700px] flex items-center pt-28 pb-16 overflow-hidden bg-kh-dark">
      {/* Background Glows */}
      <div
        className="absolute inset-0 hero-glow-pink opacity-35 pointer-events-none"
        style={{ left: "-10%", top: "10%" }}
      ></div>
      <div
        className="absolute inset-0 hero-glow-blue opacity-35 pointer-events-none"
        style={{ left: "50%", top: "5%" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in-up">
          <span className="text-kh-pink font-condensed tracking-[0.25em] uppercase font-bold text-sm">
            MEDIA KIT
          </span>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.8] tracking-tight">
            <span className="block text-white">KENNEDI</span>
            <span className="block text-kh-pink mt-1">HARRIS</span>
          </h1>

          <div className="flex flex-col gap-2">
            <div className="font-condensed font-bold text-white text-2xl md:text-3xl tracking-wider">
              6'4" GUARD / FORWARD
            </div>
            <div className="flex items-center gap-2 font-condensed font-bold text-[13px] tracking-widest text-kh-pink uppercase">
              <span>CLASS OF 2030</span>
              <span className="text-white/30">•</span>
              <span className="text-kh-blue-light">FBC UNITED</span>
              <span className="text-white/30">•</span>
              <span className="text-white">WARNER ROBINS, GEORGIA</span>
            </div>
          </div>

          <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed mt-2 font-sans font-light">
            Dynamic. Versatile. Relentless. Kennedi Harris brings passion and
            purpose to the court every single day. Here you'll find official
            photos, videos, bios, and resources for media and press.
          </p>

          <div className="mt-4">
            <button
              onClick={handleDownload}
              className="btn-primary group flex items-center gap-2 text-[13px] font-condensed font-bold tracking-widest py-3.5 px-6"
            >
              DOWNLOAD MEDIA KIT (PDF)
              <Download className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Content - Player Cutout & Outline Number */}
        <div className="lg:col-span-5 relative flex justify-center items-center animate-fade-in-up delay-200 mt-12 lg:mt-0">
          <div className="relative z-10 w-full max-w-[450px]">
            <img
              src={heroImg}
              alt="Kennedi Harris Media Kit"
              className="w-full object-contain object-bottom drop-shadow-[0_0_30px_rgba(26,64,200,0.3)] max-h-[550px] lg:max-h-[650px]"
            />
          </div>
          {/* Outline Number Behind */}
          <div className="absolute right-0 md:right-4 top-0 font-display text-[250px] md:text-[380px] outline-text-pink opacity-25 -z-10 leading-none select-none tracking-tighter">
            30
          </div>
          {/* Signature Overlay */}
          <div className="absolute -bottom-6 right-0 md:-right-4 transform -rotate-12 z-20 select-none">
            <span className="font-script text-4xl md:text-5xl lg:text-6xl text-kh-pink drop-shadow-md">
              Kennedi
            </span>
            <br />
            <span className="font-script text-4xl md:text-5xl lg:text-6xl text-kh-pink drop-shadow-md ml-12">
              Harris{" "}
              <span className="font-sans text-xl md:text-2xl font-bold ml-2 opacity-80">
                #30
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
