"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import RatingStatic from "./RatingStatic";
import { Truck, Package, ShoppingCartPlus } from "tabler-icons-react";
import { toast } from "sonner";
import ProductDescriptionAccordion from "./ProductDescriptionAccordion";
import Breadcrumb from "./Breadcrumb"; // Import the Breadcrumb component

function ProductDetails({ product }) {
  if (!product) {
    return <div>No product</div>;
  }

  const [currentImage, setCurrentImage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const thumbnailsRef = useRef(null);

  const images = [product.imageCover, ...product.images];

  const handleImageClick = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsFading(false);
    }, 300);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity > product.stock) {
      toast.error("You can't add more than available stock");
      return;
    }
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to the cart`);
  };

  const handleBuyNow = () => {
    console.log(`Proceeding to checkout with ${quantity} of ${product.name}`);
  };

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: product.mainCategory, url: `/categoryName=${product.mainCategory}` },
    { label: product.name }
  ];

  return (
    <div className="mx-auto py-5 px-4">
      {/* Breadcrumb Component */}
      <Breadcrumb array={breadcrumbItems} />

      <div className="flex gap-3 items-center flex-col lg:flex-row justify-center">
        {/* Thumbnails and Main Image */}
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
                  onClick={() => handleImageClick(index)}
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

        <div className="self-center my-3 lg:my-16 lg:ml-10">
          {/* Product Info */}
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="font-extralight">{product.mainCategory}</p>
          <div className="divider divider-neutral mt-1"></div>

          {/* Price and Stock */}
          <div className="flex flex-row justify-start items-center mb-4">
            <span
              className={`font-[600] ${
                product.price !== product.finalPrice ? "mr-2" : ""
              }`}
            >
              {`${product.finalPrice.toLocaleString()} EGP`}
            </span>
            {product.price !== product.finalPrice && (
              <span className="line-through inline-block text-md !text-opacity-80 text-gray-500">
                {`${product.price.toLocaleString()} `}
              </span>
            )}
          </div>

          <div className="text-sm font-light mb-2">
            {product.stock > 10 ? (
              <div className="flex items-center ">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>In Stock</span>
              </div>
            ) : product.stock > 0 && product.stock <= 10 ? (
              <div className="flex items-center ">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Only {product.stock} left</span>
              </div>
            ) : (
              <div className="flex items-center ">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          {/* Ratings */}
          <div className="flex mb-4 flex-row items-center">
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
                <p className="ml-2 inline-block text-sm font-semibold">
                  No Ratings Yet
                </p>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="text-sm self-center font-semibold">Quantity:</h3>

            <div className="flex items-center shadow-md ">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-l-sm bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                -
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300 text-neutral-500 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-r-sm bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-4 h-10 justify-center items-center">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 shadow-lg text-white rounded-sm hover:bg-blue-600 hover:scale-105 hover:shadow-xl transition-all duration-300 w-[50%] active:scale-95"
            >
              <ShoppingCartPlus className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center px-4 py-2 bg-green-500 shadow-lg text-white rounded-sm hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 w-[50%] active:scale-95"
            >
              <Truck className="mr-2" />
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <div className="flex items-center">
              <Truck size={24} className="mr-3" />
              <p>
                <span>Doorstep Delivery,</span> Your order will be shipped in
                2-5 days.
              </p>
            </div>
            <div className="flex items-center">
              <Package size={24} className="mr-3" />
              <p>Easy Returns, within 30 days from the delivery date.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mx-auto mt-5 px-4">
        <ProductDescriptionAccordion
          description={product.description}
          specifications={product.specifications}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
