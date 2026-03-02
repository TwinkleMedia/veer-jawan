"use client"
import React, { useState } from "react"

const posts = [
    {
        id: 1,
        src: "/post1.png",
    },
    {
        id: 2,
        src: "/post2.png",
    },
    {
        id: 3,
        src: "/post3.png",
    },
    {
        id: 4,
        src: "/post4.png",
    },
    {
        id: 5,
        src: "/post5.png",
    },
    {
        id: 6,
        src: "/post6.png",
    },
]

export default function Latestpost() {
    const [lightbox, setLightbox] = useState(null)

    return (
        <>
            <section className="relative w-full py-10 px-4 bg-white mb-3">

                {/* Top Indian flag stripe */}
                <div className="absolute top-0 left-0 w-full flex flex-col h-2">
                    <div className="flex-1 bg-orange-500" />
                    <div className="flex-1 bg-white border-t border-b border-gray-200" />
                    <div className="flex-1 bg-green-600" />
                </div>

                {/* Bottom Indian flag stripe */}
                <div className="absolute bottom-0 left-0 w-full flex flex-col h-2">
                    <div className="flex-1 bg-orange-500" />
                    <div className="flex-1 bg-white border-t border-b border-gray-200" />
                    <div className="flex-1 bg-green-600" />
                </div>

                <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#293C86] mb-8">
                        Latest Post
                    </h2>

                    {/* Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                                onClick={() => setLightbox(post)}
                            >
                                <img
                                    src={post.src}
                                    alt={post.caption || "Gallery image"}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {post.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                                        <p className="text-white text-xs truncate">{post.caption}</p>
                                    </div>
                                )}
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>

                </div>

                {/* Lightbox */}
                {lightbox && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <div
                            className="relative max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-orange-400 transition-colors"
                                onClick={() => setLightbox(null)}
                            >
                                &times;
                            </button>
                            <img
                                src={lightbox.src}
                                alt={lightbox.caption}
                                className="w-full rounded-lg shadow-2xl object-contain max-h-[80vh]"
                            />
                            {lightbox.caption && (
                                <p className="text-white text-center mt-3 text-sm">{lightbox.caption}</p>
                            )}
                        </div>
                    </div>
                )}

            </section>
            <section className="w-full bg-white py-10 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3">

                    {/* Left Content */}
                    <div className="flex-1">
                        <p className="text-[#293C86] font-medium text-sm mb-1">
                            Want to join with us
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#293C86] mb-4">
                            Become a proud volunteer
                        </h2>

                        <div className="w-16 h-0.5 bg-gray-300 mb-4" />

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
                            When you bring together those who have, with those who have not - miracles happen.Become a time hero by volunteering with us. Meet new friends, gain new skills, get happiness and have fun!
                        </p>

                        <a
                            href="#"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded transition-colors duration-200"
                        >
                            Join Now
                        </a>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="relative w-full max-w-sm">

                            {/* Soldier silhouette image */}
                            <img
                                src="/soldier.png"
                                alt="Soldier saluting"
                                className="relative z-10 w-full object-contain max-h-full"
                            />

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}