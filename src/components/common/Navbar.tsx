import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

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

  // Prevent background scrolling when mobile menu is active
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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5 bg-black/40">
        <div className="max-w-[1905px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group relative z-50"
          >
            <div className="flex text-4xl font-display font-black tracking-tighter leading-none select-none transition-transform duration-300 group-hover:scale-105">
              <span className="text-kh-blue drop-shadow-[0_0_15px_rgba(var(--kh-blue-rgb),0.5)]">
                K
              </span>
              <span className="text-kh-pink drop-shadow-[0_0_15px_rgba(var(--kh-pink-rgb),0.5)]">
                H
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display text-xl leading-none tracking-widest text-white font-bold transition-colors group-hover:text-kh-pink duration-300">
                KENNEDI HARRIS
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] text-kh-pink/90 leading-none mt-1.5 font-black uppercase">
                HOOPS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-condensed font-bold tracking-[0.15em] text-[15px] transition-all duration-300 relative py-2 uppercase select-none ${
                    isActive
                      ? "text-kh-pink drop-shadow-[0_0_8px_rgba(var(--kh-pink-rgb),0.4)]"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {/* Sliding Underline Effect */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-kh-pink transition-all duration-300 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-50"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center gap-5 text-white/70">
            {[
              {
                icon: <FaInstagram size={19} />,
                url: "https://instagram.com/kennediharrishoops",
                label: "Instagram",
              },
              {
                icon: <FaTiktok size={18} />,
                url: "https://tiktok.com/@KennediHarrisHoops",
                label: "TikTok",
              },
              {
                icon: <FaTwitter size={19} />,
                url: "https://x.com/kennedihoops",
                label: "X",
              },
              {
                icon: <FaYoutube size={20} />,
                url: "https://youtube.com/@KennediHarrisHoops",
                label: "YouTube",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(var(--kh-pink-rgb),0.5)]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Minimalist Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden flex-col items-center justify-center w-10 h-10 gap-1.5 z-50 relative focus:outline-none rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Premium Full-Screen Mobile Drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-in-out lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between px-8 pt-32 pb-12 overflow-y-auto">
          {/* Mobile Links - Added inline onClick to dismiss menu */}
          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? `${idx * 50}ms` : "0ms" }}
                className={({ isActive }) =>
                  `font-condensed font-black tracking-[0.2em] text-2xl transition-all duration-300 py-2 block uppercase transform ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  } ${
                    isActive
                      ? "text-kh-pink pl-2 border-l-2 border-kh-pink"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Social Area Footer */}
          <div
            className={`flex flex-col gap-6 items-center border-t border-white/10 pt-8 transition-all duration-500 delay-300 transform ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-8 text-white/60">
              <a
                href="https://instagram.com/kennediharrishoops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://tiktok.com/@KennediHarrisHoops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink hover:scale-110 transition-all"
                aria-label="TikTok"
              >
                <FaTiktok size={22} />
              </a>
              <a
                href="https://x.com/kennedihoops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink hover:scale-110 transition-all"
                aria-label="X"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://youtube.com/@KennediHarrisHoops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kh-pink hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <FaYoutube size={26} />
              </a>
            </div>
            <p className="text-[10px] font-sans tracking-[0.3em] text-white/30 uppercase">
              © {new Date().getFullYear()} Kennedi Harris
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
