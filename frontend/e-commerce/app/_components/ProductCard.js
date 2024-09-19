"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartPlus from "tabler-icons-react/dist/icons/shopping-cart-plus";
import Stock from "./Stock";
import PriceAndDiscount from "./PriceAndDiscount";
import Rating from "./Rating";

function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const { _id, name, imageCover, images } = product;
  const allImages = [imageCover, ...images];

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 300); // Match this duration with the Tailwind transition duration
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
      );
      setIsFading(false);
    }, 300); // Match this duration with the Tailwind transition duration
  };

  return (
    <div className="card bg-base-200 md:w-[15rem] shadow-lg xs:w-[20rem]">
      <figure className="md:h-[10rem] xs:h-[15rem] relative">
        <Link href={`/products/${_id}`}>
          <Image
            src={allImages[currentIndex]}
            alt="title"
            fill
            style={{ objectFit: "contain" }}
            className={`transition-opacity duration-500 ease-in-out rounded-sm ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsFading(false)} // Ensure fading is removed after loading
          />
        </Link>
      </figure>

      <div className="card-body p-5">
        {allImages.length > 1 && (
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <button
                className="p-2 bg-gray-300 rounded-full"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex space-x-1">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-gray-500" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setIsFading(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsFading(false);
                      }, 300); // Match this duration with the Tailwind transition duration
                    }}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
              <button
                className="p-2 bg-gray-300 rounded-full"
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <Link href={`/products/${_id}`}>
          <h2 className="font-bold text-md primary-content">{name}</h2>
        </Link>
        <PriceAndDiscount product={product} />
        <Stock product={product} className="font-light text-xs" />
        <Rating product={product} size={"1.2rem"} />

        <div className="card-actions justify-center">
          <button className="btn btn-outline w-full flex items-center justify-center">
            <ShoppingCartPlus className="mr-1" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
