export const getProducts = async () => {
  
  const productsEndPoint = `${process.env.API}/products`;
  try {
    const products = await fetch(productsEndPoint);
    const productsData = await products.json();
    return productsData.data.data;
  } catch (err) {
    console.log(err);
  }
  console.log("getting products")
};
