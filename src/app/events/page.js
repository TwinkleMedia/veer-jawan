"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Topnav } from "@/components/Topnav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(t) {
  if (!t) return "—";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hr12 = hour % 12 || 12;
  return `${hr12}:${m} ${ampm}`;
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="w-full flex-shrink-0 px-2 animate-pulse">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6 flex flex-col gap-3">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-full mt-2" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
          <div className="h-10 bg-gray-100 rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ event }) {
  const imageUrl = event.image?.url || event.image || "";

  return (
    <div className="w-full flex-shrink-0 px-2">
      <div
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* ── Full-bleed image ── */}
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-10 h-10 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Date badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
            <svg className="w-3.5 h-3.5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {formatDate(event.date)}
            </span>
          </div>

          {/* Tricolor bottom accent bar */}
          <div className="absolute bottom-0 left-0 right-0 flex h-[3px]">
            <div className="flex-1 bg-orange-500" />
            <div className="flex-1 bg-white/60" />
            <div className="flex-1 bg-green-600" />
          </div>
        </div>

        {/* ── Details ── */}
        <div className="p-5">
          {/* Title */}
          <h3
            className="text-gray-900 font-bold text-lg leading-snug mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {event.title}
          </h3>

          {/* Time + Address */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {formatTime(event.time)}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-500 leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {event.address}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {event.description || "No description available."}
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex items-center gap-2">

            {/* Book Now — only if bookingLink exists */}
            {event.bookingLink && (
              <a
                href={event.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                </svg>
                Book Now
              </a>
            )}

            {/* Learn More — always shown */}
            <Link
              href="/events"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#293C86] hover:bg-[#1a2744] active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm"
            >
              Learn More
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page Wrapper ──────────────────────────────────────────────────────────────
function PageWrapper({ children }) {
  return (
    <>
      <Topnav />
      <Header />
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
        <img src="/aboutBanner.png" alt="Events Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">
            Events
          </h1>
          <div className="mt-4 text-[#293C86] text-sm md:text-base">
            <Link href="/" className="inline-block">Home</Link>
            <span className="mx-2">/</span>
            <span>Upcoming Events</span>
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function EventsCarousel() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef              = useRef(null);
  const total                 = events.length;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setEvents(data.data);
        } else {
          setError(data.message || "Failed to load events.");
        }
      } catch (err) {
        console.error("Fetch events error:", err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    if (!paused && total > 0) startTimer();
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer, total]);

  const goTo = (index) => { setCurrent(index); startTimer(); };
  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <PageWrapper>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>
      <section className="w-full bg-[#fafaf8] py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <SkeletonCard />
        </div>
      </section>
    </PageWrapper>
  );

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) return (
    <PageWrapper>
      <section className="w-full bg-[#fafaf8] py-20">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Try again
          </button>
        </div>
      </section>
    </PageWrapper>
  );

  // ── Empty ─────────────────────────────────────────────────────────────────
  if (events.length === 0) return (
    <PageWrapper>
      <section className="w-full bg-[#fafaf8] py-20">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
            No upcoming events at the moment.
          </p>
        </div>
      </section>
    </PageWrapper>
  );

  // ── Carousel ──────────────────────────────────────────────────────────────
  return (
    <PageWrapper>
      <DonateButton />
      <WhatsAppButton />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>

      <section
        className="w-full bg-[#fafaf8] py-12 md:py-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="max-w-2xl mx-auto px-4">

          {/* Track */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {/* Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous event"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10
                    w-9 h-9 rounded-full bg-white border border-gray-200
                    flex items-center justify-center text-gray-400
                    hover:border-orange-300 hover:text-orange-500
                    transition-all duration-200 active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next event"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10
                    w-9 h-9 rounded-full bg-white border border-gray-200
                    flex items-center justify-center text-gray-400
                    hover:border-orange-300 hover:text-orange-500
                    transition-all duration-200 active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots + counter */}
          {total > 1 && (
            <div className="flex flex-col items-center gap-3 mt-5">
              <div className="flex items-center gap-2">
                {events.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to event ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-orange-500"
                        : "w-2 h-2 bg-gray-300 hover:bg-orange-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {current + 1} / {total}
              </p>
            </div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
}