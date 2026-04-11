"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ── Point this at your backend ──────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Bento span patterns — cycles as items grow ──────────────────────────────
// Each entry = [colSpan, rowSpan] for the 4-column desktop grid
const BENTO_PATTERNS = [
  [2, 2], // big feature
  [1, 1],
  [1, 1],
  [1, 2], // tall
  [1, 1],
  [2, 1], // wide
  [1, 1],
  [2, 1], // wide
  [1, 2], // tall
  [1, 1],
];

function AshokaSVG({ size = 28, color = "#1a56db" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="4" />
      <circle cx="50" cy="50" r="7" fill={color} />
      {[...Array(24)].map((_, i) => {
        const a = ((i * 360) / 24) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={50 + 11 * Math.cos(a)} y1={50 + 11 * Math.sin(a)}
            x2={50 + 37 * Math.cos(a)} y2={50 + 37 * Math.sin(a)}
            stroke={color} strokeWidth="2.5"
          />
        );
      })}
    </svg>
  );
}

// ── Single media card ────────────────────────────────────────────────────────
function GalleryCard({ item, colSpan = 1, rowSpan = 1 }) {
  const videoRef = useRef(null);

  const spanClass = [
    colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
    rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
  ].join(" ");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-sm col-span-1 row-span-1 ${spanClass}`}
      style={{ minHeight: "150px" }}
      onMouseEnter={() => item.type === "video" && videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (item.type === "video" && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Media */}
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.url}
          muted loop playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Tricolor top bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-30">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-gray-200" />
        <div className="flex-1 bg-green-700" />
      </div>

      {/* White-toned India overlay */}
      <div className="absolute inset-0 z-10 transition-all duration-500
        bg-gradient-to-br from-white/55 via-orange-50/35 to-green-50/30
        opacity-70 group-hover:opacity-95" />

      {/* Video badge */}
      {item.type === "video" && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1
          rounded-full bg-white/90 backdrop-blur-sm border border-orange-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-orange-700 text-[9px] font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Video
          </span>
        </div>
      )}

      {/* Ashoka watermark (images only) */}
      {item.type !== "video" && (
        <div className="absolute top-3 right-3 z-20 opacity-10 group-hover:opacity-25 transition-opacity duration-300">
          <AshokaSVG />
        </div>
      )}

      {/* Title block — bottom left (gallery title only) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20">
        <span
          className="text-orange-600 text-[9px] md:text-[10px] font-bold tracking-widest uppercase block"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {item.galleryTitle}
        </span>
      </div>

      {/* Hover inset border */}
      <div
        className="absolute inset-0 rounded-2xl z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 2px rgba(249,115,22,0.55)" }}
      />
    </div>
  );
}

// ── Skeleton loader card ─────────────────────────────────────────────────────
function SkeletonCard({ colSpan = 1, rowSpan = 1 }) {
  const spanClass = [
    colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
    rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
  ].join(" ");
  return (
    <div
      className={`rounded-2xl bg-gray-100 animate-pulse col-span-1 row-span-1 ${spanClass}`}
      style={{ minHeight: "150px" }}
    />
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="col-span-4 flex flex-col items-center justify-center py-24 text-center">
      <div className="opacity-20 mb-4"><AshokaSVG size={48} /></div>
      <p className="text-gray-400 font-semibold text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
        No gallery items yet
      </p>
      <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Upload images or videos from the admin panel to get started.
      </p>
    </div>
  );
}

// ── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="col-span-4 flex flex-col items-center justify-center py-24 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
      </div>
      <p className="text-gray-500 font-semibold text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Failed to load gallery
      </p>
      <p className="text-gray-400 text-xs mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold
          tracking-wide uppercase hover:bg-orange-100 transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Try Again
      </button>
    </div>
  );
}

// ── Main page component ──────────────────────────────────────────────────────
export default function GallerySection() {
  const [flatItems, setFlatItems] = useState([]); // all media items flattened
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/api/gallery`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Unknown error");

      // ── Flatten galleries → individual media items ──────────────────────
      // Each item gets: url, type, title (fileName cleaned), galleryTitle
      const items = [];
      for (const gallery of data.galleries) {
        for (const media of gallery.media) {
          // Strip extension from fileName for a cleaner display title
          const displayTitle = media.fileName
            ? media.fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
            : gallery.title;

          items.push({
            _id:          media._id || media.publicId,
            url:          media.url,
            type:         media.type,          // "image" | "video"
            title:        displayTitle,
            galleryTitle: gallery.title,       // shown as the orange subtitle label
            publicId:     media.publicId,
          });
        }
      }

      setFlatItems(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  // ── Bento span helper — wraps BENTO_PATTERNS cyclically ─────────────────
  const getSpan = (index) => BENTO_PATTERNS[index % BENTO_PATTERNS.length];

  return (
    <>
    <Topnav/>
    <Header/>
     {/* Hero Section */}
            <div className='relative w-full h-[350px] md:h-[450px] lg:h-[550px]'>
                {/* background Image */}
                <img src="/aboutBanner.png" alt="About Us Hero" className="w-full h-full object-cover" />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center'>
                    <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">Gallery</h1>
                    {/* breadcrumb */}
                    <div className='mt-4 text-[#293C86] text-sm md:text-base'>
                        <Link href="/" className=" inline-block">
                            Home
                        </Link>
                        <span className='mx-2'>/</span>
                        <span>Gallery</span>
                    </div>
                </div>
            </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');`}</style>

      <main className="min-h-screen w-full bg-[#fafaf8]" style={{ fontFamily: "'Poppins', sans-serif" }}>

        {/* Top tricolor stripe */}
        <div className="flex h-[5px] w-full">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-gray-200" />
          <div className="flex-1 bg-green-700" />
        </div>

        {/* ── Max-width container ───────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto">

          {/* Header */}

          {/* ── Desktop Bento Grid ──────────────────────────────────────── */}
          <section
            className="hidden md:grid px-4 py-5 gap-3"
            style={{ gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "185px" }}
          >
            {loading
              ? BENTO_PATTERNS.map(([cs, rs], i) => (
                  <SkeletonCard key={i} colSpan={cs} rowSpan={rs} />
                ))
              : error
              ? <ErrorState message={error} onRetry={fetchGallery} />
              : flatItems.length === 0
              ? <EmptyState />
              : flatItems.map((item, i) => {
                  const [cs, rs] = getSpan(i);
                  return (
                    <GalleryCard key={item._id || i} item={item} colSpan={cs} rowSpan={rs} />
                  );
                })
            }
          </section>

          {/* ── Mobile Grid ─────────────────────────────────────────────── */}
          <section className="md:hidden grid grid-cols-2 gap-2.5 p-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl bg-gray-100 animate-pulse ${i === 0 ? "col-span-2 h-56" : "h-40"}`}
                  />
                ))
              : error
              ? (
                <div className="col-span-2 py-12">
                  <ErrorState message={error} onRetry={fetchGallery} />
                </div>
              )
              : flatItems.length === 0
              ? (
                <div className="col-span-2 py-12">
                  <EmptyState />
                </div>
              )
              : flatItems.map((item, i) => (
                  <GalleryCard
                    key={item._id || i}
                    item={item}
                    className={
                      i % 5 === 0
                        ? "col-span-2 !h-56"
                        : i % 7 === 0
                        ? "col-span-2 !h-44"
                        : "h-40"
                    }
                  />
                ))
            }
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 text-center px-4 py-8 rounded-t-2xl">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-700" />
            </div>
            <p
              className="text-gray-300 text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Jai Hind · Vande Mataram · Bharat Mata Ki Jai
            </p>
          </footer>

        </div>{/* end max-w-6xl */}

        {/* Bottom tricolor stripe */}
        <div className="flex h-[5px] w-full">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-gray-200" />
          <div className="flex-1 bg-green-700" />
        </div>
      </main>
      <Footer/>
    </>
  );
}