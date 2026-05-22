import React from "react";
import { BsYoutube } from "react-icons/bs";

export function SubscribeSection() {
  return (
    <section className="py-12 mt-8 mb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-kh-dark-2/50"></div>

      {/* Background Glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-kh-pink/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-kh-blue/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 border-y border-white/5 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          {/* Icon Container */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 border border-kh-pink/30 rounded-full scale-[1.3] animate-pulse-glow"></div>
            <div className="absolute inset-0 border border-kh-pink/50 rounded-full scale-[1.15]"></div>
            <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-black/50 text-kh-pink">
              <BsYoutube className="w-8 h-8" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-1">
              NEVER MISS A MOMENT
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-md">
              Subscribe to my YouTube channel
              <br className="hidden md:block" />
              for the latest highlights and updates.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline border-kh-pink text-kh-pink hover:text-white shrink-0 group flex items-center gap-2"
        >
          VISIT MY YOUTUBE
          <BsYoutube className="w-5 h-5 text-kh-pink group-hover:text-white transition-colors" />
        </a>
      </div>
    </section>
  );
}
