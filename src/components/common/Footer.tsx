import { Camera, MessageCircle, Video, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" pb-8">
      <div className="max-w-[1905px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pt-12">
          <div className="flex items-center gap-3">
            <div className="flex text-9xl font-logo font-bold leading-none">
              <span className="text-kh-blue">K</span>
              <span className="text-kh-pink -ml-6">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl lg:text-4xl leading-none tracking-wider text-white">
                KENNEDI HARRIS
              </span>
              <span className="font-sans text-[10px] text-center tracking-[0.25em] text-kh-pink leading-none mt-1 font-bold">
                HOOPS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="font-condensed font-bold text-sm tracking-widest uppercase mb-4 text-white">
                QUICK LINKS
              </h4>
              <ul className="space-y-2 text-xs text-kh-gray flex flex-col gap-1">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#highlights"
                    className="hover:text-white transition-colors"
                  >
                    Highlights
                  </a>
                </li>
                <li>
                  <a
                    href="#schedule"
                    className="hover:text-white transition-colors"
                  >
                    Schedule
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-condensed font-bold text-sm tracking-widest uppercase mb-4 text-transparent select-none">
                .
              </h4>
              <ul className="space-y-2 text-xs text-kh-gray flex flex-col gap-1">
                <li>
                  <a
                    href="#media"
                    className="hover:text-white transition-colors"
                  >
                    Media Kit
                  </a>
                </li>
                <li>
                  <a
                    href="#partners"
                    className="hover:text-white transition-colors"
                  >
                    Brand Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:text-white transition-colors"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-condensed font-bold text-sm tracking-widest uppercase mb-4 text-transparent select-none">
                .
              </h4>
              <ul className="space-y-2 text-xs text-kh-gray flex flex-col gap-1">
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect & Copyright */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div>
              <h4 className="font-condensed font-bold text-sm tracking-widest uppercase mb-4 text-white">
                CONNECT
              </h4>
              <div className="flex items-center gap-4 text-white">
                <a
                  href="https://instagram.com/kennediharrishoops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kh-pink transition-colors"
                  aria-label="Instagram"
                >
                  <Camera size={18} />
                </a>
                <a
                  href="https://tiktok.com/@KennediHarrisHoops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kh-pink transition-colors"
                  aria-label="TikTok"
                >
                  <Music size={18} />
                </a>
                <a
                  href="https://x.com/kennedihoops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kh-pink transition-colors"
                  aria-label="X (Twitter)"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="https://youtube.com/@KennediHarrisHoops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kh-pink transition-colors"
                  aria-label="YouTube"
                >
                  <Video size={18} />
                </a>
              </div>
            </div>
            <div className="text-xs text-kh-gray/60">
              © 2025 Kennedi Harris Hoops
              <br />
              All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
