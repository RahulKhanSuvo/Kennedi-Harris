import { FaQuoteLeft } from "react-icons/fa";
import Container from "./Container";

const AthleteBanner = () => {
  return (
    <section className="relative  w-full bg-kh-dark py-6 px-4 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 ">
      {/* Background Gradients/Textures */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Left Pink Glow */}
        <div className="absolute left-0 top-0 bottom-0 w-full h-full bg-linear-to-r from-kh-pink-bright via-purple-900/10 to-transparent blur-xl" />
        {/* Right Blue Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-full h-full bg-linear-to-l from-kh-blue-light via-indigo-950/20 to-transparent blur-xl" />

        {/* Subtle geometric grid or mesh overlay could go here via CSS if desired */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />
      </div>

      <Container className="relative flex max-w-[80%]  mx-auto justify-between">
        {/* Left Section: Quote */}
        <div className="relative z-10 flex items-start gap-4 max-w-2xl w-full md:w-auto">
          {/* Neon Quote Icon */}
          <FaQuoteLeft className="text-6xl text-kh-pink-bright" />

          {/* Main Text */}
          <p className="text-gray-200 text-lg sm:text-xl font-medium tracking-wide leading-relaxed font-sans mt-1">
            I'm not here to be average. I'm here to be great—
            <span className="block md:inline text-white font-semibold">
              for my team, my family, and my future.
            </span>
          </p>
        </div>

        {/* Right Section: Name & Number */}
        <div className="relative z-10 flex flex-col items-center md:items-end justify-center select-none shrink-0 pr-2">
          {/* Signature Name */}
          <h2 className="text-3xl sm:text-4xl font-normal text-pink-500 tracking-wide font-signature drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] rotate-[-2deg]">
            Kennedi Harris
          </h2>

          {/* Player Number */}
          <span className="text-4xl sm:text-5xl font-black italic text-blue-500 tracking-tighter mt-1 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] font-mono">
            #30
          </span>
        </div>
      </Container>
    </section>
  );
};

export default AthleteBanner;
