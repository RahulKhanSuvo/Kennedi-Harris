import { Plus, FileVideo } from "lucide-react";
import { useState } from "react";

interface VideoFormRowProps {
  type: "primary" | "feed";
  onAdd: (data: { file: File; title: string; extra?: string }) => void;
}

export default function VideoFormRow({ type, onAdd }: VideoFormRowProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [extra, setExtra] = useState(""); // Maps to video_type for primary videos

  const isFeed = type === "feed";

  const handleCommit = () => {
    if (!file || !title.trim()) return;
    onAdd({ file, title, extra: !isFeed ? extra : undefined });

    // Clear temporary fields
    setFile(null);
    setTitle("");
    setExtra("");
  };

  return (
    <div className="p-4 rounded-xl bg-neutral-900/20 border border-white/5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Title Input */}
        <div className={isFeed ? "md:col-span-6" : "md:col-span-4"}>
          <label className="font-condensed text-[10px] tracking-widest text-zinc-500 uppercase block mb-1.5">
            {isFeed ? "Feed Title" : "Video Name"}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isFeed ? "e.g., Score 4" : "e.g., Game Highlight"}
            className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-kh-pink/50 transition-colors"
          />
        </div>

        {/* Dynamic Context Extra Field (Video Type) */}
        {!isFeed && (
          <div className="md:col-span-3">
            <label className="font-condensed text-[10px] tracking-widest text-zinc-500 uppercase block mb-1.5">
              Video Type
            </label>
            <input
              type="text"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="e.g., Mixtape"
              className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-kh-pink/50 transition-colors"
            />
          </div>
        )}

        {/* Binary Media File Input Field */}
        <div className={isFeed ? "md:col-span-4" : "md:col-span-3"}>
          <label className="font-condensed text-[10px] tracking-widest text-zinc-500 uppercase block mb-1.5">
            Select Video Asset
          </label>
          <label className="flex items-center gap-2 bg-neutral-950 border border-white/10 hover:border-white/20 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors max-w-full truncate">
            <FileVideo
              size={16}
              className={file ? "text-kh-pink" : "text-zinc-500"}
            />
            <span className="truncate text-xs">
              {file ? file.name : "Choose MP4"}
            </span>
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        {/* Add Entry Action Trigger */}
        <div className="md:col-span-2">
          <button
            type="button"
            disabled={!file || !title.trim()}
            onClick={handleCommit}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white disabled:bg-neutral-900 text-black disabled:text-zinc-600 font-condensed font-black tracking-wider text-xs uppercase rounded-lg hover:bg-kh-pink hover:text-white disabled:hover:bg-neutral-900 disabled:hover:text-zinc-600 transition-all cursor-pointer h-[38px]"
          >
            <Plus size={14} />
            Stage
          </button>
        </div>
      </div>
    </div>
  );
}
