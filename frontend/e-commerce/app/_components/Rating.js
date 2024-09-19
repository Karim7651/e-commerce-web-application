import RatingStatic from "./RatingStatic";
function Rating({product,size}) {
  return (
    <div className="flex mb-3 flex-row justify-center items-center">
      {product.ratingsQuantity != 0 && <RatingStatic rating={product.ratingsAverage} size={size} />}
      {product.ratingsQuantity != 0 && (
        <p className="ml-2 inline-block text-xs font-light">
          ({product.ratingsAverage}){" "}
          {product.ratingsQuantity === 1
            ? `${product.ratingsQuantity} Rating`
            : `${product.ratingsQuantity} Ratings`}
        </p>
      )}
      {product.ratingsQuantity == 0 && <RatingStatic rating={0} size={size} />}
      {product.ratingsQuantity == 0 && (
        <p className="ml-2 inline-block text-xs font-light">No Ratings Yet</p>
      )}
    </div>
  );
}

export default Rating;
