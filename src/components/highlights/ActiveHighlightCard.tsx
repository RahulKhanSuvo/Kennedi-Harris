/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Video, Edit2, Play, Pause, Film, Award, Trash2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  // Playback state for active inline clips
  const [playingVideoIdx, setPlayingVideoIdx] = useState<number | null>(null);
  const [playingFeedIdx, setPlayingFeedIdx] = useState<number | null>(null);

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* ── Active Header ── */}
      <Card className="bg-[#0c0c14] border-white/5 shadow-2xl p-6 rounded-2xl relative overflow-hidden group/card w-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kh-pink/5 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="p-0 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-display text-2xl uppercase tracking-wider text-white flex items-center gap-2.5">
              <Video className="text-kh-pink animate-pulse" size={24} />
              Active Highlights Deck
            </CardTitle>
            <CardDescription className="font-condensed text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
              Manage and play all deployed highlights
            </CardDescription>
          </div>
          <div>
            <Button
              onClick={onEditClick}
              className="bg-kh-pink hover:bg-kh-pink-bright text-white font-condensed font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Edit2 size={13} />
              Edit Highlights
            </Button>
          </div>
        </CardHeader>

        {/* ── Main Video Player ── */}
        <div className="space-y-3">
          <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-bold border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 uppercase rounded-sm inline-block">
            MAIN VIDEO REEL
          </span>
          {highlight.MainVideo_url ? (
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video w-full shadow-lg">
              <video
                src={highlight.MainVideo_url}
                controls
                className="w-full h-full object-cover"
                poster={highlight.MainVideo_url + "#t=0.5"}
              />
            </div>
          ) : (
            <div className="h-48 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600 font-condensed uppercase tracking-wider">
              No main video file linked
            </div>
          )}
        </div>
      </Card>

      {/* ── Videos (videos array) Section ── */}
      <Card className="bg-[#0c0c14] border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <Film className="text-cyan-400" size={16} />
              Video Clips (videos)
            </h3>
            <p className="text-[9px] text-zinc-500 font-condensed uppercase tracking-wider">
              Playable clips categorized by platform type
            </p>
          </div>
          <span className="font-condensed text-[10px] text-zinc-400 font-bold bg-neutral-900 px-2.5 py-1 rounded-full border border-white/5 uppercase">
            {videosList.length} items
          </span>
        </div>

        <div className="space-y-3">
          {videosList.map((video: any, idx: number) => {
            const isPlaying = playingVideoIdx === idx;
            return (
              <div
                key={video._id || idx}
                className="p-4 rounded-xl bg-neutral-950/40 border border-white/5 hover:border-white/10 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-sm text-white uppercase font-condensed tracking-wide truncate">
                      {video.video_name || "Unnamed Video"}
                    </p>
                    <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest bg-cyan-500/5 border border-cyan-500/10 px-1.5 py-0.5 rounded-sm inline-block mt-1">
                      {video.video_type || "raw"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Play/Pause */}
                    {video.video_url && (
                      <Button
                        onClick={() => {
                          setPlayingVideoIdx(isPlaying ? null : idx);
                          setPlayingFeedIdx(null);
                        }}
                        className={`font-condensed font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors ${
                          isPlaying
                            ? "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                            : "bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300"
                        }`}
                      >
                        {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                        {isPlaying ? "Close" : "Play"}
                      </Button>
                    )}

                    {/* Edit Video */}
                    <Button
                      size="icon-xs"
                      onClick={() => onEditVideoClick(video)}
                      disabled={isSubmittingItem}
                      className="bg-neutral-900 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-zinc-400 hover:text-cyan-400 rounded-lg cursor-pointer"
                    >
                      <Edit2 size={11} />
                    </Button>

                    {/* Delete Video */}
                    <Button
                      size="icon-xs"
                      onClick={() => onDeleteVideoClick(video._id)}
                      disabled={isSubmittingItem}
                      className="bg-neutral-900 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={11} />
                    </Button>
                  </div>
                </div>

                {/* Inline Player */}
                {isPlaying && video.video_url && (
                  <div className="relative rounded-lg overflow-hidden border border-cyan-500/20 bg-black aspect-video w-full">
                    <video
                      src={video.video_url}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {videosList.length === 0 && (
            <p className="text-center text-zinc-600 text-xs font-condensed uppercase tracking-widest py-8 border border-dashed border-white/5 rounded-xl">
              No video clips loaded
            </p>
          )}
        </div>
      </Card>

      {/* ── Feed Videos (feedVideos array) Section ── */}
      <Card className="bg-[#0c0c14] border-white/5 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <Award className="text-kh-pink" size={16} />
              Video Feed Clips (feedVideos)
            </h3>
            <p className="text-[9px] text-zinc-500 font-condensed uppercase tracking-wider">
              Playable clips with standalone title headers
            </p>
          </div>
          <span className="font-condensed text-[10px] text-zinc-400 font-bold bg-neutral-900 px-2.5 py-1 rounded-full border border-white/5 uppercase">
            {feedVideosList.length} items
          </span>
        </div>

        <div className="space-y-3">
          {feedVideosList.map((feed: any, idx: number) => {
            const isPlaying = playingFeedIdx === idx;
            return (
              <div
                key={feed._id || idx}
                className="p-4 rounded-xl bg-neutral-950/40 border border-white/5 hover:border-white/10 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-sm text-white uppercase font-condensed tracking-wide truncate">
                      {feed.title || "Untitled Feed"}
                    </p>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest inline-block mt-1">
                      Feed Item
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Play/Pause */}
                    {feed.video_url && (
                      <Button
                        onClick={() => {
                          setPlayingFeedIdx(isPlaying ? null : idx);
                          setPlayingVideoIdx(null);
                        }}
                        className={`font-condensed font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors ${
                          isPlaying
                            ? "bg-kh-pink/20 text-kh-pink hover:bg-kh-pink/30"
                            : "bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-zinc-300"
                        }`}
                      >
                        {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                        {isPlaying ? "Close" : "Play"}
                      </Button>
                    )}

                    {/* Edit Feed Video */}
                    <Button
                      size="icon-xs"
                      onClick={() => onEditFeedVideoClick(feed)}
                      disabled={isSubmittingItem}
                      className="bg-neutral-900 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/30 text-zinc-400 hover:text-kh-pink rounded-lg cursor-pointer"
                    >
                      <Edit2 size={11} />
                    </Button>

                    {/* Delete Feed Video */}
                    <Button
                      size="icon-xs"
                      onClick={() => onDeleteFeedVideoClick(feed._id)}
                      disabled={isSubmittingItem}
                      className="bg-neutral-900 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={11} />
                    </Button>
                  </div>
                </div>

                {/* Inline Player */}
                {isPlaying && feed.video_url && (
                  <div className="relative rounded-lg overflow-hidden border border-kh-pink/20 bg-black aspect-video w-full">
                    <video
                      src={feed.video_url}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {feedVideosList.length === 0 && (
            <p className="text-center text-zinc-600 text-xs font-condensed uppercase tracking-widest py-8 border border-dashed border-white/5 rounded-xl">
              No feed clips loaded
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
