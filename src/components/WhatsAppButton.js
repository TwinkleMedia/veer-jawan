"use client";

export default function WhatsAppButton() {
  const phoneNumber = "919594037995"; // Replace with your WhatsApp number (with country code, no +)
  const message = "Hello! I'd like to know more about Veer Jawan Foundation.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50
        w-15 h-15 rounded-full shadow-xl
        bg-[#25D366] hover:bg-[#1ebe57]
        flex items-center justify-center
        hover:scale-110 active:scale-95
        transition-all duration-300"
      style={{ width: "52px", height: "52px" }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.004 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.643 1.84 6.656L2.667 29.333l6.865-1.797A13.29 13.29 0 0 0 16.004 29.333C23.371 29.333 29.333 23.363 29.333 16S23.371 2.667 16.004 2.667zm0 24.267a11.02 11.02 0 0 1-5.616-1.539l-.403-.24-4.073 1.067 1.088-3.963-.264-.408A10.987 10.987 0 0 1 5.04 16c0-6.048 4.919-10.96 10.964-10.96C22.053 5.04 26.96 9.952 26.96 16c0 6.048-4.907 10.934-10.956 10.934zm6.016-8.197c-.328-.165-1.944-.96-2.245-1.067-.299-.11-.517-.165-.736.165-.219.328-.848 1.067-1.04 1.288-.192.219-.384.247-.712.082-.328-.165-1.387-.512-2.64-1.629-.976-.869-1.635-1.941-1.827-2.269-.192-.328-.02-.507.145-.671.149-.147.328-.384.493-.576.165-.192.219-.328.328-.547.11-.219.055-.411-.027-.576-.083-.165-.736-1.776-1.008-2.432-.265-.637-.536-.549-.736-.56-.192-.009-.411-.011-.629-.011-.219 0-.576.082-.877.411-.301.328-1.149 1.123-1.149 2.739s1.176 3.178 1.341 3.397c.165.219 2.315 3.536 5.611 4.959.784.339 1.396.541 1.873.693.787.251 1.503.216 2.069.131.631-.095 1.944-.795 2.217-1.563.275-.768.275-1.425.192-1.563-.082-.137-.301-.219-.629-.384z" />
      </svg>

      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full border-4 border-[#25D366] opacity-60 animate-ping pointer-events-none"
        style={{ animationDuration: "2s" }}
      />
    </a>
  );
}