"use client";
import React, { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { useUser } from "../_contexts/userContext";
import CredentialsModal from "./CredentialsModal";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import Search from "tabler-icons-react/dist/icons/search";
import HomeIcon from "tabler-icons-react/dist/icons/home";
import InfoCircleIcon from "tabler-icons-react/dist/icons/info-circle";
import QuestionMarkIcon from "tabler-icons-react/dist/icons/question-mark";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown menu when clicking outside of it
  const handleClickOutside = (event) => {
    const mobileMenuButton = document.getElementById("hamburger");

    // If the click is outside of the menu and not on the mobile menu button, close the dropdown
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  // Attach event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the dropdown menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-base-200 shadow-md relative flex flex-row justify-between py-1 px-2 ">
      {/* Navbar Start */}
      <div className="w-auto">
        {/* Mobile Menu Button */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost lg:hidden"
          id="hamburger"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>

        {/* Mobile Dropdown Menu */}
        <ul
          ref={menuRef}
          tabIndex={0}
          className={`menu menu-xs dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ position: "absolute", top: "100%", left: "0" }}
        >
          <Link
            href="/"
            className="flex flex-row items-center p-2 hover:bg-base-300"
            onClick={handleLinkClick}
          >
            <HomeIcon size={20} />
            <span className="text-md font-bold ml-4">Homepage</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-row items-center p-2 hover:bg-base-300"
            onClick={handleLinkClick}
          >
            <InfoCircleIcon size={20} />
            <span className="text-md font-bold ml-4">About</span>
          </Link>
          <Link
            href="/faq"
            className="flex flex-row items-center p-2 hover:bg-base-300"
            onClick={handleLinkClick}
          >
            <QuestionMarkIcon size={20} />
            <span className="text-md font-bold ml-4">FAQ</span>
          </Link>
        </ul>

        {/* Brand Name */}
        <Link href="/" className="btn btn-ghost hover:bg-transparent text-xl">
          E-Commerce
        </Link>
      </div>

      {/* Navbar Center */}
      {/* <div className="navbar-center hidden lg:flex">
        <ul className="flex flex-row px-1 gap-4 justify-center items-center">
          <li>
            <Link
              href="/"
              className={`relative pb-1 transition-all duration-300 ${
                pathname === "/" ? "font-semibold" : ""
              }`}
            >
              Homepage
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full bg-base-content transition-transform duration-300 ease-in-out ${
                  pathname === "/" ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`relative pb-1 transition-all duration-300 ${
                pathname.startsWith("/about") ? "font-semibold" : ""
              }`}
            >
              About
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full bg-base-content  transition-transform duration-300 ease-in-out ${
                  pathname.startsWith("/about") ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className={`relative pb-1 transition-all duration-300 ${
                pathname.startsWith("/faq") ? "font-semibold" : ""
              }`}
            >
              FAQ
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full bg-base-content transition-transform duration-300 ease-in-out ${
                  pathname.startsWith("/faq") ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </Link>
          </li>
        </ul>
      </div> */}

      {/* Navbar End */}
      <div className="navbar-end flex items-center w-auto">
        {/*
        <div className="relative lg:mr-4 self-center xs:w-44 lg:w-64 xs:h-10 xs:ml-6 ">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10 xs:h-10 focus:outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-transform duration-400 ease-in-out ${
              isFocused ? "scale-105" : "scale-100 text-gray-500"
            }`}
          >
            <Search
              className={`h-5 w-5 dark:text-gray-400 `}
            />
          </div>
        </div>*/}
        <SearchBar />
        {/* Cart Icon */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm bg-green-500 indicator-item text-black">
                8
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold ">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Switch */}
        <ThemeSwitch />

        {/* Auth Buttons */}
        {!user && <CredentialsModal />}

        {user && <LogoutButton />}
      </div>
    </nav>
  );
}
