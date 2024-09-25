import React from "react";
import Image from "next/image";
import Link from "next/link";
import PriceAndDiscount from "./PriceAndDiscount"; // Ensure this is correctly imported
import Rating from "./Rating"; // Ensure this is correctly imported

const SearchResult = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} >
      <div className="relative group flex items-center p-4 overflow-hidden hover:shadow-lg transition-shadow duration-300  cursor-pointer">
        {/* Background Hover Animation */}
        <span className="absolute inset-0 bg-base-200 transition-transform transform scale-x-0 group-hover:scale-x-100 origin-top-left duration-300 ease-out"></span>

        {/* Content */}
        <div className="relative z-10 flex items-center">
          {/* Product Image */}
          <div className="relative w-32 h-32">
            <Image
              src={product.imageCover}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}

            />
          </div>

          {/* Product Info */}
          <div className="ml-4 text-base-content">
            {/* Product Name */}
            <h2 className="font-bold text-lg">{product.name}</h2>

            {/* Rating below the title */}
            <Rating product={product} size={"1rem"} className="mb-0  " />

            {/* Price and Discount */}
            <PriceAndDiscount product={product} className="mt-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
