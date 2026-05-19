"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import { useEffect, useState } from "react";
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
  } catch {
    return null;
  }
}

function getVimeoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("vimeo.com"))
      return u.pathname.split("/").filter(Boolean).pop();
    return null;
  } catch {
    return null;
  }
}

// Cycles through portrait → square → landscape for visual rhythm
const ASPECT_SHAPES = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]"];

function GalleryCard({ item, index }) {
  const youtubeId = item.type === "video" ? getYouTubeId(item.url) : null;
  const vimeoId =
    item.type === "video" && !youtubeId ? getVimeoId(item.url) : null;

  const thumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : item.type === "image"
    ? item.url
    : null;

  const videoLabel = youtubeId ? "YouTube" : vimeoId ? "Vimeo" : "Video";
  const shape = ASPECT_SHAPES[index % ASPECT_SHAPES.length];

  return (
    <div
      className="relative overflow-hidden rounded-2xl group bg-gray-100 cursor-pointer"
      style={{ breakInside: "avoid", marginBottom: "10px" }}
      onClick={() =>
        item.type === "video" &&
        window.open(item.url, "_blank", "noopener,noreferrer")
      }
    >
      {/* Tricolor top accent */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-20">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green-700" />
      </div>

      {/* Thumbnail */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          className={`w-full object-cover ${shape} group-hover:scale-105 transition-transform duration-500 ease-out`}
        />
      ) : (
        <div
          className={`w-full ${shape} flex items-center justify-center bg-gray-200`}
        >
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
            />
          </svg>
        </div>
      )}

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Video controls */}
      {item.type === "video" && (
        <>
          {/* Play button — always visible */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md
              group-hover:scale-110 group-hover:bg-white transition-all duration-200"
            >
              <svg
                className="w-5 h-5 text-red-600 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Source badge */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">
              {videoLabel}
            </span>
          </div>
        </>
      )}

      {/* Bottom label — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-6
        translate-y-full group-hover:translate-y-0
        transition-transform duration-300 ease-out"
      >
        <p className="text-white text-[11px] font-semibold leading-snug truncate">
          {item.title}
        </p>
        <p className="text-orange-300 text-[9px] mt-0.5 truncate">
          {item.galleryTitle}
        </p>
      </div>
    </div>
  );
}

function SkeletonCard({ index = 0 }) {
  const shape = ASPECT_SHAPES[index % ASPECT_SHAPES.length];
  return (
    <div
      className={`rounded-2xl bg-gray-200 animate-pulse ${shape}`}
      style={{ breakInside: "avoid", marginBottom: "10px" }}
    />
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
      <svg
        className="w-12 h-12 mb-3 opacity-30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="font-semibold text-sm">No gallery items yet</p>
      <p className="text-xs mt-1">
        Upload images or videos from the admin panel to get started.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-gray-500 font-semibold text-sm mb-1">
        Failed to load gallery
      </p>
      <p className="text-gray-400 text-xs mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

export default function GallerySection() {
  const [flatItems, setFlatItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      <DonateButton />
      <WhatsAppButton />
      <Topnav />
      <Header />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="/aboutBanner.png"
          alt="Gallery Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Gallery</h1>
          <div className="mt-3 text-white/80 text-sm flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Gallery</span>
          </div>
        </div>
      </div>

      {/* Tricolor stripe */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white border-y border-gray-200" />
        <div className="flex-1 bg-green-700" />
      </div>

      <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Section heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Our Gallery</h2>
            <p className="text-sm text-gray-500 mt-1">
              Photos &amp; videos from our events and activities
            </p>
            <div className="mt-3 flex justify-center gap-1">
              <div className="h-1 w-8 rounded-full bg-orange-500" />
              <div className="h-1 w-8 rounded-full bg-gray-200" />
              <div className="h-1 w-8 rounded-full bg-green-700" />
            </div>
          </div>

          {/* ── Masonry Gallery ── */}
          {loading ? (
            /* Skeleton grid */
            <div
              style={{
                columns: "4 180px",
                columnGap: "10px",
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={fetchGallery} />
          ) : flatItems.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              style={{
                columns: "4 180px",
                columnGap: "10px",
              }}
            >
              {flatItems.map((item, i) => (
                <GalleryCard key={item._id || i} item={item} index={i} />
              ))}
            </div>
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