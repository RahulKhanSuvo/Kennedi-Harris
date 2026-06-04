/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Image as ImageIcon, PlusCircle, X } from "lucide-react";
import {
  useAllGalleries,
  useCreateGallery,
  useUpdateGallery,
  useDeleteGallery,
  useUpdateSinglePhoto,
  useDeleteSinglePhoto,
} from "@/hooks/useGallery";
import { Button } from "@/components/ui/button";

// Modular subcomponents
import { ActiveGalleryCard } from "@/components/gallery/ActiveGalleryCard";
import { GalleryEditForm } from "@/components/gallery/GalleryEditForm";
import { PhotoEditModal } from "@/components/gallery/PhotoEditModal";
import { GalleryDeleteModal } from "@/components/gallery/GalleryDeleteModal";
import { PhotoDeleteModal } from "@/components/gallery/PhotoDeleteModal";

const bannerFields = [
  { key: "bannerFristImg", label: "Banner First Image" },
  { key: "bannerSecondImg", label: "Banner Second Image" },
  { key: "mentorshipImgUrl", label: "Mentorship Image" },
] as const;

export default function GalleryPage() {
  const { data: galleries = [], isLoading, isError } = useAllGalleries();
  const createMutation = useCreateGallery();
  const updateMutation = useUpdateGallery();
  const deleteMutation = useDeleteGallery();
  const updatePhotoMutation = useUpdateSinglePhoto();
  const deletePhotoMutation = useDeleteSinglePhoto();

  // Inline Edit Mode States
  const [isEditingBanners, setIsEditingBanners] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Dialog Visibility states (for independent sub-items / delete actions)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPhotoDeleteOpen, setIsPhotoDeleteOpen] = useState(false);

  // Selection contexts
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePhotoId, setDeletePhotoId] = useState<string | null>(null);

  // Single photo edit states
  const [photoName, setPhotoName] = useState("");
  const [photoType, setPhotoType] = useState("action");
  const [singlePhotoFile, setSinglePhotoFile] = useState<File | null>(null);
  const [singlePhotoPreview, setSinglePhotoPreview] = useState<string | null>(
    null,
  );

  const activeGallery = galleries.find((g: any) => g.isActive) || galleries[0];
  const hasExistingData = !!activeGallery;

  // ── Unified Submit Handler (Create or Update) ──
  const handleSaveGallery = async (
    bannerFiles: Record<string, File>,
    newPhotos: Array<{ name: string; type: string; photo: File }>,
  ) => {
    if (activeGallery) {
      // Update Flow
      const formData = new FormData();

      // Append cover banners if updated
      Object.entries(bannerFiles).forEach(([key, file]) => {
        formData.append(key, file);
      });

      // Append new photos if any
      newPhotos.forEach((p) => {
        formData.append("name", p.name);
        formData.append("type", p.type);
        if (p.photo instanceof File) {
          formData.append("photos", p.photo);
        }
      });

      if (Object.keys(bannerFiles).length === 0 && newPhotos.length === 0) {
        toast.info("No modifications detected in cover banners or new photos.");
        setIsEditingBanners(false);
        setIsAddingPhotos(false);
        return;
      }

      updateMutation.mutate(
        { id: activeGallery._id, formData },
        {
          onSuccess: () => {
            toast.success("Gallery settings updated successfully!");
            setIsEditingBanners(false);
            setIsAddingPhotos(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update gallery",
            );
          },
        },
      );
    } else {
      // Creation/Initialization Flow
      const formData = new FormData();

      // Append initial banners
      Object.entries(bannerFiles).forEach(([key, file]) => {
        formData.append(key, file);
      });

      // Append initial photos
      newPhotos.forEach((p) => {
        formData.append("name", p.name);
        formData.append("type", p.type);
        if (p.photo instanceof File) {
          formData.append("photos", p.photo);
        }
      });

      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Gallery node deployed successfully!");
          setIsInitializing(false);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to create gallery",
          );
        },
      });
    }
  };

  // ── Single Photo Edit trigger ──
  const handleOpenPhotoEdit = (photo: any) => {
    setSelectedPhoto(photo);
    setPhotoName(photo.name || "");
    setPhotoType(photo.type || "action");
    setSinglePhotoFile(null);
    setSinglePhotoPreview(photo.url || photo.photo || null);
    setIsPhotoOpen(true);
  };

  const handleSinglePhotoFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSinglePhotoFile(file);
      setSinglePhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitSinglePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGallery || !selectedPhoto) return;

    const formData = new FormData();
    formData.append("name", photoName);
    formData.append("type", photoType);
    if (singlePhotoFile) {
      formData.append("photo", singlePhotoFile);
    }

    updatePhotoMutation.mutate(
      {
        galleryId: activeGallery._id,
        photoId: selectedPhoto._id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Photo updated successfully!");
          setIsPhotoOpen(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update photo");
        },
      },
    );
  };

  // ── Photo Delete trigger ──
  const confirmPhotoDelete = (photoId: string) => {
    setDeletePhotoId(photoId);
    setIsPhotoDeleteOpen(true);
  };

  const handlePhotoDelete = () => {
    if (!activeGallery || !deletePhotoId) return;

    deletePhotoMutation.mutate(
      { galleryId: activeGallery._id, photoId: deletePhotoId },
      {
        onSuccess: () => {
          toast.success("Photo deleted successfully!");
          setIsPhotoDeleteOpen(false);
          setDeletePhotoId(null);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to delete photo");
        },
      },
    );
  };

  // ── Gallery Delete trigger ──
  const confirmGalleryDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleGalleryDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Gallery deleted successfully!");
        setIsDeleteOpen(false);
        setDeleteId(null);
        setIsEditingBanners(false);
        setIsAddingPhotos(false);
        setIsInitializing(false);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete gallery");
      },
    });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2.5">
            <ImageIcon className="text-kh-pink" size={32} />
            Gallery Settings
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-0.5">
            Manage your high-definition image catalog and coverage tracks
          </p>
        </div>

        {!isLoading && !isError && !hasExistingData && (
          <div className="flex gap-2">
            {isInitializing ? (
              <Button
                onClick={() => setIsInitializing(false)}
                variant="outline"
                className="font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={14} />
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => setIsInitializing(true)}
                className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-2 border-none cursor-pointer"
              >
                <PlusCircle size={14} />
                Initialize Node
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="w-full h-[500px] bg-[#0c0c14] border border-white/5 animate-pulse rounded-2xl" />
      ) : isError ? (
        <div className="p-10 text-center bg-red-950/10 border border-red-500/10 rounded-2xl max-w-md mx-auto">
          <p className="text-red-400 font-condensed font-bold uppercase tracking-wider text-sm">
            Operational pipeline failed to retrieve gallery records.
          </p>
        </div>
      ) : isInitializing ? (
        /* Edit Mode: Inline Form for full initialization */
        <GalleryEditForm
          selectedGallery={activeGallery}
          isPending={isPending}
          onCancel={() => setIsInitializing(false)}
          onSubmit={handleSaveGallery}
          mode="all"
        />
      ) : hasExistingData ? (
        /* Read-only Mode: Active Gallery Details */
        <div className="w-full">
          <ActiveGalleryCard
            activeGallery={activeGallery}
            bannerFields={bannerFields}
            isEditingBanners={isEditingBanners}
            isAddingPhotos={isAddingPhotos}
            onEditBannersClick={() => setIsEditingBanners(true)}
            onAddPhotosClick={() => setIsAddingPhotos(true)}
            onCancelBanners={() => setIsEditingBanners(false)}
            onCancelPhotos={() => setIsAddingPhotos(false)}
            onDeleteGalleryClick={() => confirmGalleryDelete(activeGallery._id)}
            onEditPhotoClick={handleOpenPhotoEdit}
            onDeletePhotoClick={confirmPhotoDelete}
            isPending={isPending}
            onSubmit={handleSaveGallery}
          />
        </div>
      ) : (
        /* Empty Prompt View State */
        <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-neutral-950/10 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
          <ImageIcon size={40} className="text-zinc-800 mb-3" />
          <p className="font-display text-lg font-bold text-zinc-400 tracking-wide uppercase">
            No Active Gallery
          </p>
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-1.5 max-w-[280px] leading-relaxed">
            Initialize your gallery templates grid structure to publish photos.
          </p>
          <Button
            onClick={() => setIsInitializing(true)}
            className="mt-6 bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-6 py-2.5 rounded-xl border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer"
          >
            Initialize Gallery Node
          </Button>
        </div>
      )}

      {/* Single Photo Edit Dialog */}
      {isPhotoOpen && (
        <PhotoEditModal
          isOpen={isPhotoOpen}
          onOpenChange={setIsPhotoOpen}
          photoName={photoName}
          setPhotoName={setPhotoName}
          photoType={photoType}
          setPhotoType={setPhotoType}
          singlePhotoPreview={singlePhotoPreview}
          onFileChange={handleSinglePhotoFileChange}
          onSubmit={onSubmitSinglePhoto}
          isPending={updatePhotoMutation.isPending}
        />
      )}

      {/* Gallery Delete confirmation Dialog */}
      <GalleryDeleteModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleGalleryDelete}
        isPending={deleteMutation.isPending}
      />

      {/* Photo Delete confirmation Dialog */}
      <PhotoDeleteModal
        isOpen={isPhotoDeleteOpen}
        onOpenChange={setIsPhotoDeleteOpen}
        onConfirm={handlePhotoDelete}
        isPending={deletePhotoMutation.isPending}
      />
    </div>
  );
}
