import  Pagination  from "./Pagination";
import { getProducts } from "../_lib/Products";
import ProductCard from "./ProductCard";


export default async function ProductList() {
  const products = await getProducts();
  if (!products) return null;
  
  return (
    <>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center justify-center items-start gap-x-10 gap-y-20 my-32  mx-auto ">
        {products.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
      <Pagination />
    </>
  );
}


