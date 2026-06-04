/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  FileImage,
  Loader2,
  Plus,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const bannerFields = [
  { key: "bannerFristImg", label: "Banner First Image" },
  { key: "bannerSecondImg", label: "Banner Second Image" },
  { key: "mentorshipImgUrl", label: "Mentorship Image" },
] as const;

const photoSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  type: zod.string().min(1, "Type is required"),
  photo: zod
    .any()
    .refine((val) => val instanceof File, "Photo file is required"),
});

const gallerySchema = zod.object({
  photos: zod.array(photoSchema),
});

export type GalleryEditFormValues = zod.infer<typeof gallerySchema>;

interface GalleryEditFormProps {
  selectedGallery: any; // null if initializing (creating new)
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (
    banners: Record<string, File>,
    photos: Array<{ name: string; type: string; photo: File }>,
  ) => void;
  mode?: "banners" | "photos" | "all";
}

export function GalleryEditForm({
  selectedGallery,
  isPending,
  onCancel,
  onSubmit,
  mode = "all",
}: GalleryEditFormProps) {
  const [banners, setBanners] = useState<Record<string, File>>({});
  const [bannerPreviews, setBannerPreviews] = useState<Record<string, string>>(
    {},
  );
  const [photoPreviews, setPhotoPreviews] = useState<Record<number, string>>(
    {},
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<GalleryEditFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: { photos: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "photos",
  });

  const watchedPhotos = watch("photos") || [];

  // Reset/Initialize states when component mounts or selectedGallery changes
  useEffect(() => {
    if (selectedGallery) {
      // Inline edit mode for existing gallery
      const initialPreviews: Record<string, string> = {};
      bannerFields.forEach((b) => {
        if (selectedGallery[b.key]) {
          initialPreviews[b.key] = selectedGallery[b.key];
        }
      });
      setBannerPreviews(initialPreviews);
      setBanners({});
      reset({ photos: [] });
      setPhotoPreviews({});
    } else {
      // Creation/initialization mode
      setBannerPreviews({});
      setBanners({});
      reset({
        photos: [{ name: "", type: "action", photo: undefined as any }],
      });
      setPhotoPreviews({});
    }
  }, [selectedGallery, reset]);

  const handleBannerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setBanners((prev) => ({ ...prev, [key]: file }));
      setBannerPreviews((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  const handlePhotoRowFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue(`photos.${index}.photo`, file, { shouldValidate: true });
      setPhotoPreviews((prev) => ({
        ...prev,
        [index]: URL.createObjectURL(file),
      }));
    }
  };

  const handleFormSubmit = (values: GalleryEditFormValues) => {
    // If initializing, ensure all three banners are provided
    if (!selectedGallery) {
      const missingBanners = bannerFields.filter((b) => !banners[b.key]);
      if (missingBanners.length > 0) {
        toast.error(
          `Missing cover assets: ${missingBanners.map((b) => b.label).join(", ")}`,
        );
        return;
      }
    }

    // Call submission prop
    onSubmit(banners, values.photos);
  };

  const renderActions = (saveText: string) => (
    <div className="flex gap-3 justify-end border-t border-white/5 pt-6 mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isPending}
        className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
      >
        <X size={14} />
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-6 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
      >
        {isPending && <Loader2 size={12} className="animate-spin" />}
        <Save size={14} />
        {saveText}
      </Button>
    </div>
  );

  const bannersContent = (
    <Card className="bg-[#0c0c14] border-white/5 p-6 rounded-2xl h-full flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 mb-6">
          <CardTitle className="font-display text-xl uppercase tracking-wider text-white flex items-center gap-2">
            <ImageIcon size={18} className="text-kh-pink" />
            Cover Banners Configuration
          </CardTitle>
          <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
            {selectedGallery
              ? "Update or replace the main header images"
              : "Upload all three initial header images"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-5">
          {bannerFields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <span className="font-condensed text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                {field.label}
              </span>
              <div className="relative border border-dashed border-white/10 hover:border-kh-pink/30 rounded-xl p-3 bg-neutral-950/40 flex flex-col items-center justify-center text-center cursor-pointer min-h-[145px] transition-colors group/upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBannerChange(e, field.key)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  disabled={isPending}
                />
                {bannerPreviews[field.key] ? (
                  <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-white/5">
                    <img
                      src={bannerPreviews[field.key]}
                      alt={field.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                      <span className="font-condensed text-[10px] font-black uppercase text-white tracking-widest bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                        Replace Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 pointer-events-none">
                    <FileImage
                      size={22}
                      className="mx-auto text-zinc-700 group-hover/upload:text-kh-pink/60 transition-colors animate-pulse"
                    />
                    <p className="font-condensed text-[9px] font-black uppercase text-zinc-500 tracking-wider">
                      Upload Cover Banner
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </div>
      {mode === "banners" && renderActions("Save Banners")}
    </Card>
  );

  const photosContent = (
    <Card className="bg-kh-dark-2 border-white/5 p-6 rounded flex flex-col justify-between min-h-[480px]">
      <div>
        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-xl uppercase tracking-wider text-white">
              Import Photos to Library
            </CardTitle>
            <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
              Queue multiple photos to append to the active library
            </CardDescription>
          </div>
          <Button
            type="button"
            onClick={() =>
              append({ name: "", type: "photoshoot", photo: undefined as any })
            }
            className="bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300 font-condensed font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
            disabled={isPending}
          >
            <Plus size={12} />
            Add Photo
          </Button>
        </CardHeader>

        <CardContent className="p-0 space-y-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
          {fields.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/5 rounded bg-neutral-950/20 p-6 flex flex-col items-center justify-center">
              <FileImage size={28} className="text-zinc-800 mb-2" />
              <p className="font-condensed font-bold text-zinc-500 tracking-wider uppercase text-[10px]">
                No photos added to the upload queue.
              </p>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-1.5">
                Click 'Add Photo Row' above to queue library uploads.
              </p>
              {/* add  add photo btn */}
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    type: "photoshoot",
                    photo: undefined as any,
                  })
                }
                className="bg-pink-600 border mt-10 border-white/10 hover:bg-pink-500 text-white font-condensed font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                disabled={isPending}
              >
                <Plus size={12} />
                Add Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-neutral-950/40 border border-white/5 items-center relative group/row hover:border-white/10 transition-colors"
                >
                  {/* Photo Preview Thumbnail */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center relative">
                      {photoPreviews[index] ? (
                        <img
                          src={photoPreviews[index]}
                          alt="Row Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileImage size={16} className="text-zinc-700" />
                      )}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="md:col-span-3 space-y-1">
                    <Label className="font-condensed text-[10px] uppercase text-zinc-500">
                      Photo Name
                    </Label>
                    <Input
                      placeholder="e.g. Layup Shot"
                      {...register(`photos.${index}.name`)}
                      className="bg-neutral-900 border-white/10 text-xs rounded-xl"
                      disabled={isPending}
                    />
                    {errors.photos?.[index]?.name && (
                      <p className="text-red-400 text-[9px] font-mono uppercase">
                        {errors.photos[index].name.message}
                      </p>
                    )}
                  </div>

                  {/* Type Select */}
                  <div className="md:col-span-3 space-y-1">
                    <Label className="font-condensed text-[10px] uppercase text-zinc-500">
                      Photo Type
                    </Label>
                    <Select
                      defaultValue={field.type}
                      onValueChange={(val) =>
                        setValue(`photos.${index}.type`, val)
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger className="bg-neutral-900 border-white/10 text-xs text-white rounded-xl">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photoshoot">Photo Shoot</SelectItem>
                        <SelectItem value="training">
                          Training Sessions
                        </SelectItem>
                        <SelectItem value="gamehighlights">
                          Game Highlights
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* File Selector */}
                  <div className="md:col-span-3 space-y-1">
                    <Label className="font-condensed text-[10px] uppercase text-zinc-500">
                      File Upload
                    </Label>
                    <div className="relative h-9 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center px-3 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoRowFileChange(e, index)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={isPending}
                      />
                      <span className="text-zinc-400 text-xs truncate">
                        {watchedPhotos[index]?.photo instanceof File
                          ? (watchedPhotos[index]?.photo as File).name
                          : "Select image..."}
                      </span>
                    </div>
                    {errors.photos?.[index]?.photo && (
                      <p className="text-red-400 text-[9px] font-mono uppercase">
                        {errors.photos[index].photo?.message as string}
                      </p>
                    )}
                  </div>

                  {/* Row Actions */}
                  <div className="md:col-span-1 flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setPhotoPreviews((prev) => {
                          const updated = { ...prev };
                          delete updated[index];
                          return updated;
                        });
                      }}
                      className="text-zinc-500 hover:text-red-400 p-2 cursor-pointer bg-transparent border-none hover:bg-red-500/10 rounded-lg transition-colors"
                      disabled={isPending}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>

      {(mode === "photos" || mode === "all") &&
        renderActions(
          mode === "all"
            ? selectedGallery
              ? "Save Settings"
              : "Initialize Gallery"
            : "Upload Photos",
        )}
    </Card>
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {mode === "all" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">{bannersContent}</div>
          <div className="lg:col-span-7 space-y-6">{photosContent}</div>
        </div>
      ) : mode === "banners" ? (
        <div className="w-full space-y-6">{bannersContent}</div>
      ) : (
        <div className="w-full space-y-6">{photosContent}</div>
      )}
    </form>
  );
}
