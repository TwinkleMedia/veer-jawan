"use client";

import { useState, useEffect, useRef } from "react";
import './style.css'

export default function Banner() {

    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    // ✅ FIXED FETCH
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
                const data = await res.json();

                const formatted = data.map((item) => ({
                    src: item.imageUrl,
                }));

                setSlides(formatted);
            } catch (error) {
                console.error("Failed To Fetch banners", error);
            }
        };

        fetchBanners();
    }, []); // ✅ ALWAYS empty array

    useEffect(() => {
        if (paused || slides.length === 0) return;

        const id = setTimeout(() => {
            setCurrent(c => (c + 1) % slides.length);
        }, 5000);

        return () => clearTimeout(id);
    }, [current, paused, slides]);

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

    const next = () => {
        if (slides.length === 0) return;
        goTo((current + 1) % slides.length);
    };

    const prev_ = () => {
        if (slides.length === 0) return;
        goTo((current - 1 + slides.length) % slides.length);
    };

    return (
        <>
            <section
                className="relative w-full overflow-hidden"
                style={{ height: "clamp(350px, 70vw, 700px)" }} // ✅ Same as your original — height untouched
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                aria-label="Hero Banner"
            >
                {/* Slides */}
                {slides.map((slide, i) => {
                    const isActive = i === current;
                    const isExiting = i === prev;
                    if (!isActive && !isExiting) return null;

                    return (
                        <div
                            key={i}
                            className={`absolute inset-0 ${isActive ? "slide-enter" : "slide-exit"}`}
                            style={{ zIndex: isActive ? 2 : 1 }}
                        >
                            <div className="absolute inset-0">
                                {/* Blurred, zoomed copy fills all empty space — no black bars */}
                                <img
                                    src={slide.src}
                                    alt=""
                                    aria-hidden="true"
                                    className="w-full h-full object-cover object-center scale-110 blur-2xl"
                                />
                                {/* Full, uncropped image on top — nothing gets cut off */}
                                <img
                                    src={slide.src}
                                    alt="banner"
                                    className="absolute inset-0 w-full h-full object-contain object-center"
                                    style={{ filter: "brightness(1)" }}
                                />
                            </div>
                        </div>
                    );
                })}

                {/* Arrows */}
                <button
                    onClick={prev_}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#FF671F] border border-white/20 hover:border-[#FF671F] flex items-center justify-center text-white"
                >
                    ◀
                </button>

                <button
                    onClick={next}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#FF671F] border border-white/20 hover:border-[#FF671F] flex items-center justify-center text-white"
                >
                    ▶
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${
                                i === current
                                    ? "w-6 sm:w-8 h-2 bg-[#FF671F]"
                                    : "w-2 h-2 bg-white/40"
                            }`}
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

                {/* Counter */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20 text-white/50 text-xs font-bold">
                    <span className="text-[#FF671F]">
                        {String(current + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-1">/</span>
                    {String(slides.length).padStart(2, "0")}
                </div>
            </section>
        </>
    );
}