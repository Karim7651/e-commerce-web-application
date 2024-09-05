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
export const getProductDetails = async(productId)=>{
  const productEndPoint = `${process.env.NEXT_PUBLIC_API}/products/${productId}`
  try{
    const product = await fetch(productEndPoint,{next:{revalidate:0}})
    const productData = await product.json()
    return productData.data.data
  }catch(err){
    console.log(err)
  }
}
