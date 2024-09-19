"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Array of images
const images = [
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/1.webp`, alt: "Image 1" },
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/2.webp`, alt: "Image 2" },
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/3.webp`, alt: "Image 3" },
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/4.webp`, alt: "Image 4" },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  // Function to reset interval
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, 3500);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetInterval();
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleButtonClick = (action) => {
    action();
  };

  return (
    <header className="relative mt-20">
      {/* Carousel Slides */}
      <div
        className="relative flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex items-center justify-center"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1500}
              height={400}
              className="rounded-md shadow-lg"
              style={{
                objectFit: "cover",
                borderRadius: "93% 7% 93% 7% / 8% 95% 5% 92%  "
              }}
            />
          </div>
        ))}
      </div>

      {/* Previous Slide Button */}
      <button
        onClick={() => handleButtonClick(prevSlide)}
        className={`absolute top-1/2 left-8 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200  transform transition-transform duration-300 ease-out `}

      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Slide Button */}
      <button
        onClick={() => handleButtonClick(nextSlide)}
        className={`absolute top-1/2 right-8 active:scale-75  -translate-y-1/2 bg-white/50  p-2 rounded-full focus:outline-none hover:bg-gray-200  transform transition-transform duration-300 ease-out `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              resetInterval(); // Reset interval on indicator click
            }}
            className={`w-4 h-1.5 rounded-full cursor-pointer ${
              index === activeIndex ? "bg-gray-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </header>
  );
};

export default Carousel;
