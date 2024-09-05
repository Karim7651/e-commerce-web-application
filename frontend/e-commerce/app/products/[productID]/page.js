import ProductDetails from "@/app/_components/ProductDetails"

function page({params}) {
    const {productID} = params
    return (
        <ProductDetails productID={productID}/>
    )
}

export default page
