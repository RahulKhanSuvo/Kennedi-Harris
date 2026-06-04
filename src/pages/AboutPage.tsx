/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, PlusCircle } from "lucide-react";
import { useAllAbouts, useCreateAbout, useUpdateAbout } from "@/hooks/useAbout";
import { Button } from "@/components/ui/button";

// Modular UI Subcomponents
import { ActiveShowcaseCard } from "@/components/about/ActiveShowcaseCard";
import {
  AboutFormModal,
  type AboutFormValues,
} from "@/components/about/AboutFormModal";

const IMAGE_FIELDS = [
  { key: "bannerImgUrl", label: "Banner Image" },
  { key: "earlyBeginningImgUrl", label: "Early Beginning" },
  { key: "fristVictoryImgUrl", label: "First Victory" },
  { key: "tranningImgUrl", label: "Training / Workouts" },
  { key: "accoladesMilestonesImgUrl", label: "Accolades & Milestones" },
  { key: "playerReflectionImgUrl", label: "Player Reflection" },
] as const;

export default function AboutPage() {
  const { data: abouts = [], isLoading, isError } = useAllAbouts();
  const createMutation = useCreateAbout();
  const updateMutation = useUpdateAbout();

  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<Record<string, File>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const activeAbout = abouts.find((a: any) => a.isActive) || abouts[0];
  const hasExistingData = !!activeAbout;

  const handleOpenForm = () => {
    setFiles({});
    setPreviews({});

    if (hasExistingData) {
      const currentPreviews: Record<string, string> = {};
      IMAGE_FIELDS.forEach((f) => {
        if (activeAbout[f.key]) currentPreviews[f.key] = activeAbout[f.key];
      });
      setPreviews(currentPreviews);
    }
    setIsOpen(true);
  };

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

  const onSubmit = async (values: AboutFormValues) => {
    const formData = new FormData();
    formData.append("totalMajorReward", values.totalMajorReward);
    formData.append("totalGamePlayed", values.totalGamePlayed);

    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });

    if (hasExistingData) {
      updateMutation.mutate(
        { id: activeAbout._id, formData },
        {
          onSuccess: () => {
            toast.success("Biography updated successfully!");
            setIsOpen(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update record",
            );
          },
        },
      );
    } else {
      const missingFiles = IMAGE_FIELDS.filter((f) => !files[f.key]);
      if (missingFiles.length > 0) {
        toast.error(
          `Missing assets: ${missingFiles.map((m) => m.label).join(", ")}`,
        );
        return;
      }

      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Biography created successfully!");
          setIsOpen(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to create record");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 sm:p-0">
      {/* Dynamic Action Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight text-white flex items-center gap-2.5">
            <User className="text-kh-pink" size={32} />
            About Settings
          </h2>
          <p className="font-condensed text-xs tracking-wider text-zinc-500 uppercase mt-0.5">
            Manage your high-density biome data metrics and interface assets
          </p>
        </div>

        {/* Initialization button if completely empty */}
        {!isLoading && !isError && !hasExistingData && (
          <Button
            onClick={handleOpenForm}
            className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer w-full sm:w-auto"
          >
            <PlusCircle size={15} />
            Initialize About Node
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="w-full h-[500px] bg-kh-dark-2 border border-white/5 animate-pulse rounded-2xl" />
      ) : isError ? (
        <div className="p-10 text-center bg-red-950/10 border border-red-500/10 rounded-2xl max-w-md mx-auto">
          <p className="text-red-400 font-condensed font-bold uppercase tracking-wider text-sm">
            Operational pipeline failed to retrieve profile data records.
          </p>
        </div>
      ) : hasExistingData ? (
        <div className="w-full">
          <ActiveShowcaseCard
            activeAbout={activeAbout}
            imageFields={IMAGE_FIELDS}
            onEditClick={handleOpenForm} // Connect edit trigger directly to internal card action
          />
        </div>
      ) : (
        /* Empty Prompt View State */
        <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-neutral-950/10 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
          <User size={40} className="text-zinc-800 mb-3" />
          <p className="font-display text-lg font-bold text-zinc-400 tracking-wide uppercase">
            No Live Metadata Found
          </p>
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-1.5 max-w-[280px] leading-relaxed">
            Initialize your about section portfolio template grid to output
            values to production.
          </p>
          <Button
            onClick={handleOpenForm}
            className="mt-6 bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-6 py-2.5 rounded-xl border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer"
          >
            Create About Card
          </Button>
        </div>
      )}

      {/* Controlled Functional Form Overlay Window */}
      {isOpen && (
        <AboutFormModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isEdit={hasExistingData}
          selectedAbout={activeAbout}
          isPending={isPending}
          imageFields={IMAGE_FIELDS}
          previews={previews}
          onFileChange={handleFileChange}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
