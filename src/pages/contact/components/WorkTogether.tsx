import React from "react";
import { Mail, ArrowRight } from "lucide-react";

export function WorkTogether() {
  const handleScrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 bg-kh-dark-2/60 border-t border-b border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left - Icon and Text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 max-w-2xl">
          <div className="w-16 h-16 rounded-full border border-kh-pink flex items-center justify-center bg-kh-pink/5 shrink-0">
            <Mail className="w-8 h-8 text-kh-pink" />
          </div>
          <div>
            <h3 className="font-display text-3xl text-white tracking-wide uppercase leading-tight">
              LET'S WORK TOGETHER
            </h3>
            <p className="text-gray-400 font-sans font-light text-sm mt-1 leading-relaxed">
              Whether you're a brand, organization, or fan, I'm always open to
              new opportunities.
            </p>
          </div>
        </div>

        {/* Right - CTA Button */}
        <div className="shrink-0 w-full sm:w-auto flex justify-center">
          <button
            onClick={handleScrollToForm}
            className="w-full sm:w-auto btn-outline border-kh-pink text-kh-pink hover:bg-kh-pink hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            CONNECT WITH KENNEDI
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
