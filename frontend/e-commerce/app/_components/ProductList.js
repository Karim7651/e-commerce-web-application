import { getProducts } from "../_lib/Products";
import ProductCard from "./ProductCard";
import { unstable_noStore as noStore } from "next/cache";
async function ProductList() {
  noStore();
  const products = await getProducts();
  console.log(products);
  if (!products) return null;

  return (
    
      <div className="grid  md:grid-cols-1 lg:grid-cols-2  justify-items-center justify-center items-center gap-10 my-40">
        {products.map((product) => (
          <ProductCard product={product} key={"123"} />
        ))}
      </div>
    
  );
}

export default ProductList;
