import ProductCard from "./ProductCard";
import { getSimilarProducts } from "../_lib/Products";

export default async function SimilarProductsList({ filters }) {
  const products = await getSimilarProducts(filters);
  if (!products) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center items-start gap-y-20 my-10 mx-auto">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}
