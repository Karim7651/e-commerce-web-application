import  Pagination  from "./Pagination";
import { getProducts } from "../_lib/Products";
import ProductCard from "./ProductCard";
import { unstable_noStore as noStore } from "next/cache";
async function ProductList() {
  noStore();
  const products = await getProducts();
  if (!products) return null;
  return (
    <>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center justify-center items-center gap-x-10 gap-y-20 my-32  mx-auto">
        {products.map((product) => (
          <ProductCard product={product} key={"123"} />
        ))}
      </div>
      <Pagination />
    </>
  );
}

export default ProductList;
