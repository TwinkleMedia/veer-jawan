"use client";

import Link from "next/link";
import { useState } from "react";

function CalendarIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="#293C86" strokeWidth="1.8" />
      <path d="M3 9.5h18" stroke="#293C86" strokeWidth="1.8" />
      <path d="M7.5 2.5v4M16.5 2.5v4" stroke="#293C86" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="13.5" r="1.1" fill="#FF671F" />
      <circle cx="12" cy="13.5" r="1.1" fill="#293C86" />
      <circle cx="16" cy="13.5" r="1.1" fill="#2f7d3a" />
      <circle cx="8" cy="17" r="1.1" fill="#293C86" />
      <circle cx="12" cy="17" r="1.1" fill="#2f7d3a" />
    </svg>
  );
}

export default function EventPopupButton() {
  const [pulse, setPulse] = useState(true);

  return (
    <>
      {/* ── DESKTOP: right side, just below Donate button ── */}
      <div className="hidden md:block fixed top-1/2 translate-y-[3.25rem] right-0 z-50">
        {pulse && (
          <span
            className="absolute inset-0 rounded-l-xl border-2 border-[#293C86] opacity-40 animate-ping pointer-events-none"
            style={{ animationDuration: "2.2s" }}
          />
        )}

        <Link
          href="/events"
          onClick={() => setPulse(false)}
          className="relative flex items-center gap-2 bg-white
            border-2 border-[#293C86] rounded-l-xl
            pl-2 pr-3 py-1.5 shadow-2xl
            hover:shadow-blue-200 hover:scale-105
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
            <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#293C86] uppercase">
              Stay Updated
            </span>
            <span className="text-sm font-extrabold text-gray-900 group-hover:text-[#293C86] transition-colors whitespace-nowrap">
              Upcoming Events 📅
            </span>
            <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
              Veer Jawan Foundation
            </span>
          </span>

          <CalendarIcon className="w-7 h-7 shrink-0" />
        </Link>
      </div>

      {/* ── MOBILE: bottom-right, just above Donate button ── */}
      <div className="md:hidden fixed bottom-[5.25rem] right-4 z-50">
        {pulse && (
          <span
            className="absolute inset-0 rounded-2xl border-2 border-[#293C86] opacity-40 animate-ping pointer-events-none"
            style={{ animationDuration: "2.2s" }}
          />
        )}

        <Link
          href="/events"
          onClick={() => setPulse(false)}
          className="relative flex items-center gap-2 bg-white
            border-2 border-[#293C86] rounded-2xl
            pl-2 pr-3 py-1.5 shadow-2xl
            active:scale-95 transition-all duration-300 group"
        >
          {/* Tricolor strip */}
          <span className="flex flex-col w-1 h-7 rounded-full overflow-hidden shrink-0">
            <span className="flex-1 bg-orange-500" />
            <span className="flex-1 bg-white border-y border-gray-300" />
            <span className="flex-1 bg-green-600" />
          </span>

          {/* Text */}
          <span className="flex flex-col leading-tight">
            <span className="text-[8px] font-extrabold tracking-[0.15em] text-[#293C86] uppercase">
              Stay Updated
            </span>
            <span className="text-xs font-extrabold text-gray-900 whitespace-nowrap">
              Upcoming Events 📅
            </span>
            <span className="text-[8px] text-gray-400 font-medium whitespace-nowrap">
              Veer Jawan Foundation
            </span>
          </span>

          <CalendarIcon className="w-6 h-6 shrink-0" />
        </Link>
      </div>
    </>
  );
}