import ProductListWithSuspense from "@/app/_components/ProductListWithSuspense"; 

const SearchPage = async ({searchParams}) => {

  if (Object.keys(searchParams).length === 0) {
    return <div>No results</div>;
  }

  return (
      <div className="relative w-[90%] mx-auto my-20">
        {/* Header */}
        <div className="flex justify-between items-center bg-base-200 text-base-content p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Search Results</h2>
        </div>
  
        {/* Bordered div with products */}
        <div className="border-b-[0.03rem] border-r-[0.03rem] border-l-[0.03rem] border-neutral-600 border-opacity-30 rounded-b-lg p-4">
          <ProductListWithSuspense filters={searchParams}/>
        </div>
      </div>
    );
};

export default SearchPage;
