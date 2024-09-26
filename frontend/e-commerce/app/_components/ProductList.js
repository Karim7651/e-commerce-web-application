import  Pagination  from "./Pagination";
import { getProducts } from "../_lib/Products";
import ProductCard from "./ProductCard";


export default async function ProductList({ filters }) {
  const products = await getProducts(filters);
  if (products.length === 0) {
    return <p className="text-center">No products found</p>;
  }
  return (
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 justify-items-center  justify-center items-start gap-y-20 my-10  mx-auto  ">
        {products.map((product) => (
          <ProductCard product={product} key={product.name} />
        ))}
      </div>
  );
}


