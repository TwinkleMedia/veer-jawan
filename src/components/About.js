"use client"
import React from "react"

import { useEffect, useRef, useState } from "react";
const stats = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        ),
        value: 660,
        suffix: "",
        label: "Team Members",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M12 2l2.9 8.6H23l-7.3 5.4 2.9 8.6L12 19.3l-6.6 5.3 2.9-8.6L1 10.6h8.1z" />
            </svg>
        ),
        value: 360,
        suffix: "+",
        label: "Honoring Martyrs",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M16.5 13c-.83 0-2.5.67-2.5 2v1.5c0 .28.22.5.5.5h4c.28 0 .5-.22.5-.5V15c0-1.33-1.67-2-2.5-2zm-9 0C6.67 13 5 13.67 5 15v1.5c0 .28.22.5.5.5h4c.28 0 .5-.22.5-.5V15c0-1.33-1.67-2-2.5-2zM12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm5.5-3c.83 0 1.5-.67 1.5-1.5S18.33 6 17.5 6 16 6.67 16 7.5 16.67 9 17.5 9zm-11 0C7.33 9 8 8.33 8 7.5S7.33 6 6.5 6 5 6.67 5 7.5 5.67 9 6.5 9z" />
            </svg>
        ),
        value: 30,
        suffix: "+",
        label: "Experienced",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                <circle cx="12" cy="12" r="10" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13H11v-2h2v2zm0-4H11V7h2v4z" />
                {/* smiley */}
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
        ),
        value: 20,
        suffix: "",
        label: "Projects Done",
    },
];

// Smiley icon for last card
const SmileyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
);

const HandshakeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M11 14H9C9 9.03 13.03 5 18 5v2c-3.87 0-7 3.13-7 7zm4 0c0-2.76 2.24-5 5-5v-2c-3.87 0-7 3.13-7 7h2z" />
        <path d="M21.88 13.96l-3.57-3.57a1.5 1.5 0 00-2.12 0l-.71.71a1.5 1.5 0 01-2.12 0l-.35-.35a1.5 1.5 0 000-2.12l.35-.35a1.5 1.5 0 000-2.12L9.68 2.59a1.5 1.5 0 00-2.12 0L4.1 6.05A1.5 1.5 0 004.1 8.17l3.57 3.57c.59.59 1.54.59 2.12 0l.35-.35c.59-.59 1.54-.59 2.12 0l.35.35c.59.59.59 1.54 0 2.12l-.71.71c-.59.59-.59 1.54 0 2.12l3.57 3.57c.59.59 1.54.59 2.12 0l3.46-3.46c.59-.59.59-1.54.01-2.13z" />
    </svg>
);

function useCountUp(target, duration = 1500, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

function StatCard({ icon, value, suffix, label, delay, animate }) {
    const count = useCountUp(value, 1400, animate);

    return (
        <div
            className="flex flex-col items-center justify-center bg-white rounded-xl p-6 sm:p-8 shadow-md gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
            }}
        >
            <div className="text-orange-500">{icon}</div>
            <span className="text-3xl sm:text-4xl font-extrabold text-green-800 leading-none tracking-tight">
                {animate ? count : 0}
                {suffix}
            </span>
            <span className="text-sm sm:text-base text-gray-600 font-medium text-center">
                {label}
            </span>
        </div>
    );
}
export default function About() {

    const ref = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const icons = [
        // Person icon
        <svg key="person" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>,
        // Star icon
        <svg key="star" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M12 2l2.9 8.6H23l-7.3 5.4 2.9 8.6L12 19.3l-6.6 5.3 2.9-8.6L1 10.6h8.1z" />
        </svg>,
        <HandshakeIcon key="handshake" />,
        <SmileyIcon key="smiley" />,
    ];
    return (
        <>
            <section className="relative w-full">

                {/* Background */}
                <div className="absolute inset-0 -z-10">
                    <img
                        src="/flag.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/80"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12">

                    {/* Top Section */}
                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* Left Content */}
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-3">
                                Welcome to{" "}
                                <span className="text-orange-600 font-bold">
                                    Veer Jawan Foundation
                                </span>
                            </h2>

                            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                                The Veer Jawan Foundation is a non-profit organization
                                dedicated to supporting the families of Indian armed forces
                                personnel who have sacrificed their lives for the nation.
                                It provides financial assistance, addresses the needs of
                                martyrs families, and organizes awareness events to honor
                                their sacrifices.
                            </p>
                        </div>

                        {/* Right Video */}
                        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/nuRCfL_bNmo?si=e27zYCQW3AcB47MA"
                                title="YouTube video player"
                                style={{ border: "none" }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Bottom Card Section */}
                    <div
                        className="mt-12 bg-white rounded-lg shadow-md p-6"
                        style={{ borderTop: "4px solid #f97316", borderBottom: "4px solid #16a34a" }}
                    >
                        <div className="grid lg:grid-cols-2 gap-8">

                            {/* Left Text */}
                            <div>
                                <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    Jai Hind &#127470;&#127475;
                                </h3>

                                <p className="text-orange-600 font-semibold mb-3">
                                    Dear fellow citizens,
                                </p>

                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    Our nation joyfully celebrates a myriad of festivals,
                                    from Diwali to Holi, in the warm embrace of our families.
                                    However, we must not forget the incredible sacrifices
                                    made by our soldiers.
                                </p>

                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    They brave the harshest conditions, from the -70-degree cold of Siachen
                                    to the scorching 60-degree heat of the desert, all in service to our nation.
                                    Tragically, some make the ultimate sacrifice, leaving their families in need.
                                    While thousands join in paying respects during their final journey, the families
                                    left behind often face neglect. The government&apos;s initial support, though
                                    well-intentioned, is often insufficient. These brave soldiers, many hailing from
                                    farming families, leave behind parents and children who struggle to make ends meet.
                                    To address this pressing issue, we&apos;ve established the &quot;Veer Jawan Foundation.&quot;
                                    Our mission is to honor and support the families of these courageous soldiers who have
                                    given their all for our nation. We provide financial assistance, offer solutions to their
                                    problems, and recognize them on public platforms. We invite you to stand with us. Will you
                                    support our cause to help these families in need, who have sacrificed so much for our country?
                                </p>

                                <h4 className="font-semibold text-blue-900 mt-4 mb-2">
                                    Our Mission :
                                </h4>

                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>&#10004; Provide Financial Assistance</li>
                                    <li>&#10004; Offer Guidance &amp; Rehabilitation Programs</li>
                                    <li>&#10004; Empower &amp; Uplift Bereaved Families</li>
                                </ul>
                            </div>

                            {/* Right Hindi Quote */}
                            <div className="bg-gray-100 p-6 rounded-lg text-gray-700 text-sm leading-relaxed">
                                 <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    *जय हिंद!
                                </h3>
                                <p className="text-4xl text-gray-400 mb-4">&ldquo;</p>

                                <p className="mb-4">
                                    मेरे प्यारे देशवासियों आप सब जानते हैं की हम हम सब दिवाली से लेकर होली तक सारे त्यौहार अपने परिवार के साथ बड़े ही मौज मस्ती के साथ मनाते हैं l लेकिन यह सब तब मुमकिन है जब देश सुरक्षित है, हमारे देश के जांबाज जवान अपना घर परिवार छोड़कर सियाचिन में माइनस 70 डिग्री से अधिकतम तापमान 60 डिग्री रेगिस्तान की तपती हुवी गर्मी में में अपना कर्तव्य निभाते हैं, और यह जवान अपना कर्तव्य निभाते वक्त अपने देश के लिए सर्वोच्च बलिदान दे जाते हैं और पीछे अकेला रह जाता है इनका अपना परिवार !!!
                                </p>

                                <p>
                                    इनकी अंतिम यात्रा में हजारों की तादाद में लोग आते हैं लेकिन बाद में उनके परिवार की तरफ कोई मूड करके भी नहीं देखता, किसान परिवार मे पैदा होने वाले यह हमारे जांबाज जवान के परिवार को सरकार चंद रूपये दे करके भूल जाती है l वीर नारी वीर माता पिता और उनके बच्चों को दर-दर की ठोकरें खानी पड़ते हैं | हमारे देश के लिए अपना सर्वोच्च बलिदान देने वाले जांबाज जवानों के परिवार को सम्मान देने के लिए और उनकी समस्याओं को हल करने के लिए उनके हर दुख दर्द में खड़ा होने के लिए हमने "वीर जवान फाउंडेशन" का गठन किया, जिसके जरिए हम उन्हें बड़े मंच पर सम्मानित करके आर्थिक मदद भी करते हैं और उनकी हर समस्या में हम सदैव उनका साथ देते है l क्या आप सब भी हमारा साथ देंगे ???*
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <section
                ref={ref}
                className="w-full bg-green-800 px-4 py-8 sm:py-10 mb-4"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, i) => (
                        <StatCard
                            key={i}
                            icon={icons[i]}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            delay={i * 120}
                            animate={animate}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}