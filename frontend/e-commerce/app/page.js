import Carousel from "./_components/Carousel";
import Categories from "./_components/Categories";
import NewArrival from "./_components/NewArrival";
import ProductDetailsSkeleton from "./_components/ProductDetailsSkeleton";
import ReviewContainer from "./_components/ReviewContainer";
import SearchResult from "./_components/SearchResult";
import SkeletonList from "./_components/SkeletonList";

export default function Home() {

  return (
    <>
      <Carousel />
      <Categories />
      <NewArrival />
    </>
  );
}
