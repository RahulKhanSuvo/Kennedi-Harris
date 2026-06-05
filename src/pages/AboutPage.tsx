/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, PlusCircle, ArrowLeft, Image as ImageIcon } from "lucide-react";
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
          <div className="flex items-center gap-3 w-full sm:w-auto font-mono">
            {isEditing && hasExistingData && (
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="rounded-xl border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer font-condensed uppercase text-xs tracking-wider px-4 py-2 flex items-center gap-2 w-full sm:w-auto justify-center"
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
        /* Immersive High-Density Biome Layout Skeleton (Full Height Protection) */
        <div className="w-full bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden animate-pulse min-h-[600px] flex flex-col justify-between split-y divide-y divide-white/5">
          {/* Header Track Placeholder */}
          <div className="p-6 bg-neutral-950/40 flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-zinc-900 rounded w-1/4" />
              <div className="h-2.5 bg-zinc-900 rounded w-1/2" />
            </div>
          </div>

          {/* Section 1 skeleton: Metrics & Parameters */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4 space-y-2">
              <div className="h-3 bg-zinc-900 rounded w-1/3" />
              <div className="h-2.5 bg-zinc-900/60 rounded w-3/4" />
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900/30 rounded-xl border border-white/5 space-y-2">
                <div className="h-2 bg-zinc-900 rounded w-1/3" />
                <div className="h-4 bg-zinc-900 rounded w-1/4" />
              </div>
              <div className="p-4 bg-zinc-900/30 rounded-xl border border-white/5 space-y-2">
                <div className="h-2 bg-zinc-900 rounded w-1/3" />
                <div className="h-4 bg-zinc-900 rounded w-1/4" />
              </div>
            </div>
          </div>

          {/* Section 2 skeleton: Multi-Grid Media Track */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start flex-1">
            <div className="md:col-span-4 space-y-2">
              <div className="h-3 bg-zinc-900 rounded w-2/5" />
              <div className="h-2.5 bg-zinc-900/60 rounded w-5/6" />
            </div>

            {/* Biography Visual Assets Grid Mock (Matches 6 fields array display) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((cell) => (
                <div key={cell} className="space-y-1.5">
                  <div className="h-2 bg-zinc-900 rounded w-1/2" />
                  <div className="border border-dashed border-white/5 rounded-xl bg-zinc-900/20 min-h-[140px] flex items-center justify-center">
                    <ImageIcon
                      size={20}
                      className="text-zinc-900 animate-pulse"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer Bar Placeholder */}
          <div className="p-6 bg-neutral-950/20 flex justify-end gap-3">
            <div className="h-9 bg-zinc-900 rounded-xl w-24" />
            <div className="h-9 bg-zinc-900 rounded-xl w-32" />
          </div>
        </div>
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
