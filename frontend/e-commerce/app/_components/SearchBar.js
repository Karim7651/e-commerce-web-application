// components/SearchBar.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [responsiveWidth, setResponsiveWidth] = useState("9rem"); // Default for xs

  // Update the width based on window size
  const updateWidth = () => {
    const width = window.innerWidth;

    if (width >= 1400) {
      // 2xl breakpoint (≥1400px)
      setResponsiveWidth("40rem");
    } else if (width >= 1080) {
      // lg breakpoint (≥1080px)
      setResponsiveWidth("25rem");
    } else if (width >= 640) {
      // sm breakpoint (≥640px)
      setResponsiveWidth("14rem");
    } else {
      // xs and default
      setResponsiveWidth("12rem");
    }
  };

  // Listen for window resize to trigger width update
  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="relative rounded-sm ring-gray-900/5">
      <div className="mx-auto">
        <form action="" className="relative mx-auto w-max">
          <motion.input
            type="search"
            className="peer cursor-pointer relative z-10 h-8 w-12 rounded-full  bg-transparent pl-12 outline-none focus:cursor-text focus:border-base-content border-[0.12rem] focus:pl-16 focus:pr-4"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            initial={{ width: "3rem", paddingLeft: "3rem", paddingRight: "0" }}
            animate={{
              width: isFocused ? responsiveWidth : "3rem",
              paddingLeft: isFocused ? "4rem" : "3rem",
              paddingRight: isFocused ? "1rem" : "0",
              transition: { duration: 0.5 },
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-neutral-700  peer-focus:stroke-base-content"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
    </div>
  );
}
