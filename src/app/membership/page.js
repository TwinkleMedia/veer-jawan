"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const RANKS = [
  "Sepoy",
  "Lance Naik",
  "Naik",
  "Havildar",
  "Naib Subedar",
  "Subedar",
  "Subedar Major",
  "2nd Lieutenant",
  "Lieutenant",
  "Captain",
  "Major",
  "Lieutenant Colonel",
  "Colonel",
  "Brigadier",
  "Major General",
  "Lieutenant General",
  "General",
  "Field Marshal",
  "Aircraftman",
  "Leading Aircraftman",
  "Corporal",
  "Sergeant",
  "Warrant Officer",
  "Flying Officer",
  "Flight Lieutenant",
  "Squadron Leader",
  "Wing Commander",
  "Group Captain",
  "Air Commodore",
  "Air Vice Marshal",
  "Air Marshal",
  "Air Chief Marshal",
  "Seaman",
  "Leading Seaman",
  "Petty Officer",
  "Chief Petty Officer",
  "Sub Lieutenant",
  "Lieutenant Commander",
  "Commander",
  "Captain (Navy)",
  "Commodore",
  "Rear Admiral",
  "Vice Admiral",
  "Admiral",
  "Admiral of the Fleet",
];

const inputCls =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:border-[#293C86] focus:ring-2 focus:ring-[#293C86]/10 transition placeholder-gray-400";

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#1a2744] to-[#293C86] border-b-2 border-[#FF671F]">
      <span className="text-[10px] font-bold tracking-widest text-[#FF671F] border border-[#FF671F]/50 px-2 py-0.5 rounded shrink-0">
        {number}
      </span>
      <h3 className="font-bold text-white tracking-wide text-sm sm:text-base">
        {title}
      </h3>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold tracking-wider uppercase text-[#1a2744]">
        {label}
        {required && <span className="text-[#FF671F] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const INITIAL_FORM = {
  membershipNo: "",
  date: "",
  martyrCount: "",
  fullName: "",
  rank: "",
  serviceNumber: "",
  martyrdomDate: "",
  placeOfMartyrdom: "",
  awardsHonors: "",
  operationDescription: "",
  veerNariName: "",
  veerNariEducation: "",
  fatherName: "",
  motherName: "",
  mobile1: "",
  mobile2: "",
  permanentAddress: "",
  district: "",
  state: "",
};

function UploadBox({
  label,
  required,
  preview,
  inputRef,
  onChange,
  onClear,
  hint,
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[11px] font-bold tracking-wider uppercase text-[#1a2744] text-center">
        {label}
        {required && <span className="text-[#FF671F] ml-0.5">*</span>}
      </span>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-[#293C86] hover:bg-blue-50/30 transition group"
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-[#293C86] transition">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-[10px] font-semibold text-center px-2 leading-tight">
              Click to Upload
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-[#293C86] text-[#293C86] hover:bg-[#293C86] hover:text-white transition"
        >
          {preview ? "Change" : "Upload"}
        </button>
        {preview && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition"
          >
            Remove
          </button>
        )}
      </div>
      <p className="text-[10px] text-gray-400 text-center leading-relaxed">
        {hint}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

export default function MembershipFormPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [children, setChildren] = useState([{ name: "", education: "" }]);

  // Photo
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Aadhar Card
  const [aadharFile, setAadharFile] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);
  const aadharInputRef = useRef(null);

  // Martyr Soldier ID Card
  const [idCardFile, setIdCardFile] = useState(null);
  const [idCardPreview, setIdCardPreview] = useState(null);
  const idCardInputRef = useRef(null);

  const [declared, setDeclared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const makeFileHandler = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const addChild = () => {
    if (children.length < 6)
      setChildren([...children, { name: "", education: "" }]);
  };
  const removeChild = (i) => {
    if (children.length > 1)
      setChildren(children.filter((_, idx) => idx !== i));
  };
  const updateChild = (i, field, value) => {
    const updated = [...children];
    updated[i][field] = value;
    setChildren(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!declared) {
      setError("Please accept the declaration before submitting.");
      return;
    }

    if (!photoFile || !aadharFile || !idCardFile) {
      setError(
        "Please upload Passport Photo, Aadhar Card, and Martyr Soldier ID Card — all three are required.",
      );
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      fd.append("children", JSON.stringify(children));
      fd.append("photo", photoFile);
      fd.append("aadharCard", aadharFile);
      fd.append("idCard", idCardFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/membership`,
        {
          method: "POST",
          credentials: "include",
          body: fd,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setChildren([{ name: "", education: "" }]);
    setPhotoFile(null);
    setPhotoPreview(null);
    setAadharFile(null);
    setAadharPreview(null);
    setIdCardFile(null);
    setIdCardPreview(null);
    setDeclared(false);
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-[#293C86] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1a2744] mb-2">
            Application Submitted!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Your Veer Nari / Veer Mata-Pita membership application has been
            received successfully. You will be contacted shortly.
          </p>
          <button
            onClick={resetForm}
            className="px-6 py-2.5 bg-[#293C86] text-white text-sm font-bold rounded-lg hover:bg-[#1a2744] transition"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* ── Hero Banner ── */}
        <div className="relative bg-gradient-to-br from-[#0f1c3f] via-[#1a2744] to-[#293C86] py-12 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg,#fff 0px,#fff 1px,transparent 1px,transparent 18px)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,103,31,0.2),transparent_65%)]" />
          <div className="relative z-10">
            <p className="text-[10px] sm:text-xs tracking-[4px] text-white/50 uppercase mb-3">
              भारतीय शहीद सैनिक परिवार संगठन
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide leading-tight mb-1">
              Veer Nari / Veer Mata-Pita
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-[#FF671F] tracking-[3px] uppercase mb-6">
              Membership Application Form
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="block w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#FF671F]/60" />
              <span className="text-[#FF671F] text-[8px]">◆</span>
              <span className="block w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-[#FF671F]/60" />
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* ── 01 Basic Information ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <SectionHeader number="01" title="Basic Information" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Membership No." required>
                    <input
                      name="membershipNo"
                      value={form.membershipNo}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="e.g. MBR-2024-001"
                      required
                    />
                  </Field>
                  <Field label="Date" required>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      className={inputCls}
                      required
                    />
                  </Field>
                </div>
                <Field
                  label="Number of Martyr Soldiers in Family / Service Count"
                  required
                >
                  <input
                    name="martyrCount"
                    value={form.martyrCount}
                    onChange={handleChange}
                    type="number"
                    className={inputCls}
                    placeholder="Enter count"
                    min="1"
                    required
                  />
                </Field>
                <Field label="Full Name" required>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    type="text"
                    className={inputCls}
                    placeholder="Enter full name"
                    required
                  />
                </Field>
              </div>
            </div>

            {/* ── 02 Martyr Soldier Details ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <SectionHeader number="02" title="Martyr Soldier Details" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Rank" required>
                    <select
                      name="rank"
                      value={form.rank}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    >
                      <option value="" disabled>
                        Select Rank
                      </option>
                      {RANKS.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Service Number" required>
                    <input
                      name="serviceNumber"
                      value={form.serviceNumber}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="e.g. IC-12345"
                      required
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Date of Martyrdom / Service Date" required>
                    <input
                      name="martyrdomDate"
                      value={form.martyrdomDate}
                      onChange={handleChange}
                      type="date"
                      className={inputCls}
                      required
                    />
                  </Field>
                  <Field label="Place of Martyrdom" required>
                    <input
                      name="placeOfMartyrdom"
                      value={form.placeOfMartyrdom}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="Enter place"
                      required
                    />
                  </Field>
                </div>
                <Field label="Information about Awards / Honors">
                  <input
                    name="awardsHonors"
                    value={form.awardsHonors}
                    onChange={handleChange}
                    type="text"
                    className={inputCls}
                    placeholder="e.g. Param Vir Chakra, Maha Vir Chakra…"
                  />
                </Field>
                <Field label="Description of the Operation in which Martyrdom Occurred">
                  <textarea
                    name="operationDescription"
                    value={form.operationDescription}
                    onChange={handleChange}
                    className={`${inputCls} resize-y min-h-[90px]`}
                    rows={4}
                    placeholder="Briefly describe the operation, location and circumstances…"
                  />
                </Field>
              </div>
            </div>

            {/* ── 03 Family Details ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <SectionHeader number="03" title="Family Details" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Veer Nari Name (Widow Name)">
                    <input
                      name="veerNariName"
                      value={form.veerNariName}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="Full name of widow"
                    />
                  </Field>
                  <Field label="Education">
                    <input
                      name="veerNariEducation"
                      value={form.veerNariEducation}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="e.g. B.A., 12th Pass…"
                    />
                  </Field>
                </div>

                {/* Children */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-dashed border-gray-200">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#1a2744]">
                      Children Details
                    </span>
                    <button
                      type="button"
                      onClick={addChild}
                      disabled={children.length >= 6}
                      className="text-[11px] font-bold text-[#293C86] border border-[#293C86] rounded px-2.5 py-1 hover:bg-[#293C86] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      + Add Child
                    </button>
                  </div>
                  {children.map((child, i) => (
                    <div
                      key={i}
                      className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-[#FF671F] tracking-wider uppercase">
                          Child {i + 1}
                        </span>
                        {children.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeChild(i)}
                            className="text-xs text-red-400 hover:text-red-600 font-bold transition"
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Child's Name">
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Full name"
                            value={child.name}
                            onChange={(e) =>
                              updateChild(i, "name", e.target.value)
                            }
                          />
                        </Field>
                        <Field label="Education">
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Class / Degree"
                            value={child.education}
                            onChange={(e) =>
                              updateChild(i, "education", e.target.value)
                            }
                          />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Father's Full Name" required>
                    <input
                      name="fatherName"
                      value={form.fatherName}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="Father's full name"
                      required
                    />
                  </Field>
                  <Field label="Mother's Name" required>
                    <input
                      name="motherName"
                      value={form.motherName}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="Mother's full name"
                      required
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* ── 04 Contact Details ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <SectionHeader number="04" title="Contact Details" />
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Mobile Number 1" required>
                    <input
                      name="mobile1"
                      value={form.mobile1}
                      onChange={handleChange}
                      type="tel"
                      className={inputCls}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </Field>
                  <Field label="Mobile Number 2">
                    <input
                      name="mobile2"
                      value={form.mobile2}
                      onChange={handleChange}
                      type="tel"
                      className={inputCls}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                </div>
                <Field label="Permanent Address" required>
                  <textarea
                    name="permanentAddress"
                    value={form.permanentAddress}
                    onChange={handleChange}
                    className={`${inputCls} resize-y min-h-[80px]`}
                    rows={3}
                    placeholder="House No., Street, Village / Colony, Tehsil…"
                    required
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="District" required>
                    <input
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      type="text"
                      className={inputCls}
                      placeholder="Enter district"
                      required
                    />
                  </Field>
                  <Field label="State" required>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={inputCls}
                      required
                    >
                      <option value="" disabled>
                        Select State / UT
                      </option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            </div>

            {/* ── 05 Photo & Document Uploads ── */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <SectionHeader number="05" title="Photo & Document Uploads" />
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <UploadBox
                    label="Passport Size Photo"
                    required
                    preview={photoPreview}
                    inputRef={fileInputRef}
                    onChange={makeFileHandler(setPhotoFile, setPhotoPreview)}
                    onClear={() => {
                      setPhotoPreview(null);
                      setPhotoFile(null);
                      fileInputRef.current.value = "";
                    }}
                    hint={"JPG/PNG · Max 2MB\n35×45mm recommended"}
                  />

                  <UploadBox
                    label="Aadhar Card Image"
                    required
                    preview={aadharPreview}
                    inputRef={aadharInputRef}
                    onChange={makeFileHandler(setAadharFile, setAadharPreview)}
                    onClear={() => {
                      setAadharPreview(null);
                      setAadharFile(null);
                      aadharInputRef.current.value = "";
                    }}
                    hint={"JPG/PNG · Max 2MB\nBoth sides if required"}
                  />

                  <UploadBox
                    label="Martyr Soldier ID Card"
                    required
                    preview={idCardPreview}
                    inputRef={idCardInputRef}
                    onChange={makeFileHandler(setIdCardFile, setIdCardPreview)}
                    onClear={() => {
                      setIdCardPreview(null);
                      setIdCardFile(null);
                      idCardInputRef.current.value = "";
                    }}
                    hint={"JPG/PNG · Max 2MB\nClear & legible scan"}
                  />
                </div>
              </div>
            </div>

            {/* ── Declaration ── */}
            <div className="bg-[#FFF8F4] border border-[#FF671F]/30 rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#FF671F] font-bold text-base">✦</span>
                <h4 className="text-sm font-bold text-[#1a2744] tracking-wide uppercase">
                  Declaration / घोषणा
                </h4>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[#FF671F]/20 space-y-3">
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "I hereby declare that all the information provided by me is
                  true and correct. I will not violate the rules of the
                  organization and will follow all the regulations."
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  "मैं एतद्द्वारा घोषणा करता/करती हूँ कि मेरे द्वारा प्रदान की
                  गई सभी जानकारी सत्य और सही है। मैं संगठन के नियमों का उल्लंघन
                  नहीं करूँगा/करूँगी और सभी विनियमों का पालन करूँगा/करूँगी।"
                </p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={declared}
                  onChange={(e) => setDeclared(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#293C86] cursor-pointer shrink-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                  I accept the above declaration and confirm that all
                  information provided is <strong>true and correct</strong>.
                </span>
              </label>
            </div>

            {/* ── Error Message ── */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <svg
                  className="w-5 h-5 text-red-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* ── Submit ── */}
            <div className="flex flex-col items-center gap-3 pt-2 pb-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-200
                ${
                  declared && !loading
                    ? "bg-[#293C86] text-white hover:bg-[#1a2744] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    <span>Submitting…</span>
                  </>
                ) : (
                  <>
                    <span>Submit Membership Application</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400">
                <span className="text-[#FF671F]">*</span> Fields marked with
                asterisk are mandatory
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
