export const getProducts = async () => {
  const productsEndPoint = `${process.env.NEXT_PUBLIC_API}/products`;
  try {
    const products = await fetch(productsEndPoint,{next:{revalidate:0}});
    const productsData = await products.json();
    return productsData.data.data;
  } catch (err) {
    console.log(err);
  }
  
};
