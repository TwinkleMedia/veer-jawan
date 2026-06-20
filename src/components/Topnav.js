import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import React from "react";

export const Topnav = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-orange-300 to-green-800 overflow-hidden">
      {/* Texture Layer */}
      <div
        className="absolute inset-0 bg-repeat mix-blend-overlay opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/texture.jpg')" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row justify-between items-center text-blue-800 gap-4">
        <p className="text-sm lg:text-base text-center lg:text-left">
          No One Has Ever Become Poor By Giving!
        </p>

        <div className="flex justify-between items-center gap-3">
          <Phone fill="blue" className="w-4 h-4" />
          <p className="text-sm lg:text-base">
            +91 95940 37995 / +91 9653114082
          </p>
        </div>

        <div className="flex justify-between items-center gap-3">
          <Mail />
          <p className="text-sm lg:text-base">
            veerjawanfoundation05@gmail.com
          </p>
        </div>

        {/* social icons */}
        {/* social icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/people/Veer-Jawan/100090190152111/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-blue-800 text-blue-800 hover:text-white transition duration-300 cursor-pointer">
              <Facebook className="w-5 h-5" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/veerjawan.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-blue-800 text-blue-800 hover:text-white transition duration-300 cursor-pointer">
              <Instagram className="w-5 h-5" />
            </div>
          </a>

          <a
            href="https://www.youtube.com/@veerjawanfoundation_official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-red-600 text-red-600 hover:text-white transition duration-300 cursor-pointer">
              <Youtube className="w-5 h-5" />
            </div>
          </a>

          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center hover:bg-blue-700 text-blue-700 hover:text-white transition duration-300 cursor-pointer">
              <Linkedin className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
