import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
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
              <div className="flex text-8xl font-extrabold tracking-tighter leading-none">
                <span className="text-kh-blue">K</span>
                <span className="text-kh-pink -ml-2">H</span>
              </div>
              <div className="flex flex-col items-center">
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
            <div className="flex items-center gap-5 text-white text-3xl">
              <a
                target="_blank"
                href="https://web.facebook.com/profile.php?id=61555406655649&_rdc=1&_rdr#"
              >
                <FaFacebook className="hover:text-neutral-400 transition-colors cursor-pointer" />
              </a>
              <FaInstagram className="hover:text-neutral-400 transition-colors cursor-pointer" />
              {/* TikTok */}
              <a
                target="_blank"
                href="https://www.tiktok.com/@kennediharrishoops?_t=ZT-8rgy1sD9O39&_r=1"
              >
                {" "}
                <FaTiktok className="hover:text-neutral-400 transition-colors cursor-pointer" />
              </a>
              <a target="_blank" href="">
                <FaYoutube className="hover:text-neutral-400 transition-colors cursor-pointer" />
              </a>
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
