/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Edit2, X } from "lucide-react";
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

  // ========================================================
  // Form Submission Debugger
  // ========================================================
  const handleFormSubmit = (values: HighlightFormValues) => {
    console.group("🚀 Submitting Highlight Form Data");
    console.log("Main Video Field:", values.MainVideo_url);
    console.log("Video Clips Array (videos):", values.videos);
    console.log("Feed Clips Array (feedVideos):", values.feedVideos);
    console.log("Raw Payload Object:", values);
    console.groupEnd();

    // Call the original onSubmit handler passed down via props
    onSubmit(values);
  };

  // Populate form when highlight changes
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
    <div className="rounded border border-blue-500/20 bg-kh-dark-2 shadow-[0_0_40px_rgba(59,130,246,0.05)] overflow-hidden">
      {/* Form Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-blue-500/5">
        <div className="flex items-center gap-2.5">
          <Edit2 size={14} className="text-blue-400" />
          <span className="font-display text-sm uppercase tracking-widest text-white">
            Modify Highlight Reel
          </span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Form Body - Updated to use handleFormSubmit */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-6 py-5 space-y-6"
      >
        {/* Main Video File */}
        <div className="space-y-2 max-w-md">
          <Label className="font-condensed text-[11px] uppercase tracking-widest text-zinc-400">
            Main Video File Upload
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
                  : "Select new video to replace..."}
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
          register={register}
          setValue={setValue}
          control={control}
          append={appendVideo}
          remove={removeVideo}
          isPending={isPending}
        />

        {/* Feed Clips Array */}
        <FeedVideosFieldArray
          fields={feedFields}
          register={register}
          setValue={setValue}
          control={control}
          append={appendFeed}
          remove={removeFeed}
          isPending={isPending}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-500 text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
          >
            {isPending && <Loader2 size={12} className="animate-spin" />}
            Update Highlight
          </Button>
        </div>
      </form>
    </div>
  );
}
