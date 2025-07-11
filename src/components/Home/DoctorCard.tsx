import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

type DoctorPreview = {
  id: string;
  firstName: string;
  secondName: string;
  specialty: string;
  experience: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  image: string;
};

type DoctorCardProps = {
  variant: "portrait" | "landscape";
  doctor: DoctorPreview;
};

function DoctorCard({ variant = "portrait", doctor }: DoctorCardProps) {
  if (!doctor) {
    return null;
  }

  const {
    id,
    firstName,
    secondName,
    specialty,
    experience,
    ratingsAverage,
    ratingsQuantity,
    image,
  } = doctor;

  const doctorImage = image.includes("example.com")
    ? "/doctor-image.jpg"
    : image;

  const mainSpecialty = specialty.split(" ")[0];

  return variant === "landscape" ? (
    <Link
      to={`/doctor/${id}`}
      className="flex w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition hover:scale-95 hover:shadow-md"
    >
      <img
        src={doctorImage}
        alt={`Dr. ${name}`}
        className="h-auto w-32 object-cover"
      />

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-base font-semibold">Dr. {name}</h3>
          <p className="line-clamp-2 text-sm text-gray-500">{specialty}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center text-xs text-yellow-600">
            <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
            4.5 (100)
          </span>
          <Button variant="primary" className="px-4 py-1 text-sm">
            Book Now
          </Button>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/doctor/${id}`}>
      <div className="flex w-60 flex-shrink-0 cursor-pointer flex-col rounded-md p-6 shadow-[3px_4px_12px_0px_rgba(0,_0,_0,_0.1)] transition-all duration-300 ease-in-out hover:scale-95">
        <div className="mb-4 aspect-square w-36 self-center overflow-hidden rounded-full">
          <img className="w-full" src={doctorImage} alt="Doctor avatar" />
        </div>
        <h3 className="mb-2 truncate font-medium">
          Dr. {firstName} {secondName}
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-gray-500">
          {mainSpecialty}
        </p>
        <p className="text-xs capitalize">{experience} years of experience</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-primary flex items-center text-xs font-medium">
            <StarIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
            {Number(ratingsAverage).toFixed(1)} ({ratingsQuantity})
          </span>
          <span className="flex items-center text-xs text-gray-500">
            <MapPinIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
            500 meters
          </span>
        </div>
      </div>
    </Link>
  );
}

export default DoctorCard;
