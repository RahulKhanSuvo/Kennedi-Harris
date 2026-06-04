/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FileImage, Loader2, Sliders, Image, Kanban } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const aboutSchema = zod.object({
  totalMajorReward: zod.string().min(1, "Major rewards count is required"),
  totalGamePlayed: zod.string().min(1, "Games played count is required"),
});

export type AboutFormValues = zod.infer<typeof aboutSchema>;

import { IMAGE_FIELDS } from "./constants";

interface AboutFormProps {
  activeAbout: any;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function AboutForm({
  activeAbout,
  onSubmit,
  onCancel,
  isPending,
}: AboutFormProps) {
  const isEdit = !!activeAbout;

  const [files, setFiles] = useState<Record<string, File>>({});

  // Initialize previews directly on creation (React key handles updates via remount)
  const [previews, setPreviews] = useState<Record<string, string>>(() => {
    const initialPreviews: Record<string, string> = {};
    if (activeAbout) {
      IMAGE_FIELDS.forEach((f) => {
        if (activeAbout[f.key]) {
          initialPreviews[f.key] = activeAbout[f.key];
        }
      });
    }
    return initialPreviews;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      totalMajorReward: activeAbout?.totalMajorReward || "",
      totalGamePlayed: activeAbout?.totalGamePlayed || "",
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFiles((prev) => ({ ...prev, [key]: file }));
      setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleFormSubmit = (values: AboutFormValues) => {
    // If not editing, verify all 6 images are uploaded
    if (!isEdit) {
      const missingFiles = IMAGE_FIELDS.filter((f) => !files[f.key]);
      if (missingFiles.length > 0) {
        toast.error(
          `Missing assets: ${missingFiles.map((m) => m.label).join(", ")}`,
        );
        return;
      }
    }

    const formData = new FormData();
    formData.append("totalMajorReward", values.totalMajorReward);
    formData.append("totalGamePlayed", values.totalGamePlayed);

    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });

    onSubmit(formData);
  };

  return (
    <Card className="bg-[#0c0c14] border-white/5 shadow-2xl rounded overflow-hidden">
      {/* Header Banner */}
      <CardHeader className="p-6 md:p-8 bg-neutral-950/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-kh-pink/10 rounded-xl border border-kh-pink/20 text-kh-pink">
            <Sliders size={20} />
          </div>
          <div>
            <CardTitle className="font-display text-2xl uppercase tracking-wider text-white">
              {isEdit ? "Update Biography Node" : "Deploy Biography Component"}
            </CardTitle>
            <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
              Refine historical markers and synchronize profile timeline assets
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="divide-y divide-white/5"
      >
        {/* SECTION 1: Metrics */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 font-condensed font-black text-xs uppercase tracking-wider">
              <Kanban size={14} className="text-kh-pink" />
              General Metrics
            </div>
            <p className="text-[11px] text-zinc-500 font-condensed uppercase tracking-wide leading-relaxed">
              Define general rewards and counters showcased across biography
              pages.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="totalMajorReward"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Total Major Rewards
              </Label>
              <Input
                id="totalMajorReward"
                {...register("totalMajorReward")}
                disabled={isPending}
                placeholder="e.g. 5"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.totalMajorReward && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.totalMajorReward.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="totalGamePlayed"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Total Games Played
              </Label>
              <Input
                id="totalGamePlayed"
                {...register("totalGamePlayed")}
                disabled={isPending}
                placeholder="e.g. 120"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.totalGamePlayed && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.totalGamePlayed.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Image Milestone Tracks */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 font-condensed font-black text-xs uppercase tracking-wider">
              <Image size={14} className="text-kh-pink" />
              Biography Visual Assets
            </div>
            <p className="text-[11px] text-zinc-500 font-condensed uppercase tracking-wide leading-relaxed">
              Upload structural imagery mapped directly to different milestone
              periods.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {IMAGE_FIELDS.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <span className="font-condensed text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                  {field.label}
                </span>
                <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-colors group/upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, field.key)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    disabled={isPending}
                  />
                  {previews[field.key] ? (
                    <div className="relative w-full h-[115px] rounded-lg overflow-hidden border border-white/5">
                      <img
                        src={previews[field.key]}
                        alt={field.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5 pointer-events-none">
                      <FileImage
                        size={20}
                        className="mx-auto text-zinc-700 group-hover/upload:text-kh-pink/60 transition-colors"
                      />
                      <span className="font-condensed text-[9px] font-black uppercase text-zinc-500 tracking-wider block">
                        Upload Asset
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Controls Submit Panel */}
        <CardFooter className="p-6 bg-neutral-950/20 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-5 h-9"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-wider text-xs px-5 h-9 rounded-xl flex items-center gap-2 border-none shadow-[0_4px_20px_rgba(236,72,153,0.15)] cursor-pointer"
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            {isEdit ? "Update Biography" : "Publish Biography"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
