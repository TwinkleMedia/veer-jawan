"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import Link  from "next/link"
// ── Icons ─────────────────────────────────────────────────────────────────────
const CalIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0 text-orange-500" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1 6h12M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)
const ClockIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0 text-orange-500" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)
const PinIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0 text-orange-500" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="7" cy="5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
)

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) }
    catch { return d }
}
const formatTime = (t) => {
    try {
        const [h, m] = t.split(":")
        const hr = parseInt(h)
        return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`
    } catch { return t }
}
const getDay   = (d) => { try { return new Date(d).getDate() } catch { return d } }
const getMonth = (d) => { try { return new Date(d).toLocaleString("en-IN", { month: "short" }).toUpperCase() } catch { return "" } }

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = () => (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row" style={{ height: 300 }}>
        <div className="w-full md:w-5/12 h-48 md:h-full bg-gray-200 animate-pulse shrink-0" />
        <div className="flex-1 p-5 space-y-3 flex flex-col justify-center">
            {[160, 110, 90, 90].map((w, i) => (
                <div key={i} className="h-3.5 bg-gray-200 rounded-lg animate-pulse" style={{ width: w }} />
            ))}
            <div className="h-9 bg-gray-100 rounded-xl animate-pulse mt-2" />
        </div>
    </div>
)

// ── Main ──────────────────────────────────────────────────────────────────────
export default function EventsCarousel() {
    const [events,    setEvents]    = useState([])
    const [loading,   setLoading]   = useState(true)
    const [current,   setCurrent]   = useState(0)
    const [dragging,  setDragging]  = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const [dragDelta, setDragDelta] = useState(0)
    const autoRef    = useRef(null)
    const viewportRef = useRef(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
            .then(r => r.json())
            .then(d => { if (d.success) setEvents(d.data) })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const resetAuto = useCallback(() => {
        clearInterval(autoRef.current)
        if (events.length > 1)
            autoRef.current = setInterval(() => setCurrent(c => (c + 1) % events.length), 4500)
    }, [events.length])

    useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current) }, [resetAuto])

    const goTo = (idx) => { setCurrent((idx + events.length) % events.length); resetAuto() }

    const onDragStart = (x) => { setDragging(true); setDragStart(x); setDragDelta(0); clearInterval(autoRef.current) }
    const onDragMove  = (x) => { if (!dragging) return; setDragDelta(x - dragStart) }
    const onDragEnd   = () => {
        if (!dragging) return
        setDragging(false)
        if (dragDelta < -60) goTo(current + 1)
        else if (dragDelta > 60) goTo(current - 1)
        else resetAuto()
        setDragDelta(0)
    }

    return (
        <section className="relative w-full bg-[#FAFAF8] overflow-hidden">

            {/* Flag stripe top */}
            <div className="w-full flex flex-col" style={{ height: 6 }}>
                <div className="flex-1 bg-orange-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-green-700" />
            </div>

            {/* Header */}
            <div className="text-center px-4 pt-8 pb-5">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-1">What's happening</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">Upcoming Events</h2>
                <div className="w-10 h-0.5 bg-orange-400 mx-auto mt-2.5 rounded-full" />
                <p className="text-xs text-gray-400 mt-2 italic">Join us and make a difference</p>
            </div>

            {loading ? (
                <div className="px-4 pb-8"><Skeleton /></div>
            ) : events.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-10">No events scheduled yet.</p>
            ) : (
                <>
                    {/* Carousel row — constrained to max-w-2xl */}
                    <div className="flex items-center justify-center gap-2 px-3 pb-4 max-w-3xl mx-auto">

                        {/* Prev */}
                        {events.length > 1 && (
                            <button onClick={() => goTo(current - 1)} aria-label="Previous"
                                className="shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}

                        {/* Viewport */}
                        <div
                            ref={viewportRef}
                            className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl"
                            style={{ height: "clamp(280px, 56vw, 320px)" }}
                            onMouseDown={e => onDragStart(e.clientX)}
                            onMouseMove={e => onDragMove(e.clientX)}
                            onMouseUp={onDragEnd}
                            onMouseLeave={onDragEnd}
                            onTouchStart={e => onDragStart(e.touches[0].clientX)}
                            onTouchMove={e => { e.preventDefault(); onDragMove(e.touches[0].clientX) }}
                            onTouchEnd={onDragEnd}
                        >
                            {events.map((ev, idx) => {
                                const offset = idx - current
                                const vpW = viewportRef.current?.offsetWidth || 320
                                const tx = offset * 100 + (offset === 0 ? (dragDelta / vpW) * 100 : 0)
                                const isActive = idx === current
                                const isAdj    = Math.abs(offset) === 1

                                return (
                                    <div
                                        key={ev._id}
                                        style={{
                                            transform: `translateX(${tx}%) scale(${isActive ? 1 : 0.9})`,
                                            opacity: isActive ? 1 : isAdj ? 0.3 : 0,
                                            zIndex: isActive ? 3 : isAdj ? 2 : 1,
                                            pointerEvents: isActive ? "auto" : "none",
                                            transition: dragging && isActive ? "opacity 0.1s" : "all 0.42s cubic-bezier(0.4,0,0.2,1)",
                                            willChange: "transform, opacity",
                                        }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        {/* ── Card: stacked on mobile, side-by-side on md+ ── */}
                                        <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row select-none">

                                            {/* Image — full width on mobile, 40% on desktop */}
                                            <div className="relative w-full md:w-5/12 shrink-0 h-36 md:h-full">
                                                <img
                                                    src={ev.image?.url}
                                                    alt={ev.title}
                                                    draggable={false}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />

                                                {/* Date badge */}
                                                <div className="absolute top-2.5 left-2.5 bg-orange-500 rounded-xl px-2 py-1 flex flex-col items-center shadow-md shadow-orange-300/40">
                                                    <span className="text-white font-bold text-base leading-none">{getDay(ev.date)}</span>
                                                    <span className="text-orange-100 text-[9px] font-bold tracking-widest mt-0.5">{getMonth(ev.date)}</span>
                                                </div>

                                                {/* Live pill — top right */}
                                                <div className="absolute top-2.5 right-2.5">
                                                    <span className="bg-black/30 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20">
                                                        Live Event
                                                    </span>
                                                </div>

                                                {/* Title overlay — only on mobile (hidden on md) */}
                                                <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 md:hidden">
                                                    <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow">
                                                        {ev.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-1 px-4 pt-3 pb-3.5 min-w-0 overflow-hidden">

                                                {/* Title — desktop only */}
                                                <h3 className="hidden md:block text-[#1E3A8A] font-bold text-base leading-snug line-clamp-2 mb-2.5">
                                                    {ev.title}
                                                </h3>

                                                {/* Meta */}
                                                <div className="space-y-1.5 mb-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <CalIcon />
                                                        <span className="text-xs text-gray-600 truncate">{formatDate(ev.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <ClockIcon />
                                                        <span className="text-xs text-gray-600">{formatTime(ev.time)}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2 min-w-0">
                                                        <PinIcon />
                                                        <span className="text-xs text-gray-600 line-clamp-1 min-w-0">{ev.address}</span>
                                                    </div>
                                                </div>

                                                <div className="w-full h-px bg-gray-100 mb-2" />

                                                {/* Description */}
                                                {ev.description && (
                                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-2">
                                                        {ev.description}
                                                    </p>
                                                )}

                                                {/* CTA */}
                                                <a href="/events"
                                                    className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wide transition-all shadow-sm whitespace-nowrap">
                                                    Register / Learn More
                                                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Next */}
                        {events.length > 1 && (
                            <button onClick={() => goTo(current + 1)} aria-label="Next"
                                className="shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 active:scale-95 transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Dots + counter */}
                    {events.length > 1 && (
                        <div className="flex flex-col items-center gap-1 pb-6">
                            <div className="flex items-center gap-1.5">
                                {events.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        aria-label={`Event ${i + 1}`}
                                        style={{ width: i === current ? 22 : 7 }}
                                        className={`h-1.5 rounded-full border-0 cursor-pointer transition-all duration-300 ${
                                            i === current ? "bg-orange-500" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 font-medium">
                                <span className="text-orange-500 font-bold">{current + 1}</span>
                                <span> / {events.length}</span>
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Flag stripe bottom */}
            <div className="w-full flex flex-col" style={{ height: 6 }}>
                <div className="flex-1 bg-orange-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-green-700" />
            </div>
        </section>
    )
}