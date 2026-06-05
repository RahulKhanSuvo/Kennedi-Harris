/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash2, Film } from "lucide-react";
import type {
  UseFormRegister,
  UseFieldArrayReturn,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HighlightFormValues } from "./HighlightCreateForm";

interface VideosFieldArrayProps {
  fields: UseFieldArrayReturn<any>["fields"];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<HighlightFormValues>;
  append: UseFieldArrayReturn<any>["append"];
  remove: UseFieldArrayReturn<any>["remove"];
  isPending?: boolean;
}

export function VideosFieldArray({
  fields,
  register,
  setValue,
  control,
  append,
  remove,
  isPending,
}: VideosFieldArrayProps) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue(`videos.${index}.videos`, file);
    }
  };

  return (
    <div className="pt-6 border-t border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="font-condensed text-xs uppercase tracking-widest text-zinc-400 font-bold">
            Video Clips (videos)
          </Label>
          <p className="text-[10px] text-zinc-500 font-condensed uppercase tracking-wider mt-0.5">
            Detailed footage reels containing custom platform types
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            append({
              video_name: "",
              video_type: "",
              videos: undefined,
              video_url: "",
            })
          }
          disabled={isPending}
          className="bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300 font-condensed font-bold uppercase tracking-wider text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
        >
          <Plus size={12} />
          Add Video Clip
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => {
          const watchFile = control._formValues.videos?.[index]?.videos;
          const existingUrl = (field as any).video_url;

          return (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5 items-end relative"
            >
              {/* Video Name */}
              <div className="md:col-span-4 space-y-1">
                <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Video Name
                </Label>
                <Input
                  placeholder="e.g. Crossover Compilation"
                  {...register(`videos.${index}.video_name`)}
                  disabled={isPending}
                  className="bg-neutral-900 border-white/10 h-9"
                />
              </div>

              {/* Video Type (User can write here) */}
              <div className="md:col-span-3 space-y-1">
                <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Video Type (e.g. TikTok, YouTube, Game 1)
                </Label>
                <Input
                  placeholder="e.g. TikTok"
                  {...register(`videos.${index}.video_type`)}
                  disabled={isPending}
                  className="bg-neutral-900 border-white/10 h-9"
                />
              </div>

              {/* Video File / Upload */}
              <div className="md:col-span-4 space-y-1">
                <Label className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Video File
                </Label>
                <div className="relative h-9 rounded-md border border-white/10 bg-neutral-900/60 flex items-center px-3 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isPending}
                  />
                  <span className="text-zinc-400 text-xs truncate flex items-center gap-1.5 w-full">
                    {watchFile instanceof File ? (
                      watchFile.name
                    ) : existingUrl ? (
                      <>
                        <Film
                          size={12}
                          className="text-cyan-400 flex-shrink-0"
                        />
                        <span className="truncate text-cyan-400">
                          {existingUrl.split("/").pop()}
                        </span>
                      </>
                    ) : (
                      "Select MP4..."
                    )}
                  </span>
                </div>
              </div>

              {/* Remove Button */}
              <div className="md:col-span-1 flex justify-center pb-0.5">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={isPending}
                  className="text-zinc-600 hover:text-red-400 p-2 cursor-pointer hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <p className="text-center text-zinc-600 text-xs font-condensed uppercase tracking-widest py-6 border border-dashed border-white/5 rounded-xl">
            No video clips added yet
          </p>
        )}
      </div>
    </div>
  );
}
