function PriceAndDiscount({ product, className }) {
  return (
    <div className={`flex flex-row justify-start items-center ${className}`}>

      {/* Currency first */}
      <span className="font-light text-base-content text-[0.6rem] relative top-[-4px] mr-[2px]">
        EGP
      </span>

      {/* Final price */}
      <span
        className={`font-semibold text-base-content ${
          product.price !== product.finalPrice ? "mr-2" : ""
        }`}
      >
        {`${product.finalPrice.toLocaleString()}`}
      </span>

      {/* {product.price !== product.finalPrice && (
        <>
          <span className="line-through text-sm text-base-content !text-opacity-80 mr-2">
            {`${product.price.toLocaleString()}`}
          </span>
        </>
      )} */}
      {/* Discount percentage */}
      {product.price !== product.finalPrice && (
        <span className=" text-red-600 font-semibold text-sm">
          {`-${(
            ((product.price - product.finalPrice) / product.price) *
            100
          ).toFixed(2)}%`}
        </span>
      )}
    </div>
  );
}

export default PriceAndDiscount;
