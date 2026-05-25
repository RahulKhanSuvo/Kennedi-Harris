"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onDismiss: () => void;
}

export function Toast({ type, message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-5 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border backdrop-blur-md text-xs font-condensed font-bold tracking-widest uppercase animate-fade-in-up transition-all duration-300
        ${
          type === "success"
            ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
            : "bg-red-950/80 border-red-500/30 text-red-400"
        }`}
    >
      {type === "success" ? (
        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle size={16} className="text-red-400 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}
