// src/components/History.jsx
import React from "react";
import Button from "../components/ui/Button.tsx";

const History = () => {
  const reports = [
    { time: "06:30 PM Tue, 04-Mar-2025" },
    { time: "09:00 PM Mon, 03-Mar-2025" },
    { time: "10:00 PM Sat, 01-Mar-2025" },
  ];

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Previous reports history</h2>
      <div className="space-y-2">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex items-center space-x-2">
              <img
                src="/beautiful-photo-sea-sky 1.png"
                alt="Report Image"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <p>{report.time}</p>
            </div>
            <Button variant='primary'>View</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
