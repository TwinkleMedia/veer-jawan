"use client";

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Topnav } from '@/components/Topnav'
import { Mail, MapPin, Phone } from 'lucide-react'

import Link from 'next/link'
import React, { useState } from 'react'

export default function martyr() {


    return (
        <>
            <Topnav />
            <Header />
            {/* Hero Section */}
            <div className='relative w-full h-[350px] md:h-[450px] lg:h-[550px]'>
                {/* background Image */}
                <img src="/aboutBanner.png" alt="About Us Hero" className="w-full h-full object-cover" />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center'>
                    <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">Veer Jawan</h1>
                    {/* breadcrumb */}
                    <div className='mt-4 text-[#293C86] text-sm md:text-base'>
                        <Link href="/" className=" inline-block">
                            Home
                        </Link>
                        <span className='mx-2'>/</span>
                        <span>Veer Jawan</span>
                    </div>
                </div>
            </div>
            <section className='w-full py-10 px-4'>
                <div className='max-w-7xl mx-auto py-16 px-4'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {/* card 1 */}
                        <div className='flex flex-col'>
                            <div className='relative w-full h-[250px] overflow-hidden flex flex-col justify-center items-center gap-4 text-white rounded-t-md'>
                                <img
                                    src="/martyr.png"
                                    alt="Banner"
                                    className="absolute inset-0 w-full h-full object-cover blur-sm"
                                />
                                {/* overlay */}
                                <div className="absolute inset-0 bg-black/40"></div>
                                <h3 className='relative z-10 font-bold text-xl px-3 text-[#fff]'>MARTYR HAVALDAR SUJIT NAVNATH KIDRAT</h3>
                            </div>
                            <a
                                href="havaldar-sujit-navnath-kidrat.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 text-center bg-[#046A38] text-white hover:bg-[#03502A] transition-colors duration-200 rounded-b-md mt-auto"
                            >
                                View Details
                            </a></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
