import Carousel from "./_components/Carousel";
import Categories from "./_components/Categories";
import NewArrival from "./_components/NewArrival";
import RatingSelector from "./_components/RatingSelector";
import Slider from "./_components/PriceRangeSlider";
import SearchFilter from "./_components/SearchFilter";
export default function Home() {
  return (
    <>
      <Carousel />
      <Categories />
      <NewArrival />
    </>
  );
}
