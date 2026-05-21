"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  {
    label: "Martyr Veer Jawan",
    href: "/martyr",
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Donate Us", href: "/donate", isDonate: true },
  { label: "Contact", href: "/contact" },
];

function DropdownItem({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 text-[14px] font-bold tracking-widest uppercase text-[#293C86] hover:text-[#FF671F] transition-colors duration-200 whitespace-nowrap relative group"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {link.label}
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 10 6"
        >
          <path d="M0 0l5 6 5-6z" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#FF671F] group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[210px] bg-white border-t-[3px] border-t-[#FF671F] shadow-xl rounded-b z-50 animate-[fadeDown_0.18s_ease_forwards]">
          {link.dropdown.map((sub) => (
            <Link
              key={sub.label}
              href={sub.href}
              className="block px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-[#1a2744] border-b border-[#f0ebe0] last:border-b-0 hover:bg-[#f5f0e8] hover:text-[#FF671F] transition-all duration-150"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Lato:wght@400;700&display=swap');
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-font { font-family: 'Lato', sans-serif; }
        .logo-font { font-family: 'Cinzel', serif; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .membership-btn {
          background: linear-gradient(90deg, #FF671F 0%, #e85510 40%, #FF671F 60%, #e85510 100%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .membership-btn:hover {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(255, 103, 31, 0.45);
        }
        .membership-btn:active {
          transform: translateY(0);
        }

        /* New Membership button style — distinct from the Veer Nari button */
        .new-membership-btn {
          background: linear-gradient(90deg, #293C86 0%, #1a2860 40%, #293C86 60%, #1a2860 100%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .new-membership-btn:hover {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(41, 60, 134, 0.5);
        }
        .new-membership-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <nav className={`nav-font sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-2xl" : "shadow-md"}`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Home">
            <div className="w-11 h-11 flex items-center justify-content-center flex-shrink-0">
              <img src="/logo.png" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 ml-auto list-none">
            {NAV_LINKS.map((link) =>
              link.isDonate ? (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-[13px] font-bold tracking-widest uppercase bg-[#293C86] text-[#ffffff] rounded hover:bg-[#2B4DD0] hover:text-[#FF671F] transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : link.dropdown ? (
                <DropdownItem key={link.label} link={link} />
              ) : (
                <li key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-[14px] font-bold tracking-widest uppercase text-[#293C86] hover:text-[#FF671F] transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#FF671F] group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
                  </Link>
                </li>
              )
            )}

            {/* Veer Nari / Veer Mata-Pita Membership Form Button */}
            <li className="ml-2">
              <Link
                href="/membership"
                className="membership-btn inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold tracking-wider uppercase text-white rounded whitespace-nowrap"
              >
                {/* Star/medal icon */}
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
                <span>Veer Nari / Veer Mata-Pita</span>
                <span className="hidden xl:inline">Membership Form</span>
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden ml-auto flex flex-col gap-[5px] p-1.5 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-[#1a2744] rounded transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45 bg-[#FF671F]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a2744] rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a2744] rounded transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45 bg-[#FF671F]" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[800px] border-t-2 border-[#FF671F]" : "max-h-0"}`}>
          {NAV_LINKS.map((link) =>
            link.isDonate ? (
              <Link
                key={link.label}
                href={link.href}
                className="block mx-4 my-3 px-4 py-3 text-[11px] font-bold tracking-widest uppercase text-center bg-[#293C86] text-[#FF671F] rounded hover:bg-[#2B4DD0] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                  className="w-full flex items-center justify-between px-6 py-3.5 text-[11px] font-bold tracking-widest uppercase text-[#FF671F] border-b border-[#f0ebe0] hover:bg-[#f5f0e8] hover:text-[#c8a84b] transition-colors duration-150"
                >
                  {link.label}
                  <svg
                    className={`w-2.5 h-2.5 transition-transform duration-200 ${mobileDropdown === link.label ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 10 6"
                  >
                    <path d="M0 0l5 6 5-6z" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 bg-[#f5f0e8] ${mobileDropdown === link.label ? "max-h-40" : "max-h-0"}`}>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block pl-10 pr-6 py-3 text-[10px] font-bold tracking-widest uppercase text-[#445] border-b border-[#e8e0d0] last:border-b-0 hover:bg-[#ece6d8] hover:text-[#c8a84b] transition-colors duration-150"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block px-6 py-3.5 text-[11px] font-bold tracking-widest uppercase text-[#1a2744] border-b border-[#f0ebe0] hover:bg-[#f5f0e8] hover:text-[#c8a84b] hover:pl-8 transition-all duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Mobile Veer Nari Membership Button */}
          <Link
            href="/membership"
            className="flex items-center justify-center gap-2 mx-4 mt-3 px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-center text-white rounded membership-btn"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            Veer Nari / Veer Mata-Pita Membership Form
          </Link>
        </div>
      </nav>
    </>
  );
}