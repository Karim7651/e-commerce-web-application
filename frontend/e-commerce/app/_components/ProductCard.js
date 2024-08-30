import Image from "next/image";
import Link from "next/link";
import RatingStatic from "./RatingStatic";
import { ShoppingCartPlus } from 'tabler-icons-react';
function ProductCard({ product }) {
  const {
    id,
    name,
    description,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceDiscount,
    slug,
    finalPrice,
    imageCover,
  } = product;
  return (
    <div className="card  bg-base-200 w-[15rem] shadow-xl ">
      <figure className="h-[10rem] relative ">
        <Link href={`/products/${slug}`}>
          <Image
            src={imageCover}
            alt="title"
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </figure>
      <div className="card-body p-5">
        <Link href={`/products/${slug}`}>
          <h2 className="font-bold">{name}</h2>
        </Link>
        <div className="mb-3">
          {price != finalPrice && (
            <span className="line-through inline-block text-sm ">{`${price} `}</span>
          )}
          {
            <span
              className={`font-medium ${price !== finalPrice ? "ml-2" : ""} `}
            >{`${finalPrice} EGP`}</span>
          }
        </div>
        <div className="flex mb-3">
          {ratingsQuantity != 0 && <RatingStatic rating={ratingsAverage} />}
          {ratingsQuantity != 0 && (
            <p className="lg:ml-3 sm:ml-2 inline-block text-sm">
              ({ratingsAverage}) ({ratingsQuantity} Rating)
            </p>
          )}
          {ratingsQuantity == 0 && <RatingStatic rating={0} />}
          {ratingsQuantity == 0 && (
            <p className="lg:ml-3 sm:ml-2 inline-block text-sm">(0) No Rating</p>
          )}
        </div>
        <div className="card-actions justify-center">
        <button className="btn btn-outline  w-full flex items-center justify-center">
            <ShoppingCartPlus className="mr-1"/> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
