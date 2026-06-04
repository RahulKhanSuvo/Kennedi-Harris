/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FileImage,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GalleryEditForm } from "./GalleryEditForm";

interface ImageField {
  key: string;
  label: string;
}

interface ActiveGalleryCardProps {
  activeGallery: any;
  bannerFields: readonly ImageField[];
  isEditingBanners: boolean;
  isAddingPhotos: boolean;
  onEditBannersClick: () => void;
  onAddPhotosClick: () => void;
  onCancelBanners: () => void;
  onCancelPhotos: () => void;
  onDeleteGalleryClick: () => void;
  onEditPhotoClick: (photo: any) => void;
  onDeletePhotoClick: (photoId: string) => void;
  isPending: boolean;
  onSubmit: (
    banners: Record<string, File>,
    photos: Array<{ name: string; type: string; photo: File }>,
  ) => void;
}

export function ActiveGalleryCard({
  activeGallery,
  bannerFields,
  isEditingBanners,
  isAddingPhotos,
  onEditBannersClick,
  onAddPhotosClick,
  onCancelBanners,
  onCancelPhotos,
  // onDeleteGalleryClick,
  onEditPhotoClick,
  onDeletePhotoClick,
  isPending,
  onSubmit,
}: ActiveGalleryCardProps) {
  return (
    <div className="space-y-8 w-full">
      {/* Premium Hero Banners Card / Edit Form */}
      {isEditingBanners ? (
        <GalleryEditForm
          selectedGallery={activeGallery}
          isPending={isPending}
          onCancel={onCancelBanners}
          onSubmit={onSubmit}
          mode="banners"
        />
      ) : (
        <Card className="bg-kh-dark-2 border-white/5 shadow-2xl p-6 rounded-2xl relative overflow-hidden group/card w-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />

          <CardHeader className="p-0 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-2xl uppercase tracking-wider text-white flex items-center gap-2">
                <ImageIcon className="text-kh-pink" size={20} />
                Active Cover Banners
              </CardTitle>
              <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
                Live banner layout and presentation media
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* use primary button */}
              <Button
                onClick={onEditBannersClick}
                className="bg-kh-pink hover:bg-kh-pink/90 text-white font-condensed font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Edit2 size={12} />
                Edit Banners
              </Button>
              {/* <Button
                onClick={onDeleteGalleryClick}
                className="bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-500/10 font-condensed uppercase tracking-widest text-[10px] px-3 py-1.5 h-auto rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={11} />
                Delete Node
              </Button> */}
            </div>
          </CardHeader>

          {/* Banner Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bannerFields.map((field) => (
              <div
                key={field.key}
                className="group/banner relative rounded-xl overflow-hidden border border-white/5 bg-neutral-950/80 min-h-[160px] flex flex-col justify-end transition-all duration-300 hover:border-kh-pink/20 shadow-lg"
              >
                {activeGallery[field.key] ? (
                  <>
                    <img
                      src={activeGallery[field.key]}
                      alt={field.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/banner:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-90" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 gap-1.5">
                    <FileImage size={24} className="text-zinc-800" />
                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-600">
                      Empty Banner
                    </span>
                  </div>
                )}
                <div className="relative p-4 w-full text-left z-10">
                  <span className="font-condensed text-[10px] font-black text-zinc-300 uppercase tracking-widest block drop-shadow-md group-hover/banner:text-white transition-colors">
                    {field.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Photos Grid Section / Add Form */}
      {isAddingPhotos ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="font-display text-2xl uppercase tracking-wider text-white">
              Photos Library
            </h3>
          </div>
          <GalleryEditForm
            selectedGallery={activeGallery}
            isPending={isPending}
            onCancel={onCancelPhotos}
            onSubmit={onSubmit}
            mode="photos"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="font-display text-2xl uppercase tracking-wider text-white">
              Photos Library
            </h3>
            <div className="flex items-center gap-3">
              <span className="font-condensed text-[10px] text-zinc-500 uppercase tracking-wider font-bold bg-neutral-900 px-3 py-1.5 rounded-full border border-white/5">
                Total: {(activeGallery.photos || []).length} items
              </span>
              <Button
                onClick={onAddPhotosClick}
                className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-[10px] px-3.5 py-1.5 h-auto rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={11} />
                Add Photos
              </Button>
            </div>
          </div>

          {!activeGallery.photos?.length ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-neutral-950/20 p-6 flex flex-col items-center justify-center">
              <ImageIcon
                size={32}
                className="text-zinc-700 mb-2 animate-pulse"
              />
              <p className="font-condensed font-bold text-zinc-500 tracking-wider uppercase text-xs">
                No photo library assets loaded.
              </p>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-1.5">
                Click Add Photos to upload new images.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {activeGallery.photos.map((photo: any) => (
                <Card
                  key={photo._id}
                  className="bg-kh-dark-2 border-white/5 rounded-xl overflow-hidden group/photo flex flex-col justify-between shadow-lg hover:border-kh-pink/20 transition-all duration-300 relative"
                >
                  <div className="h-40 bg-neutral-950 overflow-hidden relative">
                    <img
                      src={photo.url || photo.photo}
                      alt={photo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/photo:bg-black/40 transition-colors duration-300" />

                    {/* Photo Actions Overlay */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 z-20">
                      <Button
                        size="icon-xs"
                        onClick={() => onEditPhotoClick(photo)}
                        className="bg-black/70 hover:bg-kh-pink border border-white/10 hover:border-none text-white rounded-md cursor-pointer transition-colors duration-200"
                      >
                        <Edit2 size={11} />
                      </Button>
                      <Button
                        size="icon-xs"
                        onClick={() => onDeletePhotoClick(photo._id)}
                        className="bg-red-950/80 hover:bg-red-500 border border-red-500/20 hover:border-none text-red-400 hover:text-white rounded-md cursor-pointer transition-colors duration-200"
                      >
                        <Trash2 size={11} />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5 bg-neutral-950/40 border-t border-white/5">
                    <p className="font-bold text-xs truncate text-white uppercase font-condensed tracking-wide">
                      {photo.name}
                    </p>
                    <Badge className="bg-neutral-900 border border-white/5 text-[8px] uppercase tracking-wider font-bold text-zinc-400">
                      {photo.type}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
