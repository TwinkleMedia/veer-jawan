"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import { useRef, useEffect, useState } from "react";
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
    if (u.hostname.includes("vimeo.com")) return u.pathname.split("/").filter(Boolean).pop();
    return null;
  } catch { return null; }
}

function GalleryCard({ item }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const youtubeId     = item.type === "video" ? getYouTubeId(item.url) : null;
  const vimeoId       = item.type === "video" && !youtubeId ? getVimeoId(item.url) : null;
  const isEmbedVideo  = !!(youtubeId || vimeoId);
  const isDirectVideo = item.type === "video" && !isEmbedVideo;

  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : null;

  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1`
    : vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1`
    : null;

  return (
    <div
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-gray-100"
      style={{ aspectRatio: "4/3" }}
      onMouseEnter={() => {
        setHovered(true);
        if (isDirectVideo && videoRef.current) videoRef.current.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (isDirectVideo && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Direct video */}
      {isDirectVideo && (
        <video
          ref={videoRef}
          src={item.url}
          muted loop playsInline
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* YouTube / Vimeo */}
      {isEmbedVideo && (
        <>
          {youtubeThumbnail && (
            <img
              src={youtubeThumbnail}
              alt={item.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
          {!hovered && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow">
                <svg className="w-5 h-5 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
          {hovered && embedSrc && (
            <iframe
              src={embedSrc}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ border: "none" }}
              title={item.title}
            />
          )}
        </>
      )}

      {/* Image */}
      {item.type === "image" && (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Tricolor top bar */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-20">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green-700" />
      </div>

      {/* Video badge */}
      {item.type === "video" && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">
            {youtubeId ? "YouTube" : vimeoId ? "Vimeo" : "Video"}
          </span>
        </div>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-3 z-10
        translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-semibold truncate">{item.title}</p>
        <p className="text-orange-300 text-[10px] truncate">{item.galleryTitle}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-gray-200 animate-pulse" style={{ aspectRatio: "4/3" }} />
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center text-gray-400">
      <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <p className="font-semibold text-sm">No gallery items yet</p>
      <p className="text-xs mt-1">Upload images or videos from the admin panel to get started.</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <p className="text-gray-500 font-semibold text-sm mb-1">Failed to load gallery</p>
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

      const items = [];
      for (const gallery of data.galleries) {
        for (const media of gallery.media) {
          const displayTitle = media.fileName
            ? media.fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
            : gallery.title;
          items.push({
            _id:          media._id || media.publicId,
            url:          media.url,
            type:         media.type,
            title:        displayTitle,
            galleryTitle: gallery.title,
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

  return (
    <>
      <DonateButton />
      <WhatsAppButton />
      <Topnav />
      <Header />

      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src="/aboutBanner.png" alt="Gallery Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Gallery</h1>
          <div className="mt-3 text-white/80 text-sm flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
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

          {/* Simple uniform grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {loading
              ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
              : error
              ? <ErrorState message={error} onRetry={fetchGallery} />
              : flatItems.length === 0
              ? <EmptyState />
              : flatItems.map((item, i) => (
                  <GalleryCard key={item._id || i} item={item} />
                ))
            }
          </div>

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