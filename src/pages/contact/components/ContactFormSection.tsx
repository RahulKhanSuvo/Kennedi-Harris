"use client";

import { useState } from "react";
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
  ArrowRight,
} from "lucide-react";
import type { GetInTouchDetails } from "@/types";

type FormField = "name" | "email" | "subject" | "message" | null;

export function ContactFormSection({
  data,
  isLoading,
}: {
  data: GetInTouchDetails | null;
  isLoading: boolean;
}) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<FormField>(null);

  const contactInfo = [
    {
      icon: (
        <Mail className="w-5 h-5 text-kh-pink group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "EMAIL",
      lines: [data?.bookingEmail],
      isLink: true,
      href: `mailto:${data?.bookingEmail}`,
      requiresLoading: true,
      skeletonWidth: "w-48",
    },
    {
      icon: (
        <Phone className="w-5 h-5 text-kh-pink group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "PHONE",
      lines: [data?.phone],
      isLink: true,
      href: `tel:${data?.phone}`,
      requiresLoading: true,
      skeletonWidth: "w-36",
    },
    {
      icon: (
        <MapPin className="w-5 h-5 text-kh-pink group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "LOCATION",
      lines: ["Warner Robins, Georgia", "United States"],
      isLink: false,
      requiresLoading: false,
    },
    {
      icon: (
        <CalendarCheck className="w-5 h-5 text-kh-pink group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "BOOK KENNEDI",
      description: "For camps, clinics, appearances, and speaking engagements.",
      lines: ["info@kennediharrishoops.com"],
      isLink: true,
      href: "mailto:info@kennediharrishoops.com",
      requiresLoading: false,
    },
    {
      icon: (
        <Newspaper className="w-5 h-5 text-kh-pink group-hover:scale-110 transition-transform duration-300" />
      ),
      title: "MEDIA INQUIRIES",
      description: "For media requests and interviews.",
      lines: ["media@kennediharrishoops.com"],
      isLink: true,
      href: "mailto:media@kennediharrishoops.com",
      requiresLoading: false,
    },
  ];

  return (
    <section
      id="contact-form"
      className="relative py-24 bg-linear-to-b from-black to-kh-dark-2/20 border-t border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Abstract background ambient glowing orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-kh-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-kh-pink/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle modern vector grid lines layout overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Panel - Premium Glassmorphic Form Card */}
          <div className="lg:col-span-7 bg-white/2 backdrop-blur-xl border border-white/5 rounded p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            {/* Top border glowing line indicator style */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-kh-blue via-kh-pink to-transparent opacity-70" />

            <div className="mb-8">
              <h2 className="font-condensed font-black text-2xl md:text-3xl text-white uppercase tracking-wider mb-2">
                SEND A MESSAGE
              </h2>
              <p className="text-gray-400 text-sm font-sans font-light">
                Have a question or looking to collaborate? Drop a message below.
              </p>
            </div>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Full Name Input Wrapper */}
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "name" ? "text-kh-pink" : "text-gray-500"}`}
                >
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm font-sans focus:outline-none focus:border-kh-pink/80 focus:bg-black/50 shadow-inner transition-all duration-300"
                />
              </div>

              {/* Email Address Input Wrapper */}
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "email" ? "text-kh-pink" : "text-gray-500"}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm font-sans focus:outline-none focus:border-kh-pink/80 focus:bg-black/50 shadow-inner transition-all duration-300"
                />
              </div>

              {/* Subject Input Wrapper */}
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === "subject" ? "text-kh-pink" : "text-gray-500"}`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm font-sans focus:outline-none focus:border-kh-pink/80 focus:bg-black/50 shadow-inner transition-all duration-300"
                />
              </div>

              {/* Message Textarea Wrapper */}
              <div className="relative">
                <div
                  className={`absolute left-4 top-5 transition-colors duration-300 ${focusedField === "message" ? "text-kh-pink" : "text-gray-500"}`}
                >
                  <PenLine className="w-5 h-5" />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 text-sm font-sans focus:outline-none focus:border-kh-pink/80 focus:bg-black/50 shadow-inner transition-all duration-300 resize-none"
                />
              </div>

              {/* Premium Interactive Action Button */}
              <button
                type="submit"
                className="w-full relative overflow-hidden bg-linear-to-r from-kh-pink to-[#ff4b82] text-white font-condensed font-black tracking-[0.2em] text-sm uppercase py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,43,114,0.4)] group/btn"
              >
                {/* Subtle sheen layer hover effect background */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] translate-x-[-150%] group-hover/btn:animate-[shine_0.8s_ease-in-out]" />
                <span className="relative z-10 flex items-center gap-2">
                  SEND MESSAGE
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                </span>
              </button>
            </form>
          </div>

          {/* Right Panel - Contact Row Informational Cards Grid Layout */}
          <div className="lg:col-span-5 flex flex-col h-full justify-between gap-6">
            <div>
              <h2 className="font-condensed font-black text-2xl md:text-3xl text-white uppercase tracking-wider mb-2 pl-1">
                GET IN TOUCH
              </h2>
              <p className="text-gray-400 text-sm font-sans font-light mb-8 pl-1">
                Direct lines of communication for specific channels and
                inquiries.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/1 hover:bg-white/3 border border-white/3 hover:border-white/10 transition-all duration-300"
                >
                  {/* High-Contrast Dynamic Icon Frame Container */}
                  <div className="w-11 h-11 rounded-lg border border-kh-pink/20 group-hover:border-kh-pink/40 flex items-center justify-center bg-kh-pink/5 group-hover:bg-kh-pink/10 shrink-0 transition-all duration-300 shadow-sm">
                    {info.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-condensed font-bold text-xs tracking-[0.15em] text-kh-pink/90 uppercase mb-1 flex items-center gap-1.5">
                      {info.title}
                    </h3>

                    {info.description && (
                      <p className="text-gray-400 text-xs font-sans font-light leading-relaxed mb-1">
                        {info.description}
                      </p>
                    )}

                    {info.requiresLoading && isLoading ? (
                      <div
                        className={`h-4 ${info.skeletonWidth || "w-32"} bg-white/5 rounded animate-pulse mt-1.5`}
                      />
                    ) : (
                      info.lines.map((line, lIdx) => (
                        <div key={lIdx} className="truncate">
                          {info.isLink ? (
                            <a
                              href={info.href}
                              className="inline-flex items-center gap-1 text-gray-200 hover:text-white text-sm font-sans font-light transition-colors group/link underline-offset-4 hover:underline mt-0.5"
                            >
                              {line}
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-kh-pink" />
                            </a>
                          ) : (
                            <p className="text-gray-200 text-sm font-sans font-light mt-0.5">
                              {line}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
