import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CurrencyPoundIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import { useParams } from "react-router-dom";
import { useState } from "react";
import Divider from "../components/ui/Divider";
import DoctorReviews from "../components/Doctor Profile/DoctorReviews";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import AppointmentBookingPopup from "../components/AppointmentBookingPopup";
import { useDoctor } from "../features/doctorProfile/useDoctor";
import Skeleton from "react-loading-skeleton";
import { CertificateSuccessFilled } from "../utils/Icons";

function DoctorProfile() {
  const { id } = useParams();
  const { data = {}, isLoading } = useDoctor(id);
  const {
    image,
    firstName,
    secondName,
    experience,
    specialty,
    certificate,
    ratingsAverage,
    about,
    reviews,
    availability,
  } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  const mainSpecialty = specialty?.includes(",")
    ? specialty.split(",")[0]
    : specialty;

  const certificates = certificate
    ?.split(/[.]/) // split by full stop or comma
    .map((s) => s.trim())
    .filter(Boolean) // remove empty strings
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

  return isLoading ? (
    <main className="animate-pulse">
      <div className="relative pt-8">
        <div className="h-72 overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="absolute -bottom-1/4 left-[4rem] aspect-square w-44 rounded-full">
          <Skeleton circle className="h-full w-full" />
        </div>
      </div>

      <div className="mt-28 space-y-4 px-8">
        <Skeleton width={200} height={28} />
        <Skeleton width={120} height={20} />
        <div className="flex space-x-6">
          <Skeleton width={100} height={20} />
          <Skeleton width={60} height={20} />
          <Skeleton width={150} height={36} />
        </div>
        <Divider />
        <Skeleton count={4} />
        <Divider />
        <Skeleton count={4} height={100} />
      </div>
    </main>
  ) : (
    <main>
      {/* Doctor Cover & Avatar */}
      <div className="relative pt-8">
        <div className="h-72 overflow-hidden rounded-xl">
          <img
            src="/doctor-profile-cover-2.png"
            alt="Doctor profile cover image"
            className="size-full object-cover object-[50%_30%]"
          />
        </div>
        <div className="absolute -bottom-1/4 left-[4rem] aspect-square w-44 overflow-hidden rounded-full outline-4 outline-[#1348a8]">
          <img
            src={image}
            alt={`Dr. ${firstName}'s Image`}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Doctor Name & Specialization */}
      <div className="flex">
        <div className="w-[80%] shrink-0 px-8">
          <div className="mt-28">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">
                Dr. {firstName} {secondName}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs tracking-wide text-gray-700">
                <span className="bg-primary inline-block size-2 rounded-full" />
                {mainSpecialty}
              </span>
            </div>

            <div className="mt-2 flex justify-between">
              <a
                href="#"
                className="hover:text-primary inline-flex items-center gap-1 text-gray-700 transition-all duration-300 ease-in-out"
                title="View on Map"
              >
                <MapPinIcon className="h-6 w-6 text-inherit" />
                <p className="text-sm text-inherit">
                  Salah Salem Street, Ismilia, Egypt
                </p>
              </a>
              <div className="flex cursor-default items-center space-x-6">
                <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                  <CurrencyPoundIcon className="h-5 w-5" />
                  500 EGP
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                  <StarIcon className="h-5 w-5" />
                  {ratingsAverage ? ratingsAverage.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <Divider />
          {/* Doctor Profile */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">About Dr. {firstName}</h3>
            <div className="relative">
              <div className="relative">
                <p
                  className={`text-gray-600 ${!isExpanded && "line-clamp-4"} transition-all duration-300 ease-in-out`}
                >
                  {about ||
                    `Dr. ${firstName} has not provided any information about their background yet.`}
                </p>
                {!isExpanded && (
                  <div className="from-white-bg pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t to-transparent" />
                )}
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary mt-4 cursor-pointer text-sm font-medium hover:underline"
              >
                {isExpanded ? (
                  <>
                    Show less
                    <ChevronUpIcon className="ml-1 inline-block h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read more
                    <ChevronDownIcon className="ml-1 inline-block h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
          <Divider />
          {/* Doctor Reviews */}
          <div>
            <h3 className="text-lg font-medium">Doctor's Reviews</h3>
            <DoctorReviews reviews={reviews} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-36">
            <Modal>
              <Modal.OpenBtn opens="doctor-booking">
                <Button className="min-w-fit px-4">Book Appointment</Button>
              </Modal.OpenBtn>
              <Modal.Window name="doctor-booking">
                <AppointmentBookingPopup availability={availability} />
              </Modal.Window>
            </Modal>
          </div>
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
            <p className="text-base">
              <strong className="text-primary">{experience} Years</strong> of
              experience
            </p>
            {certificates.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Certificates</h3>
                <ul className="space-y-3">
                  {certificates.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-md bg-gray-50 px-3 py-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
                    >
                      <CertificateSuccessFilled className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                      <p className="text-base leading-snug text-gray-700">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DoctorProfile;
