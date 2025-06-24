import {
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

function DoctorProfile() {
  const { id } = useParams();
  const { data = {}, isLoading, error } = useDoctor(id);
  const {
    firstName,
    secondName,
    experience,
    specialty,
    ratingsAverage,
    about,
    certificate,
  } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      {/* Doctor Cover & Avatar */}
      <div className="relative pt-8">
        <div className="h-72 overflow-hidden rounded-xl">
          <img
            src="/doctor-profile-cover.png"
            alt="Doctor profile cover image"
            className="size-full object-cover object-[50%_30%]"
          />
        </div>
        <div className="outline-primary absolute -bottom-1/4 left-[4rem] aspect-square w-44 overflow-hidden rounded-full outline-4">
          <img
            src="/doctor-avatar.jpg"
            alt="Doctor profile avatar image"
            className="w-full object-cover"
          />
        </div>
      </div>
      {/* Doctor Name & Specialization */}
      <div className="mt-28 px-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">
            Dr. {firstName} {secondName}
          </h2>
          <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs tracking-wide text-gray-700">
            <span className="bg-primary inline-block size-2 rounded-full" />
            {specialty}
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
            {/* <span className="inline-block size-2 rounded-full bg-gray-500" /> */}
            <span className="inline-flex items-center gap-1 text-sm text-gray-700">
              <StarIcon className="h-5 w-5" />
              {ratingsAverage ? ratingsAverage.toFixed(1) : "N/A"}
            </span>
            <Modal>
              <Modal.OpenBtn opens="doctor-booking">
                <Button className="min-w-fit px-4">Book Appointment</Button>
              </Modal.OpenBtn>
              <Modal.Window name="doctor-booking">
                <AppointmentBookingPopup />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
      <div className="w-[80%] px-8">
        <Divider />
        {/* Doctor Profile */}
        <div>
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
        </div>
        <Divider />
        {/* Doctor Reviews */}
        <div>
          <h3 className="text-lg font-medium">Doctor's Reviews</h3>
          <DoctorReviews id={id} />
        </div>
      </div>
    </main>
  );
}

export default DoctorProfile;
