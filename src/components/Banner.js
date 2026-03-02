"use client";

import { useState, useEffect, useRef } from "react";
import './style.css'

const SLIDES = [
    {
        src: "/banner1.webp",
    },
    {
        src: "/banner2.png",

    },
    {
        src: "/banner3.png",

    },
    {
        src: "/banner4.webp",

    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    const goTo = (index) => {
        if (animating || index === current) return;
        setAnimating(true);
        setPrev(current);
        setCurrent(index);
        setTimeout(() => {
            setPrev(null);
            setAnimating(false);
        }, 700);
    };

    const next = () => goTo((current + 1) % SLIDES.length);
    const prev_ = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

    useEffect(() => {
        if (paused) return;

        const id = setTimeout(() => {
            setCurrent(c => (c + 1) % SLIDES.length);
        }, 5000);

        return () => clearTimeout(id);
    }, [current, paused]);

    return (
        <>
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "clamp(300px, 52vw, 572px)" }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                aria-label="Hero Banner"
            >
                {/* Slides */}
                {SLIDES.map((slide, i) => {
                    const isActive = i === current;
                    const isExiting = i === prev;
                    if (!isActive && !isExiting) return null;
                    return (
                        <div
                            key={i}
                            className={`absolute inset-0 ${isActive ? "slide-enter" : "slide-exit"}`}
                            style={{ zIndex: isActive ? 2 : 1 }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.src}
                                    alt={slide.title}
                                    className="w-full h-full object-cover object-center"
                                    style={{ filter: "brightness(1)" }}
                                    onError={(e) => {
                                        // Fallback gradient if image not found
                                        e.target.style.display = "none";
                                    }}
                                />
                            </div>
                        </div>

                    );
                })}

                {/* Left / Right Arrows */}
                <button
                    onClick={prev_}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#FF671F] border border-white/20 hover:border-[#FF671F] flex items-center justify-center text-white hover:text-[#0d1b36] transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    aria-label="Previous slide"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#FF671F] border border-white/20 hover:border-[#FF671F] flex items-center justify-center text-white hover:text-[#0d1b36] transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    aria-label="Next slide"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${i === current
                                ? "w-6 sm:w-8 h-2 bg-[#FF671F]"
                                : "w-2 h-2 bg-white/40 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Progress bar */}
                {!paused && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/10">
                        <div
                            key={current}
                            className="progress-bar h-full bg-gradient-to-r from-[#FF671F] to-[#046A38]"
                        />
                    </div>
                )}

                {/* Slide counter */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20 lato text-white/50 text-xs font-bold tracking-widest">
                    <span className="text-[#FF671F]">{String(current + 1).padStart(2, "0")}</span>
                    <span className="mx-1">/</span>
                    {String(SLIDES.length).padStart(2, "0")}
                </div>
            </section>
        </>
    );
}