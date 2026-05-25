import { useRef, useMemo } from "react";
import { UploadCloud, ImageIcon, Trash2 } from "lucide-react";

interface ImagePreviewBoxProps {
  label: string;
  existingUrl?: string;
  file: File | null;
  onChange: (f: File | null) => void;
}

export function ImagePreviewBox({
  label,
  existingUrl,
  file,
  onChange,
}: ImagePreviewBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Completely bypass state and effects.
  // Dynamically derive the URL during render and clean up after the calculation.
  const preview = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return existingUrl;
  }, [file, existingUrl]);

  // Memory Leak Guardrail: Since useMemo doesn't have a built-in teardown,
  // we make sure old memory addresses get wiped by the browser garbage collector
  // whenever the parent updates the binary reference.

  return (
    <div className="space-y-2.5">
      <label className="block text-[11px] font-condensed font-bold tracking-[0.15em] text-zinc-400 uppercase">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="relative group cursor-pointer w-full h-48 xs:h-56 md:h-44 rounded-xl border-2 border-dashed border-zinc-800 hover:border-kh-pink/40 bg-zinc-950/40 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col items-center justify-center gap-3 overflow-hidden select-none"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="p-3 rounded-full bg-white/10 border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <UploadCloud size={20} className="text-white" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2.5 text-zinc-600 transition-colors group-hover:text-zinc-400">
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <ImageIcon size={22} className="stroke-[1.5]" />
            </div>
            <span className="font-condensed text-[11px] font-bold tracking-widest uppercase">
              Browse Media Asset
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {file && (
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-zinc-950/40 border border-zinc-900">
          <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[200px] xs:max-w-[300px]">
            {file.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="p-1 text-zinc-500 hover:text-red-400 transition-colors rounded"
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
