import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Veer Jawan Foundation",
  description: "Privacy Policy of Veer Jawan Foundation - Supporting families of Indian armed forces personnel.",
};

const sections = [
  {
    title: "Welcome to Veer Jawan Foundation",
    content: `The Veer Jawan Foundation is a non-profit organization dedicated to supporting the families of Indian armed forces personnel who have sacrificed their lives for the nation. It provides financial assistance, addresses the needs of martyrs' families, and organizes awareness events to honor their sacrifices.

This Privacy Policy describes how Veer Jawan Foundation ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website or engage with our services.`,
  },
  {
    title: "Information We Collect",
    content: `We may collect the following types of information when you interact with our website or donate to our cause:

• Personal Identification Information: Name, email address, phone number, and mailing address.
• Donation Information: Payment details processed securely through trusted payment gateways.
• Usage Data: IP address, browser type, pages visited, and time spent on our website.
• Communication Data: Messages or inquiries submitted through our contact forms.

We collect this information solely to fulfill our mission of supporting martyrs' families and to improve our services.`,
  },
  {
    title: "How We Use Your Information",
    content: `The information we collect is used for the following purposes:

• Processing donations and issuing tax-exemption receipts under applicable laws.
• Communicating updates about our programs, events, and campaigns.
• Responding to your queries and providing support.
• Improving our website experience and services.
• Complying with legal obligations and regulatory requirements.

We do not sell, trade, or rent your personal information to third parties for commercial purposes.`,
  },
  {
    title: "Donations & Financial Information",
    content: `Veer Jawan Foundation is committed to transparency in how donations are utilized. All financial contributions are directed toward:

• Financial assistance to families of martyred soldiers.
• Organizing memorial and awareness events.
• Administrative costs required to run foundation programs.

We use secure, encrypted payment gateways for processing donations. We do not store your complete payment card details on our servers.`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• SSL/TLS encryption for data transmission.
• Restricted access to personal data on a need-to-know basis.
• Regular security reviews of our systems and processes.

While we strive to use commercially acceptable means to protect your information, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "Cookies & Tracking Technologies",
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us understand how visitors use our site and allow us to improve our content.

You may choose to disable cookies through your browser settings. However, please note that some features of our website may not function properly if cookies are disabled.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites, including partner organizations and payment processors. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "Your Rights",
    content: `You have the following rights regarding your personal information:

• Access: Request a copy of the personal data we hold about you.
• Correction: Request correction of inaccurate or incomplete data.
• Deletion: Request deletion of your personal data, subject to legal obligations.
• Opt-Out: Unsubscribe from our communications at any time.

To exercise any of these rights, please contact us at veerjawanfoundation05@gmail.com.`,
  },
  {
    title: "Children's Privacy",
    content: `Veer Jawan Foundation's website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will take steps to remove such information.`,
  },
  {
    title: "Changes to This Policy",
    content: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:

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

export default function PrivacyPolicy() {
  return (
    <>
    <Header/>
    <main className="min-h-screen bg-gray-50 font-sans">

      {/* Hero Header */}
      <div className="relative bg-[#1a2f6e] overflow-hidden">
        <TricolorBar />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-500 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-green-500 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          {/* Shield icon for Privacy */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full border-4 border-orange-400 flex items-center justify-center bg-white/10">
              <svg className="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.88-2.69 7.52-6 8.93C8.69 18.52 6 14.88 6 11V7.67L12 5zm-1 5v2h2v-2h-2zm0 4v2h2v-2h-2z" />
              </svg>
            </div>
          </div>

          <p className="text-orange-400 text-xs font-bold tracking-[0.35em] uppercase mb-3">
            Veer Jawan Foundation
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-200 text-sm">Last updated: April 2026</p>
        </div>
        <TricolorBar />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1a2f6e] font-semibold">Privacy Policy</span>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">

        {/* Intro banner */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-5 mb-10">
          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-bold text-orange-600">Jai Hind! 🇮🇳</span> — We at Veer Jawan Foundation deeply respect your privacy.
            This policy outlines how we handle your personal information with transparency and care,
            in service of our mission to honor India&apos;s brave martyrs and their families.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-4 px-6 pt-5 pb-4">
                <div className="w-8 h-8 rounded-full bg-[#1a2f6e] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="text-[#1a2f6e] font-bold text-base md:text-lg leading-snug">
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

        {/* Link to T&C */}
        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#1a2f6e] font-bold text-sm">Also read our Terms & Conditions</p>
            <p className="text-gray-500 text-xs mt-0.5">Understand your rights and responsibilities when using our services.</p>
          </div>
          <Link
            href="/terms-conditions"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1a2f6e] text-white
              px-5 py-2.5 rounded-full text-xs font-bold
              hover:bg-orange-500 transition-colors duration-300"
          >
            View T&amp;C
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1a2f6e] text-white
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