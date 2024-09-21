import Skeleton from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="card bg-base-200 md:w-[15rem] shadow-lg xs:w-[20rem]">
      {/* Skeleton for image section */}
      <div className="md:h-[10rem] xs:h-[15rem] relative">
        <Skeleton className="w-full h-full rounded-sm bg-base-100" />
      </div>

      {/* Card body skeleton */}
      <div className="card-body p-5 pt-3 space-y-3">
        {/* Skeleton for image controls (prev/next buttons and dots) */}
        <div className="flex justify-center items-center space-x-2 mb-2 ">
          <Skeleton className="h-8 w-8 rounded-full bg-base-100" />
          <div className="flex space-x-1">
            <Skeleton className="h-2 w-2 rounded-full bg-base-100" />
            <Skeleton className="h-2 w-2 rounded-full bg-base-100" />
            <Skeleton className="h-2 w-2 rounded-full bg-base-100" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full bg-base-100" />
        </div>

        {/* Skeleton for product title */}
        <Skeleton className="h-6 w-3/4 rounded-sm bg-base-100" />

        {/* Skeleton for price */}
        <Skeleton className="h-4 w-1/2 rounded-sm bg-base-100" />

        {/* Skeleton for stock */}
        <Skeleton className="h-3 w-1/4 rounded-sm bg-base-100" />

        {/* Skeleton for rating */}
        <Skeleton className="h-4 w-1/3 rounded-sm bg-base-100" />

        {/* Skeleton for "Add to Cart" button */}
        <Skeleton className="h-10 w-full rounded-sm bg-base-100" />
      </div>
    </div>
  );
}
