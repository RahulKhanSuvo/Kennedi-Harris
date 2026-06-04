/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, PlusCircle, ArrowLeft } from "lucide-react";
import { useAllAbouts, useCreateAbout, useUpdateAbout } from "@/hooks/useAbout";
import { Button } from "@/components/ui/button";

// Modular UI Subcomponents
import { ActiveShowcaseCard } from "@/components/about/ActiveShowcaseCard";
import AboutForm from "@/components/about/AboutForm";
import { IMAGE_FIELDS } from "@/components/about/constants";

export default function AboutPage() {
  const { data: abouts = [], isLoading, isError } = useAllAbouts();
  const createMutation = useCreateAbout();
  const updateMutation = useUpdateAbout();

  const [isEditing, setIsEditing] = useState(false);

  const activeAbout = abouts.find((a: any) => a.isActive) || abouts[0];
  const hasExistingData = !!activeAbout;

  const onSubmit = async (formData: FormData) => {
    if (hasExistingData) {
      updateMutation.mutate(
        { id: activeAbout._id, formData },
        {
          onSuccess: () => {
            toast.success("Biography updated successfully!");
            setIsEditing(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.message || "Failed to update record",
            );
          },
        },
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Biography created successfully!");
          setIsEditing(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to create record");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-8 p-1 sm:p-0">
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

        {/* Action Controls */}
        {!isLoading && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEditing && hasExistingData && (
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-4 py-2 flex items-center gap-2 w-full sm:w-auto"
              >
                <ArrowLeft size={12} />
                Back to View
              </Button>
            )}
            {!hasExistingData && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer w-full sm:w-auto"
              >
                <PlusCircle size={15} />
                Initialize About Node
              </Button>
            )}
          </div>
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
      ) : isEditing ? (
        <AboutForm
          key={activeAbout?._id || "new"}
          activeAbout={activeAbout || null}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
          isPending={isPending}
        />
      ) : hasExistingData ? (
        <div className="w-full">
          <ActiveShowcaseCard
            activeAbout={activeAbout}
            imageFields={IMAGE_FIELDS}
            onEditClick={() => setIsEditing(true)}
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
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-kh-pink hover:bg-pink-600 text-white font-condensed font-bold uppercase tracking-widest text-xs px-6 py-2.5 rounded-xl border-none shadow-[0_4px_20px_rgba(236,72,153,0.2)] cursor-pointer"
          >
            Create About Card
          </Button>
        </div>
      )}
    </div>
  );
}
