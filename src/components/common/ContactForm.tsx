import { ChevronDown, Mail } from "lucide-react";

export default function ContactForm() {
  return (
    <div>
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
    </div>
  );
}
