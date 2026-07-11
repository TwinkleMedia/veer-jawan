"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReelWidget
 * -----------------------------------------------------------------------
 * A floating, auto-playing "reel" video widget for the Veer Jawan
 * Foundation site.
 *
 * States:
 *  - "mini"     -> small autoplaying (muted) video pinned bottom-left,
 *                  sticky/fixed across scroll. Click anywhere on it to expand.
 *  - "expanded" -> centered, larger modal-style video with sound control.
 *  - "bubble"   -> collapsed circular avatar (after the user hits cancel
 *                  on mobile). Tapping it re-opens the "mini" widget.
 *
 * Props:
 *  - videoSrc   : string  (required)  - mp4 url
 *  - posterSrc  : string  (optional)  - poster/thumbnail image
 *  - caption    : string  (optional)  - small label shown on the mini card
 *
 * Usage:
 *  <ReelWidget videoSrc="/videos/veer-jawan-title.mp4" posterSrc="/images/reel-poster.jpg" caption="Watch our story" />
 *
 * Drop this component once, near the root of your layout
 * (e.g. app/layout.jsx), so it stays fixed on every page.
 * -----------------------------------------------------------------------
 */

const ICONS = {
  close: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  ),
  muted: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M4 9v6h4l5 5V4L8 9H4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M17 8l5 8M22 8l-5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  unmuted: (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M4 9v6h4l5 5V4L8 9H4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function ReelWidget({
  videoSrc,
  posterSrc,
  caption = "Watch our story",
}) {
  const [view, setView] = useState("mini"); // "mini" | "expanded" | "bubble"
  const [muted, setMuted] = useState(true);

  const miniVideoRef = useRef(null);
  const expandedVideoRef = useRef(null);

  // Keep the mini preview always playing quietly in the background
  useEffect(() => {
    const el = miniVideoRef.current;
    if (!el) return;
    if (view === "mini") {
      el.muted = true;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [view]);

  // Drive the expanded video's playback + starting position from the mini one
  useEffect(() => {
    const el = expandedVideoRef.current;
    if (!el) return;
    if (view === "expanded") {
      if (miniVideoRef.current) {
        el.currentTime = miniVideoRef.current.currentTime || 0;
      }
      el.muted = muted;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [view, muted]);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* BUBBLE (collapsed) STATE                                         */}
      {/* ---------------------------------------------------------------- */}
      {view === "bubble" && (
        <button
          type="button"
          onClick={() => setView("mini")}
          aria-label="Open video"
          className="fixed bottom-4 left-4 z-50 h-14 w-14 overflow-hidden rounded-full
                     border-2 border-white shadow-[0_4px_18px_rgba(0,0,0,0.35)]
                     ring-2 ring-orange-500/70
                     transition-transform duration-200 ease-out
                     hover:scale-105 active:scale-95
                     sm:h-16 sm:w-16"
        >
          {posterSrc ? (
            <img
              src={posterSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#293C86] text-white">
              <span className="h-6 w-6">{ICONS.play}</span>
            </div>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-orange-400 animate-ping opacity-40" />
        </button>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* MINI (floating, autoplay) STATE                                  */}
      {/* ---------------------------------------------------------------- */}
      {view === "mini" && (
        <div
          className="fixed bottom-4 left-4 z-50 w-24 sm:w-32 md:w-40
                     rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                     ring-1 ring-white/70"
        >
          {/* tricolor accent bar */}
          <div className="flex h-1.5 w-full">
            <span className="flex-1 bg-orange-500" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-green-700" />
          </div>

          <button
            type="button"
            onClick={() => setView("expanded")}
            aria-label="Expand video"
            className="group relative block aspect-[9/16] w-full bg-black"
          >
            <video
              ref={miniVideoRef}
              src="/videos/veerjawan_2_7_26.mp4"
              poster={posterSrc}
              muted
              loop
              playsInline
              autoPlay
              className="h-full w-full object-cover"
            />
            {/* subtle darken + play hint on hover (desktop) */}
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center
                         bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
            >
              <span
                className="h-8 w-8 scale-90 rounded-full bg-white/90 p-1.5 text-[#293C86]
                           opacity-0 shadow-md transition-all duration-200
                           group-hover:scale-100 group-hover:opacity-100"
              >
                {ICONS.play}
              </span>
            </span>

            {caption && (
              <span className="pointer-events-none absolute bottom-0 left-0 right-0 truncate
                                bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5
                                text-left text-[10px] font-medium text-white sm:text-xs">
                {caption}
              </span>
            )}
          </button>

          {/* cancel button -> collapses to bubble (mobile + desktop) */}
          <button
            type="button"
            onClick={() => setView("bubble")}
            aria-label="Close video"
            className="absolute right-1.5 top-3 h-5 w-5 rounded-full bg-black/60 p-1 text-white
                       backdrop-blur-sm transition-colors duration-150
                       hover:bg-black/80 sm:h-6 sm:w-6 sm:p-1.5"
          >
            {ICONS.close}
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* EXPANDED (centered modal) STATE                                  */}
      {/* ---------------------------------------------------------------- */}
      {view === "expanded" && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center
                     bg-black/80 backdrop-blur-sm px-4 py-8"
          onClick={() => setView("mini")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md
                       overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20"
          >
            <div className="flex h-1.5 w-full">
              <span className="flex-1 bg-orange-500" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-green-700" />
            </div>

            <div className="relative aspect-[9/16] w-full bg-black">
              <video
                ref={expandedVideoRef}
                src={videoSrc}
                poster={posterSrc}
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />

              {/* mute / unmute toggle */}
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="absolute bottom-3 left-3 h-9 w-9 rounded-full bg-black/55 p-2 text-white
                           backdrop-blur-sm transition-colors duration-150 hover:bg-black/75"
              >
                {muted ? ICONS.muted : ICONS.unmuted}
              </button>

              {/* close -> back to mini */}
              <button
                type="button"
                onClick={() => setView("mini")}
                aria-label="Minimize video"
                className="absolute right-3 top-3 h-9 w-9 rounded-full bg-black/55 p-2 text-white
                           backdrop-blur-sm transition-colors duration-150 hover:bg-black/75"
              >
                {ICONS.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}