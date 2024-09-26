import RatingStatic from "./RatingStatic";
function Rating({product,size,className}) {
  return (
    <div className={`flex mb-3 flex-row justify-start items-start   ${className}`}>
      {product.ratingsQuantity != 0 && <RatingStatic rating={product.ratingsAverage} size={size} />}
      {product.ratingsQuantity != 0 && (
        <p className="ml-2  text-xs font-extralight mt-1">
          ({product.ratingsAverage}){" "}
          {product.ratingsQuantity === 1
            ? `${product.ratingsQuantity} Rating`
            : `${product.ratingsQuantity} Ratings`}
        </p>
      )}
      {product.ratingsQuantity == 0 && <RatingStatic rating={0} size={size} />}
      {product.ratingsQuantity == 0 && (
        <p className="ml-2  text-xs font-extralight mt-1">No Ratings Yet</p>
      )}
    </div>
  );
}

export default Rating;
