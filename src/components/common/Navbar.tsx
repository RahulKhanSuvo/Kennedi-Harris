import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";

// Backdrop dark overlay fade configurations
const backdropVariants: Variants = {
  closed: { opacity: 0 },
  opened: { opacity: 1, transition: { duration: 0.3 } },
};

// Right-hand sliding structural blade configuration
const drawerVariants: Variants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 38,
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  opened: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 26,
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
};

// Interactive item row pop configurations
const linkItemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  opened: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "about" },
    { name: "HIGHLIGHTS", path: "highlights" },
    { name: "SCHEDULE", path: "schedule" },
    { name: "MEDIA KIT", path: "media-kit" },
    { name: "BRAND PARTNERS", path: "brand-partners" },
    { name: "GALLERY", path: "gallery" },
    { name: "CONTACT", path: "contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/50">
        <div className="max-w-[1905px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-20 relative z-50">
          {/* Logo Brand Section */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group relative z-50"
          >
            <div className="flex text-3xl sm:text-4xl font-display font-black tracking-tighter leading-none select-none transition-transform duration-300 group-hover:scale-105">
              <span className="text-kh-blue drop-shadow-[0_0_15px_rgba(var(--kh-blue-rgb),0.5)]">
                K
              </span>
              <span className="text-kh-pink drop-shadow-[0_0_15px_rgba(var(--kh-pink-rgb),0.5)]">
                H
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display text-base sm:text-lg lg:text-xl leading-none tracking-widest text-white font-bold transition-colors group-hover:text-kh-pink duration-300">
                KENNEDI HARRIS
              </span>
              <span className="font-mono text-[8px] tracking-[0.3em] text-kh-pink/90 leading-none mt-1 font-black uppercase">
                // HOOPS
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION SCHEME */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-condensed font-bold tracking-[0.15em] text-[14px] xl:text-[15px] transition-all duration-300 relative py-2 uppercase select-none ${
                    isActive
                      ? "text-kh-pink drop-shadow-[0_0_8px_rgba(var(--kh-pink-rgb),0.4)]"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-kh-pink transition-all duration-300 origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP SOCIAL INTERFACES */}
          <div className="hidden lg:flex items-center gap-5 text-white/60">
            {[
              {
                icon: <FaInstagram size={18} />,
                url: "https://instagram.com/kennediharrishoops",
                label: "Instagram",
              },
              {
                icon: <FaTiktok size={16} />,
                url: "https://tiktok.com/@KennediHarrisHoops",
                label: "TikTok",
              },
              {
                icon: <FaTwitter size={18} />,
                url: "https://x.com/kennedihoops",
                label: "X",
              },
              {
                icon: <FaYoutube size={19} />,
                url: "https://youtube.com/@KennediHarrisHoops",
                label: "YouTube",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink transition-colors duration-200"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* HIGH-TECH MINIMALIST CONTROLS METRIC */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden flex-col items-center justify-center w-11 h-11 z-50 relative focus:outline-none rounded-lg bg-zinc-900/40 border border-white/5 active:scale-95 transition-transform"
            aria-label="Toggle Mobile Panel"
          >
            <div className="w-5 h-3 flex flex-col justify-between items-end">
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"}`}
              />
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-200 ${isOpen ? "w-0 opacity-0" : "w-3"}`}
              />
              <span
                className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? "w-5 -rotate-45 translate-y-[-5px]" : "w-4"}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ASYMMETRIC MOBILE SLIDING SYSTEM BLADE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Ambient Background Shield Cover */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />

            {/* Side Drawer Panel Node Box */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[78vw] max-w-[340px] z-40 bg-zinc-950/95 border-l border-white/10 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 pt-28 shadow-2xl"
            >
              {/* Tech Vertical Strip Accent Lines */}
              {/* <div className="absolute left-3 top-28 bottom-28 w-px bg-linear-to-b from-transparent via-white/10 to-transparent flex items-center justify-center">
                <span className="font-mono text-[7px] text-zinc-600 tracking-[0.4em] uppercase rotate-90 origin-center whitespace-nowrap">
                  ROUTING_MATRIX_ACTIVE
                </span>
              </div> */}

              {/* Vertical link sequence layout */}
              <div className="flex flex-col gap-2 pl-4 relative z-10 w-full">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkItemVariants}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between font-condensed font-black tracking-wider text-base py-3 px-3 rounded-lg transition-all border ${
                          isActive
                            ? "text-kh-pink border-kh-pink/20 bg-kh-pink/3 shadow-md shadow-kh-pink/1"
                            : "text-zinc-400 border-transparent hover:text-white hover:bg-white/2"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isActive
                                ? "text-kh-pink opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Embedded Mini Drawer Footer Deck */}
              <motion.div
                variants={linkItemVariants}
                className="flex flex-col gap-4 border-t border-white/5 pt-5 pl-4 w-full"
              >
                <div className="flex items-center gap-5 text-zinc-500">
                  <a
                    href="https://instagram.com/kennediharrishoops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kh-pink transition-colors"
                  >
                    <FaInstagram size={17} />
                  </a>
                  <a
                    href="https://tiktok.com/@KennediHarrisHoops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kh-pink transition-colors"
                  >
                    <FaTiktok size={15} />
                  </a>
                  <a
                    href="https://x.com/kennedihoops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kh-pink transition-colors"
                  >
                    <FaTwitter size={17} />
                  </a>
                  <a
                    href="https://youtube.com/@KennediHarrisHoops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kh-pink transition-colors"
                  >
                    <FaYoutube size={18} />
                  </a>
                </div>

                <div className="flex items-center justify-between font-mono text-[8px] text-zinc-600 tracking-widest">
                  <span>MNU // ED.01</span>
                  <span>©2026</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
