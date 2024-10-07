"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingSelector from "./RatingSelector";

const SearchFilter = ({ searchParams }) => {
  const router = useRouter();
  const [rating, setRating] = useState(searchParams?.ratingsAverage || "");
  const [minPrice, setMinPrice] = useState(searchParams?.price?.gte || "");
  const [maxPrice, setMaxPrice] = useState(searchParams?.price?.lte || "");
  const [sort, setSort] = useState(searchParams?.sort || "");

  const filters = [
    {
      key: "ratingsAverage[gte]",
      value: rating,
    },
    {
      key: "price[gte]",
      value: minPrice,
    },
    {
      key: "price[lte]",
      value: maxPrice,
    },
    {
      key: "sort",
      value: sort,
    },
  ];

  const handleFilterChange = () => {
    const newQuery = { ...searchParams };
    filters.forEach(({ key, value }) => {
      if (value) {
        newQuery[key] = value;
      } else {
        delete newQuery[key];
      }
    });

    const queryString = new URLSearchParams(newQuery).toString();
    router.push(`/search?${queryString}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center my-10 mx-auto px-4 py-6 shadow-lg rounded-lg w-[90%] bg-base-200 ">
      <div className="flex flex-col">
        <RatingSelector rating={rating} setRating={setRating} />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Min Price</label>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100  transition-all duration-200 "
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Max Price</label>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100  transition-all duration-200 "
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-2">Sort By</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-base-100   transition-all duration-200 "
        >
          <option value="" disabled>
            Sort By
          </option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          <option value="ratingsAverage">Rating (Low to High)</option>
          <option value="-ratingsAverage">Rating (High to Low)</option>
        </select>
      </div>

      <div className="flex justify-center col-span-2 md:col-span-4">
        <button
          className="btn px-6 py-2 bg-green-500 text-base-content font-semibold !rounded-md   hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
          onClick={handleFilterChange}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-filter-search w-6 h-6"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M20.2 20.2l1.8 1.8" />
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
