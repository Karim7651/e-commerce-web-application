import ProductDetails from "@/app/_components/ProductDetails";
import { getProductDetails } from "@/app/_lib/Products";
import dynamic from "next/dynamic";
const SimilarProducts = dynamic(() => import('../../_components/SimilarProducts'), {
  loading: () => <p>Loading similar products...</p>,
});
export async function generateMetadata({ params }) {
  const { productID } = params;
  const product = await getProductDetails(productID);
  if (!product) {
    return;
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageCover,
          alt: `Image of ${product.name}`,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { productID } = params;
  const product = await getProductDetails(productID);

  return (
    <>
      <ProductDetails product={product} />
      <SimilarProducts
        category={product.subCategories}
        excludedProductId={product._id}
      />
    </>
  );
}
