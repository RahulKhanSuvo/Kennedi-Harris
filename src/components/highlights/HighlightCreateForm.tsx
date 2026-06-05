/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Video, X, UploadCloud, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VideosFieldArray } from "./VideosFieldArray";
import { FeedVideosFieldArray } from "./FeedVideosFieldArray";

const videoSchema = zod.object({
  video_name: zod.string().min(1, "Video name is required"),
  video_type: zod.string().min(1, "Video type is required"),
  video_url: zod.string().optional(),
  videos: zod.any().optional(),
});

const feedVideoSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  video_url: zod.string().optional(),
  feedVideos: zod.any().optional(),
});

// eslint-disable-next-line react-refresh/only-export-components
export const highlightSchema = zod.object({
  MainVideo_url: zod.any().refine((val) => {
    return val instanceof File || (typeof val === "string" && val.length > 0);
  }, "Main video is required"),
  videos: zod.array(videoSchema),
  feedVideos: zod.array(feedVideoSchema),
});

export type HighlightFormValues = zod.infer<typeof highlightSchema>;

interface HighlightCreateFormProps {
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: HighlightFormValues) => void;
}

export function HighlightCreateForm({
  isPending,
  onCancel,
  onSubmit,
}: HighlightCreateFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HighlightFormValues>({
    resolver: zodResolver(highlightSchema),
    defaultValues: {
      MainVideo_url: "",
      videos: [
        { video_name: "", video_type: "", videos: undefined, video_url: "" },
      ],
      feedVideos: [{ title: "", feedVideos: undefined, video_url: "" }],
    },
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    control,
    name: "videos",
  });

  const {
    fields: feedFields,
    append: appendFeed,
    remove: removeFeed,
  } = useFieldArray({
    control,
    name: "feedVideos",
  });

  const watchMainVideo = useWatch({
    control,
    name: "MainVideo_url",
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <div className="w-full bg-zinc-950/40 border border-white/5 rounded p-4 sm:p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
      {/* Immersive background glow ambient layers */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── CONSOLE HEADER ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-kh-pink/10 text-kh-pink shrink-0">
            <Video size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-none">
              Deploy Broadcast Deck
            </h3>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mt-1.5">
              SYSTEM NODE // INITIALIZE_NEW_REEL
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── FORM CONTROL HUB ────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. MASTER STREAM CONTROL BLOCK */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-kh-pink" />
            <Label className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Primary Master Stream Source
            </Label>
          </div>

          <div className="relative group/upload w-full min-h-[90px] border-2 border-dashed border-white/10 hover:border-kh-pink/40 bg-zinc-900/20 rounded-xl transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) setValue("MainVideo_url", file);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              disabled={isPending}
            />

            <UploadCloud
              size={24}
              className="text-zinc-500 group-hover/upload:text-kh-pink transition-colors mb-2"
            />

            <p className="font-condensed font-bold text-xs sm:text-sm text-white uppercase tracking-wide max-w-xs truncate px-2">
              {watchMainVideo instanceof File
                ? watchMainVideo.name
                : typeof watchMainVideo === "string" && watchMainVideo
                  ? watchMainVideo.split("/").pop()
                  : "Upload New Showreel Master Target"}
            </p>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mt-1">
              Drag & Drop or Click to browse system files
            </span>
          </div>

          {errors.MainVideo_url && (
            <span className="text-red-400 font-mono text-[10px] uppercase tracking-wider block px-1">
              {(errors.MainVideo_url as any).message}
            </span>
          )}
        </div>

        {/* 2. SUB-TRACK REEL MATRICES */}
        <div className="space-y-6">
          <div className="border-t border-white/5 pt-6">
            <VideosFieldArray
              fields={videoFields}
              register={register as any}
              setValue={setValue as any}
              control={control as any}
              append={appendVideo}
              remove={removeVideo}
              isPending={isPending}
            />
          </div>

          <div className="border-t border-white/5 pt-6">
            <FeedVideosFieldArray
              fields={feedFields}
              register={register as any}
              setValue={setValue as any}
              control={control as any}
              append={appendFeed}
              remove={removeFeed}
              isPending={isPending}
            />
          </div>
        </div>

        {/* ── CONSOLE ACTION CONTROLS ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-white/5 font-mono">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
            className="w-full sm:w-auto bg-transparent hover:bg-white/5 border-white/10 text-zinc-400 hover:text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 h-11 rounded-xl transition-all cursor-pointer order-2 sm:order-1"
          >
            Abort Initialization
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-kh-pink hover:bg-pink-500 text-white font-condensed font-bold uppercase tracking-wider text-xs px-6 h-11 rounded-xl flex items-center justify-center gap-2 border-none shadow-[0_0_25px_rgba(236,72,153,0.15)] transition-all cursor-pointer order-1 sm:order-2 active:scale-95"
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            Deploy Live Broadcast
          </Button>
        </div>
      </form>
    </div>
  );
}
