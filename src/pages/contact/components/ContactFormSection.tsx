import {
  User,
  Mail,
  FileText,
  PenLine,
  Send,
  Phone,
  MapPin,
  CalendarCheck,
  Newspaper,
} from "lucide-react";

export function ContactFormSection() {
  return (
    <section
      id="contact-form"
      className="py-16 bg-kh-dark-2/40 border-t border-white/5 scroll-mt-20"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left - Contact Form */}
        <div>
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider mb-8">
            SEND A MESSAGE
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/10 rounded-md pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-kh-pink transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/10 rounded-md pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-kh-pink transition-colors"
              />
            </div>

            {/* Subject */}
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-transparent border border-white/10 rounded-md pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-kh-pink transition-colors"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <PenLine className="absolute left-4 top-5 w-5 h-5 text-gray-500" />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full bg-transparent border border-white/10 rounded-md pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-kh-pink transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-kh-pink text-white font-condensed font-bold tracking-widest text-sm uppercase py-4 rounded-md flex items-center justify-center gap-3 hover:bg-kh-pink/80 transition-colors duration-300"
            >
              SEND MESSAGE
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right - Get In Touch */}
        <div>
          <h2 className="font-condensed font-bold text-xl md:text-2xl text-white uppercase tracking-wider mb-8">
            GET IN TOUCH
          </h2>

          <div className="flex flex-col gap-8">
            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 shrink-0">
                <Mail className="w-5 h-5 text-kh-pink" />
              </div>
              <div>
                <h3 className="font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase mb-1">
                  EMAIL
                </h3>
                <p className="text-gray-300 text-sm font-sans font-light">
                  info@kennediharrishoops.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 shrink-0">
                <Phone className="w-5 h-5 text-kh-pink" />
              </div>
              <div>
                <h3 className="font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase mb-1">
                  PHONE
                </h3>
                <p className="text-gray-300 text-sm font-sans font-light">
                  (904) 238-4734
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 shrink-0">
                <MapPin className="w-5 h-5 text-kh-pink" />
              </div>
              <div>
                <h3 className="font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase mb-1">
                  LOCATION
                </h3>
                <p className="text-gray-300 text-sm font-sans font-light">
                  Warner Robins, Georgia
                </p>
                <p className="text-gray-300 text-sm font-sans font-light">
                  United States
                </p>
              </div>
            </div>

            {/* Book Kennedi */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 shrink-0">
                <CalendarCheck className="w-5 h-5 text-kh-pink" />
              </div>
              <div>
                <h3 className="font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase mb-1">
                  BOOK KENNEDI
                </h3>
                <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                  For camps, clinics, appearances, and speaking engagements.
                </p>
                <p className="text-gray-300 text-sm font-sans font-light mt-1">
                  info@kennediharrishoops.com
                </p>
              </div>
            </div>

            {/* Media Inquiries */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-kh-pink/30 flex items-center justify-center bg-kh-pink/10 shrink-0">
                <Newspaper className="w-5 h-5 text-kh-pink" />
              </div>
              <div>
                <h3 className="font-condensed font-bold text-sm tracking-widest text-kh-pink uppercase mb-1">
                  MEDIA INQUIRIES
                </h3>
                <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                  For media requests and interviews.
                </p>
                <p className="text-gray-300 text-sm font-sans font-light mt-1">
                  media@kennediharrishoops.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
