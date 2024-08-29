import Image from "next/image"
function ProductCard({product}) {
  console.log(product)
  const{name,description,ratingsAverage,ratingQuantity,price,priceDiscount,finalPrice,imageCover} = product
  console.log(imageCover)
  return (
    <div className="card bg-base-100 sm:w-[50svw] md:w-[30svw] xl:w-[25svw] h-[60svh] shadow-xl ">
      <figure className="sm:h-[55%] xl:h-[65%] relative">
        <Image
          src={imageCover}
          alt="title"
          fill
          style={{ objectFit: 'cover' }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
