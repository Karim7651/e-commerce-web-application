"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion
import { useSwipeable } from "react-swipeable"; // Import useSwipeable

const categories = [
  {
    id: 1,
    name: "Computers",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat1.png`,
    link: "/search?mainCategory=computers",
  },
  {
    id: 2,
    name: "Laptops",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat2.png`,
    link: "/search?mainCategory=laptops",
  },
  {
    id: 3,
    name: "Phones",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat3.png`,
    link: "/search?mainCategory=phones",
  },
  {
    id: 4,
    name: "Security Cameras",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat4.png`,
    link: "/search?mainCategory=securityCameras",
  },
  {
    id: 5,
    name: "Home Appliances",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat5.png`,
    link: "/search?mainCategory=homeAppliances",
  },
  {
    id: 6,
    name: "Personal Care",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat6.png`,
    link: "/search?mainCategory=personalCare",
  },
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;

  // Handle Next button
  const handleNext = () => {
    if (currentIndex + visibleItems < categories.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Handle Prev button
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Swipe handlers
  const handleSwipeLeft = () => handleNext();
  const handleSwipeRight = () => handlePrev();

  // Configure swipeable handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Allow mouse swiping
  });

  const variants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + visibleItems
  );

  return (
    <div
      className="relative mb-20 mt-20 w-full overflow-hidden"
      {...swipeHandlers}
    >
      <div className="relative flex gap-8 items-center justify-center">
        {visibleCategories.map((category) => (
          <motion.div
            className="flex flex-col gap-4 font-semibold justify-center items-center"
            key={category.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants} // Apply animation variants
          >
            <Link
              href={category.link}
              className="flex flex-col items-center justify-center gap-6"
            >
              <div
                className="flex-shrink-0 relative 2xl:h-48 2xl:w-48 lg:w-40 lg:h-40 md:w-36 md:h-36 sm:h-32 sm:w-32 xs:h-28 xs:w-28 bg-base-200 rounded-full shadow-lg"
                style={{ borderRadius: "70% 30% 81% 19% / 21% 72% 28% 79%" }}
              >
                <Image
                  src={category.imgSrc}
                  alt={`${category.name} image`}
                  fill
                  style={{ objectFit: "cover" }} // Ensure images cover the div
                />
              </div>
              <div>
                <h3 className="xs:text-xs">{category.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Prev Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className=" hidden lg:block absolute top-1/2 left-8 z-50 active:scale-75 -translate-y-1/2 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hover:scale-110"
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
      )}
      {/* Next Button */}
      {currentIndex + visibleItems < categories.length && (
        <button
          onClick={handleNext}
          className="hidden lg:block absolute top-1/2 right-8 z-50 -translate-y-1/2 active:scale-75 bg-white/50 p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Categories;
