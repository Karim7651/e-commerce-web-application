"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Array of images
const images = [
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/1.webp`, alt: "Image 1" },
  { src: `${process.env.NEXT_PUBLIC_GALLERY}/2.webp`, alt: "Image 2" },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const intervalRef = useRef(null);

  // Function to reset interval
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isSwiping) {
      intervalRef.current = setInterval(nextSlide, 3500);
    }
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
  }, [isSwiping]);

  // Handle swipe start
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
    resetInterval(); // Stop auto slide on touch start
  };

  // Handle swipe move
  const handleTouchMove = (e) => {
    if (!isSwiping) return;

    const touchX = e.touches[0].clientX;
    setCurrentX(touchX);
  };

  // Handle swipe end
  const handleTouchEnd = () => {
    const distance = currentX - startX;

    if (distance < -50 && activeIndex < images.length - 1) {
      nextSlide(); // Swipe left
    } else if (distance > 50 && activeIndex > 0) {
      prevSlide(); // Swipe right
    }
    
    // Reset states
    setIsSwiping(false);
    setCurrentX(0); // Reset currentX after swipe
  };

  // Calculate translateX
  const translateX = (activeIndex * -100) + (isSwiping ? ((currentX - startX) / window.innerWidth) * 1000 : 0);
  
  // Calculate final translation with limits
  const finalTranslateX = (() => {
    // Define the max left and right limits
    const maxLeft = 0; // No swipe past the first image
    const maxRight = (images.length - 1) * -100; // No swipe past the last image
    
    // Clamp the translateX value
    if (translateX > maxLeft) return maxLeft;
    if (translateX < maxRight) return maxRight;
    return translateX;
  })();

  return (
    <header
      className="relative mt-20 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Slides */}
      <div
        className="relative flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${finalTranslateX}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full flex items-center justify-center"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1300}
              height={400}
              className="rounded-md shadow-lg"
              style={{
                objectFit: "cover",
                borderRadius: "93% 7% 93% 7% / 8% 95% 5% 92%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Previous Slide Button */}
      {activeIndex > 0 && (
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-8 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hidden lg:block`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Slide Button */}
      {activeIndex < images.length - 1 && (
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-8 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hidden lg:block`}
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
      )}

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
              index === activeIndex ? "bg-gray-300" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </header>
  );
};

export default Carousel;
