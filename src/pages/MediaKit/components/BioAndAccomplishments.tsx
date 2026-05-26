import { Link } from "react-router";
import {
  ArrowRight,
  Trophy,
  Sparkles,
  Mail,
  Phone,
  TrendingUp,
} from "lucide-react";
import Container from "@/components/common/Container";

export default function BioAndAccomplishments() {
  const bioData = [
    { label: "POS", value: "G / F" },
    { label: "HT", value: "6'4\"" },
    { label: "CLASS", value: "2030" },
    { label: "HS", value: "Windsor Academy" },
    { label: "CLUB", value: "FBC United 17U" },
    { label: "ACAD", value: "Honor Roll" },
  ];

  const accomplishments = [
    "Windsor Academy MVP // 25-26",
    "Coaches Selection Award // 25-26",
    "Defensive Player of the Year",
    "1st Team All-Regional Honors",
    "1st Team All-State Selection",
  ];

  return (
    <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Tactical Grid Pattern Backdrop */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      {/* High-intensity Ambient Backlights */}
      <div className="absolute top-[20%] left-[-10%] pointer-events-none h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]"></div>
      <div className="absolute bottom-[10%] right-[-10%] pointer-events-none h-[400px] w-[400px] rounded-full bg-kh-pink/5 blur-[120px]"></div>

      <Container className="relative z-10 w-full text-left flex flex-col gap-6">
        {/* ROW 1: Asymmetrical Graphical Header Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Title Box (8 Columns) */}
          <div className="lg:col-span-8 bg-zinc-950 border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group min-h-[240px]">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-kh-pink"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-kh-pink animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase font-bold">
                  Player Matrix
                </span>
              </div>
              <span className="text-[32px] font-display text-white/5 group-hover:text-white/10 transition-colors font-black select-none">
                HARRIS // 11
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl text-white font-semibold uppercase mt-6 z-10">
              POSITIONLESS AGILITY.
              <br />
              <span className="text-kh-pink">UNMATCHED IDENTITY.</span>
            </h2>
          </div>

          {/* Graphical Scouting Report Teaser Block (4 Columns) */}
          <div className="lg:col-span-4 bg-[#0a0a0c] border border-white/10 p-6 flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.05),transparent_50%)]">
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase block">
                // SCOUTING SUMMARY
              </span>
              <p className="text-gray-400 font-sans text-xs font-light leading-relaxed">
                Standing at 6'4", she anchors defensive structures while
                processing the court like an elite point-forward tier asset.
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 flex items-center justify-between font-mono text-[10px] text-gray-600">
              <span>TRAJECTORY MATRIX</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
            </div>
          </div>
        </div>

        {/* ROW 2: Tactical Stats Grid & Accolade Modules */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Graphical Vital Stats HUD Sheet (5 Columns) */}
          <div className="md:col-span-5 lg:col-span-4 bg-zinc-950 border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase block mb-4">
                DATA CAPTURE SPECIFICATIONS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {bioData.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-black border border-white/5 p-3 flex flex-col justify-between hover:border-kh-pink/30 transition-all group"
                  >
                    <span className="text-gray-600 font-mono text-[9px] uppercase tracking-wider group-hover:text-gray-500">
                      {item.label}
                    </span>
                    <span className="text-white font-display text-sm tracking-wide font-bold mt-1 group-hover:text-kh-pink transition-colors">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mt-6 pt-3 border-t border-white/5">
              BASE LOG: ROSTER_VERIFIED
            </div>
          </div>

          {/* Accolades & Trophies Terminal (7 Columns) */}
          <div className="md:col-span-7 lg:col-span-5 bg-zinc-950 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 text-white/[0.01] group-hover:text-white/[0.02] transition-colors pointer-events-none">
              <Trophy className="w-36 h-36" />
            </div>

            <div>
              <span className="font-mono text-[9px] text-kh-pink tracking-widest uppercase block mb-4">
                // PERFORMANCE HARDWARE RECORD
              </span>
              <div className="space-y-2">
                {accomplishments.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 bg-black/40 border border-white/[0.03] hover:border-cyan-500/20 transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="font-condensed text-xs text-gray-300 uppercase tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mt-4">
              TOTAL RECORD SECURED // 2026
            </div>
          </div>

          {/* High-Contrast Interactive Connection Core (3 Columns) */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col justify-between gap-3">
            {/* Quick Link 1 */}
            <a
              href="mailto:info@kennediharrishoops.com"
              className="flex-1 bg-zinc-950 border border-white/10 p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all group min-h-[80px]"
            >
              <div className="flex justify-between items-center text-gray-600 group-hover:text-cyan-400 transition-colors">
                <span className="font-mono text-[8px] uppercase tracking-widest">
                  SECURE INBOX
                </span>
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors font-sans text-xs mt-2 truncate">
                info@kennediharrishoops.com
              </span>
            </a>

            {/* Quick Link 2 */}
            <a
              href="tel:9042384734"
              className="flex-1 bg-zinc-950 border border-white/10 p-4 flex flex-col justify-between hover:border-kh-pink/40 transition-all group min-h-[80px]"
            >
              <div className="flex justify-between items-center text-gray-600 group-hover:text-kh-pink transition-colors">
                <span className="font-mono text-[8px] uppercase tracking-widest">
                  DIRECT CELL
                </span>
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors font-sans text-xs mt-2">
                (904) 238-4734
              </span>
            </a>

            {/* Main Action Call to Action Button */}
            <Link
              to="/contact"
              className="bg-kh-pink text-white font-condensed font-black text-xs tracking-[0.2em] py-5 transition-all duration-300 hover:bg-pink-600 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(236,72,153,0.15)] shrink-0"
            >
              ACQUISITION CONTACT
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
