import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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
    <div className="mx-auto my-10 max-w-7xl rounded bg-[#0a0a0c] px-12 py-10 font-sans md:px-20 relative">
      {/* Slider Track */}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="w-full"
      >
        {dummyTestimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0 items-center min-h-[140px]">
              {/* Left Column: Quote Text */}
              <div className="md:col-span-2 flex items-start gap-4 md:pr-12">
                <span className="select-none font-serif text-5xl font-bold leading-8 text-[#ff0055]">
                  “
                </span>
                <p className="m-0 text-base font-normal leading-relaxed text-[#e0e0e0]">
                  {item.quote}
                </p>
              </div>

              {/* Right Column: Side Bar Divider & Author Details Combined */}
              <div className="flex items-stretch gap-6 md:pl-8 border-t border-zinc-800 pt-6 md:border-t-0 md:pt-0 md:border-l md:border-zinc-800">
                <div className="flex flex-col justify-center">
                  <h4 className="m-0 text-sm font-bold tracking-wider text-[#ff0055] uppercase">
                    {item.author}
                  </h4>
                  <p className="m-0 mt-1.5 text-xs font-normal text-[#8a8a8f]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Bottom Pagination Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {dummyTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeIndex === index
                ? "w-6 bg-[#ff0055]"
                : "w-2 bg-zinc-700 hover:bg-zinc-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Absolute Positioned Side-by-Side Navigation Arrows */}
      {/* Left Control */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 md:left-6 top-1/2 z-10 -translate-y-1/2 flex text-2xl text-white transition hover:border-[#ff0055] hover:text-[#ff0055] active:scale-95"
        aria-label="Previous slide"
      >
        <FaAngleLeft />
      </button>

      {/* Right Control */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 md:right-6 top-1/2 z-10 -translate-y-1/2 text-2xl text-white transition hover:border-[#ff0055] hover:text-[#ff0055] active:scale-95"
        aria-label="Next slide"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
