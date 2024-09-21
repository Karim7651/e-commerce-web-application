import Skeleton from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto my-20 px-4">
      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center">

        {/* Thumbnail section */}
        <div className="flex flex-row gap-3 relative lg:flex-col lg:h-70 lg:mr-[2rem] lg:w-auto ">
          <div className="flex lg:flex-col justify-center lg:overflow-x-auto xs:overflow-y-auto scrollbar-hide xs:overflow-x-auto gap-4">
            <Skeleton className="h-24 w-24 rounded-sm mb-2 bg-base-200" />
            <Skeleton className="h-24 w-24 rounded-sm mb-2 bg-base-200" />
            <Skeleton className="h-24 w-24 rounded-sm mb-2 bg-base-200" />
            <Skeleton className="h-24 w-24 rounded-sm mb-2 bg-base-200" />
          </div>
        </div>

        {/* Main product image */}
        <div className="w-96 h-96">
          <Skeleton className="h-full w-full rounded-sm bg-base-200" />
        </div>

        {/* Product details section */}
        <div className="lg:self-center my-3 lg:my-16 lg:ml-10">
          <Skeleton className="h-8 w-96 mb-4 bg-base-200" />  {/* Product Title */}
          <Skeleton className="h-6 w-72 mb-4 bg-base-200" />   {/* Product Subtitle or Description */}

          <div className="flex flex-row justify-start items-center mb-3 ">
            <Skeleton className="h-6 w-48 mr-2 bg-base-200" />   {/* Product Original Price */}
          </div>
          <div className="flex mb-3 flex-row items-center mt-10">
            <Skeleton className="h-10 w-48 mr-2 bg-base-200" />   {/* Rating Stars */}
            <Skeleton className="h-10 w-48 bg-base-200" />         {/* Rating Text */}
          </div>
        </div>
      </div>
    </div>
  );
}
