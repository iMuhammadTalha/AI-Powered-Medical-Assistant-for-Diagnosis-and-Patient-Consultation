"use client"; // This makes the file a client component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/") // Replace with your actual FastAPI endpoint
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("API not reachable"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 sm:p-12 text-center">
      {/* Logo */}
      {/* <Image src="/next.svg" alt="Next.js Logo" width={180} height={38} priority /> */}

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mt-6">AI Powered Medical Assistant for Diagnosis and Patient Consultation</h1>
      <p className="text-lg text-gray-700 mt-2">{message}</p>

      {/* Navigation Buttons */}
      {/* <div className="flex gap-4 mt-6">
        <Link href="/about">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Learn More
          </button>
        </Link>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Read Docs
        </a>
      </div> */}

      {/* Footer Links */}
      {/* <footer className="mt-10 flex gap-6 flex-wrap justify-center">
        <FooterLink href="https://nextjs.org/learn" text="Learn" icon="/file.svg" />
        <FooterLink href="https://vercel.com/templates" text="Examples" icon="/window.svg" />
        <FooterLink href="https://nextjs.org" text="Next.js →" icon="/globe.svg" />
      </footer> */}
    </div>
  );
}

// Footer Link Component
function FooterLink({ href, text, icon }: { href: string; text: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-700 hover:underline hover:underline-offset-4"
    >
      <Image src={icon} alt={`${text} icon`} width={16} height={16} />
      {text}
    </a>
  );
}
