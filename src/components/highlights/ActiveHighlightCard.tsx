/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Edit2,
  Play,
  Film,
  Award,
  Trash2,
  Eye,
  X,
  Settings2,
  Sliders,
  PlusCircle,
  Layers,
} from "lucide-react";
import { Button } from "../ui/button";

interface ActiveHighlightCardProps {
  highlight: any;
  onEditMainVideoClick?: (highlight: any) => void;
  onEditVideoClick: (video: any) => void;
  onDeleteVideoClick: (videoId: string) => void;
  onEditFeedVideoClick: (feedVideo: any) => void;
  onDeleteFeedVideoClick: (feedVideoId: string) => void;
  isSubmittingItem?: boolean;
}

type ActiveMediaFocus = {
  type: "MIXED_STEP" | "CLIP" | "FEED";
  id: string;
  title: string;
  url: string;
  subTag?: string;
  rawNodeRef: any;
};

export function ActiveHighlightCard({
  highlight,
  onEditMainVideoClick,
  onEditVideoClick,
  onDeleteVideoClick,
  onEditFeedVideoClick,
  onDeleteFeedVideoClick,
}: ActiveHighlightCardProps) {
  const videosList = highlight.videos || [];
  const feedVideosList = highlight.feedVideos || [];

  const [activeTab, setActiveTab] = useState<"CLIPS" | "FEEDS">("CLIPS");

  const [activeFocus, setActiveFocus] = useState<
    Omit<ActiveMediaFocus, "url"> & { url?: string }
  >({
    type: "MIXED_STEP",
    id: "mixed-step-track",
    title: "MIXED STEP 2026 MASTER",
    subTag: "SYSTEM CORE INDEX",
    rawNodeRef: highlight,
  });

  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeVideoUrl =
    activeFocus.type === "MIXED_STEP"
      ? highlight.MainVideo_url || ""
      : (activeFocus as any).url;

  return (
    <div className="w-full bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between bg-black/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <Eye size={13} /> STAGE MONITOR FEED
              </span>
              <span>{activeFocus.subTag}</span>
            </div>

            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black relative shadow-inner group">
              {activeVideoUrl ? (
                <>
                  {/* Render inline video view on Desktop layout */}
                  {isDesktop ? (
                    <video
                      key={`studio-playback-desktop-${activeVideoUrl}`}
                      src={activeVideoUrl}
                      controls
                      autoPlay={activeFocus.type !== "MIXED_STEP"}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    /* On Mobile, show a clean, interactive play button banner to prompt the overlay sheet */
                    <div
                      onClick={() => setIsMobilePlayerOpen(true)}
                      className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/40 text-zinc-400 gap-2 p-4 text-center cursor-pointer hover:bg-zinc-900 transition-colors"
                    >
                      <div className="p-4 rounded-full bg-kh-pink/10 text-kh-pink border border-kh-pink/20 mb-1">
                        <Play
                          size={28}
                          fill="currentColor"
                          className="ml-0.5"
                        />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                        Tap Monitor to Play Video
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 truncate max-w-[80%]">
                        {activeFocus.title}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2 p-4 text-center">
                  <Sliders
                    size={24}
                    className="opacity-40 animate-pulse text-zinc-500"
                  />
                  <span className="font-mono text-xs uppercase tracking-widest">
                    No Active Video Input Signal
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 bg-zinc-900/40 rounded-lg border border-white/5">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                Active Composition Node Title
              </span>
              <h2 className="font-display text-base font-bold text-white uppercase mt-0.5 tracking-wide truncate">
                {activeFocus.title}
              </h2>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between font-mono text-[10px] text-zinc-600 uppercase tracking-widest pt-6 border-t border-white/5 mt-6">
            <span>PIPELINE: LIVE BROADCAST LAYERS</span>
            <span>FRAME_BUFFER: OK</span>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-TAB INDEX MANAGER (5 COLUMNS) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col bg-zinc-950 gap-4">
          {/* ========================================================= */}
          {/* OUTSIDE STANDALONE ITEM: MIXED STEP 2026 MASTER          */}
          {/* ========================================================= */}
          <div
            onClick={() => {
              setActiveFocus({
                type: "MIXED_STEP",
                id: "mixed-step-track",
                title: "MIXED STEP 2026 MASTER",
                subTag: "SYSTEM CORE INDEX",
                rawNodeRef: highlight,
              });
              if (!isDesktop) setIsMobilePlayerOpen(true);
            }}
            className={`group/item p-4 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-all ${
              activeFocus.type === "MIXED_STEP"
                ? "bg-linear-to-r from-kh-pink/15 to-zinc-900/40 border-kh-pink/50 shadow-lg shadow-kh-pink/5"
                : "bg-zinc-900/40 border-white/5 hover:bg-zinc-900/80 hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={`p-2 rounded-lg transition-colors ${activeFocus.type === "MIXED_STEP" ? "bg-kh-pink/20 text-kh-pink" : "bg-black/40 text-zinc-400"}`}
              >
                <Layers size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[9px] text-kh-pink uppercase tracking-widest block font-bold">
                  MAIN MIX COMPOSITION
                </span>
                <p className="font-mono text-sm font-black uppercase tracking-wide truncate text-white">
                  ★ MIXED STEP 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditMainVideoClick?.(highlight);
                }}
                className="p-2 rounded-lg bg-black/40 border border-white/5 text-zinc-400 hover:text-kh-pink hover:border-kh-pink/30 transition-all"
                title="Update Configuration"
              >
                <Settings2 size={14} />
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setActiveTab("CLIPS")}
                className={`px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider font-bold transition-all ${activeTab === "CLIPS" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-zinc-500 hover:text-zinc-300 border border-transparent"}`}
              >
                Clips ({videosList.length})
              </button>
              <button
                onClick={() => setActiveTab("FEEDS")}
                className={`px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider font-bold transition-all ${activeTab === "FEEDS" ? "bg-kh-pink/10 text-kh-pink border border-kh-pink/20" : "text-zinc-500 hover:text-zinc-300 border border-transparent"}`}
              >
                Feeds ({feedVideosList.length})
              </button>
            </div>

            <Button
              size="sm"
              className="font-mono text-[11px] uppercase tracking-wider h-8"
            >
              <PlusCircle size={13} className="mr-1" /> Add{" "}
              {activeTab === "CLIPS" ? "Clip" : "Feed"}
            </Button>
          </div>

          {/* Interactive Dynamic Lists Frame Context */}
          <div className="flex-1 max-h-[300px] lg:max-h-[340px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {/* CLIPS TAB ACTIVE NODE ITERATOR */}
            {activeTab === "CLIPS" ? (
              videosList.length === 0 ? (
                <div className="py-12 text-center text-zinc-600 font-mono text-xs uppercase tracking-wider border border-dashed border-white/5 rounded-xl">
                  No Video Clip Nodes Found
                </div>
              ) : (
                videosList.map((video: any, idx: number) => {
                  const isFocused =
                    activeFocus.id === (video._id || `clip-${idx}`);
                  return (
                    <div
                      key={video._id || idx}
                      onClick={() => {
                        setActiveFocus({
                          type: "CLIP",
                          id: video._id || `clip-${idx}`,
                          title: video.video_name || "Unnamed Video Clip",
                          url: video.video_url || "",
                          subTag: video.video_type || "RAW_CLIP",
                          rawNodeRef: video,
                        } as any);
                        if (!isDesktop) setIsMobilePlayerOpen(true);
                      }}
                      className={`group/item p-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-all ${isFocused ? "bg-cyan-500/10 border-cyan-500/30" : "bg-black/30 border-white/5 hover:bg-zinc-900/40"}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <Film
                          size={14}
                          className={
                            isFocused ? "text-cyan-400" : "text-zinc-600"
                          }
                        />
                        <p
                          className={`font-mono text-xs font-bold uppercase tracking-wide truncate flex-1 ${isFocused ? "text-white" : "text-zinc-400 group-hover/item:text-zinc-300"}`}
                        >
                          {video.video_name || "Unnamed Video"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditVideoClick(video);
                          }}
                          className="p-1.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 hover:text-cyan-400"
                        >
                          <Edit2 size={11} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteVideoClick(video._id);
                          }}
                          className="p-1.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )
            ) : /* FEEDS TAB ACTIVE NODE ITERATOR */
            feedVideosList.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 font-mono text-xs uppercase tracking-wider border border-dashed border-white/5 rounded-xl">
                No Feed Snippet Nodes Found
              </div>
            ) : (
              feedVideosList.map((feed: any, idx: number) => {
                const isFocused =
                  activeFocus.id === (feed._id || `feed-${idx}`);
                return (
                  <div
                    key={feed._id || idx}
                    onClick={() => {
                      setActiveFocus({
                        type: "FEED",
                        id: feed._id || `feed-${idx}`,
                        title: feed.title || "Untitled Feed Track",
                        url: feed.video_url || "",
                        subTag: "FEED_SNIPPET",
                        rawNodeRef: feed,
                      } as any);
                      if (!isDesktop) setIsMobilePlayerOpen(true);
                    }}
                    className={`group/item p-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-all ${isFocused ? "bg-kh-pink/10 border-kh-pink/30" : "bg-black/30 border-white/5 hover:bg-zinc-900/40"}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <Award
                        size={14}
                        className={isFocused ? "text-kh-pink" : "text-zinc-600"}
                      />
                      <p
                        className={`font-mono text-xs font-bold uppercase tracking-wide truncate flex-1 ${isFocused ? "text-white" : "text-zinc-400 group-hover/item:text-zinc-300"}`}
                      >
                        {feed.title || "Untitled Feed"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditFeedVideoClick(feed);
                        }}
                        className="p-1.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 hover:text-kh-pink"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFeedVideoClick(feed._id);
                        }}
                        className="p-1.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE IMMERSIVE BOTTOM SHEET OVERLAY TRIGGER                     */}
      {/* ================================================================= */}
      {isMobilePlayerOpen && !isDesktop && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-end transition-all">
          <div
            className="flex-1 w-full"
            onClick={() => setIsMobilePlayerOpen(false)}
          />
          <div className="bg-zinc-950 border-t border-white/10 rounded-t-2xl w-full max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/40">
              <div className="min-w-0 flex-1 pr-4">
                <span className="font-mono text-[9px] font-bold text-kh-pink uppercase tracking-widest block">
                  {activeFocus.subTag}
                </span>
                <h3 className="font-display text-sm font-bold text-white uppercase truncate tracking-wide mt-0.5">
                  {activeFocus.title}
                </h3>
              </div>
              <button
                onClick={() => setIsMobilePlayerOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <div className="w-full aspect-video bg-black flex items-center justify-center relative">
              <video
                key={`mobile-theater-${activeVideoUrl}`}
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-zinc-900/20 font-mono text-[9px] text-zinc-500 uppercase tracking-widest text-center border-t border-white/5">
              WORKSPACE MONITOR PORT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
