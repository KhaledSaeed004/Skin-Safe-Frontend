import Skeleton from "react-loading-skeleton";
import Button from "../components/ui/Button.tsx";
import { useReports } from "../features/scan/useReports.js";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Modal from "../components/ui/Modal.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ConfirmAction from "../components/ui/ConfirmAction.jsx";
import { useDeleteReport } from "../features/scan/useDeleteReport.js";

const History = () => {
  const { reports, isLoading, error } = useReports();
  const {
    deleteReport,
    isLoading: isDeleting,
    error: reportDeletionError,
  } = useDeleteReport();
  const navigate = useNavigate();

  const viewReportDetails = (reportId) => {
    navigate(`/user/reports/${reportId}`);
  };

  const handleDeleteReport = (id, onSettledCallback) => {
    deleteReport(id, {
      onSettled: () => {
        onSettledCallback();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="mt-8 space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4"
          >
            <div className="flex items-center space-x-4">
              <Skeleton
                width={48}
                height={48}
                circle={false}
                className="rounded-md"
              />
              <div className="space-y-1">
                <Skeleton width={100} height={14} />
                <Skeleton width={140} height={12} />
              </div>
            </div>
            <Skeleton width={64} height={32} borderRadius={6} />
          </div>
        ))}
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-500">
          You have no reports yet.{" "}
          <Link className="text-blue-500 hover:underline" to="/scan">
            Start scanning
          </Link>{" "}
          your skin to generate reports!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={report.scannedImage || "/beautiful-photo-sea-sky 1.png"}
                alt="Report Thumbnail"
                className="h-12 w-12 rounded-md object-cover ring-1 ring-gray-200"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Report #{index + 1}
                </p>
                <p className="text-xs text-gray-500">
                  {format(
                    new Date(report.createdAt),
                    "hh:mm a • EEE, dd-MMM-yyyy",
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => viewReportDetails(report._id)}
                className="cursor-pointer rounded-md bg-blue-500 px-6 py-1 text-base text-white transition-colors duration-300 ease-in-out hover:bg-blue-700"
              >
                View
              </button>
              <Modal>
                <Modal.OpenBtn opens="delete-report">
                  <button className="cursor-pointer rounded-md border border-transparent bg-red-500 px-1 py-1.5 text-white transition-colors duration-300 ease-in-out hover:border-red-500 hover:bg-transparent hover:text-red-500">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </Modal.OpenBtn>

                <Modal.Window name="delete-report">
                  <DeleteConfirmationDialog
                    id={report._id}
                    isDeleting={isDeleting}
                    handleDelete={handleDeleteReport}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function DeleteConfirmationDialog({
  id,
  OnCloseModal,
  isDeleting,
  handleDelete,
}) {
  return (
    <ConfirmAction>
      <ConfirmAction.Title>Delete Report</ConfirmAction.Title>
      <ConfirmAction.Body>
        Are you sure you want to delete this report?{" "}
        <span className="font-medium text-red-500">
          This action cannot be undone.
        </span>
      </ConfirmAction.Body>
      <ConfirmAction.Actions>
        <button
          className="focus-visible:ring-primary cursor-pointer text-gray-700 hover:text-gray-900 focus-visible:ring-2 focus-visible:outline-none"
          onClick={OnCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={isDeleting}
          className="cursor-pointer rounded-md border-transparent bg-red-500 px-4 py-1.5 text-white disabled:opacity-50"
          onClick={() => handleDelete(id, OnCloseModal)}
        >
          {isDeleting ? (
            <span className="flex items-center justify-center">
              <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </ConfirmAction.Actions>
    </ConfirmAction>
  );
}

export default History;
