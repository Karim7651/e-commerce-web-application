import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchResult from "./SearchResult";
import Loading from "./Loading";
import Link from "next/link";

const DEBOUNCE_DELAY = 100;

const SearchResults = ({ searchQuery, isFocused }) => {
  const [products, setProducts] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      if (!debouncedQuery) {
        setProducts([]);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setNoResults(false); // Reset noResults before fetch

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/products?search=${debouncedQuery}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        if (data.status !== "success" || data.results === 0) {
          setNoResults(true); // No results, but not an error
          setProducts([]);
          return;
        }

        setProducts(data.data.data.slice(0, 3));
        setHasMore(data.results > 3); // Set if there are more than 3 results
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  let content;
  if (error) {
    content = <div className="p-4 text-center">Failed to load data</div>;
  } else if (isLoading) {
    content = (
      <div className="flex justify-center items-center p-4">
        <Loading />
      </div>
    );
  } else if (noResults) {
    content = <div className="p-4 text-center ">No products found</div>; 
  } else if (products.length === 0) {
    content = null;
  } else {
    content = (
      <>
        {products.map((product) => (
          <div
            key={product.id}
            className="border-b-neutral border-b-2 last:border-b-4 last:border-b-neutral"
          >
            <SearchResult product={product} />
          </div>
        ))}

        {hasMore && (
          <Link href={`/search?search=${debouncedQuery}`}>
            <div className="relative p-2 text-center ">
              <span className="absolute inset-0 bg-base-100 bg-opacity-80 backdrop-blur-sm  transition-transform transform scale-x-0 group-hover:scale-x-100 origin-center duration-300 ease-out"></span>
              <span className="relative z-10 cursor-pointer text-base-content">
                See more results...
              </span>
            </div>
          </Link>
        )}
      </>
    );
  }

  return (
    <AnimatePresence>
      {isFocused && (
        <div className="absolute inset-0 flex justify-center">
          <motion.div
            className=" mt-14 rounded-md shadow-lg z-50 w-96 lg:w-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className=" bg-base-100 bg-opacity-80 backdrop-blur-sm  w-96 lg:w-full">{content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
