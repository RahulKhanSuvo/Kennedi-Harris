import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { motion, type Variants } from "motion/react";
import Container from "./Container";
import { NavLink } from "react-router";

const fluidSpring = [0.16, 1, 0.3, 1] as const;

// Scroll trigger configuration matrix
const scrollViewport = {
  once: true,
  amount: 0.15,
} as const;

// Staggered layout orchestration engine
const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const footerColumnVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: fluidSpring },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030405] text-white font-sans pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Heavy Sub-Layer Sports Watermark Accent */}
      <div className="absolute right-0 bottom-0 font-display text-[16vw] italic font-black text-white/1 select-none tracking-tighter leading-none pointer-events-none uppercase z-0">
        HARRIS_05
      </div>

      <Container className="relative z-10">
        {/* Main Footer Grid Layout with Staggered Viewport Reveal */}
        <motion.div
          variants={footerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16"
        >
          {/* Column 1: Brand Typography Panel */}
          <motion.div
            variants={footerColumnVariants}
            className="flex flex-col space-y-6"
          >
            <div className="flex items-center gap-8">
              {/* Aggressive Monogram Badge */}
              <div className="flex font-display text-8xl font-black italic tracking-tighter leading-none select-none">
                <span className="text-white">K</span>
                <span className="text-kh-pink -ml-1.5 transform translate-y-1">
                  H
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black tracking-tight leading-none uppercase">
                  KENNEDI HARRIS
                </span>
                <span className="text-[10px] tracking-[0.4em] text-kh-pink font-mono font-black mt-1 uppercase">
                  HOOPS // 11
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-[240px]">
              Built on faith. Driven by purpose. Focused on dominating the
              future of the game.
            </p>
          </motion.div>

          {/* Column 2: Editorial Navigation Links */}
          <motion.div
            variants={footerColumnVariants}
            className="border-l-0 lg:border-l border-white/5 lg:pl-8"
          >
            <h4 className="font-condensed font-black italic text-xs tracking-widest text-zinc-500 uppercase mb-6">
              QUICK NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:text-sm text-zinc-400 font-medium">
              {[
                { label: "Home", href: "/" },
                { label: "Media Kit", href: "/media-kit" },
                { label: "About", href: "/about" },
                { label: "Partners", href: "/partners" },
                { label: "Highlights", href: "/highlights" },
                { label: "Gallery", href: "/gallery" },
                { label: "Schedule", href: "/schedule" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <NavLink
                  key={i}
                  to={link.href}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive
                      ? "text-kh-pink transform hover:translate-x-1 transition-all duration-300 flex items-center gap-1 group"
                      : "hover:text-kh-pink transform hover:translate-x-1 transition-all duration-300 flex items-center gap-1 group"
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Social Stream Syndication */}
          <motion.div
            variants={footerColumnVariants}
            className="border-l-0 lg:border-l border-white/5 lg:pl-8"
          >
            <h4 className="font-condensed font-black italic text-xs tracking-widest text-zinc-500 uppercase mb-6">
              CONNECT
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed font-medium">
              Witness the journey in real-time across official handles.
            </p>
            <div className="flex items-center gap-4 text-xl sm:text-2xl text-white">
              {[
                {
                  icon: <FaFacebook />,
                  url: "https://web.facebook.com/profile.php?id=61555406655649",
                },
                { icon: <FaInstagram />, url: "#" },
                {
                  icon: <FaTiktok />,
                  url: "https://www.tiktok.com/@kennediharrishoops",
                },
                { icon: <FaYoutube />, url: "#" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={social.url}
                  whileHover={{ y: -4, scale: 1.08 }}
                  transition={{ duration: 0.2, ease: fluidSpring }}
                  className="w-10 h-10 rounded-lg bg-neutral-900/40 border border-white/5 flex items-center justify-center text-zinc-300 hover:text-white hover:border-kh-pink/40 hover:bg-neutral-900 transition-colors cursor-pointer shadow-md"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Communication Hub */}
          <motion.div
            variants={footerColumnVariants}
            className="border-l-0 lg:border-l border-white/5 lg:pl-8"
          >
            <h4 className="font-condensed font-black italic text-xs tracking-widest text-zinc-500 uppercase mb-6">
              OFFICIAL INQUIRIES
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-neutral-900/30 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-kh-pink group-hover:border-kh-pink/30 transition-colors">
                  <Mail size={14} />
                </div>
                <a
                  href="mailto:info@kennediharrishoops.com"
                  className="hover:text-white transition-colors truncate block max-w-[200px] lg:max-w-none"
                >
                  info@kennediharrishoops.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-neutral-900/30 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-kh-pink group-hover:border-kh-pink/30 transition-colors">
                  <Phone size={14} />
                </div>
                <a
                  href="tel:4041234567"
                  className="hover:text-white transition-colors"
                >
                  (404) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-neutral-900/30 border border-white/5 flex items-center justify-center text-zinc-500">
                  <MapPin size={14} />
                </div>
                <span className="text-zinc-400">Atlanta, Georgia</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Sub-Footer Bar Layout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.5, delay: 0.3, ease: fluidSpring }}
          className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono tracking-wider text-zinc-600 gap-4"
        >
          <div className="uppercase">
            © {currentYear} Kennedi Harris Hoops. Designed for elite
            performance.
          </div>
          <div className="flex gap-6 uppercase">
            <a
              href="#privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy Strategy
            </a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">
              Terms of Use
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
