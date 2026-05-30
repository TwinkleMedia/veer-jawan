"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Topnav } from "@/components/Topnav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

// ── Gallery Sidebar ───────────────────────────────────────────────────────────
function GallerySidebar() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/gallery`, { credentials: "include" });
        const json = await res.json();
        if (json.success) {
          const allImages = json.galleries
            .flatMap((g) => g.media.filter((m) => m.type === "image"))
            .slice(0, 8);
          setImages(allImages);
        }
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (loading) {
    return (
      <div className="hidden lg:flex flex-col gap-3 w-full h-full min-h-[500px] animate-pulse">
        <div className="flex-1 rounded-2xl bg-gray-200" />
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) return null;

  return (
    <div className="hidden lg:flex flex-col gap-3 w-full">
      {/* Main large image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-lg">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.fileName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#293C86]/60 to-transparent" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === current
                ? "border-[#FF671F] scale-95"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img src={img.url} alt={img.fileName} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Caption */}
      <div className="bg-[#293C86]/5 border border-[#293C86]/10 rounded-xl px-4 py-3 text-center">
        <p className="text-xs text-[#293C86] font-semibold">
          🇮🇳 Honouring the brave — every moment, every sacrifice
        </p>
      </div>
    </div>
  );
}

// ── Error Message ─────────────────────────────────────────────────────────────
function ErrorMsg({ msg }) {
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {msg}
    </p>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    selectedAmount: null,
    customAmount: "",
    wants80G: null,
    panNumber: "",
    address: "",
  });

  const [isOther, setIsOther] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [donationDetails, setDonationDetails] = useState(null);

  const finalAmount = isOther ? Number(formData.customAmount) : formData.selectedAmount;

  const handleAmountSelect = (amount) => {
    setIsOther(false);
    setFormData((prev) => ({ ...prev, selectedAmount: amount, customAmount: "" }));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleOtherSelect = () => {
    setIsOther(true);
    setFormData((prev) => ({ ...prev, selectedAmount: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!finalAmount || isNaN(finalAmount)) {
      newErrors.amount = "Please select or enter a donation amount.";
    } else if (finalAmount < 1) {
      newErrors.amount = "Amount must be at least ₹1.";
    }

    if (formData.wants80G === null) {
      newErrors.wants80G = "Please select an option for 80G receipt.";
    }

    if (formData.wants80G === "yes") {
      if (!formData.panNumber.trim()) {
        newErrors.panNumber = "PAN number is required for 80G receipt.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.trim().toUpperCase())) {
        newErrors.panNumber = "Enter a valid PAN number (e.g. ABCDE1234F).";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required for 80G receipt.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const orderRes = await fetch(`${API_URL}/api/donation/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          amount: finalAmount,
          wants80G: formData.wants80G === "yes",
          panNumber: formData.wants80G === "yes" ? formData.panNumber.toUpperCase() : null,
          address: formData.wants80G === "yes" ? formData.address : null,
        }),
      });

      if (!orderRes.ok) {
        const text = await orderRes.text();
        console.error("create-order error:", text);
        setErrors({ submit: `Server error (${orderRes.status}).` });
        setLoading(false);
        return;
      }

      const orderData = await orderRes.json();

      if (!orderData.success) {
        setErrors({ submit: orderData.message || "Failed to initiate payment." });
        setLoading(false);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setErrors({ submit: "Failed to load Razorpay. Check your internet connection." });
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Veer Nari Veer Jawan",
        description: "Donation to support our brave soldiers and their families",
        image: "/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: `+91${formData.contact}`,
        },
        theme: { color: "#293C86" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_URL}/api/donation/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donorInfo: orderData.donorInfo,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setDonationDetails({
                name: formData.name,
                email: formData.email,
                amount: finalAmount,
                paymentId: response.razorpay_payment_id,
              });
              setPaymentStatus("success");
            } else {
              setPaymentStatus("failed");
            }
          } catch {
            setPaymentStatus("failed");
          }
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setPaymentStatus("failed");
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────────
  if (paymentStatus === "success" && donationDetails) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#293C86] mb-2">
            Thank You, {donationDetails.name}!
          </h2>
          <p className="text-gray-500 mb-1 text-sm">
            Your donation of{" "}
            <span className="font-bold text-[#FF671F]">
              ₹{donationDetails.amount.toLocaleString("en-IN")}
            </span>{" "}
            was successful.
          </p>
          <p className="text-gray-400 text-xs mb-2">
            Payment ID:{" "}
            <span className="font-mono text-gray-500">{donationDetails.paymentId}</span>
          </p>
          <p className="text-gray-400 text-xs mb-8">
            A confirmation will be sent to{" "}
            <span className="font-medium text-gray-500">{donationDetails.email}</span>.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#293C86] text-white font-bold text-sm tracking-wider uppercase px-8 py-3 rounded-lg hover:bg-[#2B4DD0] transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ─── Failed Screen ────────────────────────────────────────────────
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
          <p className="text-gray-500 text-sm mb-8">
            Something went wrong during the payment. Please try again.
          </p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="inline-block bg-[#FF671F] hover:bg-[#e85510] text-white font-bold text-sm tracking-wider uppercase px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── Main Form ────────────────────────────────────────────────────
  return (
    <>
      <Topnav />
      <Header />
      <div className="min-h-screen bg-[#f5f0e8]">

        {/* Hero Banner */}
        <div className="bg-[#293C86] text-white py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <svg className="w-10 h-10 text-[#FF671F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-3">
              Support Our <span className="text-[#FF671F]">Veer Nari & Veer Jawan</span>
            </h1>
            <p className="text-blue-200 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Your generosity helps us honour the sacrifices of our brave soldiers and support
              their families. Every rupee counts.
            </p>
          </div>
        </div>

        {/* Tricolour stripe */}
        <div className="flex h-1.5">
          <div className="flex-1 bg-[#FF671F]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#046A38]" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT — Gallery Sidebar */}
            <div className="lg:w-2/5 w-full lg:sticky lg:top-6">
              <GallerySidebar />
            </div>

            {/* RIGHT — Donation Form */}
            <div className="lg:w-3/5 w-full">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Card Header */}
                <div className="bg-gradient-to-r from-[#293C86] to-[#2B4DD0] px-8 py-5">
                  <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                    Donation Form
                  </h2>
                  <p className="text-blue-200 text-xs mt-0.5">All fields are required</p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6" noValidate>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, name: e.target.value }));
                        setErrors((p) => ({ ...p, name: "" }));
                      }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#293C86] focus:border-[#293C86] ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                    />
                    {errors.name && <ErrorMsg msg={errors.name} />}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, email: e.target.value }));
                        setErrors((p) => ({ ...p, email: "" }));
                      }}
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#293C86] focus:border-[#293C86] ${
                        errors.email
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                    />
                    {errors.email && <ErrorMsg msg={errors.email} />}
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-2">
                      Contact Number
                    </label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 font-medium select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={formData.contact}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData((p) => ({ ...p, contact: val }));
                          setErrors((p) => ({ ...p, contact: "" }));
                        }}
                        className={`flex-1 border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#293C86] focus:border-[#293C86] ${
                          errors.contact
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.contact && <ErrorMsg msg={errors.contact} />}
                  </div>

                  {/* Donation Amount */}
                  <div>
                    <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-3">
                      Select Donation Amount
                    </label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {PRESET_AMOUNTS.map((amount) => (
                        <label
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
                            formData.selectedAmount === amount && !isOther
                              ? "border-[#FF671F] bg-orange-50"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              formData.selectedAmount === amount && !isOther
                                ? "border-[#FF671F]"
                                : "border-gray-400"
                            }`}
                          >
                            {formData.selectedAmount === amount && !isOther && (
                              <div className="w-2 h-2 rounded-full bg-[#FF671F]" />
                            )}
                          </div>
                          <span
                            className={`text-sm font-bold transition-colors ${
                              formData.selectedAmount === amount && !isOther
                                ? "text-[#FF671F]"
                                : "text-gray-700"
                            }`}
                          >
                            ₹{amount.toLocaleString("en-IN")}
                          </span>
                        </label>
                      ))}
                    </div>

                    <label
                      onClick={handleOtherSelect}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none mb-3 ${
                        isOther
                          ? "border-[#FF671F] bg-orange-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isOther ? "border-[#FF671F]" : "border-gray-400"
                        }`}
                      >
                        {isOther && <div className="w-2 h-2 rounded-full bg-[#FF671F]" />}
                      </div>
                      <span className={`text-sm font-bold ${isOther ? "text-[#FF671F]" : "text-gray-700"}`}>
                        Other Amount
                      </span>
                    </label>

                    {isOther && (
                      <div className="mt-2">
                        <div className="flex items-center border-2 border-[#FF671F] rounded-xl overflow-hidden bg-orange-50 focus-within:ring-2 focus-within:ring-[#FF671F]/30 transition-all">
                          <span className="px-4 py-3 text-sm font-bold text-[#FF671F] border-r border-orange-200 bg-orange-100 select-none">
                            ₹
                          </span>
                          <input
                            type="number"
                            placeholder="Enter your amount"
                            min={1}
                            value={formData.customAmount}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, customAmount: e.target.value }));
                              setErrors((p) => ({ ...p, amount: "" }));
                            }}
                            className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                            autoFocus
                          />
                        </div>
                      </div>
                    )}
                    {errors.amount && <ErrorMsg msg={errors.amount} />}
                  </div>

                  {/* ── 80G Receipt ─────────────────────────────────────────── */}
                  <div>
                    <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-1">
                      Do you want an 80G Donation Receipt?
                    </label>
                    <p className="text-xs text-gray-400 mb-3">
                      Section 80G allows you to claim a tax deduction on your donation.
                    </p>

                    <div className="flex gap-3">
                      {["yes", "no"].map((val) => (
                        <label
                          key={val}
                          onClick={() => {
                            setFormData((p) => ({
                              ...p,
                              wants80G: val,
                              panNumber: "",
                              address: "",
                            }));
                            setErrors((p) => ({
                              ...p,
                              wants80G: "",
                              panNumber: "",
                              address: "",
                            }));
                          }}
                          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none flex-1 ${
                            formData.wants80G === val
                              ? "border-[#FF671F] bg-orange-50"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              formData.wants80G === val ? "border-[#FF671F]" : "border-gray-400"
                            }`}
                          >
                            {formData.wants80G === val && (
                              <div className="w-2 h-2 rounded-full bg-[#FF671F]" />
                            )}
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              formData.wants80G === val ? "text-[#FF671F]" : "text-gray-700"
                            }`}
                          >
                            {val === "yes" ? "Yes" : "No"}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.wants80G && <ErrorMsg msg={errors.wants80G} />}

                    {/* PAN + Address — shown only when Yes */}
                    {formData.wants80G === "yes" && (
                      <div className="mt-4 space-y-4 bg-orange-50 border border-orange-100 rounded-xl p-4">
                        {/* Info note */}
                        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
                          <svg
                            className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-xs text-blue-700 leading-relaxed">
                            Your PAN and address are required to issue a valid 80G tax exemption
                            certificate as per Income Tax regulations.
                          </p>
                        </div>

                        {/* PAN Number */}
                        <div>
                          <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-2">
                            PAN Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ABCDE1234F"
                            maxLength={10}
                            value={formData.panNumber}
                            onChange={(e) => {
                              setFormData((p) => ({
                                ...p,
                                panNumber: e.target.value.toUpperCase(),
                              }));
                              setErrors((p) => ({ ...p, panNumber: "" }));
                            }}
                            className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#293C86] focus:border-[#293C86] font-mono tracking-widest ${
                              errors.panNumber
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          />
                          {errors.panNumber && <ErrorMsg msg={errors.panNumber} />}
                        </div>

                        {/* Donor Address */}
                        <div>
                          <label className="block text-xs font-bold text-[#293C86] uppercase tracking-widest mb-2">
                            Donor's Address
                          </label>
                          <textarea
                            rows={3}
                            placeholder="House/Flat No., Street, City, State, PIN Code"
                            value={formData.address}
                            onChange={(e) => {
                              setFormData((p) => ({ ...p, address: e.target.value }));
                              setErrors((p) => ({ ...p, address: "" }));
                            }}
                            className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#293C86] focus:border-[#293C86] resize-none ${
                              errors.address
                                ? "border-red-400 bg-red-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          />
                          {errors.address && <ErrorMsg msg={errors.address} />}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount Summary */}
                  {finalAmount && finalAmount > 0 && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-center justify-between">
                      <span className="text-sm text-blue-700 font-medium">Donation amount</span>
                      <span className="text-lg font-extrabold text-[#293C86]">
                        ₹{Number(finalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF671F] hover:bg-[#e85510] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                        </svg>
                        Proceed to Pay
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Secured by Razorpay · All transactions are encrypted
                  </p>
                </form>
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/"
                  className="text-xs text-[#293C86] hover:text-[#FF671F] font-bold uppercase tracking-widest transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}