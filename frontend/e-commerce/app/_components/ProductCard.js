import Image from "next/image";
import Link from "next/link";
import ShoppingCartPlus from "tabler-icons-react/dist/icons/shopping-cart-plus";
import Stock from "./Stock";
import PriceAndDiscount from "./PriceAndDiscount";
import Rating from "./Rating";
function ProductCard({ product }) {
  const {
    _id,
    name,
    imageCover,
  } = product;

  return (
    <div className="card bg-base-200 md:w-[15rem] shadow-lg xs:w-[20rem]">
      <figure className="md:h-[10rem] xs:h-[15rem] relative ">
        <Link href={`/products/${_id}`}>
          <Image
            src={imageCover}
            alt="title"
            fill
            style={{ objectFit: "contain" }}
          />
        </Link>
      </figure>
      <div className="card-body p-5">
        <Link href={`/products/${_id}`}>
          <h2 className="font-bold text-md primary-content">{name}</h2>
        </Link>
        <PriceAndDiscount product={product} />
        <Stock product={product} className="font-light text-xs" />
        <Rating product={product} size={"1.2rem"} />
        <div className="card-actions justify-center">
          <button className="btn btn-outline  w-full flex items-center justify-center">
            <ShoppingCartPlus className="mr-1" /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
