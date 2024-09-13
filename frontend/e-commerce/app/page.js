import Carousel from "./_components/Carousel";
import Categories from "./_components/Categories";
import Modal from "./_components/CredentialsModal";
import NewArrival from "./_components/NewArrival";
import ProductListWithSuspense from "./_components/ProductListWithSuspense";
import SignUpLoginTab from "./_components/SignUpLoginTab";
import Skeleton from "./_components/Skeleton";

export default function Home() {
  return (
    <>
      <Carousel />
      <Categories/>
      <NewArrival/>
    </>
  );
}
