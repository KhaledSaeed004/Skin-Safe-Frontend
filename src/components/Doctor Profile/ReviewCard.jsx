import { StarIcon as FilledStarIcon } from "@heroicons/react/20/solid";
import userCommentAvatar from "/user_comment.png";
import { cn } from "../../utils/cn";

function generateRandomRecentDate(daysAgo = 30) {
  const now = new Date();
  const past = new Date(now);
  past.setDate(now.getDate() - Math.floor(Math.random() * daysAgo));
  return past.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ReviewCard({ user, rating, comment, date }) {
  const { name, image } = user;

  const displayDate = date || generateRandomRecentDate();
  const displayImage = image || userCommentAvatar;

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <div className="aspect-square size-12 overflow-hidden rounded-full">
          <img
            src={displayImage}
            alt={name}
            className="size-full object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <span>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-gray-500">{displayDate}</p>
          </span>
          <span className="relative inline-flex items-center gap-1 font-medium">
            <FilledStarIcon className="h-12 w-12 text-yellow-400" />
            <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-0.5 text-center font-semibold text-white">
              {rating}
            </span>
          </span>
        </div>
      </div>
      <p
        className={cn("mt-3 ml-2", comment ? "text-gray-600" : "text-gray-400")}
      >
        {comment || "No comment provided"}
      </p>
    </div>
  );
}

export default ReviewCard;
