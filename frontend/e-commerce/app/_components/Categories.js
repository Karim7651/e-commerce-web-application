"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const categories = [
  {
    id: 1,
    name: "Computers",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat1.png`,
  },
  {
    id: 2,
    name: "Laptops",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat2.png`,
  },
  {
    id: 3,
    name: "Phones",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat3.png`,
  },
  {
    id: 4,
    name: "Security Cameras",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat4.png`,
  },
  {
    id: 5,
    name: "Home Appliances",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat5.png`,
  },
  {
    id: 6,
    name: "Personal Care",
    imgSrc: `${process.env.NEXT_PUBLIC_GALLERY}/cat6.png`,
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

  const variants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 }, // Slide in from right and scale down
    visible: { opacity: 1, x: 0, scale: 1 }, // Normal position and size
    exit: { opacity: 0, x: -100, scale: 0.9 }, // Slide out to left and scale down
  };
  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + visibleItems
  );

  return (
    <div className="relative mb-48 mt-20 w-vw overflow-hidden">
      <div className="relative flex gap-8 items-center justify-center">
        {visibleCategories.map((category) => (
          <motion.div
            className="flex flex-col gap-4 font-semibold justify-center items-center "
            key={category.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants} // Apply animation variants
            transition={{ duration: 0.3, ease: "easeOut" }} // Customize animation duration
          >
            <div className="flex-shrink-0 relative 2xl:h-60 2xl:w-60 lg:w-48 lg:h-48 md:w-36 md:h-36 sm:h-32 sm:w-32 xs:h-28 xs:w-28 h-16 w-16 bg-base-200 rounded-full">
              <Image
                src={category.imgSrc}
                alt={`${category.name} image`}
                fill
              />
            </div>
            <div>
              <h3 className="xs:text-xs">{category.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-8 z-50 active:scale-75 -translate-y-1/2 bg-white/50  p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out hover:scale-110"
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
      {currentIndex + visibleItems < categories.length && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-8 -translate-y-1/2 active:scale-75 bg-white/50  p-2 rounded-full focus:outline-none hover:bg-gray-200 transform transition-transform duration-300 ease-out"
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
