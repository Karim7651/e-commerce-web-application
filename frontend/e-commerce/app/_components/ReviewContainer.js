import ReviewCard from "./ReviewCard";

const ReviewContainer = ({ reviews }) => {
  return (
    <section className="flex justify-center mb-10 mt-1">
      <div className="join join-vertical xs:w-[100%]">
        <div className="collapse collapse-arrow join-item border-[0.05rem] border-neutral-600 rounded-md !px-0 shadow-lg">
          <input type="checkbox" id="reviews-accordion" aria-labelledby="reviews-header" />
          <label htmlFor="reviews-accordion" id="reviews-header" className="collapse-title text-xl font-semibold" aria-expanded="false">
            Customer Reviews
          </label>
          <div className="collapse-content">
            {reviews.length === 0 ? (
              <p className="text-center text-base-content my-4">
                No reviews available at the moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 place-items-center justify-items-center justify-center items-start my-8">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewContainer;
