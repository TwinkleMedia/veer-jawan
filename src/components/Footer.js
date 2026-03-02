import Link from "next/link";

// Icons as SVG components
const LocationIcon = () => (
    <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="w-full font-sans">
            {/* Top colored border */}
            <div className="flex flex-col h-2">
                <div className="flex-1 bg-orange-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-green-700" />
            </div>

            {/* Main footer body */}
            <div className="bg-white py-10 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* About Us */}
                    <div>
                        <h3 className="text-blue-900 font-bold text-xl mb-4">About us</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Veerjawan Foundation: Honoring soldiers&apos; sacrifice by supporting their families. Your
                            donation provides vital assistance, ensuring heroes are never forgotten. Join us in
                            making a lasting impact.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-blue-900 font-bold text-xl mb-4">Useful Links</h3>
                        <ul className="space-y-2">
                            {["Home", "About Us", "Gallery", "Contact"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 text-sm hover:text-orange-500 transition-colors duration-200"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get In Touch */}
                    <div>
                        <h3 className="text-blue-900 font-bold text-xl mb-4">Get In Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <LocationIcon />
                                <span className="text-gray-600 text-sm">Address : Mumbai</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <PhoneIcon />
                                <span className="text-gray-600 text-sm">Phone: 95940 37995 / 74997 36665</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <EmailIcon />
                                <span className="text-gray-600 text-sm break-all">Email: veerjawanfoundation05@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-gradient-to-r from-orange-600 via-orange-300 to-green-800 text-white text-center text-sm py-4 px-4">
                Copyrights © 2026 All Rights Reserved. Powered by <a href="https://www.twinklemediahub.com/" target="_blank">Twinkle Media Hub</a>
            </div>
        </footer>
    );
}