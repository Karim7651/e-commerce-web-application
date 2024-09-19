import ProductListWithSuspense from "./ProductListWithSuspense";

function SimlarProducts(props) {
  return (
    <div className="relative w-12/12 mx-auto mb-20">
      {/* Header */}
      <div className="flex justify-between items-center bg-base-200 text-base-content p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Similar Products</h2>
      </div>

      {/* Bordered div with products */}
      <div className="border-b-[0.03rem] border-r-[0.03rem] border-l-[0.03rem]  border-neutral-600  border-opacity-30  rounded-b-lg p-4 ">
        <ProductListWithSuspense filters={{ limit: 3,mainCategory:props.category }} />
      </div>
    </div>
  );
}

export default SimlarProducts;
