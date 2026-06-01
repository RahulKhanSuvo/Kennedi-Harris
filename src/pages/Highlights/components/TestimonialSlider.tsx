import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Autoplay } from "swiper/modules";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const dummyTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Kennedi Harris is a special talent with a relentless work ethic. She impacts the game on both ends and elevates everyone around her.",
    author: "COACH TYLER REEVES",
    role: "FBC United Head Coach",
  },
  {
    id: 2,
    quote:
      "An absolute competitor who brings maximum effort to every single possession. Leadership comes naturally to her.",
    author: "COACH SARAH JENKINS",
    role: "Elite Training Director",
  },
  {
    id: 3,
    quote:
      "Her court vision and defensive intensity set her apart from any player in her class. A game-changer in every sense.",
    author: "DIRECTOR MARCUS VANCE",
    role: "Scouting Coordinator",
  },
];

export default function TestimonialSlider(): React.JSX.Element {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // FIX 1: Added 'w-full' to the container wrapper to force rigid width constraints
    <div className="mx-auto my-16 w-full max-w-7xl rounded-sm bg-[#0a0a0c] border border-white/5 p-6 md:p-16 font-sans relative overflow-hidden group">
      {/* Decorative Brand Accent Grid Layer */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#ff0055]/2 blur-2xl pointer-events-none rounded-full" />

      {/* Background Icon Watermark */}
      <Quote className="absolute right-10 bottom-4 w-36 h-36 text-white/1 pointer-events-none select-none" />

      {/* Slider Track */}
      {/* FIX 2: Added 'min-w-0' to the Swiper instance. This forces Swiper to shrink to mobile viewports instead of overflowing */}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={40}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="w-full min-w-0"
      >
        {dummyTestimonials.map((item) => (
          <SwiperSlide key={item.id}>
            {/* FIX 3: Changed grid track settings by explicitly setting 'min-w-0' to break the default CSS grid track calculation */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center min-h-[140px] text-left min-w-0">
              {/* Left Side: Dynamic Paragraph Display */}
              {/* FIX 4: Added 'min-w-0' and 'break-words' to ensure text wraps instead of pushing out layout bounds */}
              <div className="lg:col-span-8 flex items-start gap-3 md:gap-6 md:pr-8 min-w-0">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#ff0055] shrink-0 mt-1 transform rotate-180 opacity-90" />
                <p className="m-0 text-base md:text-xl font-medium tracking-tight leading-relaxed text-[#e0e0e0] font-sans wrap-break-word">
                  {item.quote}
                </p>
              </div>

              {/* Right Side: Coach Branding Compartment */}
              <div className="lg:col-span-4 flex items-stretch lg:pl-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l">
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 font-bold uppercase mb-1">
                    RECOMMENDATION
                  </span>
                  <h4 className="m-0 text-base font-black tracking-wider text-[#ff0055] uppercase font-display">
                    {item.author}
                  </h4>
                  <p className="m-0 mt-1 text-sm font-medium tracking-wide text-zinc-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Control Module Footer Bracket */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6">
        {/* Custom Core Pagination Bars */}
        <div className="flex items-center gap-2">
          {dummyTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={`h-1.5 transition-all duration-300 rounded-none ${
                activeIndex === index
                  ? "w-8 bg-[#ff0055]"
                  : "w-3 bg-zinc-800 hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Clean Interactive Control Clusters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white transition-all bg-zinc-900/50 hover:bg-[#ff0055] hover:border-[#ff0055] active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white transition-all bg-zinc-900/50 hover:bg-[#ff0055] hover:border-[#ff0055] active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
