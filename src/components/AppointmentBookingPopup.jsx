import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isSameWeek,
  isToday,
  parse,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "../utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import Divider from "./ui/Divider";
import Button from "./ui/Button";
import { ResizablePanel } from "./ui/ResizablePanel";
import Modal from "./ui/Modal";
import ConfirmAction from "./ui/ConfirmAction";
import { useBookAppointment } from "../features/doctorProfile/useBookAppointment";
import Spinner from "./ui/Spinner";

// to do:
// - implement api call to get available times
// - implement api call to book appointment

function AppointmentBookingPopup({ availability }) {
  // 📌 API Custom hooks
  const {
    bookAppointment,
    isLoading: isConfirming,
    error,
  } = useBookAppointment();
  // 📌 States
  const [calDirection, setCalDirection] = useState(1); // +1 = to the right (next month), -1 = to the left (previous month)
  const [isAnimating, setIsAnimating] = useState(false); // prevent double clicks during animation
  const [selectedTime, setSelectedTime] = useState(null); // selected session time
  const [selectedDay, setSelectedDay] = useState(startOfToday()); // selected day (defaults to today)

  // 📌 Date Calculations
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayOfCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const nextMonth = add(firstDayOfCurrentMonth, { months: 1 });
  const previousMonth = add(firstDayOfCurrentMonth, { months: -1 });
  const maxDate = add(today, { months: 4 });

  // 📌 Calendar Days
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth, { weekStartsOn: 6 }), // Saturday
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth), { weekStartsOn: 6 }),
  });

  const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const formattedDay = isToday(selectedDay)
    ? "Today"
    : isSameWeek(selectedDay, today, { weekStartsOn: 6 })
      ? format(selectedDay, "EEEE")
      : format(selectedDay, "EEEE, MMM d");

  // 📌 Navigation Handlers
  function viewPreviousMonth() {
    if (isAnimating) return;

    setCalDirection(-1);
    setIsAnimating(true);

    const firstDayOfPreviousMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfPreviousMonth, "MMM-yyyy"));
  }

  function viewNextMonth() {
    if (isAnimating) return;

    setCalDirection(1);
    setIsAnimating(true);

    const firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  }

  const { doctor, availability: availableTimes } = availability[0] || {};

  const availableDaysSet = useMemo(() => {
    return new Set(
      availableTimes?.flatMap((entry) => entry.day?.toLowerCase() || []),
    );
  }, [availableTimes]);

  const sessions = useMemo(() => {
    if (!availableTimes?.length || !selectedDay) return [];

    const dayName = format(selectedDay, "eeee").toLowerCase(); // "wednesday"
    const slotGroup = availableTimes.find((d) => d.day === dayName);

    return slotGroup?.timeSlots || [];
  }, [selectedDay, availableTimes]);

  const handleAppointmentConfirmation = (onSettledCallback) => {
    if (!selectedTime) return;

    const appointmentDate = new Date(selectedDay);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);
    const appointmentData = {
      doctor,
      date: format(appointmentDate, "yyyy-MM-dd"),
      timeSlot: selectedTime,
    };

    bookAppointment(appointmentData, {
      onSettled: () => {
        onSettledCallback();
      },
    });
  };

  return (
    <div className="bg-white-bg flex w-full justify-center p-8">
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.35 }}>
        <section className="rounded-md border-2 border-gray-100 bg-white p-5 md:p-8">
          <div className="relative flex items-center px-4">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={calDirection}
            >
              <motion.span
                tabIndex="0"
                className="grow text-base font-bold text-gray-800 focus-visible:outline-none"
                aria-label="calendar month"
                key={currentMonth}
                custom={calDirection}
                initial="enter"
                animate="idle"
                exit="exit"
                variants={{
                  enter: (calDirection) => ({
                    opacity: 0,
                    y: `${100 * calDirection}%`,
                  }),
                  idle: { opacity: 1, y: "0%" },
                  exit: (calDirection) => ({
                    opacity: 0,
                    y: `${-100 * calDirection}%`,
                  }),
                }}
              >
                {format(firstDayOfCurrentMonth, "MMMM yyyy")}
              </motion.span>
            </AnimatePresence>

            <div className="flex items-center">
              <button
                onClick={viewPreviousMonth}
                aria-label="calendar backward"
                className="hover:text-primary focus-visible:text-primary cursor-pointer text-gray-800 disabled:pointer-events-none disabled:text-gray-400"
                disabled={isBefore(previousMonth, startOfMonth(today))}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={viewNextMonth}
                aria-label="calendar forward"
                className="hover:text-primary focus-visible:text-primary ml-3 cursor-pointer text-gray-800 disabled:pointer-events-none disabled:text-gray-400"
                disabled={isAfter(
                  startOfMonth(nextMonth),
                  startOfMonth(maxDate),
                )}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="relative flex flex-col overflow-hidden pt-8">
            {/* Weekdays header */}
            <div className="grid grid-cols-7">
              {weekdays.map((day, idx) => (
                <div key={idx} className="px-4">
                  <p className="text-center text-base font-medium text-gray-500">
                    {day}
                  </p>
                </div>
              ))}
            </div>
            {/* Days grid */}
            <div className="relative mt-4">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={calDirection}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={currentMonth}
                    custom={calDirection}
                    initial="enter"
                    animate="idle"
                    exit="exit"
                    variants={{
                      enter: (calDirection) => ({
                        x: `${100 * calDirection}%`,
                      }),
                      idle: { x: "0%" },
                      exit: (calDirection) => ({
                        x: `${-100 * calDirection}%`,
                      }),
                    }}
                    className="grid grid-cols-7"
                  >
                    {days.map((day, index) => {
                      const dayName = format(day, "EEEE").toLowerCase();
                      const isAvailableDay = availableDaysSet.has(dayName);

                      return (
                        <div
                          key={day ? day.toISOString() : `empty-${index}`}
                          className="flex justify-center pt-4"
                        >
                          {day ? (
                            <button
                              type="button"
                              onClick={() => {
                                if (isSameMonth(day, firstDayOfCurrentMonth)) {
                                  setSelectedDay(day);
                                  setSelectedTime(null);
                                } else {
                                  if (
                                    !isAfter(
                                      startOfMonth(day),
                                      startOfMonth(maxDate),
                                    )
                                  ) {
                                    if (isAfter(day, selectedDay))
                                      setCalDirection(1);
                                    else setCalDirection(-1);
                                    setIsAnimating(true);
                                    setCurrentMonth(format(day, "MMM-yyyy"));
                                    setSelectedDay(day);
                                    setSelectedTime(null);
                                  }
                                }
                              }}
                              disabled={
                                isBefore(day, startOfDay(today)) ||
                                isAfter(day, endOfMonth(maxDate))
                              }
                              aria-label={format(day, "EEEE, MMMM do, yyyy")}
                              aria-current={isEqual(day, selectedDay) && "true"}
                              className={cn(
                                !isAvailableDay &&
                                  "cursor-default text-gray-400 line-through",
                                isEqual(day, selectedDay) && "text-white",
                                isAvailableDay &&
                                  !isEqual(day, selectedDay) &&
                                  isToday(day) &&
                                  "text-primary hover:bg-primary/10",
                                isAvailableDay &&
                                  !isEqual(day, selectedDay) &&
                                  isSameMonth(day, firstDayOfCurrentMonth) &&
                                  "text-gray-700 hover:bg-gray-100 hover:text-gray-800",
                                isEqual(day, selectedDay) &&
                                  isToday(day) &&
                                  "bg-primary",
                                isEqual(day, selectedDay) &&
                                  !isToday(day) &&
                                  "bg-gray-900",
                                !isAvailableDay &&
                                  isEqual(day, selectedDay) &&
                                  "bg-gray-300",
                                !isAvailableDay &&
                                  isToday(day) &&
                                  "text-primary cursor-default line-through",
                                isBefore(day, startOfDay(today)) &&
                                  "pointer-events-none text-gray-300 line-through",
                                "flex size-10 cursor-pointer items-center justify-center rounded-full text-base disabled:pointer-events-none",
                              )}
                            >
                              <time dateTime={format(day, "yyyy-MM-dd")}>
                                {format(day, "dd")}
                              </time>
                            </button>
                          ) : (
                            <div className="size-10" />
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </section>
      </MotionConfig>

      <Divider orientation="vertical" />
      <section>
        <h2 className="font-medium text-gray-900">
          Available time for{" "}
          <time
            dateTime={format(selectedDay, "yyyy-MM-dd")}
            className={cn(isToday(selectedDay) && "text-primary")}
          >
            {formattedDay}
          </time>
        </h2>
        {sessions.length > 0 ? (
          <>
            <div className="mt-4 grid w-full max-w-lg grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
              {sessions.map((session) => (
                <TimeButton
                  key={session}
                  time={session}
                  available={true}
                  selected={selectedTime === session}
                  selectedDay={selectedDay}
                  onClick={() =>
                    setSelectedTime(selectedTime === session ? null : session)
                  }
                />
              ))}
            </div>
            <Modal>
              <Modal.OpenBtn opens="confirm-booking">
                <Button
                  disabled={!selectedTime}
                  variant="secondary"
                  className="mt-10 w-full py-2 disabled:pointer-events-none disabled:cursor-default disabled:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {!selectedTime ? "Pick A Period" : "Book Appointment"}
                </Button>
              </Modal.OpenBtn>
              <Modal.Window name="confirm-booking">
                <BookingConfirmationDialog
                  selectedDay={selectedDay}
                  formattedDay={formattedDay}
                  selectedTime={selectedTime}
                  isConfirming={isConfirming}
                  handleConfirmation={handleAppointmentConfirmation}
                />
              </Modal.Window>
            </Modal>
          </>
        ) : (
          <div className="mt-6 w-[336px] text-sm text-gray-500">
            No sessions available for{" "}
            <strong>
              {isToday(selectedDay) ? "Today" : format(selectedDay, "EEEE")}
            </strong>
            .
          </div>
        )}
      </section>
    </div>
  );
}

export default AppointmentBookingPopup;

function TimeButton({ time, available, selected, onClick, selectedDay }) {
  const parsedTime = useMemo(() => {
    if (!selectedDay || typeof time !== "string") return null;

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(selectedDay);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  }, [time, selectedDay]);

  if (!parsedTime || isNaN(parsedTime)) return null;

  const formattedTime = format(parsedTime, "hh:mm a");

  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={cn(
        "relative min-w-[80px] cursor-pointer rounded-lg border px-2 py-1 text-sm font-medium transition",
        !selected &&
          "border-gray-500 bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200",
        selected && "border-primary bg-primary active:bg-primary/90 text-white",
        "disabled:cursor-default disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:line-through",
        "flex items-center justify-center gap-2",
      )}
    >
      <time className="whitespace-nowrap" dateTime={parsedTime.toISOString()}>
        {formattedTime}
      </time>
    </button>
  );
}

function BookingConfirmationDialog({
  OnCloseModal,
  selectedDay,
  formattedDay,
  selectedTime,
  isConfirming,
  handleConfirmation,
}) {
  return (
    <ConfirmAction>
      <ConfirmAction.Title>Confirm appointment</ConfirmAction.Title>
      <ConfirmAction.Body>
        You are about to book an appointment for{" "}
        <span className="text-primary font-medium">
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {formattedDay}
          </time>{" "}
          at {selectedTime}
        </span>
        .
      </ConfirmAction.Body>
      <ConfirmAction.Actions>
        <button
          className="focus-visible:ring-primary cursor-pointer text-gray-700 hover:text-gray-900 focus-visible:ring-2 focus-visible:outline-none"
          onClick={OnCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={isConfirming}
          className="bg-primary cursor-pointer rounded-md border-transparent px-4 py-1.5 text-white disabled:opacity-50"
          onClick={() => handleConfirmation(OnCloseModal)}
        >
          {isConfirming ? (
            <span className="flex items-center justify-center">
              <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              Booking...
            </span>
          ) : (
            "Confirm"
          )}
        </button>
      </ConfirmAction.Actions>
    </ConfirmAction>
  );
}
