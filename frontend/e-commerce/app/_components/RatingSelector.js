export default function RatingSelector({ rating, setRating }) {
  const handleRatingChange = (e) => {
    setRating(e.target.value); // Update the rating state in the parent component
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-base-content">Customer Rating</h2>
      <fieldset className="flex items-center justify-center w-auto">
        {/* Provide a label for the group of radio buttons */}
        <legend className="sr-only">Select a rating</legend>

        {/* Each input has a label for better accessibility */}
        <div className="rating rating-sm">
          <input
            type="radio"
            name="rating"
            id="rating-1"
            className="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
            value="1"
            checked={rating === "1"}
            onChange={handleRatingChange}
          />
          <label htmlFor="rating-1" className="sr-only">
            1 star
          </label>

          <input
            type="radio"
            name="rating"
            id="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="2 stars"
            value="2"
            checked={rating === "2"}
            onChange={handleRatingChange}
          />
          <label htmlFor="rating-2" className="sr-only">
            2 stars
          </label>

          <input
            type="radio"
            name="rating"
            id="rating-3"
            className="mask mask-star-2 bg-orange-400"
            aria-label="3 stars"
            value="3"
            checked={rating === "3"}
            onChange={handleRatingChange}
          />
          <label htmlFor="rating-3" className="sr-only">
            3 stars
          </label>

          <input
            type="radio"
            name="rating"
            id="rating-4"
            className="mask mask-star-2 bg-orange-400"
            aria-label="4 stars"
            value="4"
            checked={rating === "4"}
            onChange={handleRatingChange}
          />
          <label htmlFor="rating-4" className="sr-only">
            4 stars
          </label>

          <input
            type="radio"
            name="rating"
            id="rating-5"
            className="mask mask-star-2 bg-orange-400"
            aria-label="5 stars"
            value="5"
            checked={rating === "5"}
            onChange={handleRatingChange}
          />
          <label htmlFor="rating-5" className="sr-only">
            5 stars
          </label>
        </div>

        {/* Add margin and readable text for sighted users */}
        <div className="ml-2  text-opacity-50 text-sm select-none text-base-content">& Up</div>
      </fieldset>
    </div>
  );
}
