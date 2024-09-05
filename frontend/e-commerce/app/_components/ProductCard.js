import Image from "next/image";
import Link from "next/link";
import RatingStatic from "./RatingStatic";
import { ShoppingCartPlus } from "tabler-icons-react";
function ProductCard({ product }) {
  const {
    _id,
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
  console.log(_id);
  return (
    <div className="card  bg-base-200 w-[15rem] shadow-2xl  ">
      <figure className="h-[10rem] !relative ">
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
          <h2 className="font-[700]">{name}</h2>
        </Link>
        <div className="flex flex-row justify-start items-center">
          {
            <span
              className={`font-[500] ${price !== finalPrice ? "mr-2" : ""} `}
            >{`${finalPrice.toLocaleString()} EGP`}</span>
          }
          {price != finalPrice && (
            <span className="line-through inline-block text-md !text-opacity-80 text-gray-500">{`${price.toLocaleString()} `}</span>
          )}
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
