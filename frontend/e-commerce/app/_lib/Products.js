export const getProducts = async (filters = {}) => {
  const productsEndPoint = `${process.env.NEXT_PUBLIC_API}/products`;
  const queryParams = new URLSearchParams(filters).toString();

  try {
    const products = await fetch(`${productsEndPoint}?${queryParams}`, {
      next: { revalidate: 0 },
    });
    const productsData = await products.json();
    return productsData.data.data;
  } catch (err) {
    console.log(err);
  }
};
export const getSimilarProducts = async (filters = {}) => {
  const { subCategories = [], excludedProductId, limit = 3 } = filters;
  const productsEndPoint = `${process.env.NEXT_PUBLIC_API}/products/from-category`;

  // Ensure subCategories is an array and join them
  const subCategoriesString = Array.isArray(subCategories) ? subCategories.join(",") : "";

  const queryParams = new URLSearchParams({
    subCategories: subCategoriesString,
    excludedProductId,
    limit,
  }).toString();
  try {
    const response = await fetch(`${productsEndPoint}?${queryParams}`, {
      next: { revalidate: 10 },
    });
    const productsData = await response.json();
    return productsData.data.products;
  } catch (err) {
    console.log(err);
    return [];
  }
};


export const getProductDetails = async (productId) => {
  const productEndPoint = `${process.env.NEXT_PUBLIC_API}/products/${productId}`;
  try {
    const product = await fetch(productEndPoint, { next: { revalidate: 0 } });
    const productData = await product.json();
    return productData.data.data;
  } catch (err) {
    console.log(err);
  }
};
