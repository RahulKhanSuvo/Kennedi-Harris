import { footerLinks } from "./data";
import { IGIcon, TikTokIcon, XIcon, YouTubeIcon } from "./icons";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#03030A",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2.5rem 0 1.5rem",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-wrap gap-10 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4">
            <div
              className="font-display text-3xl leading-none"
              style={{ color: "#CC0000" }}
            >
              K
            </div>
            <div
              className="font-display text-3xl leading-none"
              style={{ color: "#1A40C8" }}
            >
              H
            </div>
            <div className="ml-1 font-condensed leading-tight">
              <div className="text-white font-bold text-sm tracking-wider">
                KENNEDI HARRIS
              </div>
              <div className="text-kh-pink font-bold text-xs tracking-[0.3em] uppercase">
                HOOPS
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-condensed font-bold text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
              QUICK LINKS
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-condensed text-white/55 text-xs hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="ml-auto">
            <p className="font-condensed font-bold text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
              CONNECT
            </p>
            <div className="flex items-center gap-4 text-white/55">
              <a
                href="#"
                id="footer-ig"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <IGIcon />
              </a>
              <a
                href="#"
                id="footer-tiktok"
                aria-label="TikTok"
                className="hover:text-white transition-colors"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                id="footer-x"
                aria-label="X / Twitter"
                className="hover:text-white transition-colors"
              >
                <XIcon />
              </a>
              <a
                href="#"
                id="footer-youtube"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1rem",
          }}
        >
          <p className="font-condensed text-white/30 text-xs tracking-wider text-right">
            © 2025 Kennedi Harris Hoops. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
