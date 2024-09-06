import React from "react";

function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto my-20 px-4">
      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center">
        {/* Thumbnails Section */}
        <div className="flex flex-row gap-3 relative lg:flex-col lg:h-70 lg:mr-[2rem] lg:h-[25rem] lg:w-auto xs:w-[25rem] xs:overflow-x-auto lg:overflow-y-auto xs:overflow-y-hidden">
          <div className="flex lg:flex-col justify-center lg:overflow-x-auto xs:overflow-y-auto scrollbar-hide xs:overflow-x-auto gap-4">
            {/* Thumbnails Skeleton */}
            <div className="skeleton h-24 w-24 rounded-md mb-2"></div>
            <div className="skeleton h-24 w-24 rounded-md mb-2"></div>
            <div className="skeleton h-24 w-24 rounded-md mb-2"></div>
          </div>
        </div>

        {/* Main Image Section */}
        <div className="relative w-96 h-96">
          {/* Main Image Skeleton */}
          <div className="skeleton h-full w-full rounded-md"></div>
        </div>

        {/* Product Info Section */}
        <div className="self-start my-3 lg:my-16 lg:ml-10">
          <div className="skeleton h-8 w-64 mb-4"></div> {/* Product Name */}
          <div className="skeleton h-6 w-48 mb-4"></div>{" "}
          {/* Product Description */}
          <div className="flex flex-row justify-start items-center mb-3">
            <div className="skeleton h-6 w-32 mr-2"></div>{" "}
            {/* Product Final Price */}
            <div className="skeleton h-6 w-20"></div>{" "}
            {/* Product Original Price (if applicable) */}
          </div>
          <div className="flex mb-3 flex-row items-center">
            <div className="skeleton h-6 w-24 mr-2"></div> {/* Rating Stars */}
            <div className="skeleton h-6 w-32"></div> {/* Rating Text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
