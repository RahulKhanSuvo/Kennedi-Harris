import { Link, useLocation } from "react-router";
import { Camera, MessageCircle, Video, Music } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "#about" },
    { name: "HIGHLIGHTS", path: "#highlights" },
    { name: "SCHEDULE", path: "#schedule" },
    { name: "MEDIA KIT", path: "#media" },
    { name: "BRAND PARTNERS", path: "#partners" },
    { name: "GALLERY", path: "#gallery" },
    { name: "CONTACT", path: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1905px] mx-auto px-4 lg:px-10 flex items-center justify-between h-20">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex text-[40px] font-display font-bold leading-none">
            <span className="text-kh-blue">K</span>
            <span className="text-kh-pink">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[22px] leading-none tracking-wider text-white">
              KENNEDI HARRIS
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-kh-pink leading-none mt-1 font-bold">
              HOOPS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/" && location.pathname === "/");
            return (
              <a
                key={link.name}
                href={link.path}
                className={`font-condensed font-bold text-[13px] tracking-widest transition-colors relative pb-1 uppercase ${
                  isActive ? "text-kh-pink" : "text-white hover:text-kh-pink"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-[-26px] left-0 right-0 h-[3px] bg-kh-pink" />
                )}
              </a>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="hidden lg:flex items-center gap-5 text-white">
          <a href="#" className="hover:text-kh-pink transition-colors">
            <Camera size={20} />
          </a>
          <a href="#" className="hover:text-kh-pink transition-colors">
            <Music size={20} />
          </a>
          <a href="#" className="hover:text-kh-pink transition-colors">
            <MessageCircle size={20} />
          </a>
          <a href="#" className="hover:text-kh-pink transition-colors">
            <Video size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
