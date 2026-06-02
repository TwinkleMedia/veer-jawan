"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function TricolorBar({ className = "" }) {
  return (
    <div className={`flex h-[3px] ${className}`}>
      <div className="flex-1 bg-orange-500" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-green-700" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[75vw] max-w-[280px] md:w-64">
      <div className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
        <div className="aspect-[3/4] bg-gray-200" />
        <div className="p-3 space-y-2">
          <div className="h-2 bg-gray-200 rounded w-3/4" />
          <div className="h-2 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      style={{ animation: "lbFadeIn 0.2s ease forwards" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbZoom   { from { opacity:0; transform:scale(0.88) } to { opacity:1; transform:scale(1) } }
      `}</style>

      <div
        className="relative w-full max-w-sm md:max-w-md"
        style={{ animation: "lbZoom 0.25s ease forwards" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white shadow-xl
            flex items-center justify-center text-[#293C86]
            hover:bg-[#293C86] hover:text-white transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <TricolorBar />
          <img
            src={image}
            alt={title}
            className="w-full object-contain bg-white"
            style={{ maxHeight: "75vh" }}
          />
          <div className="bg-white px-4 py-3">
            <TricolorBar className="mb-2" />
            <p className="text-[#293C86] font-bold text-sm text-center leading-snug"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              {title}
            </p>
          </div>
        </div>

        <p className="text-center text-white/35 text-xs mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Tap outside or press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/50">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────
function CertificateCard({ cert, isActive, onImageClick }) {
  return (
    // ✅ KEY FIX: width uses vw on mobile so it fits screen, caps on desktop
    <div
      className={`flex-shrink-0 w-[72vw] max-w-[260px] md:w-56 lg:w-64
        transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-50"}`}
    >
      <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100">
        <TricolorBar />

        {/* Clickable image */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-gray-50 cursor-zoom-in"
          onClick={() => onImageClick(cert.imageUrl, cert.title)}
        >
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#293C86]/50 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Zoom hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-2.5 shadow-lg">
              <svg className="w-5 h-5 text-[#293C86]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4-4m-2-2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 8v6m-3-3h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 bg-white">
          <TricolorBar className="mb-2" />
          <p className="text-[#293C86] font-bold text-xs text-center leading-snug tracking-wide"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            {cert.title}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────
export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [current, setCurrent]   = useState(0);
  const [lightbox, setLightbox] = useState(null);

  // ✅ Use a scroll-snap container ref instead of manual offset math
  const scrollRef   = useRef(null);
  const autoRef     = useRef(null);
  const pausedRef   = useRef(false);
  // touch tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragRef   = useRef(false);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const total = certificates.length;

  // ✅ Scroll the container to the correct card by index
  const scrollToIndex = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index];
    if (!card) return;
    const containerCenter = container.offsetWidth / 2;
    const cardCenter      = card.offsetLeft + card.offsetWidth / 2;
    container.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }, []);

  const goTo = useCallback((index) => {
    const next = (index + total) % total;
    setCurrent(next);
    scrollToIndex(next);
  }, [total, scrollToIndex]);

  // Autoplay
  useEffect(() => {
    if (total < 2) return;
    autoRef.current = setInterval(() => {
      if (!pausedRef.current) goTo(current + 1);
    }, 3500);
    return () => clearInterval(autoRef.current);
  }, [current, total, goTo]);

  // Scroll to active card whenever current changes (also handles initial render)
  useEffect(() => {
    scrollToIndex(current);
  }, [current, scrollToIndex, certificates]);

  // ── Touch handlers (mobile swipe) ──
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragRef.current   = false;
    pausedRef.current   = true;
  };

  const onTouchMove = (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 5) isDragRef.current = true;
  };

  const onTouchEnd = (e) => {
    pausedRef.current = false;
    if (!isDragRef.current) return; // it was a tap, not a swipe
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -40) goTo(current + 1);
    else if (delta > 40) goTo(current - 1);
  };

  // ── Mouse drag (desktop) ──
  const mouseStartX = useRef(0);
  const isMouseDrag = useRef(false);

  const onMouseDown = (e) => {
    mouseStartX.current = e.clientX;
    isMouseDrag.current = false;
    pausedRef.current   = true;
  };
  const onMouseMove = (e) => {
    if (Math.abs(e.clientX - mouseStartX.current) > 5) isMouseDrag.current = true;
  };
  const onMouseUp = (e) => {
    pausedRef.current = false;
    if (!isMouseDrag.current) return;
    const delta = e.clientX - mouseStartX.current;
    if (delta < -60) goTo(current + 1);
    else if (delta > 60) goTo(current - 1);
  };

  if (error) return (
    <section className="py-10 text-center">
      <p className="text-red-400 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Failed to load certificates: {error}
      </p>
    </section>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');

        /* ✅ Hide scrollbar but keep scroll functional */
        .cert-scroll::-webkit-scrollbar { display: none; }
        .cert-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {lightbox && (
        <Lightbox
          image={lightbox.image}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}

      <section
        className="relative py-10 md:py-14 bg-white overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

        <TricolorBar className="absolute top-0 left-0 right-0" />

        {/* Header */}
        <div className="text-center mb-8 px-4">
          <p className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Our Achievements
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#293C86] leading-tight">
            Certificates &{" "}
            <span className="text-orange-500">Recognition</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-[2px] bg-orange-500" />
            <div className="w-2 h-2 rounded-full bg-[#293C86]" />
            <div className="w-8 h-[2px] bg-green-700" />
          </div>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex gap-5 justify-center px-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No certificates added yet.</p>
          </div>
        ) : (
          <div className="relative">

            {/* Prev */}
            <button
              onClick={() => goTo(current - 1)}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20
                w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100
                flex items-center justify-center text-[#293C86]
                hover:bg-[#293C86] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={() => goTo(current + 1)}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100
                flex items-center justify-center text-[#293C86]
                hover:bg-[#293C86] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* ✅ Scroll-snap container — THE FIX */}
            <div
              ref={scrollRef}
              className="cert-scroll flex gap-5 overflow-x-auto px-[14vw] md:px-[20vw] py-4
                cursor-grab active:cursor-grabbing"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {certificates.map((cert, i) => (
                <div key={cert._id} style={{ scrollSnapAlign: "center" }}>
                  <CertificateCard
                    cert={cert}
                    isActive={i === current}
                    onImageClick={(img, title) => {
                      // Only open lightbox if it was NOT a drag
                      if (!isDragRef.current && !isMouseDrag.current) {
                        setLightbox({ image: img, title });
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots */}
        {!loading && certificates.length > 0 && (
          <>
            <div className="flex items-center justify-center gap-2 mt-4">
              {certificates.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-2 bg-[#293C86]"
                      : "w-2 h-2 bg-gray-300 hover:bg-orange-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </>
        )}

        <TricolorBar className="absolute bottom-0 left-0 right-0" />
      </section>
    </>
  );
}