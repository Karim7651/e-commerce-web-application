import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SearchResults from "./SearchResults"; // Import SearchResults
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // To track user input
  const [responsiveWidth, setResponsiveWidth] = useState("10rem");
  const searchInputRef = useRef(null);

  // Update the width based on window size
  const updateWidth = () => {
    const width = window.innerWidth;
    if (width >= 1400) {
      setResponsiveWidth("30rem");
    } else if (width >= 1080) {
      setResponsiveWidth("25rem");
    } else if (width >= 640) {
      setResponsiveWidth("14rem");
    } else if (width >= 320) {
      setResponsiveWidth("10rem");
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleBlur = () => {
    // Delay hiding the results to allow for clicking on a SearchResult
    setTimeout(() => {
      if (
        !searchInputRef.current ||
        !searchInputRef.current.contains(document.activeElement)
      ) {
        setIsFocused(false);
      }
    }, 100);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      const endPoint = 
      router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="relative">
      <form className="relative mx-auto w-max" onBlur={handleBlur}>
        <motion.input
          ref={searchInputRef}
          type="search"
          value={searchQuery}
          placeholder="Search"
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="peer cursor-pointer relative z-10 h-8 w-12 rounded-md bg-transparent pl-12 outline-none focus:cursor-text focus:border-base-content border-[0.12rem] focus:pl-16 focus:pr-4"
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
          className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-base-content peer-focus:stroke-base-content"
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
      {/* Conditionally render SearchResults if there is a searchQuery */}
      {searchQuery && (
        <SearchResults searchQuery={searchQuery} isFocused={isFocused} />
      )}
    </div>
  );
}
