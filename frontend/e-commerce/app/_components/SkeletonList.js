import SkeletonCard from "./SkeletonCard";
export default function SkeletonList({ count = 6 }) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3  justify-items-center justify-center items-center gap-x-10 gap-y-20 my-32 mx-auto">
      {skeletons.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}


