"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import useSWR from "swr";
import RatingStatic from "./RatingStatic";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
const fetcher = (url) => fetch(url).then((res) => res.json());

function ProductDetails(props) {
  const { productID } = props;

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/products/${productID}`,
    fetcher
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const thumbnailsRef = useRef(null);

  if (error) return <div>failed to load</div>;
  if (!data) return <ProductDetailsSkeleton />;

  const product = data.data.data;
  const images = [product.imageCover, ...product.images];

  const handleImageClick = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsFading(false);

      // Scroll to the selected thumbnail
      if (thumbnailsRef.current) {
        const thumbnail = thumbnailsRef.current.children[index];
        if (thumbnail) {
          const container = thumbnailsRef.current;
          const isHorizontal = container.scrollWidth > container.clientWidth;
          const isVertical = container.scrollHeight > container.clientHeight;
          if (isHorizontal) {
            container.scrollTo({
              left:
                thumbnail.offsetLeft -
                container.clientWidth / 2 +
                thumbnail.clientWidth / 2,
              behavior: "smooth",
            });
          } else if (isVertical) {
            container.scrollTo({
              top:
                thumbnail.offsetTop -
                container.clientHeight / 2 +
                thumbnail.clientHeight / 2,
              behavior: "smooth",
            });
          }
        }
      }
    }, 300);
  };

  return (
    <div className="mx-auto my-20 px-4">
      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center">
        <div className="flex flex-row gap-3 justify-center relative lg:flex-col lg:h-70 lg:mr-[2rem] lg:h-[25rem] lg:w-[8rem] xs:w-[25rem] xs:overflow-x-auto lg:overflow-y-visible xs:overflow-y-hidden">
          <div
            className="flex lg:flex-col lg:overflow-x-auto xs:overflow-y-auto scrollbar-hide xs:overflow-x-auto gap-4"
            ref={thumbnailsRef}
          >
            {images.map((image, index) => (
              <div
                className={`relative w-24 h-24 shrink-0 rounded-sm transition-all duration-400 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] ${
                  currentImage === index ? "" : "opacity-60 grayscale-[60%]"
                }`}
                key={index}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  fill
                  style={{ objectFit: "contain" }}
                  onClick={() => handleImageClick(index)} // Handle image click
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-96 h-96">
          <Image
            src={images[currentImage]}
            alt="Main product image"
            className={`rounded-sm transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="self-start my-3 lg:my-16 lg:ml-10">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <h3 className="text-xl font-medium mt-4 mb-3">
            {product.description}
          </h3>
          <div className="flex flex-row justify-start items-center mb-3">
            <span
              className={`font-[600] ${
                product.price !== product.finalPrice ? "mr-2" : ""
              } `}
            >
              {`${product.finalPrice.toLocaleString()} EGP`}
            </span>
            {product.price !== product.finalPrice && (
              <span className="line-through inline-block text-md !text-opacity-80 text-gray-500">{`${product.price.toLocaleString()} `}</span>
            )}
          </div>
          <div className="flex mb-3 flex-row items-center">
            {product.ratingsQuantity !== 0 ? (
              <>
                <RatingStatic rating={product.ratingsAverage} />
                <p className="ml-2 inline-block text-sm font-semibold">
                  ({product.ratingsAverage}){" "}
                  {product.ratingsQuantity === 1
                    ? `${product.ratingsQuantity} Rating`
                    : `${product.ratingsQuantity} Ratings`}
                </p>
              </>
            ) : (
              <>
                <RatingStatic rating={0} size="1.6rem" />
                <p className="ml-2 inline-block text-sm font-bold">
                  No Ratings Yet
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
