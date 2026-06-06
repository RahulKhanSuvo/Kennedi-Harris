import { useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import type { GalleryPhoto } from "@/types";

interface MediaLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: GalleryPhoto | null;
  onNext: () => void;
  onPrev: () => void;
  systemIndex?: string;
}

export default function MediaLightboxModal({
  isOpen,
  onClose,
  activeItem,
  onNext,
  onPrev,
  systemIndex = "VIEWER_ENG_ALPHA_V4",
}: MediaLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent scrolling parent content behind the dark modal overlay
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || !activeItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      {/* HUD Target Framing Accents */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-500 flex flex-col gap-1 pointer-events-none select-none">
        <div>// {systemIndex}</div>
        <div className="text-kh-pink font-bold">
          STATUS: INTERACTIVE_PREVIEW
        </div>
      </div>

      {/* Close Trigger Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-neutral-900/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-kh-pink transition-all duration-300 z-50 cursor-pointer"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      {/* Lateral Gallery Nav Sliders */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-kh-pink/40 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 z-40 active:scale-95 cursor-pointer"
        aria-label="Previous frame"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-kh-pink/40 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 z-40 active:scale-95 cursor-pointer"
        aria-label="Next frame"
      >
        <ArrowRight size={20} />
      </button>

      {/* Core Visual Presenter Box */}
      <div
        className="relative max-w-5xl w-full h-full max-h-[72vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cyber Glow Backdrop behind image matrix */}
        <div className="absolute w-[60%] h-[60%] bg-kh-pink/5 filter blur-[120px] rounded-full pointer-events-none" />

        <img
          src={activeItem.url}
          alt={activeItem.name}
          className="max-w-full max-h-full object-contain rounded-xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] select-none"
        />

        {/* Bottom HUD Metadata Banner */}
        <div className="absolute bottom-[-65px] left-0 right-0 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10 pt-4 px-1">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-kh-pink/10 border border-kh-pink/20 px-2.5 py-1 rounded font-mono text-[10px] text-kh-pink tracking-widest uppercase">
              <Camera size={10} />
            </div>
            <h3 className="font-display font-black text-lg md:text-xl text-white uppercase tracking-wider">
              {activeItem.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
