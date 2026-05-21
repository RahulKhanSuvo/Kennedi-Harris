import {
  Mail,
  Camera,
  MessageCircle,
  Video,
  Music,
  ChevronDown,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-kh-dark-2 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-[1905px] mx-auto px-4 lg:px-10">
        {/* Contact Form Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-16 border-b border-white/5">
          <div className="flex items-center gap-6 lg:w-1/2">
            <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center text-kh-pink shrink-0">
              <Mail size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-condensed text-2xl font-bold tracking-widest uppercase mb-1">
                RECRUITING, MEDIA & BRAND INQUIRIES
              </h3>
              <p className="text-kh-gray text-sm">
                Let's connect! Fill out the form and we'll be in touch.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <form
              className="flex flex-col sm:flex-row gap-4 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-kh-pink flex-1"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-kh-pink flex-1"
              />
              <div className="relative flex-1">
                <select className="w-full bg-kh-dark-2 border border-white/10 rounded px-4 py-3 text-sm text-kh-gray focus:outline-none focus:border-kh-pink appearance-none">
                  <option value="" disabled selected>
                    Inquiry Type
                  </option>
                  <option value="recruiting">Recruiting</option>
                  <option value="media">Media</option>
                  <option value="brand">Brand Partner</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-kh-gray pointer-events-none"
                  size={16}
                />
              </div>
              <button className="bg-kh-pink hover:bg-kh-pink-bright transition-colors text-white font-condensed font-bold tracking-widest uppercase px-8 py-3 rounded text-sm">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pt-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex text-5xl font-display font-bold leading-none">
              <span className="text-kh-blue">K</span>
              <span className="text-kh-pink">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-none tracking-wider text-white">
                KENNEDI HARRIS
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-kh-pink leading-none mt-1 font-bold">
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
                <a href="#" className="hover:text-kh-pink transition-colors">
                  <Camera size={18} />
                </a>
                <a href="#" className="hover:text-kh-pink transition-colors">
                  <Music size={18} />
                </a>
                <a href="#" className="hover:text-kh-pink transition-colors">
                  <MessageCircle size={18} />
                </a>
                <a href="#" className="hover:text-kh-pink transition-colors">
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
