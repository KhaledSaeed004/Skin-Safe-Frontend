import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import Button from "../ui/Button";

type DoctorCardProps = {
  variant: "portrait" | "landscape";
};

function DoctorCard({ variant = "portrait" }: DoctorCardProps) {
  return variant === "landscape" ? (
    <div className="flex flex-shrink-0 cursor-pointer rounded-md border border-gray-200 transition-all duration-300 ease-in-out hover:scale-95 hover:shadow-md">
      <div className="w-fit">
        <img src="/doctor-full-body.png" alt="Doctor avatar full body" />
      </div>
      <div className="flex flex-col justify-between py-6 pr-6">
        <div className="pr-16">
          <h3 className="mb-2 text-lg font-medium">Dr. Khalil Atef</h3>
          <p className="mb-1 text-sm text-gray-500">Dermatologist</p>
          <p className="text-xs">11 years experience</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-primary flex items-center text-xs font-medium">
            <StarIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
            4.6
          </span>
          <Button variant="primary" className="min-w-[100px] py-1 text-sm">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-60 flex-shrink-0 cursor-pointer flex-col rounded-md border border-gray-200 p-6 transition-all duration-300 ease-in-out hover:scale-95 hover:shadow-md">
      <div className="mb-4 w-fit self-center overflow-hidden rounded-full">
        <img src="/female-doctor-avatar.png" alt="Doctor avatar" />
      </div>
      <h3 className="mb-2 font-medium">Dr. Hend Khaled</h3>
      <p className="mb-1 text-sm text-gray-500">Dermatologist</p>
      <p className="text-xs">13 years experience</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-primary flex items-center text-xs font-medium">
          <StarIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
          4.7
        </span>
        <span className="flex items-center text-xs text-gray-500">
          <MapPinIcon className="mr-1 inline h-5 w-5" aria-hidden="true" />
          500 meters
        </span>
      </div>
    </div>
  );
}

export default DoctorCard;
