import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Upload,
  Trash2,
  Film,
  Plus,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Play,
} from "lucide-react";
import { apiService, type HighlightData } from "@/lib/api";

export default function HighlightsPanel() {
  const queryClient = useQueryClient();

  // Form Fields State
  const [videoName, setVideoName] = useState("");
  const [videoType, setVideoType] = useState("");
  const [title, setTitle] = useState("");

  const [mainVideoFile, setMainVideoFile] = useState<File | null>(null);
  const [videosFiles, setVideosFiles] = useState<FileList | null>(null);
  const [feedVideosFiles, setFeedVideosFiles] = useState<FileList | null>(null);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Query: Get All Highlights
  const { data: highlights, isLoading } = useQuery<HighlightData[]>({
    queryKey: ["allHighlights"],
    queryFn: apiService.getAllHighlights,
  });

  // Mutation: Create Highlight
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => apiService.createHighlight(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHighlights"] });
      setFeedback({
        type: "success",
        text: "Highlight uploaded successfully!",
      });
      resetForm();
      setShowUploadForm(false);
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
          "Failed to upload highlight.",
      });
    },
  });

  // Mutation: Delete Highlight
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteHighlight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allHighlights"] });
      setFeedback({ type: "success", text: "Highlight deleted successfully." });
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
          "Failed to delete highlight.",
      });
    },
  });

  const resetForm = () => {
    setVideoName("");
    setVideoType("");
    setTitle("");
    setMainVideoFile(null);
    setVideosFiles(null);
    setFeedVideosFiles(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!mainVideoFile) {
      setFeedback({
        type: "error",
        text: "Primary highlight video file is required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("video_name", videoName);
    formData.append("video_type", videoType);
    formData.append("title", title);
    formData.append("MainVideo_url", mainVideoFile);

    // Supporting videos (can append multiple files under "videos")
    if (videosFiles) {
      for (let i = 0; i < videosFiles.length; i++) {
        formData.append("videos", videosFiles[i]);
      }
    }

    // Social/Feed videos
    if (feedVideosFiles) {
      for (let i = 0; i < feedVideosFiles.length; i++) {
        formData.append("feedVideos", feedVideosFiles[i]);
      }
    }

    createMutation.mutate(formData);
  };

  const isPending = createMutation.isPending || deleteMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader2 className="animate-spin text-kh-pink mb-4" size={40} />
        <span className="font-condensed text-zinc-400 tracking-widest uppercase">
          LOADING HIGHLIGHTS ARCHIVE...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in-up font-sans">
      {/* Header and Toggle Controls */}
      <div className="bg-white/[0.02] border border-white/5 p-6 lg:p-8 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 tracking-wider">
              HIGHLIGHT FEED CONTROLLER // SCROLL SYNC
            </span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-black text-white tracking-widest uppercase mt-2">
            HIGHLIGHT VIDEOS & METADATA
          </h2>
          <p className="text-zinc-500 font-condensed text-xs uppercase tracking-widest mt-1">
            Manage primary broadcast clips, categories, supporting gameplay
            tapes, and social feeds
          </p>
        </div>

        <button
          onClick={() => {
            setShowUploadForm(!showUploadForm);
            setFeedback(null);
          }}
          className="flex items-center gap-2 px-6 py-3 border border-kh-pink bg-kh-pink hover:bg-kh-pink-bright text-white rounded font-condensed font-bold tracking-wider text-xs uppercase cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(232,23,106,0.3)]"
        >
          {showUploadForm ? "CLOSE UPLOADER" : "UPLOAD NEW FILM"}
        </button>
      </div>

      {/* Alert Banner */}
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

      {/* upload form toggled */}
      {showUploadForm && (
        <div className="bg-white/[0.02] border border-white/10 p-6 lg:p-10 rounded-xl animate-fade-in-up">
          <h3 className="font-display text-xl text-white font-bold tracking-wider uppercase border-b border-white/5 pb-4 mb-6">
            NEW BROADCAST CLIP UPLOADER
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Metadatas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Video Display Name
                </label>
                <input
                  type="text"
                  placeholder="vs. Team Elite"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Category / Video Type (Tag)
                </label>
                <input
                  type="text"
                  placeholder="SCORING TAPE"
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Feed Video Title
                </label>
                <input
                  type="text"
                  placeholder="Highlights Reel // Atlanta GA"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-kh-pink focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            {/* File Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Highlight Video */}
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Primary Video (MainVideo_url)
                </label>
                <div className="relative border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] rounded-lg py-6 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
                  <Upload className="text-kh-pink" size={20} />
                  <span className="block text-zinc-400 text-xs font-condensed font-bold uppercase tracking-wider">
                    {mainVideoFile ? mainVideoFile.name : "SELECT PRIMARY MP4"}
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase font-sans">
                    Required file
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMainVideoFile(e.target.files[0]);
                      }
                    }}
                    disabled={isPending}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Supporting Videos */}
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Supporting Gameplay Videos
                </label>
                <div className="relative border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] rounded-lg py-6 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
                  <Film className="text-cyan-400" size={20} />
                  <span className="block text-zinc-400 text-xs font-condensed font-bold uppercase tracking-wider">
                    {videosFiles
                      ? `${videosFiles.length} files selected`
                      : "SELECT TAPES (OPTIONAL)"}
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase font-sans">
                    Supports multiple files
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => setVideosFiles(e.target.files)}
                    disabled={isPending}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Feed Videos */}
              <div className="space-y-2">
                <label className="block text-[11px] font-condensed font-bold tracking-widest text-zinc-400 uppercase">
                  Social/Feed Clips
                </label>
                <div className="relative border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] rounded-lg py-6 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
                  <Upload className="text-white/60" size={20} />
                  <span className="block text-zinc-400 text-xs font-condensed font-bold uppercase tracking-wider">
                    {feedVideosFiles
                      ? `${feedVideosFiles.length} files selected`
                      : "SELECT FEED CLIPS (OPTIONAL)"}
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase font-sans">
                    Supports multiple files
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => setFeedVideosFiles(e.target.files)}
                    disabled={isPending}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Action Submit */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3.5 bg-gradient-to-r from-kh-pink to-kh-pink-bright text-white font-condensed font-bold tracking-widest uppercase rounded hover:shadow-[0_0_30px_rgba(232,23,106,0.3)] disabled:opacity-75 disabled:cursor-not-allowed transition-all text-xs cursor-pointer flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    <span>UPLOADING FILM TO SERVER...</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>START UPLOAD</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUploadForm(false);
                  resetForm();
                }}
                disabled={isPending}
                className="px-6 py-3.5 border border-white/10 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-condensed font-bold tracking-wider text-xs uppercase rounded cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid: Existing Highlights List */}
      <div className="space-y-6">
        <h3 className="font-display text-lg text-white font-bold tracking-wider uppercase border-b border-white/5 pb-3">
          EXISTING HIGHLIGHTS ARCHIVE ({highlights?.length || 0})
        </h3>

        {highlights && highlights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={item._id || item.id || idx}
                className="group bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden hover:border-kh-pink/20 transition-all flex flex-col justify-between"
              >
                {/* Cinema Thumbnail Placeholder */}
                <div className="relative aspect-video w-full bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-white/5">
                  {item.MainVideo_url ? (
                    <video
                      src={`http://localhost:5001${item.MainVideo_url}`}
                      preload="metadata"
                      className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.8] transition-all"
                    />
                  ) : (
                    <Film className="text-zinc-800" size={32} />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-kh-pink flex items-center justify-center shadow-lg">
                      <Play
                        fill="white"
                        className="w-5 h-5 ml-0.5 text-white"
                      />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-sm uppercase">
                    {item.video_type}
                  </span>
                </div>

                {/* Details and Delete Section */}
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-display text-lg text-white font-bold tracking-tight uppercase truncate">
                      {item.video_name || "Untitled Highlight"}
                    </h4>
                    <p className="text-zinc-500 font-condensed text-[10px] tracking-wider uppercase mt-1 truncate">
                      {item.title || "No feed title defined"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[8px] font-mono text-zinc-400 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-sm">
                        SUPPORT: {item.videos?.length || 0}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-400 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-sm">
                        SOCIALS: {item.feedVideos?.length || 0}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${item.video_name}"?`,
                        )
                      ) {
                        if (item._id) deleteMutation.mutate(item._id);
                      }
                    }}
                    disabled={isPending}
                    className="p-3 border border-kh-red/10 bg-kh-red/5 hover:bg-kh-red hover:border-kh-red text-red-400 hover:text-white rounded transition-colors disabled:opacity-50 cursor-pointer"
                    title="Delete highlight"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-950 border border-white/5 rounded-lg">
            <Film className="text-zinc-700 mb-3" size={36} />
            <p className="font-condensed text-zinc-500 tracking-wider text-xs uppercase">
              No highlight videos in database
            </p>
            <p className="text-[10px] text-zinc-600 font-sans mt-1">
              Use the upload panel to insert gameplay reels
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
