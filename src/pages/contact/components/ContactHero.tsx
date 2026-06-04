import { Mail, Phone, MapPin, ArrowDown, Send } from "lucide-react";
import Container from "@/components/common/Container";
import { motion, type Variants } from "motion/react";
import type { ContactDetails } from "@/types";

export function ContactHero({
  contactDetails,
}: {
  contactDetails: ContactDetails;
}) {
  // Animation configuration constants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Custom smooth cubic-bezier
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Smooth delay between each text line/element
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#09090b] border-b border-white/5 overflow-hidden">
      {/* Structural Subtle Layout Overlays */}
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-linear-to-r from-kh-pink/5 to-cyan-500/5 blur-[130px] pointer-events-none" />

      {/* Decorative Giant Editorial Background Watermark */}
      <div className="absolute -right-20 top-1/4 text-[16vw] font-display font-black text-white/1 uppercase select-none tracking-tighter leading-none pointer-events-none">
        CONNECT // 11
      </div>

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* LEFT COLUMN (7 Columns) — Wrapped in a motion.div orchestrator */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Section Breadcrumb Track Badge */}
          <motion.div
            variants={fadeInUp}
            className="font-condensed font-bold tracking-[0.25em] text-kh-pink text-xs uppercase mb-3 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-kh-pink inline-block" />
            Get In Touch
          </motion.div>

          {/* Giant Typographic Statement with hidden overflow mask */}
          <h1 className="font-display text-5xl sm:text-7xl font-semibold leading-[0.85] tracking-tight text-white uppercase mb-8">
            <span className="block overflow-hidden py-1">
              <motion.span variants={fadeInUp} className="block">
                LET'S CONNECT.
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1 text-kh-pink">
              <motion.span variants={fadeInUp} className="block">
                LET'S ELEVATE.
              </motion.span>
            </span>
          </h1>

          {/* Core Content Body Paragraph */}
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 font-sans font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            Have a question, opportunity, or partnership idea? I'd love to hear
            from you. Fill out the form or reach out using the contact
            information below to get started.
          </motion.p>

          {/* Jump-to-Form Scrolling Anchor Node */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <a
              href="#contact-form-section"
              className="px-6 py-3.5 bg-white hover:bg-kh-pink text-black hover:text-white font-condensed font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 flex items-center gap-2.5 shadow-lg group"
            >
              <Send
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
              SEND A MESSAGE
            </a>

            <a
              href="#contact-form-section"
              className="h-11 w-11 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowDown size={16} className="animate-bounce" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Premium Digital Rolodex Card (Also animated nicely) */}
        <motion.div
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full max-w-sm bg-[#111115] border border-white/10 rounded p-6 md:p-8 shadow-2xl relative overflow-hidden group">
            {/* Subtle inner grid glow accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-kh-pink/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 dot-grid opacity-[0.05] z-0" />

            <h3 className="font-condensed font-bold text-lg tracking-wider text-white uppercase mb-6 relative z-10 pb-4 border-b border-white/5">
              DIRECT REACHOUT
            </h3>

            {/* Directory Metric Contact Info Items */}
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4 items-center group/item">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-kh-pink group-hover/item:border-kh-pink/40 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-condensed tracking-widest text-gray-500 uppercase">
                    Email Me Directly
                  </div>
                  <a
                    href={`${contactDetails.email}`}
                    className="text-sm font-sans font-medium text-gray-200 hover:text-kh-pink transition-colors"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center group/item">
                <div className="h-10 w-10 shrink-0 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover/item:border-cyan-400/40 transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-condensed tracking-widest text-gray-500 uppercase">
                    Management / Inquiries
                  </div>
                  <a
                    href={`tel:${contactDetails.phone}`}
                    className="text-sm font-sans font-medium text-gray-200 hover:text-cyan-400 transition-colors"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center group/item">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover/item:text-white transition-colors">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-condensed tracking-widest text-gray-500 uppercase">
                    Based Out Of
                  </div>
                  <div className="text-sm font-sans font-medium text-gray-300">
                    {contactDetails.location || "United States"}
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Identity Bottom Badge */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-condensed tracking-widest text-gray-600 uppercase relative z-10">
              <span>AVAILABLE FOR PARTNERSHIPS</span>
              <span>NO. 11</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
