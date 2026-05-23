import React from "react";
// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import core Swiper CSS files
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <div className="mx-auto my-10 max-w-4xl rounded bg-[#0a0a0c] px-6 py-10 font-sans md:px-14">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="
          pb-10
          /* Target Swiper Internal Elements with Tailwind Nesting */
          [&_.swiper-button-next]:scale-50 [&_.swiper-button-next]:text-white
          [&_.swiper-button-prev]:scale-50 [&_.swiper-button-prev]:text-white
          [&_.swiper-pagination-bullet-active]:bg-[#ff0055]! [&_.swiper-pagination-bullet-active]:h-2 [&_.swiper-pagination-bullet-active]:w-2
          [&_.swiper-pagination-bullet]:bg-[#555555] [&_.swiper-pagination-bullet]:opacity-100
        "
      >
        {dummyTestimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex min-h-[120px] flex-col items-center justify-between gap-6 px-10 sm:flex-row sm:gap-0">
              {/* Left Side: Quote Icon & Text */}
              <div className="flex flex-1 items-start gap-4 pr-0 sm:flex-2 sm:pr-8">
                <span className="select-none font-serif text-5xl font-bold leading-8 text-[#ff0055]">
                  “
                </span>
                <p className="m-0 text-base font-normal leading-relaxed text-[#e0e0e0]">
                  {item.quote}
                </p>
              </div>

              {/* Vertical Divider (Hidden on mobile stack, visible on layout split) */}
              <div className="hidden h-auto self-stretch border-l border-[#222] sm:block sm:mx-5" />

              {/* Right Side: Author Details */}
              <div className="flex flex-1 flex-col justify-center pl-0 sm:pl-2">
                <h4 className="m-0 text-sm font-bold tracking-wider text-[#ff0055] uppercase">
                  {item.author}
                </h4>
                <p className="m-0 mt-1.5 text-xs font-normal text-[#8a8a8f]">
                  {item.role}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
