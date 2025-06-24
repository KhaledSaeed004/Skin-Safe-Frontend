import { StarIcon as FilledStarIcon } from "@heroicons/react/20/solid";

function ReviewCard({ name, image, rate, date, comment }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <div className="aspect-square size-12 overflow-hidden rounded-full">
          <img src={image} alt={name} className="size-full object-cover" />
        </div>
        <div className="flex w-full items-center justify-between">
          <span>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <FilledStarIcon className="h-5 w-5 text-yellow-400" />
            {rate}
          </span>
        </div>
      </div>
      <p className="mt-3 text-gray-600">{comment}</p>
    </div>
  );
}

export default ReviewCard;
