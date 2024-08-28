import styles from "./RatingStatic.module.css";

function RatingStatic(props) {
  const { rating } = props;
  // rating lastIndexChecked
  //  0.5 0
  //  1   1
  //  1.5 2
  //  2   3
  //  2.5 4
  //  3   5
  //  3.5 6
  //  4   7
  //  4.5 8
  //  5   9
  // Calculate which index should be checked
  // Your mapping logic: (rating * 2) - 1
  const checkedIndex = Math.floor(rating * 2) - 1;

  return (
    <div className="rating rating-sm rating-half">
      {[...Array(10)].map((_, index) => {
        const isHalfStar = index % 2 === 1; // Only odd indices are half stars
        const isChecked = index === checkedIndex;

        let className = `${styles.unclickable} mask mask-star-2 `;
        if (index <= checkedIndex) {
          className += "bg-yellow-500"; // Full star
        } else {
          className += "bg-gray-300"; // Empty star
        }

        return (
          <input
            key={index}
            type="radio"
            name="rating-10"
            className={`${className} ${
              isHalfStar ? "mask-half-2" : "mask-half-1"
            }`}
            defaultChecked={isChecked}
            readOnly
          />
        );
      })}
    </div>
  );
}

export default RatingStatic;
