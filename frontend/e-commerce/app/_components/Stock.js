function Stock({product,className}) {
  return (
    <div className={`${className}`}>
      {product.stock > 10 ? (
        <div className="flex items-center ">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 " ></div>
          <span className="text-base-content opacity-60 font-normal">In Stock</span>
        </div>
      ) : product.stock > 0 && product.stock <= 10 ? (
        <div className="flex items-center ">
          <div className="w-2 h-2 rounded-full bg-orange-300 mr-2"></div>
          <span>Only {product.stock} left</span>
        </div>
      ) : (
        <div className="flex items-center ">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
          <span className="text-base-content opacity-60 font-normal">Out of Stock</span>
        </div>
      )}
    </div>
  );
}

export default Stock;
