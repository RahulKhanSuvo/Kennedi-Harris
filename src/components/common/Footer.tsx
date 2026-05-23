import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white font-sans pt-12 pb-6 border-t border-neutral-900">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 pb-12">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col space-y-5">
            {/* Logo Group */}
            <div className="flex items-center gap-3">
              <div className="flex text-5xl font-extrabold tracking-tighter leading-none">
                <span className="text-kh-blue">K</span>
                <span className="text-kh-pink -ml-2">H</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider leading-none">
                  KENNEDI HARRIS
                </span>
                <span className="text-[10px] tracking-[0.3em] text-red-600 font-bold mt-1 uppercase">
                  Hoops
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-neutral-400 font-medium leading-relaxed">
              Built on faith. Driven by purpose.
              <br />
              Focused on the future.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="border-l-0 lg:border-l border-neutral-800 lg:pl-8">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-neutral-400 font-medium">
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#media" className="hover:text-white transition-colors">
                Media Kit
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a
                href="#partners"
                className="hover:text-white transition-colors"
              >
                Brand Partners
              </a>
              <a
                href="#highlights"
                className="hover:text-white transition-colors"
              >
                Highlights
              </a>
              <a href="#gallery" className="hover:text-white transition-colors">
                Gallery
              </a>
              <a
                href="#schedule"
                className="hover:text-white transition-colors"
              >
                Schedule
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Column 3: Connect Block */}
          <div className="border-l-0 lg:border-l border-neutral-800 lg:pl-8">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              CONNECT
            </h4>
            <p className="text-sm text-neutral-400 mb-5 leading-relaxed font-medium">
              Follow Kennedi's journey
              <br />
              on social media.
            </p>
            <div className="flex items-center gap-5 text-white">
              <FaInstagram
                size={20}
                className="hover:text-neutral-400 transition-colors cursor-pointer"
              />
              {/* TikTok */}
              <svg
                className="w-5 h-5 fill-current hover:text-neutral-400 transition-colors cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.63 4.14.99 1.12 2.37 1.81 3.84 2.02v3.9c-1.63-.04-3.23-.55-4.57-1.48-.11.75-.18 1.5-.18 2.26 0 1.9-.47 3.77-1.37 5.42-.91 1.63-2.27 2.94-3.92 3.76-1.66.83-3.52 1.23-5.37 1.15-1.85-.08-3.66-.65-5.21-1.66-1.55-1.01-2.75-2.45-3.46-4.14C.14 13.8-.1 11.9.06 10.05c.17-1.85.9-3.59 2.11-4.99C3.44 3.65 5.12 2.64 6.96 2.17c1.4-.36 2.87-.33 4.25.1v3.91c-.88-.28-1.83-.24-2.68.12-.86.36-1.57.99-2.04 1.8-.46.8-.64 1.74-.52 2.67.12.93.59 1.77 1.3 2.38.71.6 1.61.92 2.54.91 1-.02 1.95-.44 2.64-1.16.59-.61.93-1.41.97-2.26.03-2.47.01-4.94.02-7.41-.01-.13-.01-.26-.01-.39z" />
              </svg>
              {/* X */}
              <svg
                className="w-4 h-4 fill-current hover:text-neutral-400 transition-colors cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <FaYoutube
                size={22}
                className="hover:text-neutral-400 transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Column 4: Contact Block */}
          <div className="border-l-0 lg:border-l border-neutral-800 lg:pl-8">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              CONTACT
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300 font-medium">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-400" />
                <a
                  href="mailto:info@kennediharrishoops.com"
                  className="hover:text-white transition-colors"
                >
                  info@kennediharrishoops.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-neutral-400" />
                <a
                  href="tel:4041234567"
                  className="hover:text-white transition-colors"
                >
                  (404) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-neutral-400" />
                <span>Atlanta, Georgia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-neutral-950 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 font-medium gap-4">
          <div>© 2025 Kennedi Harris Hoops. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-neutral-300 transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
