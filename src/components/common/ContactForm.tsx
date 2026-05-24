import Container from "@/components/common/Container";
import { ChevronDown, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { motion, type Variants } from "motion/react";

// Kinetic physics curves for premium UI acceleration
const fluidSpring = [0.16, 1, 0.3, 1] as const;

// Safe viewport boundaries config for middle-of-the-page containers
const formViewportSettings = {
  once: true,
  amount: 0.15, // Triggers immediately when 15% of the block enters view
  margin: "0px 0px -30px 0px",
} as const;

const animationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: fluidSpring,
      // Staggers inner structural children slightly for a richer presentation feel
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: fluidSpring },
  },
};

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full py-6 overflow-hidden">
      <Container className="relative z-10">
        {/* Animated Container Node Wrapper */}
        <motion.div
          variants={animationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={formViewportSettings}
          className="flex flex-col xl:flex-row items-center justify-between gap-8 bg-[#0b0d0f] p-6 lg:p-8 rounded border border-white/5 shadow-2xl"
        >
          {/* Left Metadata - Stagger Group Item 1 */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 w-full xl:w-2/5"
          >
            <div className="w-14 h-14 rounded-full border border-kh-pink flex items-center justify-center text-kh-pink shrink-0 bg-kh-pink/5 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-condensed text-xl lg:text-2xl font-semibold tracking-widest uppercase text-white leading-tight">
                RECRUITING, MEDIA & BRAND INQUIRIES
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium">
                Let's connect! Fill out the form and we'll be in touch.
              </p>
            </div>
          </motion.div>

          {/* Right Interface Block - Stagger Group Item 2 */}
          <motion.div variants={childVariants} className="w-full xl:w-3/5">
            <form
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 w-full items-end"
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full bg-neutral-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-kh-pink focus:bg-neutral-900/90 transition-all duration-200"
                />
              </div>

              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-neutral-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-kh-pink focus:bg-neutral-900/90 transition-all duration-200"
                />
              </div>

              <div className="w-full relative">
                <select
                  value={inquiryType}
                  required
                  onChange={(e) => setInquiryType(e.target.value)}
                  className={`w-full bg-neutral-900/60 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-kh-pink focus:bg-neutral-900/90 appearance-none transition-all duration-200 ${
                    inquiryType === "" ? "text-zinc-500" : "text-white"
                  }`}
                >
                  <option value="" disabled hidden>
                    Inquiry Type
                  </option>
                  <option
                    value="recruiting"
                    className="bg-neutral-900 text-white"
                  >
                    Recruiting
                  </option>
                  <option value="media" className="bg-neutral-900 text-white">
                    Media
                  </option>
                  <option value="brand" className="bg-neutral-900 text-white">
                    Brand Partner
                  </option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  size={15}
                />
              </div>

              <div className="w-full sm:col-span-2 md:col-span-1">
                <button className="w-full bg-kh-pink hover:bg-rose-500 active:scale-[0.98] transition-all duration-200 text-white font-condensed font-black tracking-widest uppercase py-3 rounded-lg text-xs md:text-sm shadow-lg shadow-kh-pink/10 cursor-pointer">
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
