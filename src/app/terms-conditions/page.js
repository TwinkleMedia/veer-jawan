import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Veer Jawan Foundation",
  description: "Terms and Conditions of Veer Jawan Foundation - Supporting families of Indian armed forces personnel.",
};

const sections = [
  {
    title: "Introduction & Acceptance",
    content: `Welcome to the Veer Jawan Foundation website. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.

Veer Jawan Foundation ("we", "us", "our") is a registered non-profit organization based in Mumbai, Maharashtra, India, dedicated to supporting the families of Indian armed forces martyrs.`,
  },
  {
    title: "About Our Organization",
    content: `The Veer Jawan Foundation is a non-profit organization dedicated to supporting the families of Indian armed forces personnel who have sacrificed their lives for the nation. It provides financial assistance, addresses the needs of martyrs' families, and organizes awareness events to honor their sacrifices.

All activities carried out by the Foundation are in service of the nation and for the welfare of those who gave the ultimate sacrifice for India's freedom and security.`,
  },
  {
    title: "Use of Website",
    content: `By using this website, you agree to:

• Use the website only for lawful purposes and in a manner that does not infringe upon the rights of others.
• Not attempt to gain unauthorized access to any part of the website or its related systems.
• Not transmit any harmful, offensive, or misleading content through our website.
• Not use the website to impersonate any person or misrepresent your identity or affiliation.
• Not interfere with or disrupt the website's functionality or servers.

We reserve the right to terminate access to our website for any user who violates these terms.`,
  },
  {
    title: "Donations & Payments",
    content: `All donations made through the Veer Jawan Foundation website are voluntary and non-refundable unless there is a verified error in processing. By making a donation, you agree to the following:

• Donations are processed securely through third-party payment gateways.
• Tax exemption certificates will be issued as per applicable Indian laws (80G, if applicable).
• Donations will be utilized exclusively for the welfare of martyrs' families and related programs.
• The Foundation reserves the right to allocate funds based on the most pressing needs.

If you experience a payment issue, please contact us within 7 days at veerjawanfoundation05@gmail.com.`,
  },
  {
    title: "Intellectual Property",
    content: `All content on this website — including but not limited to text, images, logos, graphics, audio, and video — is the property of Veer Jawan Foundation and is protected under applicable intellectual property laws.

You may not reproduce, distribute, modify, or republish any content from this website without prior written permission from us. Limited use for personal, non-commercial, and educational purposes is permitted provided proper attribution is given to Veer Jawan Foundation.`,
  },
  {
    title: "Disclaimer of Warranties",
    content: `The website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Veer Jawan Foundation does not warrant that:

• The website will be uninterrupted, error-free, or free of viruses.
• The information provided is always accurate, complete, or current.
• The website will meet your specific requirements.

We reserve the right to modify, suspend, or discontinue any part of the website at any time without notice.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, Veer Jawan Foundation and its trustees, officers, volunteers, and partners shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from:

• Your use or inability to use the website.
• Unauthorized access to or alteration of your data.
• Any content posted or transmitted through the website.
• Any third-party conduct or content on linked websites.`,
  },
  {
    title: "Third-Party Links & Services",
    content: `Our website may contain links to third-party websites for your convenience and information. These links do not constitute endorsement by Veer Jawan Foundation. We have no control over the content or practices of third-party sites and are not responsible for their privacy practices or terms of service.

We encourage you to review the terms and privacy policies of any third-party websites you visit.`,
  },
  {
    title: "Governing Law & Jurisdiction",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.

By using our website, you consent to the jurisdiction of these courts.`,
  },
  {
    title: "Amendments to Terms",
    content: `Veer Jawan Foundation reserves the right to revise these Terms and Conditions at any time. Updated terms will be posted on this page with a revised date. Continued use of the website after any changes constitutes your acceptance of the new terms.

We encourage you to review these terms periodically to stay informed of any updates.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions or concerns about these Terms and Conditions, please contact us:

Veer Jawan Foundation
Address: Mumbai, Maharashtra, India
Phone: 95940 37995 / 74997 36665
Email: veerjawanfoundation05@gmail.com`,
  },
];

function TricolorBar() {
  return (
    <div className="flex h-1 w-full">
      <div className="flex-1 bg-orange-500" />
      <div className="flex-1 bg-white border-y border-gray-200" />
      <div className="flex-1 bg-green-700" />
    </div>
  );
}

export default function TermsConditions() {
  return (
    <>
    <Header/>
    <main className="min-h-screen bg-gray-50 font-sans">

      {/* Hero Header */}
      <div className="relative bg-green-900 overflow-hidden">
        <TricolorBar />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-500 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-300 -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          {/* Document icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full border-4 border-green-400 flex items-center justify-center bg-white/10">
              <svg className="w-7 h-7 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
          </div>

          <p className="text-green-300 text-xs font-bold tracking-[0.35em] uppercase mb-3">
            Veer Jawan Foundation
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-green-200 text-sm">Last updated: April 2026</p>
        </div>
        <TricolorBar />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-green-800 font-semibold">Terms & Conditions</span>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">

        {/* Intro banner */}
        <div className="bg-green-50 border-l-4 border-green-700 rounded-r-xl p-5 mb-10">
          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-bold text-green-700">Please read carefully. 📜</span> — These Terms and Conditions govern your use of the Veer Jawan Foundation website and services. By continuing to use our website, you agree to comply with and be bound by the following terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-4 px-6 pt-5 pb-4">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="text-green-900 font-bold text-base md:text-lg leading-snug">
                  {section.title}
                </h2>
              </div>
              <TricolorBar />
              <div className="px-6 py-5">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Privacy Policy */}
        <div className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#1a2f6e] font-bold text-sm">Also read our Privacy Policy</p>
            <p className="text-gray-500 text-xs mt-0.5">Learn how we collect, use, and protect your personal information.</p>
          </div>
          <Link
            href="/privacy-policy"
            className="shrink-0 inline-flex items-center gap-2 bg-orange-500 text-white
              px-5 py-2.5 rounded-full text-xs font-bold
              hover:bg-[#1a2f6e] transition-colors duration-300"
          >
            View Policy
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-800 text-white
              px-7 py-3 rounded-full text-sm font-bold
              hover:bg-orange-500 transition-colors duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>


    </main>
    <Footer/>
    </>
  );
}