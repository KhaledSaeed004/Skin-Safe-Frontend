// src/components/MedicalReport.jsx
import React from "react";
import Container from "../components/ui/Container";
import History from "./History";
import Button from "../components/ui/Button";

const MedicalReport = () => {
  return (
    <div className="p-8">
      <div className="bg-primary relative w-full rounded-4xl py-4">
        <Container>
          <div className="flex flex-row items-center justify-between"></div>
        </Container>

        <div className="bg-primary absolute top-1/2 -left-20 flex aspect-square h-full w-lg -translate-y-1/2 items-center justify-center rounded-full pl-12 text-white shadow-lg">
          <span className="text-3xl font-bold"> Report</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Current report</h2>
          <div className="flex items-center space-x-4">
            <img
              src="/beautiful-photo-sea-sky 1.png"
              alt="Skin Image"
              className="h-32 w-32 rounded-lg object-cover"
            />
            <div>
              <p>
                <strong>Name:</strong> Muhammed Ali
              </p>
              <p>
                <strong>Phone:</strong> (201) 1022 333 44
              </p>
              <p>
                <strong>Skin tone:</strong> light to medium
              </p>
              <p>
                <strong>Type detected:</strong> Melanoma
              </p>
              <p>
                <strong>Date:</strong> 14-Mar-2025
              </p>
              <p>
                <strong>Gender:</strong> male
              </p>
              <p className="mt-2">
                <strong>Comments:</strong> You should visit a dermatologist
                specialized in skin cancer, you should do imaging (CT/MRI/PET)
                every 3-6 months based on disease stage.
              </p>
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <Button variant="primary">Download PDF</Button>
            <Button variant="primary">Share Report</Button>
          </div>

          {/* Include History Component */}
          <History />
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;
