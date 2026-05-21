import { MapPin, Star } from "lucide-react";
import { LuCalendarDays } from "react-icons/lu";
import { PiBasketballLight } from "react-icons/pi";
import { TbRuler2 } from "react-icons/tb";

export default function BottomInfoBar() {
  return (
    <div className="w-full border-y border-white/10 backdrop-blur mt-auto">
      <div className="max-w-[1920px] w-full mx-auto px-10   flex flex-wrap lg:flex-nowrap items-center justify-between font-condensed font-semibold tracking-widest py-8 text-xl text-white">
        <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center lg:justify-start">
          <LuCalendarDays className="text-kh-pink" size={24} />
          CLASS OF 2030
        </div>
        <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
          {/* <Ruler className="text-kh-pink" size={24} /> */}
          <TbRuler2 className="text-kh-pink" size={24} />
          6'2
        </div>
        <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
          {/* <User className="text-kh-pink" size={24} /> */}
          <PiBasketballLight className="text-kh-pink" size={24} />
          GUARD / FORWARD
        </div>
        <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center">
          <MapPin className="text-kh-pink" size={24} />
          GEORGIA
        </div>
        <div className="flex items-center gap-3 stat-bar-item lg:w-1/5 justify-center lg:justify-end">
          <Star className="text-kh-pink" size={24} />
          NATIONAL PROSPECT
        </div>
      </div>
    </div>
  );
}
