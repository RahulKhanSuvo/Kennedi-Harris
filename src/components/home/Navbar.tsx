import { navLinks } from "./data";
import { IGIcon, TikTokIcon, XIcon, YouTubeIcon } from "./icons";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      style={{
        background: "rgba(5,5,8,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      className="sticky top-0 z-50 w-full backdrop-blur-sm"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center h-14 gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 mr-2">
          <div
            className="font-display text-2xl leading-none"
            style={{ color: "#CC0000" }}
          >
            K
          </div>
          <div
            className="font-display text-2xl leading-none"
            style={{ color: "#1A40C8" }}
          >
            H
          </div>
          <div className="ml-1 font-condensed leading-tight text-xs uppercase tracking-wider">
            <div
              className="text-white font-bold"
              style={{ fontSize: "0.65rem" }}
            >
              KENNEDI HARRIS
            </div>
            <div
              className="text-kh-pink font-bold"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
            >
              HOOPS
            </div>
          </div>
        </a>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6 font-condensed font-semibold text-xs tracking-widest ml-2">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors ${l.active ? "text-kh-pink border-b border-kh-pink pb-0.5" : "text-white/70 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="ml-auto flex items-center gap-4 text-white/60">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <IGIcon />
          </a>
          <a
            href="#"
            aria-label="TikTok"
            className="hover:text-white transition-colors"
          >
            <TikTokIcon />
          </a>
          <a
            href="#"
            aria-label="X / Twitter"
            className="hover:text-white transition-colors"
          >
            <XIcon />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
