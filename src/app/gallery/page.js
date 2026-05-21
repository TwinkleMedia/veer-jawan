"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import DonateButton from "@/components/DonateButton";
import WhatsAppButton from "@/components/WhatsAppButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    return null;
  } catch { return null; }
}

function getVimeoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("vimeo.com"))
      return u.pathname.split("/").filter(Boolean).pop();
    return null;
  } catch { return null; }
}

const ASPECT_SHAPES = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]"];

/* ─── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  const youtubeId = item.type === "video" ? getYouTubeId(item.url) : null;
  const vimeoId = item.type === "video" && !youtubeId ? getVimeoId(item.url) : null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-white/70 hover:text-white transition-colors z-10 text-3xl font-thin leading-none"
      >
        ×
      </button>

      {/* Tricolor top */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-10">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white/30" />
        <div className="flex-1 bg-green-700" />
      </div>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center z-10 text-white text-xl"
        >
          ‹
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center z-10 text-white text-xl"
        >
          ›
        </button>
      )}

      <div
        className="relative max-w-4xl w-full mx-4 md:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" && (
          <img
            src={item.url}
            alt={item.title}
            className="w-full max-h-[80vh] object-contain rounded-xl"
          />
        )}

        {item.type === "video" && youtubeId && (
          <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}

        {item.type === "video" && vimeoId && (
          <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        )}

        {item.type === "video" && !youtubeId && !vimeoId && (
          <video controls autoPlay className="w-full max-h-[80vh] rounded-xl">
            <source src={item.url} />
          </video>
        )}

        <div className="mt-4 text-center">
          <p className="text-white font-semibold text-sm">{item.title}</p>
          <p className="text-orange-400 text-xs mt-0.5">{item.galleryTitle}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Gallery Card ──────────────────────────────────────────── */
function GalleryCard({ item, index, onClick }) {
  const youtubeId = item.type === "video" ? getYouTubeId(item.url) : null;
  const vimeoId = item.type === "video" && !youtubeId ? getVimeoId(item.url) : null;

  const thumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : item.type === "image"
    ? item.url
    : null;

  const videoLabel = youtubeId ? "YouTube" : vimeoId ? "Vimeo" : "Video";
  const shape = ASPECT_SHAPES[index % ASPECT_SHAPES.length];

  return (
    <div
      className="relative overflow-hidden rounded-2xl group bg-gray-100 cursor-pointer select-none"
      style={{ breakInside: "avoid", marginBottom: "10px" }}
      onClick={onClick}
    >
      {/* Tricolor accent */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-20">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green-700" />
      </div>

      {thumbnail ? (
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          className={`w-full object-cover ${shape} group-hover:scale-105 transition-transform duration-500 ease-out`}
        />
      ) : (
        <div className={`w-full ${shape} flex items-center justify-center bg-gray-200`}>
          <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Video play */}
      {item.type === "video" && (
        <>
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">{videoLabel}</span>
          </div>
        </>
      )}

      {/* Image zoom icon */}
      {item.type === "image" && (
        <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-white text-[11px] font-semibold leading-snug truncate">{item.title}</p>
        <p className="text-orange-300 text-[9px] mt-0.5 truncate">{item.galleryTitle}</p>
      </div>
    </div>
  );
}

/* ─── Skeleton ──────────────────────────────────────────────── */
function SkeletonCard({ index = 0 }) {
  const shape = ASPECT_SHAPES[index % ASPECT_SHAPES.length];
  return (
    <div
      className={`rounded-2xl bg-gray-200 animate-pulse ${shape}`}
      style={{ breakInside: "avoid", marginBottom: "10px" }}
    />
  );
}

/* ─── Empty & Error ─────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
      <svg className="w-14 h-14 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="font-semibold text-sm text-gray-500">No gallery items yet</p>
      <p className="text-xs mt-1 text-gray-400">Upload images or videos from the admin panel to get started.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <p className="text-gray-600 font-semibold text-sm mb-1">Failed to load gallery</p>
      <p className="text-gray-400 text-xs mb-5">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-sm shadow-orange-200"
      >
        Try Again
      </button>
    </div>
  );
}

/* ─── Filter Tabs ───────────────────────────────────────────── */
function FilterTabs({ active, onChange, counts }) {
  const tabs = [
    { key: "all",   label: "All",    icon: "⊞" },
    { key: "image", label: "Photos", icon: "🖼" },
    { key: "video", label: "Videos", icon: "▶" },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${active === tab.key
              ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-105"
              : "bg-white text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
            }`}
        >
          <span className="text-xs">{tab.icon}</span>
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold
              ${active === tab.key ? "bg-white/30 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────── */
function StatsBar({ total, images, videos }) {
  if (total === 0) return null;
  return (
    <div className="flex items-center justify-center gap-8 mb-8 text-center">
      {[
        { label: "Total Items", value: total, color: "text-gray-700" },
        { label: "Photos",      value: images, color: "text-orange-500" },
        { label: "Videos",      value: videos, color: "text-green-700"  },
      ].map((s) => (
        <div key={s.label} className="flex flex-col items-center">
          <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function GallerySection() {
  const [flatItems, setFlatItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [filter, setFilter]       = useState("all");
  const [lightbox, setLightbox]   = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/gallery`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Unknown error");

      const items = [];
      for (const gallery of data.galleries) {
        for (const media of gallery.media) {
          const displayTitle = media.fileName
            ? media.fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
            : gallery.title;
          items.push({
            _id: media._id || media.publicId,
            url: media.url,
            type: media.type,
            title: displayTitle,
            galleryTitle: gallery.title,
            publicId: media.publicId,
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

  const filtered = filter === "all"
    ? flatItems
    : flatItems.filter((i) => i.type === filter);

  const counts = {
    all:   flatItems.length,
    image: flatItems.filter((i) => i.type === "image").length,
    video: flatItems.filter((i) => i.type === "video").length,
  };

  const openLightbox  = useCallback((index) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevItem      = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : i)), []);
  const nextItem      = useCallback(() => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  return (
    <>
      <DonateButton />
      <WhatsAppButton />
      <Topnav />
      <Header />

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          item={filtered[lightbox]}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
          hasPrev={lightbox > 0}
          hasNext={lightbox < filtered.length - 1}
        />
      )}

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="/aboutBanner.png"
          alt="Gallery Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Visual Stories
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Our Gallery</h1>
          <p className="mt-2 text-white/70 text-sm max-w-xs">
            A collection of moments, memories &amp; milestones
          </p>
          <div className="mt-4 text-white/60 text-xs flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">›</span>
            <span className="text-white/80">Gallery</span>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* Tricolor stripe */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white border-y border-gray-200" />
        <div className="flex-1 bg-green-700" />
      </div>

      <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Section heading */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Photo &amp; Video Gallery
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Moments We Cherish</h2>
            <p className="text-sm text-gray-400 mt-2">
              Explore photos and videos from our events, activities &amp; celebrations
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              <div className="h-1 w-10 rounded-full bg-orange-500" />
              <div className="h-1 w-4  rounded-full bg-gray-200" />
              <div className="h-1 w-10 rounded-full bg-green-700" />
            </div>
          </div>

          {/* Stats */}
          {!loading && !error && (
            <StatsBar total={counts.all} images={counts.image} videos={counts.video} />
          )}

          {/* Filter tabs */}
          {!loading && !error && flatItems.length > 0 && (
            <FilterTabs active={filter} onChange={setFilter} counts={counts} />
          )}

          {/* Gallery grid */}
          {loading ? (
            <div style={{ columns: "4 180px", columnGap: "10px" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={fetchGallery} />
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div style={{ columns: "4 180px", columnGap: "10px" }}>
                {filtered.map((item, i) => (
                  <GalleryCard
                    key={item._id || i}
                    item={item}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-8">
                Showing{" "}
                <span className="font-semibold text-gray-500">{filtered.length}</span>{" "}
                item{filtered.length !== 1 ? "s" : ""}
                {filter !== "all" && ` · ${filter === "image" ? "Photos" : "Videos"} only`}
              </p>
            </>
          )}

        </div>
      </main>

      {/* Tricolor stripe */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white border-y border-gray-200" />
        <div className="flex-1 bg-green-700" />
      </div>

      <Footer />
    </>
  );
}