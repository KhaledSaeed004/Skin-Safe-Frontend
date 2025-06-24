import React from "react";
import Button from "../components/ui/Button.tsx";

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      state: "Upcoming",
      date: "Mar 12, 2025 10:00 PM",
      doctor: "Dr.Hady Helmy",
      specialty: "Dermatologist",
      location: "Salah Salem Street, Ismailia, Egypt",
      image: "./female-doctor-avatar.png",
    },
    {
      id: 2,
      state: "Cancelled",
      date: "Mar 02, 2025 08:00 PM",
      doctor: "Dr.Hend Khaled",
      specialty: "Dermatologist",
      location: "Salah Salem Street, Ismailia, Egypt",
      image: "./female-doctor-avatar.png",
    },
    {
      id: 3,
      state: "Past",
      date: "Feb 12, 2025 11:00 PM",
      doctor: "Dr.Gamila Emad",
      specialty: "Dermatologist",
      location: "Salah Salem Street, Ismailia, Egypt",
      image: "./female-doctor-avatar.png",
    },
    {
      id: 4,
      state: "Past",
      date: "Feb 01, 2025 01:00 PM",
      doctor: "Dr.Hossam Ali",
      specialty: "Dermatologist",
      location: "Salah Salem Street, Ismailia, Egypt",
      image: "./female-doctor-avatar.png",
    },
  ];

  const getHeaderBg = (state) => {
    switch (state) {
      case "Upcoming":
        return "bg-green-100";
      case "Cancelled":
        return "bg-red-100";
      case "Past":
        return "bg-gray-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="mt-8 max-w-md px-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="mb-6 overflow-hidden rounded-lg bg-white shadow-md"
        >
          <div className={`p-3 ${getHeaderBg(appointment.state)}`}>
            <div className="text-sm font-semibold text-gray-800">
              {appointment.state} Appointment
            </div>
            <div className="text-xs text-gray-700">{appointment.date}</div>
          </div>

          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-base font-medium">{appointment.doctor}</p>
              <p className="text-sm text-gray-700">{appointment.specialty}</p>
              <p className="text-sm text-gray-500">{appointment.location}</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={appointment.image}
                alt={appointment.doctor}
                className="mb-2 h-16 w-16 rounded-full object-cover"
              />
              <button className="border-primary text-primary hover:bg-primary relative rounded-2xl border bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:text-white">
                {" "}
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
