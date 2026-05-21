"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Tricolor accent ───────────────────────────────────────────────────────────
function TricolorBar({ className = "" }) {
  return (
    <div className={`flex h-[3px] ${className}`}>
      <div className="flex-1 bg-orange-500" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-green-700" />
    </div>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-72 md:w-80">
      <div className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
        <div className="aspect-[3/4] bg-gray-200" />
        <div className="p-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

// ── Single Certificate Card ───────────────────────────────────────────────────
function CertificateCard({ cert, isActive }) {
  return (
    <div
      className={`flex-shrink-0 w-72 md:w-80 transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
    >
      <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100">

        {/* Tricolor top bar */}
        <TricolorBar />

        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#293C86]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Title */}
        <div className="px-4 py-4 bg-white">
          <TricolorBar className="mb-3" />
          <p
            className="text-[#293C86] font-bold text-sm text-center leading-snug tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {cert.title}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Carousel Section ─────────────────────────────────────────────────────
export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [current, setCurrent]           = useState(0);
  const [isDragging, setIsDragging]     = useState(false);
  const [dragStart, setDragStart]       = useState(0);
  const [dragDelta, setDragDelta]       = useState(0);

  const trackRef      = useRef(null);
  const containerRef  = useRef(null);
  const autoPlayRef   = useRef(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res  = await fetch(`${API_BASE}/api/certificates`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load");
        setCertificates(data.certificates || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const total = certificates.length;

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
  }, [total]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // ── Auto-play ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (total < 2) return;
    autoPlayRef.current = setInterval(() => goTo(current + 1), 3500);
    return () => clearInterval(autoPlayRef.current);
  }, [current, total, goTo]);

  // ── Drag / swipe ──────────────────────────────────────────────────────────
  const onPointerDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragDelta(0);
    clearInterval(autoPlayRef.current);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    setDragDelta(e.clientX - dragStart);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDelta < -60) next();
    else if (dragDelta > 60) prev();
    setDragDelta(0);
  };

  // ── Centered offset calc ──────────────────────────────────────────────────
  // Instead of left-aligning the track, we compute how much to shift so the
  // active card sits in the middle of the visible container.
  //
  // card width:  288px (w-72) on mobile, 320px (w-80) on ≥md
  // gap:          24px (gap-6)
  // We read the actual container width at runtime so it's always exact.

  const CARD_W_DEFAULT = 344; // fallback: 320 + 24

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return CARD_W_DEFAULT;
    const firstChild = trackRef.current.firstElementChild;
    if (!firstChild) return CARD_W_DEFAULT;
    // card width + gap
    return firstChild.getBoundingClientRect().width + 24;
  }, []);

  const getContainerWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    return containerRef.current.getBoundingClientRect().width;
  }, []);

  // Recalculate on every render so resize is handled
  const [cardW, setCardW] = useState(CARD_W_DEFAULT);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const update = () => {
      setCardW(getCardWidth());
      setContainerW(getContainerWidth());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getCardWidth, getContainerWidth, certificates]);

  // Center the active card:
  // offset = -(current * cardW) + (containerW / 2) - (cardW / 2)
  const centeredOffset = -(current * cardW) + containerW / 2 - cardW / 2;
  const offset = centeredOffset + dragDelta;

  if (error) {
    return (
      <section className="py-20 bg-[#f5f0e8] text-center">
        <p className="text-red-400 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Failed to load certificates: {error}
        </p>
      </section>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');`}</style>

      <section className="relative py-20 bg-[#f5f0e8] overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

        {/* Decorative background circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

        {/* Top tricolor */}
        <TricolorBar className="absolute top-0 left-0 right-0" />

        <div className="max-w-6xl mx-auto px-4">

          {/* ── Section Header ── */}
          <div className="text-center mb-14">
            <p className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Our Achievements
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#293C86] leading-tight">
              Certificates &<br />
              <span className="text-orange-500">Recognition</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-5">
              <div className="w-10 h-[2px] bg-orange-500" />
              <div className="w-2 h-2 rounded-full bg-[#293C86]" />
              <div className="w-10 h-[2px] bg-green-700" />
            </div>
          </div>

          {/* ── Carousel ── */}
          {loading ? (
            <div className="flex gap-6 justify-center">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No certificates added yet.</p>
            </div>
          ) : (
            <>
              {/* Track wrapper */}
              <div className="relative">

                {/* Prev button */}
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                    w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100
                    flex items-center justify-center text-[#293C86]
                    hover:bg-[#293C86] hover:text-white hover:border-[#293C86]
                    transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next button */}
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                    w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100
                    flex items-center justify-center text-[#293C86]
                    hover:bg-[#293C86] hover:text-white hover:border-[#293C86]
                    transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Overflow clip — ref here for width measurement */}
                <div ref={containerRef} className="overflow-hidden mx-14">
                  {/* Draggable track */}
                  <div
                    ref={trackRef}
                    className="flex gap-6 select-none cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `translateX(${offset}px)`,
                      transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                  >
                    {certificates.map((cert, i) => (
                      <CertificateCard
                        key={cert._id}
                        cert={cert}
                        isActive={i === current}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Dot indicators ── */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {certificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-[#293C86]"
                        : "w-2 h-2 bg-gray-300 hover:bg-orange-400"
                    }`}
                  />
                ))}
              </div>

              {/* Counter */}
              <p className="text-center text-xs text-gray-400 mt-3 tracking-widest">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </>
          )}
        </div>

        {/* Bottom tricolor */}
        <TricolorBar className="absolute bottom-0 left-0 right-0" />
      </section>
    </>
  );
}