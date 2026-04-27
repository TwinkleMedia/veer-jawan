"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Topnav } from "@/components/Topnav";
import DonateButton from "@/components/DonateButton";
import { Mail, MapPin, Phone } from "lucide-react";

import Link from "next/link";
import React, { useState } from "react";

export default function contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

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
                Lorem ipsum dolor sit amet consectetur. Nulla varius id sagittis
                donec.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Mail className="w-8 h-8 text-[#FF671F] mb-2" />
              <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                Email Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                yourmail@gmail.com
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <Phone className="w-8 h-8 text-[#FF671F] mb-2" />
              <h3 className="text-lg font-semibold text-[#2d3e8b] mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                +91 1234567891
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Form Section */}
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
              Send Us a Message
            </h2>
            <div className="mt-2 h-1 w-16 bg-orange-500 rounded-full" />
          </div>

          {/* Grid: Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ">
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                {/* Subject */}
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />

                {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending || sent}
                  className={`w-full py-3.5 rounded-lg font-semibold text-white text-sm tracking-wide transition-all duration-300 ${
                    sent
                      ? "bg-green-500 cursor-default"
                      : sending
                        ? "bg-[#FF671F] cursor-wait"
                        : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] shadow-md hover:shadow-orange-200 hover:shadow-lg"
                  }`}
                >
                  {sent
                    ? "✓ Message Sent!"
                    : sending
                      ? "Sending..."
                      : "Send Message"}
                </button>
              </form>
            </div>

            {/* Map Card */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[420px] lg:h-full min-h-[380px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60355.60788849879!2d72.95!3d19.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8e7e3c9e24d%3A0x3b5b1a3e2e3e2e3e!2sThane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
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
              When you bring together those who have, with those who have not -
              miracles happen.Become a time hero by volunteering with us. Meet
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
      <Footer />
    </>
  );
}
