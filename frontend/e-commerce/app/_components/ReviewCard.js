import Image from "next/image";
import RatingStatic from "./RatingStatic";

const ReviewCard = ({ review }) => {
  console.log(review)
  const avatarSrc = `${process.env.NEXT_PUBLIC_GALLERY}/avatar.png`;

  return (
    <article className="border border-gray-300 rounded-lg p-4 xs:w-[80%] min-h-[150px] flex flex-col shadow-md">
      <header className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full overflow-hidden relative mr-3 bg-white p-4">
          <Image
            src={avatarSrc}
            alt={`Avatar of user`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3 className="font-light text-lg">{review.user.name || "Anonymous"}</h3>
      </header>

      <div className="flex items-center mb-2">
        <RatingStatic
          rating={review.rating}
          aria-label={`Rating: ${review.rating} out of 5`}
        />
        <h4 className="font-semibold ml-2 text-lg">{review.title}</h4>
      </div>

      <p className="mt-2 text-base-content font-normal">{review.review}</p>
    </article>
  );
};

export default ReviewCard;
