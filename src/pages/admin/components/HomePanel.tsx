/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Upload,
  Trash2,
  Edit2,
  Plus,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { apiService, type HomeData } from "@/lib/api";

export default function HomePanel() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Form Fields State
  const [ppg, setPpg] = useState("");
  const [rpg, setRpg] = useState("");
  const [bpg, setBpg] = useState("");
  const [doubleDoubles, setDoubleDoubles] = useState("");
  const [rebounds, setRebounds] = useState("");
  const [firstImg, setFirstImg] = useState<File | null>(null);
  const [secondImg, setSecondImg] = useState<File | null>(null);

  // Image Preview URLs State
  const [firstPreview, setFirstPreview] = useState("");
  const [secondPreview, setSecondPreview] = useState("");

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Query: Get Active Home Config
  const { data: activeHome, isLoading } = useQuery<HomeData>({
    queryKey: ["activeHome"],
    queryFn: apiService.getActiveHome,
    retry: false,
  });

  const resetForm = () => {
    setPpg("");
    setRpg("");
    setBpg("");
    setDoubleDoubles("");
    setRebounds("");
    setFirstImg(null);
    setSecondImg(null);
    setFirstPreview("");
    setSecondPreview("");
  };

  // Pre-fill form when activeHome is loaded or edited
  useEffect(() => {
    if (activeHome) {
      setPpg(activeHome.PPG || "");
      setRpg(activeHome.RPG || "");
      setBpg(activeHome.BPG || "");
      setDoubleDoubles(activeHome.DOUBLE_DOUBLES || "");
      setRebounds(activeHome.REBOUNDS || "");
      setFirstPreview(
        activeHome.frist_img
          ? `http://localhost:5001${activeHome.frist_img}`
          : "",
      );
      setSecondPreview(
        activeHome.second_img
          ? `http://localhost:5001${activeHome.second_img}`
          : "",
      );
    } else {
      resetForm();
    }
  }, [activeHome, isEditing]);

  // Image Handlers
  const handleFirstImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFirstImg(file);
      setFirstPreview(URL.createObjectURL(file));
    }
  };

  const handleSecondImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSecondImg(file);
      setSecondPreview(URL.createObjectURL(file));
    }
  };

  // Mutation: Create Home Page Stats/Images
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => apiService.createHome(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeHome"] });
      setFeedback({
        type: "success",
        text: "Home configuration created successfully!",
      });
      setIsEditing(false);
      resetForm();
    },
    onError: (err: unknown) => {
      const apiError = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      setFeedback({
        type: "error",
        text:
          apiError.response?.data?.message ||
          apiError.message ||
          "Failed to create home config.",
      });
    },
  });

  // Mutation: Update Home Page Stats/Images
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      apiService.updateHome(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeHome"] });
      setFeedback({
        type: "success",
        text: "Home configuration updated successfully!",
      });
      setIsEditing(false);
    },
    onError: (err: unknown) => {
      const apiError = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      setFeedback({
        type: "error",
        text:
          apiError.response?.data?.message ||
          apiError.message ||
          "Failed to update home config.",
      });
    },
  });

  // Mutation: Delete Home Page Record
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteHome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeHome"] });
      setFeedback({ type: "success", text: "Home configuration deleted." });
      setIsEditing(false);
      resetForm();
    },
    onError: (err: unknown) => {
      const apiError = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      setFeedback({
        type: "error",
        text:
          apiError.response?.data?.message ||
          apiError.message ||
          "Failed to delete home config.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const formData = new FormData();
    formData.append("PPG", ppg);
    formData.append("RPG", rpg);
    formData.append("BPG", bpg);
    formData.append("DOUBLE_DOUBLES", doubleDoubles);
    formData.append("REBOUNDS", rebounds);

    if (firstImg) {
      formData.append("frist_img", firstImg);
    }
    if (secondImg) {
      formData.append("second_img", secondImg);
    }

    if (activeHome?._id && !isEditing) {
      // If activeHome exists and we aren't in explicit create mode, we edit
      updateMutation.mutate({ id: activeHome._id, formData });
    } else if (activeHome?._id && isEditing) {
      // editing an existing
      updateMutation.mutate({ id: activeHome._id, formData });
    } else {
      // creating fresh
      createMutation.mutate(formData);
    }
  };

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader2 className="animate-spin text-kh-pink mb-4" size={40} />
        <span className="font-condensed text-zinc-400 tracking-widest uppercase">
          LOADING HERO STATS...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up font-sans">
      {/* Active Config Status Section */}
      <div className="bg-white/[0.02] border border-white/5 p-6 lg:p-8 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${activeHome ? "bg-green-500 animate-pulse" : "bg-zinc-600"}`}
            />
            <span className="font-mono text-xs text-zinc-400 tracking-wider">
              {activeHome ? "DATABASE CONFIG: LIVE" : "DATABASE CONFIG: EMPTY"}
            </span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-black text-white tracking-widest uppercase mt-2">
            HOME HERO PAGE DATA
          </h2>
          <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest mt-1">
            {activeHome
              ? "Active stats & images currently displayed on main landing section"
              : "Provide hero images and key performance indicators (PPG, BPG etc)"}
          </p>
        </div>

        {activeHome && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded bg-white/5 hover:bg-kh-pink hover:border-kh-pink text-white transition-all text-xs font-condensed font-bold tracking-wider uppercase cursor-pointer"
            >
              <Edit2 size={14} />
              <span>{isEditing ? "CANCEL EDIT" : "EDIT CONFIG"}</span>
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete the active Home layout configuration? This will clear active stats.",
                  )
                ) {
                  if (activeHome._id) deleteMutation.mutate(activeHome._id);
                }
              }}
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 border border-kh-red/20 rounded bg-kh-red/5 hover:bg-kh-red hover:border-kh-red text-red-400 hover:text-white transition-all text-xs font-condensed font-bold tracking-wider uppercase cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={14} />
              <span>DELETE LIVE</span>
            </button>
          </div>
        )}
      </div>

      {/* Alert Notifications */}
      {feedback && (
        <div
          className={`flex items-start gap-3 p-4 border rounded-lg text-xs animate-fade-in-up ${
            feedback.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-kh-red/10 border-kh-red/20 text-red-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Grid: Info Preview (Left) & Form Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIVE DATA PREVIEW */}
        <div className="lg:col-span-5 bg-white/[0.01] border border-white/5 p-6 rounded-xl space-y-8">
          <h3 className="font-display text-lg text-white font-bold tracking-wider uppercase border-b border-white/5 pb-3">
            LIVE DISPLAY PREVIEW
          </h3>

          {activeHome ? (
            <div className="space-y-6">
              {/* Stats Preview Card */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-950 p-4 border border-white/5 rounded text-center">
                  <span className="block font-display text-2xl lg:text-3xl text-kh-pink font-bold">
                    {activeHome.PPG}
                  </span>
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                    PPG
                  </span>
                </div>
                <div className="bg-zinc-950 p-4 border border-white/5 rounded text-center">
                  <span className="block font-display text-2xl lg:text-3xl text-cyan-400 font-bold">
                    {activeHome.RPG}
                  </span>
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                    RPG
                  </span>
                </div>
                <div className="bg-zinc-950 p-4 border border-white/5 rounded text-center">
                  <span className="block font-display text-2xl lg:text-3xl text-white font-bold">
                    {activeHome.BPG}
                  </span>
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                    BPG
                  </span>
                </div>
                <div className="bg-zinc-950 p-4 border border-white/5 rounded text-center col-span-1.5">
                  <span className="block font-display text-2xl text-white font-bold">
                    {activeHome.DOUBLE_DOUBLES}
                  </span>
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                    DOUBLE DOUBLE
                  </span>
                </div>
                <div className="bg-zinc-950 p-4 border border-white/5 rounded text-center col-span-1.5">
                  <span className="block font-display text-2xl text-white font-bold">
                    {activeHome.REBOUNDS}
                  </span>
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                    REBOUNDS
                  </span>
                </div>
              </div>

              {/* Images Preview Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase">
                    First Hero Image
                  </span>
                  <div className="aspect-[4/5] bg-zinc-950 rounded overflow-hidden border border-white/5 relative group">
                    {activeHome.frist_img ? (
                      <img
                        src={`http://localhost:5001${activeHome.frist_img}`}
                        alt="Hero 1"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="block font-condensed text-[10px] tracking-widest text-zinc-500 uppercase">
                    Second Hero Image
                  </span>
                  <div className="aspect-[4/5] bg-zinc-950 rounded overflow-hidden border border-white/5 relative group">
                    {activeHome.second_img ? (
                      <img
                        src={`http://localhost:5001${activeHome.second_img}`}
                        alt="Hero 2"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-950 border border-white/5 rounded-lg">
              <Sparkles className="text-zinc-600 mb-3" size={32} />
              <p className="font-condensed text-zinc-500 tracking-wider text-xs uppercase">
                No active layout found in DB
              </p>
              <p className="text-[10px] text-zinc-600 font-sans mt-1">
                Use the panel on the right to upload values
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: DATA FORM EDITOR */}
        <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-6 lg:p-8 rounded-xl">
          <h3 className="font-display text-lg text-white font-bold tracking-wider uppercase border-b border-white/5 pb-3 mb-6">
            {!activeHome
              ? "INITIALIZE STATS & HERO MEDIA"
              : isEditing
                ? "EDIT LIVE SETTINGS"
                : "LIVE DISPLAY CONTROLS"}
          </h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stats Field Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Points Per Game (PPG)
                </label>
                <input
                  type="text"
                  placeholder="24.2"
                  value={ppg}
                  onChange={(e) => setPpg(e.target.value)}
                  disabled={isPending || (activeHome && !isEditing)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Rebounds Per Game (RPG)
                </label>
                <input
                  type="text"
                  placeholder="8.5"
                  value={rpg}
                  onChange={(e) => setRpg(e.target.value)}
                  disabled={isPending || (activeHome && !isEditing)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Blocks Per Game (BPG)
                </label>
                <input
                  type="text"
                  placeholder="3.1"
                  value={bpg}
                  onChange={(e) => setBpg(e.target.value)}
                  disabled={isPending || (activeHome && !isEditing)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Double-Doubles Stat
                </label>
                <input
                  type="text"
                  placeholder="14"
                  value={doubleDoubles}
                  onChange={(e) => setDoubleDoubles(e.target.value)}
                  disabled={isPending || (activeHome && !isEditing)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Total Rebounds Stat
                </label>
                <input
                  type="text"
                  placeholder="240"
                  value={rebounds}
                  onChange={(e) => setRebounds(e.target.value)}
                  disabled={isPending || (activeHome && !isEditing)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Image Upload Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Hero Image Uploader */}
              <div className="space-y-3">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  First Hero Image
                </label>
                <div className="relative aspect-[4/5] w-full rounded-lg border-2 border-dashed border-white/10 bg-white/[0.01] hover:border-kh-pink/30 hover:bg-white/[0.02] transition-all overflow-hidden flex flex-col items-center justify-center p-4">
                  {firstPreview ? (
                    <>
                      <img
                        src={firstPreview}
                        alt="First Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      {(!activeHome || isEditing) && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-condensed tracking-wider font-bold">
                            CHANGE IMAGE
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFirstImgChange}
                            disabled={isPending}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center space-y-2 flex flex-col items-center justify-center">
                      <Upload className="text-zinc-600 mb-1" size={24} />
                      <span className="block text-zinc-400 text-xs font-condensed font-bold uppercase tracking-wider">
                        SELECT IMAGE FILE
                      </span>
                      <span className="block text-[9px] text-zinc-600 uppercase tracking-widest">
                        PNG, JPG or WEBP format
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFirstImgChange}
                        disabled={isPending}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required={!activeHome}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Second Hero Image Uploader */}
              <div className="space-y-3">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Second Hero Image
                </label>
                <div className="relative aspect-[4/5] w-full rounded-lg border-2 border-dashed border-white/10 bg-white/[0.01] hover:border-kh-pink/30 hover:bg-white/[0.02] transition-all overflow-hidden flex flex-col items-center justify-center p-4">
                  {secondPreview ? (
                    <>
                      <img
                        src={secondPreview}
                        alt="Second Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      {(!activeHome || isEditing) && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-condensed tracking-wider font-bold">
                            CHANGE IMAGE
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSecondImgChange}
                            disabled={isPending}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center space-y-2 flex flex-col items-center justify-center">
                      <Upload className="text-zinc-600 mb-1" size={24} />
                      <span className="block text-zinc-400 text-xs font-condensed font-bold uppercase tracking-wider">
                        SELECT IMAGE FILE
                      </span>
                      <span className="block text-[9px] text-zinc-600 uppercase tracking-widest">
                        PNG, JPG or WEBP format
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSecondImgChange}
                        disabled={isPending}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required={!activeHome}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Submit Buttons */}
            {(!activeHome || isEditing) && (
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-gradient-to-r from-kh-pink to-kh-pink-bright text-white font-condensed font-bold tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(232,23,106,0.3)] disabled:opacity-75 disabled:cursor-not-allowed transition-all text-xs cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span>SAVING CONFIGURATION...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Plus size={16} />
                    <span>
                      {activeHome
                        ? "SAVE LIVE UPDATES"
                        : "INITIALIZE CONFIGURATION"}
                    </span>
                  </span>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
