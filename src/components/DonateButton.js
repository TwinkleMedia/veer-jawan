"use client";

import Link from "next/link";
import { useState } from "react";

// Pre-calculated outside component — same on server & client, no hydration mismatch
const CHAKRA_LINES = Array.from({ length: 24 }).map((_, i) => {
  const rad = (((i * 360) / 24) * Math.PI) / 180;
  return {
    x1: parseFloat((50 + 11 * Math.cos(rad)).toFixed(4)),
    y1: parseFloat((50 + 11 * Math.sin(rad)).toFixed(4)),
    x2: parseFloat((50 + 43 * Math.cos(rad)).toFixed(4)),
    y2: parseFloat((50 + 43 * Math.sin(rad)).toFixed(4)),
  };
});

function AshokaChakra({ className, style, color = "#1e40af" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="5" />
      <circle cx="50" cy="50" r="8" fill={color} />
      {CHAKRA_LINES.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function DonateButton() {
  const [pulse, setPulse] = useState(true);

  return (
    <>
      {/* ── DESKTOP: right side, vertically centered ── */}
      <div className="hidden md:block fixed top-1/2 -translate-y-1/2 right-0 z-50">
        {pulse && (
          <>
            <span
              className="absolute inset-0 rounded-l-xl border-4 border-orange-400 opacity-70 animate-ping pointer-events-none"
              style={{ animationDuration: "1.6s" }}
            />
            <span
              className="absolute inset-0 rounded-l-xl border-2 border-green-500 opacity-40 animate-ping pointer-events-none"
              style={{ animationDuration: "2.4s", animationDelay: "0.5s" }}
            />
          </>
        )}

        <Link
          href="/donate"
          onClick={() => setPulse(false)}
          className="relative flex items-center gap-2 bg-white
            border-2 border-orange-500 rounded-l-xl
            pl-2 pr-3 py-1.5 shadow-2xl
            hover:shadow-orange-200 hover:scale-105
            transition-all duration-300 group"
        >
          {/* Tricolor strip */}
          <span className="flex flex-col w-1 h-8 rounded-full overflow-hidden shrink-0">
            <span className="flex-1 bg-orange-500" />
            <span className="flex-1 bg-white border-y border-gray-300" />
            <span className="flex-1 bg-green-600" />
          </span>

          {/* Text */}
          <span className="flex flex-col leading-tight">
            <span className="text-[9px] font-extrabold tracking-[0.2em] text-orange-500 uppercase">
              Support India
            </span>
            <span className="text-sm font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
              Donate Now 🙏
            </span>
            <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
              Veer Jawan Foundation
            </span>
          </span>

          <AshokaChakra
            className="w-7 h-7 shrink-0 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </Link>
      </div>

      {/* ── MOBILE: right half of a fixed bottom bar ── */}
      {/* ── MOBILE: right half of a fixed bottom bar ── */}
      <div className="md:hidden fixed bottom-0 right-0 w-1/2 z-50">
        <Link
          href="/donate"
          onClick={() => setPulse(false)}
          className="relative flex flex-col items-start justify-center
            bg-orange-500 rounded-tl-2xl
            px-4 py-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]
            active:scale-95 active:bg-orange-600 transition-all duration-200"
        >
          {pulse && (
            <span
              className="absolute inset-0 rounded-tl-2xl border-2 border-white opacity-40 animate-ping pointer-events-none"
              style={{ animationDuration: "1.8s" }}
            />
          )}

          <span className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-white whitespace-nowrap">
              Donate Now
            </span>
            <AshokaChakra
              className="w-4 h-4 shrink-0 animate-spin"
              style={{ animationDuration: "8s" }}
              color="#ffffff"
            />
          </span>
          <span className="text-[10px] text-orange-100 font-medium whitespace-nowrap">
            Veer Jawan Foundation
          </span>
        </Link>
      </div>
    </>
  );
}