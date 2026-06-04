"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  FileImage,
  Loader2,
  Sliders,
  Image,
  ShieldAlert,
  Kanban,
} from "lucide-react";
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

const homeSchema = zod.object({
  PPG: zod.string().min(1, "Points Per Game stat is required"),
  RPG: zod.string().min(1, "Rebounds Per Game stat is required"),
  BPG: zod.string().min(1, "Blocks Per Game stat is required"),
  DOUBLE_DOUBLES: zod.string().min(1, "Double-doubles count is required"),
  REBOUNDS: zod.string().min(1, "Rebounds count is required"),
});

export type HomeFormValues = zod.infer<typeof homeSchema>;

interface HomeFormProps {
  activeRecord: {
    _id: string;
    PPG: string;
    RPG: string;
    BPG: string;
    DOUBLE_DOUBLES: string;
    REBOUNDS: string;
    frist_img?: string;
    second_img?: string;
  } | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function HomeForm({
  activeRecord,
  onSubmit,
  onCancel,
  isPending,
}: HomeFormProps) {
  const isEdit = !!activeRecord;

  const [firstImgFile, setFirstImgFile] = useState<File | null>(null);
  const [secondImgFile, setSecondImgFile] = useState<File | null>(null);

  const [firstImgPreview, setFirstImgPreview] = useState<string | null>(
    activeRecord?.frist_img || null,
  );
  const [secondImgPreview, setSecondImgPreview] = useState<string | null>(
    activeRecord?.second_img || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeFormValues>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      PPG: activeRecord?.PPG || "",
      RPG: activeRecord?.RPG || "",
      BPG: activeRecord?.BPG || "",
      DOUBLE_DOUBLES: activeRecord?.DOUBLE_DOUBLES || "",
      REBOUNDS: activeRecord?.REBOUNDS || "",
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "first" | "second",
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (type === "first") {
        setFirstImgFile(file);
        setFirstImgPreview(URL.createObjectURL(file));
      } else {
        setSecondImgFile(file);
        setSecondImgPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleFormSubmit = (values: HomeFormValues) => {
    if (!isEdit && (!firstImgFile || !secondImgFile)) {
      toast.error("Both images are required when creating a new record");
      return;
    }

    const formData = new FormData();
    formData.append("PPG", values.PPG);
    formData.append("RPG", values.RPG);
    formData.append("BPG", values.BPG);
    formData.append("DOUBLE_DOUBLES", values.DOUBLE_DOUBLES);
    formData.append("REBOUNDS", values.REBOUNDS);

    if (firstImgFile) formData.append("frist_img", firstImgFile);
    if (secondImgFile) formData.append("second_img", secondImgFile);

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
              {isEdit
                ? "Update Engine Configurations"
                : "Deploy Component Node"}
            </CardTitle>
            <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
              Refine database metrics and re-sync frontend timeline presentation
              nodes
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="divide-y divide-white/5"
      >
        {/* SECTION 1: Media Asset Row Placement */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 font-condensed font-black text-xs uppercase tracking-wider">
              <Image size={14} className="text-kh-pink" />
              Interface Graphics
            </div>
            <p className="text-[11px] text-zinc-500 font-condensed uppercase tracking-wide leading-relaxed">
              Upload responsive structural images to act as background nodes and
              layout placeholders.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Slot One */}
            <div className="space-y-2">
              <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-colors group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "first")}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  disabled={isPending}
                />
                {firstImgPreview ? (
                  <div className="relative w-full h-[115px] rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={firstImgPreview}
                      alt="Primary preview"
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
                      Primary Banner File
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Slot Two */}
            <div className="space-y-2">
              <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/50 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] transition-colors group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "second")}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  disabled={isPending}
                />
                {secondImgPreview ? (
                  <div className="relative w-full h-[115px] rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={secondImgPreview}
                      alt="Secondary preview"
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
                      Secondary Context File
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Biometric Float Matrix parameters */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 font-condensed font-black text-xs uppercase tracking-wider">
              <Kanban size={14} className="text-kh-pink" />
              Dynamic Rates
            </div>
            <p className="text-[11px] text-zinc-500 font-condensed uppercase tracking-wide leading-relaxed">
              Define the dynamic floating-point variables rendered across
              component micro-counters.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="PPG"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Variable Rate A
              </Label>
              <Input
                id="PPG"
                {...register("PPG")}
                disabled={isPending}
                placeholder="0.00"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.PPG && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.PPG.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="RPG"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Variable Rate B
              </Label>
              <Input
                id="RPG"
                {...register("RPG")}
                disabled={isPending}
                placeholder="0.00"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.RPG && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.RPG.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="BPG"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Variable Rate C
              </Label>
              <Input
                id="BPG"
                {...register("BPG")}
                disabled={isPending}
                placeholder="0.00"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.BPG && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.BPG.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Accumulations and Global Totals */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-400 font-condensed font-black text-xs uppercase tracking-wider">
              <ShieldAlert size={14} className="text-kh-pink" />
              Aggregated Metrics
            </div>
            <p className="text-[11px] text-zinc-500 font-condensed uppercase tracking-wide leading-relaxed">
              Global whole integers mapped to high-priority layout charts and
              stat blocks.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="DOUBLE_DOUBLES"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Total Index Value
              </Label>
              <Input
                id="DOUBLE_DOUBLES"
                {...register("DOUBLE_DOUBLES")}
                disabled={isPending}
                placeholder="e.g. 420"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.DOUBLE_DOUBLES && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.DOUBLE_DOUBLES.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="REBOUNDS"
                className="font-condensed text-[10px] uppercase tracking-widest text-zinc-400 font-bold"
              >
                Cumulative Counter
              </Label>
              <Input
                id="REBOUNDS"
                {...register("REBOUNDS")}
                disabled={isPending}
                placeholder="e.g. 1500"
                className="bg-neutral-950/60 border-white/10 rounded-xl text-white placeholder:text-zinc-700 focus-visible:ring-kh-pink/40 font-mono h-9 text-xs"
              />
              {errors.REBOUNDS && (
                <span className="text-red-400 font-mono text-[9px] uppercase mt-1 block">
                  {errors.REBOUNDS.message}
                </span>
              )}
            </div>
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
            {isEdit ? "Update Matrix Node" : "Publish Configuration"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
