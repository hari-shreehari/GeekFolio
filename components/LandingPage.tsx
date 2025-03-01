"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Preview = () => {
  const texts = [
    "Resume in portfolio out",
    "JSON-rich templates stout",
    "Custom domain no doubt",
    "Smooth as silk geek it out!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="min-h-screen text-white relative">
      <img 
        src="image.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0" // Adjust the scale value to zoom
      />
      <div className="relative z-10 min-h-screen">
        <header className="p-4 flex flex-col md:flex-row justify-between items-center px-4 md:px-10">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <h1>VULTR</h1>
          </div>
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link href="#" className="hover:underline">PORTFOLIOS</Link>
            <Link href="/templates" className="hover:underline">TEMPLATES</Link>
            <Link href="/resources" className="hover:underline">RESOURCES</Link>
          </nav>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <button className="px-4 py-2 rounded hover:bg-teal-700">LOG IN</button>
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100" onClick={() => router.push('/uploads')}>Upload</button>
          </div>
        </header>
        
        <main className="container mx-auto mt-16 md:mt-48 py-8 md:py-16 px-4 md:px-10 flex flex-col md:flex-row items-start justify-start h-auto md:h-3/4">
          <div className="w-full md:w-2/3 text-left">
            <div className="text-sm md:text-md mb-2 md:mb-4">
              <span className="mr-1">WEBSITES</span>
              <span className="text-teal-300">&gt;</span>
              <span className="ml-1">PORTFOLIOS</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6">Create a portfolio website</h1>
            <p className="text-base md:text-lg mb-4 md:mb-8">
              Showcase your work online with a portfolio website. Get started with a
              professionally designed template that can be customized to fit your brand.
            </p>
            <button 
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-black text-md md:text-lg font-semibold rounded hover:bg-gray-100"
              onClick={() => router.push('/uploads')}
            >
              Upload Resume
            </button>
          </div>
        </main>

        <div className="absolute ml-4 md:ml-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-700 text-xl md:text-2xl font-bold space-y-1">
          {texts.map((text, index) => (
            <div key={index} className={index === currentIndex ? "underline opacity-100" : "opacity-50"}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;