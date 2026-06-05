/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sliders, X, UploadCloud, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { VideosFieldArray } from "./VideosFieldArray";
import { FeedVideosFieldArray } from "./FeedVideosFieldArray";
import {
  highlightSchema,
  type HighlightFormValues,
} from "./HighlightCreateForm";

interface HighlightEditFormProps {
  highlight: any;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (values: HighlightFormValues) => void;
}

export function HighlightEditForm({
  highlight,
  isPending,
  onCancel,
  onSubmit,
}: HighlightEditFormProps) {
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
      videos: [],
      feedVideos: [],
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

  const handleFormSubmit = (values: HighlightFormValues) => {
    console.group("🚀 Submitting Highlight Form Data");
    console.log("Main Video Field:", values.MainVideo_url);
    console.log("Video Clips Array (videos):", values.videos);
    console.log("Feed Clips Array (feedVideos):", values.feedVideos);
    console.groupEnd();
    onSubmit(values);
  };

  useEffect(() => {
    if (highlight) {
      reset({
        MainVideo_url: highlight.MainVideo_url || "",
        videos: (highlight.videos || []).map((v: any) => ({
          video_name: v.video_name || "",
          video_type: v.video_type || "",
          video_url: v.video_url || "",
        })),
        feedVideos: (highlight.feedVideos || []).map((f: any) => ({
          title: f.title || "",
          video_url: f.video_url || "",
        })),
      });
    }
  }, [highlight, reset]);

  return (
    <div className="w-full bg-zinc-950/40 border border-white/5 rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── CONSOLE HEADER ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Sliders size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-none">
              Config Deck Mode
            </h3>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mt-1.5">
              PATCH_ID // {highlight?._id || "NEW_NODE"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── FORM CONTROL HUB ────────────────────────────────────── */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* 1. MASTER STREAM CONTROL BLOCK */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Film size={14} className="text-kh-pink" />
            <Label className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Primary Master Stream Source
            </Label>
          </div>

          <div className="relative group/upload w-full min-h-[90px] border-2 border-dashed border-white/10 hover:border-cyan-500/40 bg-zinc-900/20 rounded-xl transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer">
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
              className="text-zinc-500 group-hover/upload:text-cyan-400 transition-colors mb-2"
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
              register={register}
              setValue={setValue}
              control={control}
              append={appendVideo}
              remove={removeVideo}
              isPending={isPending}
            />
          </div>

          <div className="border-t border-white/5 pt-6">
            <FeedVideosFieldArray
              fields={feedFields}
              register={register}
              setValue={setValue}
              control={control}
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
            onClick={onCancel}
            disabled={isPending}
            className="w-full sm:w-auto bg-transparent hover:bg-white/5 border-white/10 text-zinc-400 hover:text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 h-11 rounded-xl transition-all cursor-pointer ordering-2 sm:order-1"
          >
            Abort Changes
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-condensed font-bold uppercase tracking-wider text-xs px-6 h-11 rounded-xl flex items-center justify-center gap-2 border-none shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all cursor-pointer order-1 sm:order-2 active:scale-95"
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            Commit Broadcast Update
          </Button>
        </div>
      </form>
    </div>
  );
}
