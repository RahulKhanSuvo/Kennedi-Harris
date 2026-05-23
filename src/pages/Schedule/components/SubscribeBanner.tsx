import Container from "@/components/common/Container";
import { Bell } from "lucide-react";

export function SubscribeBanner() {
  return (
    <section className="border-y border-white/5 py-12 bg-kh-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-kh-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <Container className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-4">
        {/* Left Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start xl:items-center text-center md:text-left gap-6 xl:w-1/2">
          {/* Icon Container */}
          <div className="relative flex items-center justify-center shrink-0">
            <div className="absolute inset-0 border border-kh-pink/30 rounded-full scale-[1.3] animate-pulse-glow"></div>
            <div className="absolute inset-0 border border-kh-pink/50 rounded-full scale-[1.15]"></div>
            <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-black/50 text-kh-pink">
              <Bell className="w-7 h-7" />
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-2">
              STAY UPDATED
            </h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Subscribe to get the latest schedule changes,
              <br className="hidden md:block" />
              game updates, and event announcements.
            </p>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="w-full xl:w-1/2 flex justify-center xl:justify-end">
          <form
            className="flex flex-col sm:flex-row w-full max-w-md gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-kh-pink transition-colors"
              required
            />
            <button type="submit" className="btn-primary justify-center">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
