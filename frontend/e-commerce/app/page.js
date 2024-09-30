import Carousel from "./_components/Carousel";
import Categories from "./_components/Categories";
import NewArrival from "./_components/NewArrival";
import RatingSelector from "./_components/ratingSelector";
import Slider from "./_components/PriceRangeSlider";

export default function Home() {

  return (
    <>
      <Carousel />
      <Categories />
      <NewArrival />
      <RatingSelector/>
    </>
  );
}
