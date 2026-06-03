"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import DonateButton from "@/components/DonateButton";
import { Mail, MapPin, Phone } from "lucide-react";

import Link from "next/link";

export default function contact() {
  return (
    <>
      <DonateButton />
      <Topnav />
      <Header />
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px]">
        {/* background Image */}
        <img
          src="/aboutBanner.png"
          alt="About Us Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold text-center my-6 text-[#293C86]">
            Contact Us
          </h1>
          {/* breadcrumb */}
          <div className="mt-4 text-[#293C86] text-sm md:text-base">
            <Link href="/" className=" inline-block">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      {/* Contact Us */}
      <section className="w-full py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <MapPin className="w-8 h-8 text-[#FF671F] mb-2" />
              <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                Address
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                NL1B, Shatkar Apartment, LIG Building No. 58/6, 3rd Floor,
                Sector No. 10, Nerul West, Navi Mumbai, Maharashtra – 400706.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Mail className="w-8 h-8 text-[#FF671F] mb-2" />
              <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                Email Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                veerjawanfoundation05@gmail.com
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Phone className="w-8 h-8 text-[#FF671F] mb-2" />
              <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                +91 9653114082 / +91 9653114082
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full flex items-center justify-center px-4 py-8">
        {/* border bottom */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col h-2">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-white border-t border-b border-gray-200" />
          <div className="flex-1 bg-green-600" />
        </div>

        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#293C86] tracking-tight">
              Our Location
            </h2>
            <div className="mt-2 h-1 w-16 bg-orange-500 rounded-full" />
          </div>

          {/* Map Card */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[420px]">
            <iframe
              title="Location Map"
              src="https://maps.app.goo.gl/kHZRG18Lmx2gjuga7"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
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
              When you bring together those who have, with those who have not -
              miracles happen. Become a time hero by volunteering with us. Meet
              new friends, gain new skills, get happiness and have fun!
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
              <img
                src="/soldier.png"
                alt="Soldier saluting"
                className="relative z-10 w-full object-contain max-h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}