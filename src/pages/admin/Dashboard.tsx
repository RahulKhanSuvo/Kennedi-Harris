import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Toast } from "../Dashboard/Toast";
import type { HomeData } from "@/api/types";
import { homeService } from "@/api/services";

// Modular Components
import { DashboardHeader } from "./components/DashboardHeader";
import { LiveShowcase } from "./components/LiveShowcase";
import { EditProfileForm } from "./components/EditProfileForm";

export default function Dashboard() {
  const queryClient = useQueryClient();

  // State to toggle between Dashboard Preview Mode and Form Edit Mode
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [stats, setStats] = useState<
    Pick<HomeData, "PPG" | "RPG" | "BPG" | "DOUBLE_DOUBLES" | "REBOUNDS">
  >({
    PPG: "",
    RPG: "",
    BPG: "",
    DOUBLE_DOUBLES: "",
    REBOUNDS: "",
  });

  const [firstImg, setFirstImg] = useState<File | null>(null);
  const [secondImg, setSecondImg] = useState<File | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Use TanStack Query's secondary features or initialization triggers
  const {
    data: homeData,
    isLoading,
    isError,
    refetch,
  } = useQuery<HomeData>({
    queryKey: ["home-active"],
    queryFn: async () => {
      const data = await homeService.getActiveHome();

      // Initialize states immediately when data arrives from the network,
      // safely bridging async actions with local interactive inputs.
      if (data) {
        setStats({
          PPG: data.PPG ?? "",
          RPG: data.RPG ?? "",
          BPG: data.BPG ?? "",
          DOUBLE_DOUBLES: data.DOUBLE_DOUBLES ?? "",
          REBOUNDS: data.REBOUNDS ?? "",
        });
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
      return data;
    },
    retry: 1,
  });

  const handleStatChange = (key: string, value: string) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries(stats).forEach(([k, v]) => fd.append(k, String(v)));
    if (firstImg) fd.append("frist_img", firstImg);
    if (secondImg) fd.append("second_img", secondImg);
    return fd;
  };

  const createMutation = useMutation({
    mutationFn: () => homeService.createHome(buildFormData()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-active"] });
      setFirstImg(null);
      setSecondImg(null);
      setIsEditing(false);
      setToast({
        type: "success",
        message: "Player Profile Successfully Generated",
      });
    },
    onError: () =>
      setToast({ type: "error", message: "Failed to create player entry." }),
  });

  const updateMutation = useMutation({
    mutationFn: (id: string) => homeService.updateHome(id, buildFormData()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-active"] });
      setFirstImg(null);
      setSecondImg(null);
      setIsEditing(false);
      setToast({
        type: "success",
        message: "Player Profile Changes Committed",
      });
    },
    onError: () =>
      setToast({
        type: "error",
        message: "Failed to update profile configurations.",
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => homeService.deleteHome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-active"] });
      setStats({ PPG: "", RPG: "", BPG: "", DOUBLE_DOUBLES: "", REBOUNDS: "" });
      setFirstImg(null);
      setSecondImg(null);
      setIsEditing(true);
      setToast({
        type: "success",
        message: "Database Record Successfully Cleared",
      });
    },
    onError: () =>
      setToast({
        type: "error",
        message: "System declined data erasure action.",
      }),
  });

  const isBusy =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
  const existingId = homeData?._id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingId) {
      updateMutation.mutate(existingId);
    } else {
      createMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (
      existingId &&
      window.confirm(
        "Are you absolutely sure you want to permanently erase this record entry node from the application pipeline?",
      )
    ) {
      deleteMutation.mutate(existingId);
    }
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white">
      <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 selection:bg-kh-pink/30 max-w-[1400px] mx-auto">
        <DashboardHeader
          refetch={refetch}
          isLoading={isLoading}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          existingId={existingId}
        />

        {/* Network Response Banners */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/40 border border-white/5 text-zinc-400 text-[10px] font-condensed font-bold tracking-widest uppercase shadow-inner backdrop-blur-sm"
            >
              <Loader2 size={16} className="animate-spin text-kh-pink" />
              Querying remote database structures...
            </motion.div>
          )}

          {isError && !isLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-kh-pink/10 border border-kh-pink/20 text-kh-pink text-[10px] font-condensed font-bold tracking-widest uppercase shadow-inner backdrop-blur-sm"
            >
              <AlertCircle size={16} className="shrink-0" />
              No existing record found. Populating metrics below will initialize
              the display pipeline.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <AnimatePresence mode="wait">
            {!isEditing && homeData ? (
              <motion.div
                key="live-showcase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <LiveShowcase
                  homeData={homeData}
                  existingId={existingId as string}
                  stats={stats}
                  setIsEditing={setIsEditing}
                />
              </motion.div>
            ) : (
              <motion.div
                key="edit-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <EditProfileForm
                  stats={stats}
                  handleStatChange={handleStatChange}
                  homeData={homeData}
                  firstImg={firstImg}
                  setFirstImg={setFirstImg}
                  secondImg={secondImg}
                  setSecondImg={setSecondImg}
                  handleSubmit={handleSubmit}
                  isBusy={isBusy}
                  existingId={existingId}
                  setIsEditing={setIsEditing}
                  handleDelete={handleDelete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shared Global Notification Messaging Viewports */}
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onDismiss={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
