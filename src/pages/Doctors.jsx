import { useDoctors } from "../features/home/useDoctors";
import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import DoctorCard from "../components/Home/DoctorCard";
import DoctorCardSkeleton from "../components/Home/DoctorCardSkeleton";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function Doctors() {
  const { doctors, isLoading, error } = useDoctors();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <DoctorCardSkeleton key={index} />
        ))}
      </div>
    );

  if (error)
    return <p className="py-10 text-center text-red-500">{error.message}</p>;

  if (!doctors?.length)
    return <p className="py-20 text-center text-gray-500">No doctors found.</p>;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8">
      <div className="mb-6">
        <h2 className="text-primary-text text-4xl font-bold">Browse Doctors</h2>
        <p className="mt-2 text-sm text-gray-500">
          Select a doctor to view details and book appointments.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctors.map((doc) => (
          <DoctorGridCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </section>
  );
}

export default Doctors;

function DoctorGridCard({ doctor }) {
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

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:scale-105">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={doctorImage}
          alt={`Dr. ${firstName} ${secondName}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="mb-2">
          <Link to={`/doctor/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 ease-in-out hover:text-blue-500">
              Dr. {firstName} {secondName}
            </h3>
          </Link>
          <p className="mt-2 mb-4 truncate text-sm text-gray-500">
            {specialty}
          </p>
          <p className="text-xs text-gray-400">
            {experience} years of experience
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center text-sm text-yellow-600">
            <StarIcon className="mr-1 h-5 w-5 text-yellow-500" />
            {ratingsAverage.toFixed(1)} ({ratingsQuantity})
          </span>
          <span className="flex items-center text-xs text-gray-500">
            <MapPinIcon className="mr-1 h-4 w-4" />
            500m
          </span>
        </div>
      </div>
    </div>
  );
}
