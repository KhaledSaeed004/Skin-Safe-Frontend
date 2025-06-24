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

  return variant === "landscape" ? (
    <div className="flex flex-shrink-0 cursor-pointer rounded-md border border-gray-200 transition-all duration-300 ease-in-out hover:scale-95 hover:shadow-md">
      <div className="w-fit">
        <img src={doctorImage} alt="Doctor avatar full body" />
      </div>
      <div className="flex flex-col justify-between py-6 pr-6">
        <div className="pr-16">
          <h3 className="mb-2 text-lg font-medium">
            Dr. {firstName} {secondName}
          </h3>
          <p className="mb-1 text-sm text-gray-500">{specialty}</p>
          <p className="text-xs">{experience} years of experience</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-primary flex items-center text-xs font-medium">
            <StarIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
            {ratingsAverage} ({ratingsQuantity})
          </span>
          <Button variant="primary" className="min-w-[100px] py-1 text-sm">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Link to={`/doctor/${id}`}>
      <div className="flex w-60 flex-shrink-0 cursor-pointer flex-col rounded-md border border-gray-200 p-6 transition-all duration-300 ease-in-out hover:scale-95 hover:shadow-md">
        <div className="mb-4 w-fit self-center overflow-hidden rounded-full">
          <img src={doctorImage} alt="Doctor avatar" />
        </div>
        <h3 className="mb-2 font-medium">
          Dr. {firstName} {secondName}
        </h3>
        <p className="mb-1 text-sm text-gray-500">{specialty}</p>
        <p className="text-xs">{experience} years of experience</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-primary flex items-center text-xs font-medium">
            <StarIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
            {ratingsAverage} ({ratingsQuantity})
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
