import Image from "next/image";
import Link from "next/link";
import RatingStatic from "./RatingStatic";
import { ShoppingCartPlus } from "tabler-icons-react";
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
    <div className="card  bg-base-200 w-[15rem] shadow-2xl  ">
      <figure className="h-[10rem] !relative ">
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
          <h2 className="font-[700]">{name}</h2>
        </Link>
        <div className="flex flex-row justify-start items-center">
          {price != finalPrice && (
            <span className="line-through inline-block text-sm !text-opacity-70 text-gray-500">{`${price} `}</span>
          )}
          {
            <span
              className={`font-[500] ${price !== finalPrice ? "ml-1" : ""} `}
            >{`${finalPrice} EGP`}</span>
          }
        </div>
        <div className="flex mb-3 flex-row justify-center items-center">
          {ratingsQuantity != 0 && <RatingStatic rating={ratingsAverage} />}
          {ratingsQuantity != 0 && (
            <p className="ml-2 inline-block text-xs font-semibold">
              ({ratingsAverage}){" "}
              {ratingsQuantity === 1
                ? `${ratingsQuantity} Rating`
                : `${ratingsQuantity} Ratings`}
            </p>
          )}
          {ratingsQuantity == 0 && <RatingStatic rating={0} />}
          {ratingsQuantity == 0 && (
            <p className="ml-2 inline-block text-xs font-bold">
              No Ratings Yet
            </p>
          )}
        </div>
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
