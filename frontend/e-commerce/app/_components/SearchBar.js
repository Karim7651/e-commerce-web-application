// components/SearchBar.js
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative rounded-sm  ring-gray-900/5  ">
      <div className="mx-auto ">
        <form action="" className="relative mx-auto w-max">
          <motion.input
            type="search"
            className="peer cursor-pointer relative z-10 h-8 w-12 rounded-full border bg-transparent pl-12 outline-none focus:cursor-text focus:border-base-content focus:pl-16 focus:pr-4"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={{
              width: isFocused ? "9rem" : "3rem",
              flexGrow : isFocused ? "true" :"false",
              paddingLeft: isFocused ? "4rem" : "3rem",
              paddingRight: isFocused ? "1rem" : "0",
              transition: { duration: 0.3 }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-black peer-focus:stroke-base-content "
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
