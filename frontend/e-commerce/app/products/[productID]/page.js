import ProductDetails from "@/app/_components/ProductDetails";
import { getProductDetails } from "@/app/_lib/Products";

export async function generateMetadata({ params }) {
  const { productID } = params;
  const product = await getProductDetails(productID);
  if(!product){
    return 
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

  // Fetch product details for props
  const product = await getProductDetails(productID);

  return <ProductDetails product={product} />;
}
