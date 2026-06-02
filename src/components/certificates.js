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
    <div className="flex-shrink-0 w-56 md:w-64">
      <div className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
        <div className="aspect-[4/5] bg-gray-200" />
        <div className="p-3 space-y-2">
          <div className="h-2 bg-gray-200 rounded w-3/4" />
          <div className="h-2 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

// ✅ NEW: Lightbox Component
function Lightbox({ image, title, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // prevent background scroll
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease" }}
      onClick={onClose} // click backdrop to close
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.85) } to { opacity: 1; transform: scale(1) } }
      `}</style>

      <div
        className="relative max-w-lg w-[90vw] mx-4"
        style={{ animation: "zoomIn 0.25s ease" }}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking image
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white shadow-lg
            flex items-center justify-center text-[#293C86] hover:bg-[#293C86] hover:text-white
            transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
          <TricolorBar />
          <img
            src={image}
            alt={title}
            className="w-full object-contain bg-white"
            style={{ maxHeight: "80vh" }}
          />
          <div className="bg-white px-4 py-3">
            <TricolorBar className="mb-2" />
            <p className="text-[#293C86] font-bold text-sm text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {title}
            </p>
          </div>
        </div>

        {/* ESC hint */}
        <p className="text-center text-white/40 text-xs mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/60">ESC</kbd> or click outside to close
        </p>
      </div>
    </div>
  );
}

// ✅ UPDATED: Added onImageClick prop
function CertificateCard({ cert, isActive, onImageClick }) {
  return (
    <div
      className={`flex-shrink-0 w-56 md:w-64 transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
    >
      <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100">
        <TricolorBar />

        {/* ✅ Image — now clickable */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-gray-50 cursor-zoom-in"
          onClick={() => onImageClick(cert.imageUrl, cert.title)}
        >
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#293C86]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* ✅ Zoom icon hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 text-[#293C86]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-6-3v6m-3-3h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 bg-white">
          <TricolorBar className="mb-2" />
          <p className="text-[#293C86] font-bold text-xs text-center leading-snug tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {cert.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [current, setCurrent]           = useState(0);
  const [isDragging, setIsDragging]     = useState(false);
  const [dragStart, setDragStart]       = useState(0);
  const [dragDelta, setDragDelta]       = useState(0);
  // ✅ NEW: Lightbox state
  const [lightbox, setLightbox]         = useState(null); // { image, title }

  const trackRef    = useRef(null);
  const autoPlayRef = useRef(null);

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

  useEffect(() => {
    if (total < 2) return;
    autoPlayRef.current = setInterval(() => goTo(current + 1), 3500);
    return () => clearInterval(autoPlayRef.current);
  }, [current, total, goTo]);

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

  const CARD_W = 256 + 24;
  const offset = current * -CARD_W + dragDelta;

  if (error) {
    return (
      <section className="py-10 bg-[#f5f0e8] text-center">
        <p className="text-red-400 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Failed to load certificates: {error}
        </p>
      </section>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');`}</style>

      {/* ✅ Lightbox — renders on top of everything */}
      {lightbox && (
        <Lightbox
          image={lightbox.image}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}

      <section
        className="relative py-10 bg-[#ffffff] overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
        <TricolorBar className="absolute top-0 left-0 right-0" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-2">Our Achievements</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#293C86] leading-tight">
              Certificates & <span className="text-orange-500">Recognition</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-[2px] bg-orange-500" />
              <div className="w-2 h-2 rounded-full bg-[#293C86]" />
              <div className="w-8 h-[2px] bg-green-700" />
            </div>
          </div>

          {loading ? (
            <div className="flex gap-6 justify-center">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">No certificates added yet.</p>
            </div>
          ) : (
            <>
              <div className="relative">
                <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#293C86] hover:bg-[#293C86] hover:text-white hover:border-[#293C86] transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#293C86] hover:bg-[#293C86] hover:text-white hover:border-[#293C86] transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>

                <div className="overflow-hidden mx-8 md:mx-12">
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
                        onImageClick={(img, title) => setLightbox({ image: img, title })} // ✅
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                {certificates.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-[#293C86]" : "w-2 h-2 bg-gray-300 hover:bg-orange-400"}`} />
                ))}
              </div>

              <p className="text-center text-xs text-gray-400 mt-2 tracking-widest">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </>
          )}
        </div>

        <TricolorBar className="absolute bottom-0 left-0 right-0" />
      </section>
    </>
  );
}