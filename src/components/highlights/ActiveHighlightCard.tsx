/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Video,
  Edit2,
  Play,
  Film,
  Award,
  Trash2,
  MonitorPlay,
  Eye,
  X,
  Maximize2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActiveHighlightCardProps {
  highlight: any;
  onEditClick: () => void;
  onEditVideoClick: (video: any) => void;
  onDeleteVideoClick: (videoId: string) => void;
  onEditFeedVideoClick: (feedVideo: any) => void;
  onDeleteFeedVideoClick: (feedVideoId: string) => void;
  isSubmittingItem?: boolean;
}

type ActiveMediaFocus = {
  type: "MAIN" | "CLIP" | "FEED";
  id: string;
  title: string;
  url: string;
  subTag?: string;
  rawNodeRef: any;
};

export function ActiveHighlightCard({
  highlight,
  onEditClick,
  onEditVideoClick,
  onDeleteVideoClick,
  onEditFeedVideoClick,
  onDeleteFeedVideoClick,
  isSubmittingItem = false,
}: ActiveHighlightCardProps) {
  const videosList = highlight.videos || [];
  const feedVideosList = highlight.feedVideos || [];

  const [activeFocus, setActiveFocus] = useState<Omit<ActiveMediaFocus, "url">>(
    {
      type: "MAIN",
      id: "main-reel",
      title: "Primary Showreel Track",
      subTag: "MASTER CONFIG FILE",
      rawNodeRef: highlight,
    },
  );

  // Mobile player open/close toggle state
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);

  // Derive the active video URL directly during render
  const activeVideoUrl =
    activeFocus.type === "MAIN"
      ? highlight.MainVideo_url || ""
      : (activeFocus as any).url;

  return (
    <div className="w-full">
      {/* 🖥️ ========================================================= */}
      {/* ── CINEMATIC PC DESKTOP WORKSPACE                             ── */}
      {/* 🖥️ ========================================================= */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch min-h-[750px]">
        {/* LEFT COMPONENT COLUMN: COMPACT COMMAND HUB & TRACK CHANNELS (5 COLUMNS) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950/40 border border-white/5 rounded-2xl p-6 xl:p-8">
          <div className="space-y-8">
            {/* Structural Main Text Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-kh-pink/10 text-kh-pink shrink-0">
                  <Video size={24} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-2xl xl:text-3xl font-bold tracking-tight text-white uppercase leading-none">
                    Studio Index
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mt-2">
                    WORKSPACE // MATRIX_CTRL
                  </span>
                </div>
              </div>

              <Button
                onClick={onEditClick}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 h-10 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Edit2 size={13} className="text-kh-pink" />
                Config Deck
              </Button>
            </div>

            {/* Main Interactive Index Channel Block */}
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Showreel Button Row */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-zinc-500 tracking-wider block uppercase font-bold px-1">
                  Primary Stream Source
                </span>
                <button
                  onClick={() =>
                    setActiveFocus({
                      type: "MAIN",
                      id: "main-reel",
                      title: "Primary Showreel Track",
                      subTag: "MASTER CONFIG FILE",
                      rawNodeRef: highlight,
                    })
                  }
                  className={`w-full p-4.5 rounded-xl border text-left flex items-center gap-4 transition-all ${
                    activeFocus.type === "MAIN"
                      ? "bg-kh-pink/10 border-kh-pink/30 shadow-xl"
                      : "bg-black/30 border-white/5 hover:border-white/10"
                  }`}
                >
                  <MonitorPlay
                    size={18}
                    className={
                      activeFocus.type === "MAIN"
                        ? "text-kh-pink"
                        : "text-zinc-500"
                    }
                  />
                  <span className="font-bold text-sm xl:text-base text-white uppercase font-condensed tracking-wide">
                    Primary Showreel Master
                  </span>
                </button>
              </div>

              {/* Clip Node Channel Records */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest font-bold block">
                    Video Clips ({videosList.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {videosList.map((video: any, idx: number) => {
                    const isFocused =
                      activeFocus.id === (video._id || `clip-${idx}`);
                    return (
                      <div
                        key={video._id || idx}
                        onClick={() =>
                          setActiveFocus({
                            type: "CLIP",
                            id: video._id || `clip-${idx}`,
                            title: video.video_name || "Unnamed Video Clip",
                            url: video.video_url || "",
                            subTag: video.video_type || "RAW_CLIP",
                            rawNodeRef: video,
                          } as any)
                        }
                        className={`group/item p-3.5 rounded-xl border text-left flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          isFocused
                            ? "bg-cyan-500/10 border-cyan-500/30"
                            : "bg-black/20 border-white/5 hover:bg-neutral-900/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Film
                            size={15}
                            className={
                              isFocused ? "text-cyan-400" : "text-zinc-600"
                            }
                          />
                          <p
                            className={`font-condensed text-sm xl:text-base font-bold uppercase tracking-wide truncate ${isFocused ? "text-white" : "text-zinc-400"}`}
                          >
                            {video.video_name || "Unnamed Video"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditVideoClick(video);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-cyan-400"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteVideoClick(video._id);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-red-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feed Snippets Channel Records */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest font-bold block">
                    Feed Clips ({feedVideosList.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {feedVideosList.map((feed: any, idx: number) => {
                    const isFocused =
                      activeFocus.id === (feed._id || `feed-${idx}`);
                    return (
                      <div
                        key={feed._id || idx}
                        onClick={() =>
                          setActiveFocus({
                            type: "FEED",
                            id: feed._id || `feed-${idx}`,
                            title: feed.title || "Untitled Feed Track",
                            url: feed.video_url || "",
                            subTag: "FEED_SNIPPET",
                            rawNodeRef: feed,
                          } as any)
                        }
                        className={`group/item p-3.5 rounded-xl border text-left flex items-center justify-between gap-4 cursor-pointer transition-all ${
                          isFocused
                            ? "bg-kh-pink/10 border-kh-pink/30"
                            : "bg-black/20 border-white/5 hover:bg-neutral-900/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Award
                            size={15}
                            className={
                              isFocused ? "text-kh-pink" : "text-zinc-600"
                            }
                          />
                          <p
                            className={`font-condensed text-sm xl:text-base font-bold uppercase tracking-wide truncate ${isFocused ? "text-white" : "text-zinc-400"}`}
                          >
                            {feed.title || "Untitled Feed"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditFeedVideoClick(feed);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-kh-pink"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteFeedVideoClick(feed._id);
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-red-400"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            ACTIVE DECK NODE // {highlight._id || "UNASSIGNED"}
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: HERO BROADCAST MONUMENTS CINEMA PLAYER (7 COLUMNS) */}
        <div className="lg:col-span-7 bg-black p-6 xl:p-8 rounded-2xl border border-white/5 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 w-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Eye size={14} /> LIVE MONITOR STAGE
              </span>
              <span className="font-mono text-xs text-zinc-400 bg-zinc-900/60 border border-white/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {activeFocus.subTag}
              </span>
            </div>

            <h2 className="font-display text-2xl xl:text-3xl font-bold tracking-wide text-white uppercase">
              {activeFocus.title}
            </h2>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
              {activeVideoUrl ? (
                <video
                  key={`desktop-${activeVideoUrl}`}
                  src={activeVideoUrl}
                  controls
                  autoPlay={activeFocus.type !== "MAIN"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                  No Active Video Input Signal Linked
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
            <span>PIPELINE RESYNC STATUS // OK</span>
            <span>60FPS // BROADCAST LAYER</span>
          </div>
        </div>
      </div>

      {/* 📱 ======================================================== */}
      {/* ── MOBILE IMMERSIVE DASHBOARD & SLIDE-UP PLAYER              ── */}
      {/* 📱 ======================================================== */}
      <div className="flex flex-col lg:hidden w-full gap-4 pb-6">
        {/* 🛠️ New Feature Action Control Row (Edit Main Deck Setup) */}
        <div className="w-full flex items-center justify-between bg-zinc-900/60 border border-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2.5">
            <Settings size={16} className="text-zinc-500" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Highlight Controls
            </span>
          </div>
          <Button
            onClick={onEditClick}
            className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white font-condensed font-bold uppercase tracking-wider text-[11px] h-8 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit2 size={11} className="text-kh-pink" />
            Edit Deck
          </Button>
        </div>

        {/* Active Stream Feature Quick Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-4 rounded-xl shadow-lg flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              Active Stream Segment
            </span>
            <h4 className="font-display text-base text-white font-bold tracking-wide truncate mt-0.5 uppercase">
              {activeFocus.title}
            </h4>
          </div>
          {activeVideoUrl && (
            <button
              onClick={() => setIsMobilePlayerOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-kh-pink text-black font-condensed font-bold text-xs uppercase tracking-wider shrink-0 transition-transform active:scale-95"
            >
              <Play size={12} fill="currentColor" /> Watch
            </button>
          )}
        </div>

        {/* Section 1: Showreel Track */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-zinc-500 tracking-widest block uppercase font-bold px-1">
            Master Composition Track
          </span>
          <div
            onClick={() => {
              setActiveFocus({
                type: "MAIN",
                id: "main-reel",
                title: "Primary Showreel Track",
                subTag: "MASTER CONFIG FILE",
                rawNodeRef: highlight,
              });
              setIsMobilePlayerOpen(true);
            }}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all active:scale-[0.99] ${
              activeFocus.type === "MAIN"
                ? "bg-kh-pink/10 border-kh-pink/40"
                : "bg-zinc-900/50 border-white/5"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2.5 rounded-lg ${activeFocus.type === "MAIN" ? "bg-kh-pink/20 text-kh-pink" : "bg-zinc-800 text-zinc-400"}`}
              >
                <MonitorPlay size={16} />
              </div>
              <div className="min-w-0">
                <p className="font-condensed text-sm font-bold text-white uppercase tracking-wide">
                  Primary Showreel Master
                </p>
                <span className="font-mono text-[9px] text-zinc-500 block uppercase mt-0.5">
                  Primary Link Channel
                </span>
              </div>
            </div>
            <Maximize2 size={14} className="text-zinc-500" />
          </div>
        </div>

        {/* Section 2: Video Clips */}
        <div className="space-y-2 mt-2">
          <span className="font-mono text-[10px] text-zinc-500 tracking-widest block uppercase font-bold px-1">
            Video Clips ({videosList.length})
          </span>

          <div className="space-y-2">
            {videosList.map((video: any, idx: number) => {
              const isSelected =
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
                    setIsMobilePlayerOpen(true);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all active:scale-[0.99] ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500/40"
                      : "bg-zinc-900/50 border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Film
                      size={14}
                      className={isSelected ? "text-cyan-400" : "text-zinc-500"}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-condensed font-bold text-sm uppercase tracking-wide truncate ${isSelected ? "text-white" : "text-zinc-300"}`}
                      >
                        {video.video_name || "Unnamed Video"}
                      </p>
                      <span className="font-mono text-[8px] text-cyan-400/80 uppercase tracking-tight block mt-0.5">
                        {video.video_type || "Raw Asset"}
                      </span>
                    </div>
                  </div>

                  {/* Operational Management Deck Buttons */}
                  <div
                    className="flex items-center gap-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onEditVideoClick(video)}
                      disabled={isSubmittingItem}
                      className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 active:bg-zinc-900"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteVideoClick(video._id)}
                      disabled={isSubmittingItem}
                      className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 active:bg-red-950/40 active:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Feed Clips */}
        <div className="space-y-2 mt-2">
          <span className="font-mono text-[10px] text-zinc-500 tracking-widest block uppercase font-bold px-1">
            Feed Clips ({feedVideosList.length})
          </span>

          <div className="space-y-2">
            {feedVideosList.map((feed: any, idx: number) => {
              const isSelected = activeFocus.id === (feed._id || `feed-${idx}`);
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
                    setIsMobilePlayerOpen(true);
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all active:scale-[0.99] ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/40"
                      : "bg-zinc-900/50 border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Award
                      size={14}
                      className={
                        isSelected ? "text-amber-400" : "text-zinc-500"
                      }
                    />
                    <p
                      className={`font-condensed font-bold text-sm uppercase tracking-wide truncate ${isSelected ? "text-white" : "text-zinc-300"}`}
                    >
                      {feed.title || "Untitled Feed"}
                    </p>
                  </div>

                  {/* Operational Management Deck Buttons */}
                  <div
                    className="flex items-center gap-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onEditFeedVideoClick(feed)}
                      disabled={isSubmittingItem}
                      className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 active:bg-zinc-900"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteFeedVideoClick(feed._id)}
                      disabled={isSubmittingItem}
                      className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 active:bg-red-950/40 active:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🍿 FULL-SCREEN IMMERSIVE SLIDE-UP VIDEO BOTTOM-SHEET MODAL */}
        {isMobilePlayerOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-end transition-opacity duration-300">
            {/* Modal Backdrop closer zone */}
            <div
              className="flex-1 w-full"
              onClick={() => setIsMobilePlayerOpen(false)}
            />

            {/* Sliding Theater Content Container */}
            <div className="bg-zinc-950 border-t border-white/10 rounded-t-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
              {/* Theater Control Grabber Top Bar */}
              <div className="p-4 flex items-center justify-between border-b border-white/5 bg-zinc-900/40">
                <div className="min-w-0 flex-1 pr-4">
                  <span className="font-mono text-[9px] font-bold text-kh-pink uppercase tracking-widest">
                    {activeFocus.subTag}
                  </span>
                  <h3 className="font-display text-base font-bold text-white uppercase truncate tracking-wide mt-0.5">
                    {activeFocus.title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobilePlayerOpen(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Viewport Playback Box */}
              <div className="w-full aspect-video bg-black flex items-center justify-center relative border-b border-white/5">
                {activeVideoUrl ? (
                  <video
                    key={`mobile-theater-${activeVideoUrl}`}
                    src={activeVideoUrl}
                    controls
                    autoPlay={activeFocus.type !== "MAIN"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="p-6 text-center font-mono text-xs text-zinc-600 uppercase tracking-widest">
                    No Live Signal Available
                  </div>
                )}
              </div>

              {/* Auxiliary Meta Details Footer */}
              <div className="p-4 bg-zinc-900/20 font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                <span>MOBILE STAGE STREAMING</span>
                <span>60FPS // LIVE REEL</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
