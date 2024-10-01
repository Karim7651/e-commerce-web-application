"use client";
import React, { useState, useEffect, useRef } from "react";
import LogoutButton from "./LogoutButton";
import { useUser } from "../_contexts/userContext";
import { useCart } from "../_contexts/cartContext";
import CredentialsModal from "./CredentialsModal";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import HomeIcon from "tabler-icons-react/dist/icons/home";
import InfoCircleIcon from "tabler-icons-react/dist/icons/info-circle";
import QuestionMarkIcon from "tabler-icons-react/dist/icons/question-mark";
import Menu from "tabler-icons-react/dist/icons/menu-2";
import ShoppingBag from "tabler-icons-react/dist/icons/shopping-bag";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { totalPrice, totalNumberOfItems,cart } = useCart();

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
    <nav className="bg-base-200 shadow-md relative flex flex-row justify-between px-2 ">
      {/* Navbar Start */}
      <div className="flex items-center justify-center">
        {/* Mobile Menu Button */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost px-1 py-1"
          id="hamburger"
          onClick={toggleDropdown}
        >
          <Menu size={30} />
        </div>

        {/* Dropdown Menu */}
        <ul
          ref={menuRef}
          tabIndex={0}
          className={`menu menu-xs dropdown-content bg-base-200 rounded-sm z-[1] mt-3 ml-3 w-52 p-2 shadow-lg ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ position: "absolute", top: "100%", left: "0" }}
        >
          <Link
            href="/"
            className="relative flex flex-row items-center p-2 group overflow-hidden"
            onClick={handleLinkClick}
          >
            <HomeIcon size={25} />
            <span className="text-md font-bold ml-4">Homepage</span>
            <span className="absolute inset-0 rounded-md bg-neutral-600 bg-opacity-20 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100 -z-10"></span>
          </Link>

          <Link
            href="/about"
            className="relative flex flex-row items-center p-2 group overflow-hidden"
            onClick={handleLinkClick}
          >
            <InfoCircleIcon size={25} />
            <span className="text-md font-bold ml-4">About</span>
            <span className="absolute inset-0 rounded-md bg-neutral-600 bg-opacity-20  scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100 -z-10"></span>
          </Link>

          <Link
            href="/faq"
            className="relative flex flex-row items-center p-2 group overflow-hidden"
            onClick={handleLinkClick}
          >
            <QuestionMarkIcon size={25} />
            <span className="text-md font-bold ml-4">FAQ</span>
            <span className="absolute inset-0 rounded-md bg-neutral-600 bg-opacity-20 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100 -z-10"></span>
          </Link>
        </ul>

        {/* Brand Name */}
        <Link href="/" className="btn btn-ghost hover:bg-transparent text-base">
          Kimmerce
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center flex items-center justify-center">
        <SearchBar />
      </div>
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
        {/* Cart Icon */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle px-1 py-1"
          >
            <div className="indicator">
              <ShoppingBag className="h-6 w-6 stroke-2" />
              <span className="badge badge-md h-6 w-6 rounded-full bg-emerald-400 indicator-item text-black right-[-1px]">
                {user?.cart?.totalNumberOfItems || totalNumberOfItems || 0}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body bg-base-200 shadow-lg rounded-md">
              <span className="text-lg font-medium">
                {totalNumberOfItems || 0} Items
              </span>

              <span className="text-base-content font-bold">
                <span className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]">
                  EGP
                </span>
                {`${totalPrice.toLocaleString() || 0}`}
              </span>

              <div>
                <Link href="/cart">
                  <button className="btn btn-block btn-outline">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ThemeSwitch />
        {!user && <CredentialsModal />}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
}
