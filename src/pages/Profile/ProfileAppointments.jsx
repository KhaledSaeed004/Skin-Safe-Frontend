import { useMemo, useState } from "react";
import { format, isToday, isPast, parseISO } from "date-fns";
import { MapPinIcon } from "@heroicons/react/20/solid";
import Divider from "../../components/ui/Divider";
import { ClockIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { StethoscopeIcon, ThreeDotsIcon } from "../../utils/Icons";
import Menus from "../../components/ui/Menus";
import { cn } from "../../utils/cn";
import Modal from "../../components/ui/Modal";
import ConfirmAction from "../../components/ui/ConfirmAction";
import { useAppointments } from "../../features/profile/useAppointments";
import LargeSpinner from "../../components/ui/SpinnerLarge";
import SmallSpinner from "../../components/ui/Spinner";
import { useDeleteAppointment } from "../../features/profile/useDeleteAppointment";

function AppointmentCard({ appointment }) {
  const { _id, doctor, date, timeSlot } = appointment;
  const {
    deleteAppointment,
    isLoading: isDeleting,
    error: deletionError,
  } = useDeleteAppointment();

  const apptDate = parseISO(date);
  const isTodayAppt = isToday(apptDate);

  const handleDeleteAppointment = (onSettledCallback) => {
    deleteAppointment(_id, {
      onSettled: () => {
        onSettledCallback();
      },
    });
  };

  return (
    <div className="relative mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3">
      <div className="flex items-center">
        <div className="flex grow gap-1">
          <time
            className={cn(
              "flex flex-col items-center px-4",
              isTodayAppt ? "text-orange-500" : "text-black",
            )}
          >
            <span className="text-lg">{format(apptDate, "EEE")}</span>
            <span className="text-4xl font-medium">
              {format(apptDate, "dd")}
            </span>
          </time>
          <Divider orientation="vertical" />
          <div className="flex flex-col justify-center gap-2">
            <span className="flex items-center text-sm text-gray-600">
              <ClockIcon className="mr-1 inline-block h-5 w-5 text-gray-500" />
              {timeSlot}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <MapPinIcon className="mr-1 inline-block h-5 w-5 text-gray-500" />
              <span>Ismailia, EG</span>
            </span>
          </div>
          <span className="flex items-center space-x-2 ps-10 pe-4 text-sm font-medium text-gray-800">
            <p className="font-light">With</p>
            <Link
              to={`/doctor/${doctor._id}`}
              className="group flex items-center gap-2 text-blue-500"
            >
              <StethoscopeIcon />
              <span className="font-medium group-hover:underline">
                Dr. {doctor.firstName} {doctor.secondName}
              </span>
            </Link>
            <span className="flex items-center gap-2 text-gray-500">
              <span className="inline-block size-2 rounded-full bg-blue-600" />
              {doctor.specialty.split(",")[0]}
            </span>
          </span>
        </div>
        <div className="relative">
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={_id}>
                  <ThreeDotsIcon />
                </Menus.Toggle>

                <Menus.List id={_id}>
                  <Menus.Item
                    icon={<ClockIcon className="text-blue-600" />}
                    onClick={() => console.log("Reschedule appointment")}
                  >
                    Reschedule
                  </Menus.Item>
                  <Modal.OpenBtn opens="delete-appointment">
                    <Menus.Item icon={<TrashIcon className="text-red-600" />}>
                      Delete
                    </Menus.Item>
                  </Modal.OpenBtn>
                </Menus.List>

                <Modal.Window name="delete-appointment">
                  <DeleteConfirmationDialog
                    isDeleting={isDeleting}
                    handleDelete={handleDeleteAppointment}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Menus>
          </Modal>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmationDialog({ OnCloseModal, isDeleting, handleDelete }) {
  return (
    <ConfirmAction>
      <ConfirmAction.Title>Delete appointment</ConfirmAction.Title>
      <ConfirmAction.Body>
        Are you sure you want to delete this appointment?{" "}
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
          onClick={() => handleDelete(OnCloseModal)}
        >
          {isDeleting ? (
            <span className="flex items-center justify-center">
              <SmallSpinner className="mr-2 h-4 w-4 animate-spin text-white" />
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

export default function ProfileAppointments() {
  const { appointments = [], isLoading, error } = useAppointments();
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const filteredAppointments = useMemo(() => {
    const now = new Date();
    return appointments.filter((a) => {
      const date = parseISO(a.date);
      if (selectedTab === "upcoming") return date >= now;
      if (selectedTab === "past") return isPast(date);
      if (selectedTab === "pending") return a.status === "pending";
      return true;
    });
  }, [selectedTab, appointments]);

  const groupedByMonth = useMemo(() => {
    const groups = new Map();
    for (const appt of filteredAppointments) {
      const key = format(parseISO(appt.date), "MMMM yyyy");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(appt);
    }
    return groups;
  }, [filteredAppointments]);

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <LargeSpinner className="h-12 w-12 text-gray-500" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">
        Appointments
      </h2>
      <p className="mb-6 text-gray-600">
        Your upcoming and past appointments will appear here.
      </p>

      <div className="mb-4 flex w-fit gap-2 rounded-lg bg-gray-200 p-2">
        {["Upcoming", "Pending", "Past"].map((tab, idx) => (
          <button
            key={idx}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition",
              tab.toLowerCase() === selectedTab
                ? "cursor-default bg-white text-black"
                : "cursor-pointer bg-transparent text-gray-600 hover:text-gray-800",
            )}
            onClick={() => setSelectedTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {filteredAppointments.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-gray-500 italic">
            No {selectedTab} appointments to show.
          </div>
        ) : (
          [...groupedByMonth.entries()].map(([month, appts]) => (
            <div key={month}>
              <h3>{month}</h3>
              {appts.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
