import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import { LinkIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useReport } from "../features/scan/useReport";
import { useEffect } from "react";
import { useSpecificUser } from "../features/auth/useSpecificUser";
import { format } from "date-fns";
import Spinner from "../components/ui/SpinnerLarge";

export default function Report() {
  const { id } = useParams();
  const { report, isLoading } = useReport(id);

  const userId = report?.user;
  const { typeDetected, scannedImage, confidence, createdAt } = report || {};
  const { user: userData, isLoading: isLoadingUser } = useSpecificUser(userId);
  const { name, gender, skinTone, phoneNumber } = userData || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      document.title = "Loading Report...";
    } else if (report) {
      document.title = `Report Details`;
    }
  }, [isLoading, report]);

  if (isLoading || isLoadingUser) {
    return (
      <div className="flex size-full items-center justify-center">
        <Spinner className="h-12 w-12 text-gray-500" />
      </div>
    );
  }

  if (!report || !userData) {
    return (
      <div className="flex size-full items-center justify-center">
        <p className="text-lg text-gray-500">
          Sorry, the report could not be found.
        </p>
      </div>
    );
  }

  const goBackToReportsPage = () => {
    navigate("/user/reports");
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={goBackToReportsPage}
            className="cursor-pointer text-gray-800 transition-colors hover:text-blue-600"
          >
            <ChevronLeftIcon strokeWidth={2} className="h-8 w-8" />
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">
            Report Details
          </h1>
        </div>
        {/* <p className="text-gray-500">Your latest skin analysis results</p> */}
      </div>

      <div className="relative rounded-2xl border border-gray-300 bg-white p-6 md:p-8">
        <div className="mb-6 flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
          <img
            src={scannedImage || "/beautiful-photo-sea-sky 1.png"}
            alt="Skin Scan"
            className="h-48 w-48 rounded-lg border object-cover"
          />
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 text-sm text-gray-700 sm:grid-cols-2 md:text-base">
            <div>
              <p className="text-xs tracking-wide text-gray-500 uppercase">
                Name
              </p>
              <p className="font-medium text-gray-900 capitalize">
                {name || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-gray-500 uppercase">
                Phone
              </p>
              <p className="font-medium text-gray-900">
                {phoneNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-0.5 text-xs tracking-wide text-gray-500 uppercase">
                Skin tone
              </p>
              <span className="-ms-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
                {skinTone || "Not specified"}
              </span>
            </div>

            <div>
              <p className="mb-0.5 text-xs tracking-wide text-gray-500 uppercase">
                Gender
              </p>
              <span className="-ms-1 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 capitalize">
                {gender || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <p className="mb-0.5 text-xs tracking-wide text-gray-500 uppercase">
                  Type Detected
                </p>
                <span className="-ms-1 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 capitalize">
                  {typeDetected || "Unknown"}
                </span>
              </div>

              {/* Circular Confidence Progress */}
              {confidence != null && (
                <div className="relative size-10">
                  <svg
                    className="size-full rotate-[-90deg]"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-300"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-green-500"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray={`${Math.round(confidence * 100)}, 100`}
                      fill="none"
                      d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {Math.round(confidence * 100)}%
                  </div>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs tracking-wide text-gray-500 uppercase">
                Scan Date
              </p>
              <p className="font-medium text-gray-900">
                {format(new Date(createdAt), "dd-MMM-yyyy")}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs tracking-wide text-gray-500 uppercase">
                Comments
              </p>
              <p className="leading-relaxed text-gray-800">
                You should visit a dermatologist specialized in skin cancer.
                Imaging (CT/MRI/PET) is recommended every 3–6 months based on
                disease stage.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-4">
          <button className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-blue-500 px-2 py-1.5 text-white transition-colors duration-300 ease-in-out hover:bg-blue-700 sm:w-auto">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Download PDF
          </button>
          <button
            variant="secondary"
            className="boder-blue-500 flex w-full cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5 text-blue-500 transition-colors duration-300 ease-in-out hover:border-blue-700 hover:text-blue-700 sm:w-auto"
          >
            <LinkIcon className="h-5 w-5" />
            Share Report
          </button>
        </div>
      </div>
    </div>
  );
}
