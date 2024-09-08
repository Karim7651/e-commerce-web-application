import React from "react";

function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto my-20 px-4">
      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center">

        <div className="flex flex-row gap-3 relative lg:flex-col lg:h-70 lg:mr-[2rem] lg:w-auto ">
          <div className="flex lg:flex-col justify-center lg:overflow-x-auto xs:overflow-y-auto scrollbar-hide xs:overflow-x-auto gap-4 ">

            <div className="skeleton h-24 w-24 rounded-sm mb-2"></div>
            <div className="skeleton h-24 w-24 rounded-sm mb-2"></div>
            <div className="skeleton h-24 w-24 rounded-sm mb-2"></div>
            <div className="skeleton h-24 w-24 rounded-sm mb-2"></div>
          </div>
        </div>


        <div className="w-96 h-96">

          <div className="skeleton h-full w-full rounded-sm"></div>
        </div>

        <div className="lg:self-center my-3 lg:my-16 lg:ml-10">
          <div className="skeleton h-8 w-96 mb-4"></div> 
          <div className="skeleton h-6 w-72 mb-4"></div>

          <div className="flex flex-row justify-start items-center mb-3">
            <div className="skeleton h-6 w-48 mr-2"></div>


            {/* Product Original Price */}
          </div>
          <div className="flex mb-3 flex-row items-center">
            <div className="skeleton h-6 w-48 mr-2"></div> {/* Rating Stars */}
            <div className="skeleton h-6 w-48"></div> {/* Rating Text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
