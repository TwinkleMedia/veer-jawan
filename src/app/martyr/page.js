"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DonateButton from "@/components/DonateButton";
import WhatsAppButton from "@/components/WhatsAppButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PAGE_SIZE = 8;

// ─── YouTube Helpers ──────────────────────────────────────────────────────────

/**
 * Extracts a YouTube video ID from any standard YouTube URL format:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 */
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1];
    if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1];
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

/** Returns the best-quality thumbnail URL for a YouTube video ID. */
function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Martyr() {
  const [martyrs, setMartyrs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMartyrs = async (pageNum, append = false) => {
    try {
      if (pageNum === 1) setInitialLoading(true);
      else setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/martyrs?page=${pageNum}&limit=${PAGE_SIZE}`,
      );
      if (!res.ok) throw new Error("Failed to fetch martyrs");

      const json = await res.json();
      if (json.success) {
        setMartyrs((prev) => (append ? [...prev, ...json.data] : json.data));
        setTotal(json.total);
      } else {
        throw new Error(json.message || "Error fetching data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMartyrs(1, false);
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMartyrs(nextPage, true);
  };

  const hasMore = martyrs.length < total;

  return (
    <>
      <DonateButton />
      <WhatsAppButton />
      <Topnav />
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
        <img
          src="/aboutBanner.png"
          alt="Veer Jawan Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">
            Veer Jawan
          </h1>
          <div className="mt-4 text-[#293C86] text-sm md:text-base">
            <Link href="/" className="inline-block hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Veer Jawan</span>
          </div>
        </div>
      </div>

      {/* Martyrs Section */}
      <section
        className="relative w-full py-16 px-4 min-h-[500px]"
        style={{
          backgroundImage: "url('./bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Initial Loading Skeleton */}
          {initialLoading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse">
                  <div className="w-full h-[250px] bg-gray-300 rounded-t-md" />
                  <div className="h-12 bg-gray-400 rounded-b-md" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !initialLoading && (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg font-semibold">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  fetchMartyrs(1, false);
                }}
                className="mt-4 px-6 py-2 bg-[#046A38] text-white rounded-full hover:bg-[#03502A] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!initialLoading && !error && martyrs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl font-semibold">
                No martyrs found.
              </p>
            </div>
          )}

          {/* Cards Grid */}
          {!initialLoading && !error && martyrs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 sm:px-0">
                {martyrs.map((martyr) => (
                  <MartyrCard key={martyr._id} martyr={martyr} />
                ))}
              </div>

              {/* Show More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleShowMore}
                    disabled={loading}
                    className="px-10 py-3 bg-[#046A38] text-white text-base font-semibold rounded-full
                               hover:bg-[#03502A] active:scale-95 transition-all duration-200
                               disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Show More"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

// ─── Martyr Card ──────────────────────────────────────────────────────────────

function MartyrCard({ martyr }) {
  const [open, setOpen] = useState(false);
  const photoUrl = martyr.photo?.url || "/martyr-placeholder.png";

  return (
    <>
      <div className="flex flex-col rounded-md overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        {/* Image + Name */}
        <div className="relative w-full h-[350px] overflow-hidden flex flex-col justify-end">
          <img
            src={photoUrl}
            alt={martyr.fullName}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.src = "/martyr-placeholder.png"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 bg-[#E66131]/80 px-3 py-2 text-center">
            <h3 className="font-bold text-sm text-white uppercase leading-snug tracking-wide">
              MARTYR {martyr.fullName.toUpperCase()}
            </h3>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setOpen(true)}
          className="block w-full py-3 text-center bg-[#22841D] text-white font-semibold
                     hover:bg-[#046A38] transition-colors duration-200 rounded-b-md"
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      {open && <MartyrModal martyr={martyr} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Martyr Modal ─────────────────────────────────────────────────────────────

function MartyrModal({ martyr, onClose }) {
  const photoUrl = martyr.photo?.url || "/martyr-placeholder.png";
  const certUrl = martyr.certificate?.url || null;

  // ── YouTube ──
  const youtubeId = getYouTubeId(martyr.youtubeLink);
  const youtubeThumbnail = youtubeId ? getYouTubeThumbnail(youtubeId) : null;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const fmt = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(3px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white
                     flex items-center justify-center text-base hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Hero Photo */}
        <div className="relative h-[400px] sm:h-[500px] bg-gray-100 flex items-center justify-center rounded-t-xl">
          <img
            src={photoUrl}
            alt={martyr.fullName}
            className="h-full w-auto object-contain"
            onError={(e) => { e.target.src = "/martyr-placeholder.png"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
            <h2 className="text-white text-xl font-semibold leading-snug">
              Martyr {martyr.fullName}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {martyr.unit}&nbsp;·&nbsp;Martyred {fmt(martyr.martyrdomDate)}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-6">

          {/* ── Service Details ── */}
          <ModalSection title="Service Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InfoItem label="Unit / Regiment" value={martyr.unit} />
              <InfoItem label="Date of Enrollment" value={fmt(martyr.enrollmentDate)} />
              <InfoItem label="Date of Birth" value={fmt(martyr.dob)} />
              <InfoItem label="Date of Martyrdom">
                <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {fmt(martyr.martyrdomDate)}
                </span>
              </InfoItem>
              <div className="sm:col-span-2">
                <InfoItem label="Place of Martyrdom" value={martyr.placeOfMartyrdom} />
              </div>
            </div>
          </ModalSection>

          {/* ── Incident Description ── */}
          <ModalSection title="Incident Description">
            <div className="border-l-4 border-[#046A38] bg-green-50 pl-4 pr-3 py-3 rounded-r-lg text-sm leading-relaxed text-gray-700">
              {martyr.incidentDescription}
            </div>
          </ModalSection>

          {/* ── Family ── */}
          {(martyr.wifeName || martyr.numberOfSons != null || martyr.parentsDetails) && (
            <ModalSection title="Family">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {martyr.wifeName && <InfoItem label="Spouse" value={martyr.wifeName} />}
                {martyr.numberOfSons != null && <InfoItem label="Number of Sons" value={martyr.numberOfSons} />}
                {martyr.parentsDetails && (
                  <div className="sm:col-span-2">
                    <InfoItem label="Parents" value={martyr.parentsDetails} />
                  </div>
                )}
              </div>
            </ModalSection>
          )}

          {/* ── Address ── */}
          <ModalSection title="Address">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InfoItem label="Village" value={martyr.village} />
              <InfoItem label="Post Office" value={martyr.postOffice} />
              <InfoItem label="Taluka" value={martyr.taluka} />
              <InfoItem label="District" value={martyr.district} />
            </div>
          </ModalSection>

          {/* ── ADDED: YouTube Video Section ── */}
          {youtubeId && (
            <ModalSection title="Video">
              {/*
                Clicking anywhere on this block opens YouTube in a new tab.
                The thumbnail is fetched directly from YouTube's CDN — no API key needed.
              */}
              <a
                href={martyr.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                aria-label={`Watch video about ${martyr.fullName} on YouTube`}
              >
                {/* Thumbnail */}
                <img
                  src={youtubeThumbnail}
                  alt={`YouTube video about ${martyr.fullName}`}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to medium quality if hqdefault isn't available
                    e.target.src = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
                  }}
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center
                                  shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {/* Triangle play icon */}
                    <svg
                      className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* "Watch on YouTube" label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3
                                bg-gradient-to-t from-black/80 to-transparent">
                  {/* YouTube wordmark icon */}
                  <svg className="w-5 h-5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                    Watch on YouTube
                  </span>
                </div>
              </a>
            </ModalSection>
          )}

          {/* ── Certificate Button ── */}
          {certUrl && (
            <a
              href={certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#046A38] text-white font-semibold rounded-lg hover:bg-[#03502A] transition-colors duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="18" />
                <line x1="15" y1="15" x2="12" y2="18" />
              </svg>
              View / Download Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Helpers ─────────────────────────────────────────────────────────

function ModalSection({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 pb-1.5 border-b border-gray-100">
        {title}
      </p>
      {children}
    </div>
  );
}

function InfoItem({ label, value, children }) {
  return (
    <div>
      <p className="text-[11px] text-gray-400 mb-0.5 font-medium">{label}</p>
      {children ?? (
        <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
      )}
    </div>
  );
}