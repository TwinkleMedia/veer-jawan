import CertificatesSection from '@/components/certificates'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Topnav } from '@/components/Topnav'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import DonateButton from '@/components/DonateButton'
import WhatsAppButton from '@/components/WhatsAppButton'
import EventPopupButton from '@/components/EventPopupButton'

export default function About() {
    return (
        <>
            <DonateButton/>
            <EventPopupButton />
            <WhatsAppButton/>
            <Topnav />
            <Header />

            {/* Hero Section */}
            <div className='relative w-full h-[350px] md:h-[450px] lg:h-[550px]'>
                {/* background Image */}
                <img src="/aboutBanner.png" alt="About Us Hero" className="w-full h-full object-cover" />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center'>
                    <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">About Us</h1>
                    {/* breadcrumb */}
                    <div className='mt-4 text-[#293C86] text-sm md:text-base'>
                        <Link href="/" className=" inline-block">
                            Home
                        </Link>
                        <span className='mx-2'>/</span>
                        <span>About</span>
                    </div>
                </div>
            </div>
            {/* Our Mission */}
            <section className="w-full py-16 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                        {/* Left Content */}
                        <div>
                            <h2 className="text-xl md:text-3xl font-bold text-[#2d3e8b] mb-4">
                                OUR MISSION
                            </h2>

                            <p className="text-gray-700 md:text-lg mb-6 leading-relaxed">
                                Veerjawan Foundation: Honoring soldiers' sacrifice by supporting their families.
                                Your donations provide vital assistance, ensuring heroes are never forgotten.
                                Join us in making a lasting impact.
                            </p>

                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="text-green-600 text-lg">✔</span>
                                    <span className="text-lg text-[#FF671F]">Provide Financial Assistance</span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <span className="text-green-600 text-lg">✔</span>
                                    <span className="text-lg text-[#FF671F]">Offer Guidance & Rehabilitation Programs</span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <span className="text-green-600 text-lg">✔</span>
                                    <span className="text-lg text-[#FF671F]">Empower & Uplift Bereaved Families</span>
                                </li>
                            </ul>
                        </div>

                        {/* Right Image */}
                        <div className="w-full">
                            <img
                                src="/post1.png"   // your right-side image
                                alt="Mission"
                                className="w-full rounded-lg shadow-lg object-cover"
                            />
                        </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

                        <div className="h-full bg-gray-300 rounded-xl shadow-md">
                            <img src="/post2.png" alt="Post 2" className="w-full h-full object-cover rounded-xl" />
                        </div>

                        <div className="h-full bg-gray-300 rounded-xl shadow-md">
                            <img src="/post3.png" alt="Post 3" className="w-full h-full object-cover rounded-xl" />
                        </div>

                        <div className="h-full bg-gray-300 rounded-xl shadow-md">
                            <img src="/post4.png" alt="Post 4" className="w-full h-full object-cover rounded-xl" />
                        </div>

                    </div>

                </div>
            </section>
            {/* Our Vision */}
            <section className="w-full py-16 bg-[#f5f5f5]">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Section Heading */}
                    <h2 className="text-xl md:text-3xl font-bold text-[#2d3e8b] mb-4 text-center">
                         OUR VISION
                    </h2>
                    <p className="text-center leading-relaxed text-base md:text-lg max-w-3xl mx-auto mb-10">
                        To build a structured and sustainable support system that ensures long-term stability, access to opportunities, and continuous development for the families we serve.
                    </p>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/vission1.png"
                                alt="Empowering Families"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                                Respect For Martyrs
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Tribute to the brave souls who sacrificed their lives for our nation and freedom.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/vission2.png"
                                alt="Financial Support"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                                Family Support
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Standing beside the families of our brave martyrs, ensuring they receive care, dignity, and a secure future
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/vission3.png"
                                alt="Rehabilitation"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                                Patriotic Values
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                A true love for the nation is shown through unity, sacrifice, integrity, and a constant dedication to its progress and honor
                            </p>
                        </div>

                    </div>
                </div>
                <div>
                    <button className="px-6 py-3 mt-10 bg-[#FF671F] text-white rounded hover:bg-[#2B4DD0] transition-colors duration-200 block mx-auto">
                        <Link href="/donate" className="block">
                            Donate Now
                        </Link>
                    </button>
                </div>
            </section>

            {/* Our Values */}
            <section className="relative w-full py-16 bg-[#fff]">
                {/* border bottom */}
                <div className="absolute bottom-0 left-0 w-full flex flex-col h-2">
                    <div className="flex-1 bg-orange-500" />
                    <div className="flex-1 bg-white border-t border-b border-gray-200" />
                    <div className="flex-1 bg-green-600" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Section Heading */}
                    <h2 className="text-xl md:text-3xl font-bold text-[#2d3e8b] mb-4 text-center">
                         OUR VALUES
                    </h2>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Card 1 */}
                        <div className="bg-[#FBFBFB] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/values1.png"
                                alt="Empowering Families"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#FF671F] mb-2">
                                Honour & Respect
                            </h3>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#FBFBFB] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/values2.png"
                                alt="Financial Support"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#FF671F] mb-2">
                                Integrity & Transparency
                            </h3>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#FBFBFB] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/values3.png"
                                alt="Rehabilitation"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#FF671F] mb-2">
                                Compassion & Care
                            </h3>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-[#FBFBFB] rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                            <img
                                src="/values4.png"
                                alt="Rehabilitation"
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-lg font-semibold text-[#FF671F] mb-2">
                                Commitment & Dedication
                            </h3>
                        </div>

                    </div>
                </div>
            </section>
            {/* cta */}
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
            <CertificatesSection/>
            <Footer />
        </>
    )
}