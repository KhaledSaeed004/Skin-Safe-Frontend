import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function RecentDoctorCard({ doctor }) {
  const { _id, name, specialty, image } = doctor;

  const doctorImage = image.includes("example.com")
    ? "/doctor-image.jpg"
    : image;

  return (
    <Link
      to={`/doctor/${_id}`}
      className="flex w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition hover:scale-95"
    >
      <img src={doctorImage} alt={name} className="h-auto w-32 object-cover" />

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-semibold">{name}</h3>
          <p className="line-clamp-2 text-sm text-gray-500">{specialty}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center text-xs text-yellow-600">
            <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
            4.5 (100)
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecentDoctorCard;
