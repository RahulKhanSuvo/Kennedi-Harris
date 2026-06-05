/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader2, Video, X } from "lucide-react";
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

  // FIXED: Replaced watch() with useWatch() for compiler safety
  const watchMainVideo = useWatch({
    control,
    name: "MainVideo_url",
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <div className="rounded-2xl border border-kh-pink/20 bg-[#0c0c14] shadow-[0_0_40px_rgba(236,72,153,0.05)] overflow-hidden">
      {/* Form Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-kh-pink/5">
        <div className="flex items-center gap-2.5">
          <Video size={16} className="text-kh-pink" />
          <span className="font-display text-sm uppercase tracking-widest text-white">
            Deploy New Highlight Package
          </span>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-6">
        {/* Main Video File */}
        <div className="space-y-2 max-w-md">
          <Label className="font-condensed text-[11px] uppercase tracking-widest text-zinc-400">
            Main Video File Upload (MainVideo_url)
          </Label>
          <div className="relative h-9 rounded-md border border-white/10 bg-neutral-900/60 flex items-center px-3 cursor-pointer hover:border-white/20 transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) setValue("MainVideo_url", file);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isPending}
            />
            <span className="text-zinc-400 text-xs truncate">
              {watchMainVideo instanceof File
                ? watchMainVideo.name
                : typeof watchMainVideo === "string" && watchMainVideo
                  ? watchMainVideo.split("/").pop()
                  : "Select main video file..."}
            </span>
          </div>
          {errors.MainVideo_url && (
            <span className="text-red-400 text-[11px] font-condensed uppercase tracking-wider block">
              {(errors.MainVideo_url as any).message}
            </span>
          )}
        </div>

        {/* Video Clips Array */}
        <VideosFieldArray
          fields={videoFields}
          register={register as any}
          setValue={setValue as any}
          control={control as any}
          append={appendVideo}
          remove={removeVideo}
          isPending={isPending}
        />

        {/* Feed Clips Array */}
        <FeedVideosFieldArray
          fields={feedFields}
          register={register as any}
          setValue={setValue as any}
          control={control as any}
          append={appendFeed}
          remove={removeFeed}
          isPending={isPending}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
            className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer shadow-[0_4px_20px_rgba(236,72,153,0.25)]"
          >
            {isPending && <Loader2 size={12} className="animate-spin" />}
            Create Highlight
          </Button>
        </div>
      </form>
    </div>
  );
}
