import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function RecentDoctorCard({ doctor }) {
  const {
    _id,
    firstName,
    secondName,
    specialty,
    experience,
    ratingsAverage,
    ratingsQuantity,
    image,
  } = doctor;

  const fullName = `Dr. ${firstName} ${secondName}`;
  const doctorImage =
    image && image.includes("example.com")
      ? "/doctor-image.jpg"
      : image || "/doctor-image.jpg";

  return (
    <Link
      to={`/doctor/${_id}`}
      className="flex w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-transform duration-200 hover:scale-95"
    >
      <img
        src={doctorImage}
        alt={fullName}
        className="h-auto w-32 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{fullName}</h3>
          <p className="line-clamp-2 max-w-md truncate text-sm text-gray-500">
            {specialty || "Unknown Specialty"}
          </p>
          {experience && (
            <p className="mt-1 text-xs text-gray-400">
              {experience} years experience
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center text-xs text-yellow-600">
            <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
            {ratingsAverage?.toFixed(1) || "N/A"}{" "}
            <span className="ml-1 text-gray-400">({ratingsQuantity || 0})</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RecentDoctorCard;
