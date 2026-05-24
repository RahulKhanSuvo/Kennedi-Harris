"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bell, CheckCircle2, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";

// Explicitly type and secure object values for TypeScript using 'as const'
const leftContentVariants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
} as const;

const rightFormVariants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 15, delay: 0.1 },
  },
} as const;

export function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 4000); // Reset success toast after 4 seconds
    }
  };

  return (
    <section className="border-y border-white/5 py-14 bg-kh-dark relative overflow-hidden">
      {/* High-fidelity Neon Background Accents */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-kh-pink/5 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute left-10 bottom-0 w-[300px] h-[150px] bg-kh-blue/5 blur-[100px] rounded-full pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-6">
          {/* Left Side: Animated Brand & Headline Column */}
          <motion.div
            variants={leftContentVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 xl:w-1/2 will-change-transform"
          >
            {/* Ambient Bell Core Module */}
            <div className="relative flex items-center justify-center shrink-0 group">
              <div className="absolute inset-0 border border-kh-pink/20 rounded-full scale-[1.35] animate-pulse-glow"></div>
              <div className="absolute inset-0 border border-kh-pink/40 rounded-full scale-[1.18] transition-transform duration-500 group-hover:scale-[1.25]"></div>

              <motion.div
                whileHover={{ rotate: [0, -15, 12, -8, 4, 0] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-black/60 text-kh-pink shadow-[0_0_20px_rgba(234,76,137,0.15)] cursor-pointer"
              >
                <Bell className="w-6 h-6 stroke-[2.2]" />
              </motion.div>
            </div>

            <div>
              <h3 className="font-condensed font-black text-2xl md:text-3xl text-white tracking-wider mb-2 uppercase">
                STAY IN THE ZONE
              </h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-sans font-light">
                Subscribe to catch instant schedule shifts, schedule drops, and
                exclusive team announcements directly.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Animated Input Area Block */}
          <motion.div
            variants={rightFormVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="w-full xl:w-1/2 flex justify-center xl:justify-end will-change-transform"
          >
            <div className="w-full max-w-md relative">
              {/* Form Component Container */}
              <form
                className="flex flex-col sm:flex-row w-full gap-3 bg-white/[0.02] border border-white/10 p-2 rounded-lg backdrop-blur-md focus-within:border-kh-pink/40 focus-within:shadow-[0_0_25px_rgba(234,76,137,0.05)] transition-all duration-300"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow bg-transparent rounded-md px-3 py-3 text-white placeholder-gray-500 text-sm font-sans focus:outline-none"
                  required
                  disabled={isSubmitted}
                />

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  disabled={isSubmitted}
                  className="btn-primary py-3 px-6 justify-center font-condensed font-bold tracking-widest text-sm bg-kh-pink hover:bg-kh-pink/90 text-white flex items-center gap-2 rounded-md transition-all shrink-0 min-w-[125px]"
                >
                  SUBSCRIBE
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </form>

              {/* Toast / Inner Success Card State */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -bottom-14 left-0 right-0 mx-auto bg-black border border-emerald-500/30 rounded-md p-2.5 flex items-center gap-2.5 justify-center shadow-[0_4px_20px_rgba(16,185,129,0.1)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-condensed font-bold tracking-wider text-xs text-emerald-400 uppercase">
                    Awesome! Check your inbox soon.
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
