import Skeleton from "./Skeleton";
function SkeletonList({ count = 6 }) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center justify-center items-center gap-x-10 gap-y-20 my-32 mx-auto">
      {skeletons.map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}

export default SkeletonList;
