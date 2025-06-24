import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Header from "../components/Header";
import Button from "../components/ui/Button";

// Simple icon components to avoid external dependencies
const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setStatus("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setStatus("success");
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setUploadProgress(0);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-[#FFFF]">
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-[#D6E7FB] p-8 px-4 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-blue-600">
              Upload Photo
            </h1>
            <p className="mt-2 text-gray-500">
              Upload a clear photo of your skin concern for analysis
            </p>
          </div>

          {!file ? (
            <div
              className={`rounded-lg border-2 border-dashed p-8 transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <div className="flex cursor-pointer flex-col items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="mb-3 h-12 w-12 text-blue-500">
                  <CameraIcon />
                </div>
                <p className="mb-2 text-lg font-medium">
                  Drag Photos to Upload
                </p>
                <p className="mb-4 text-sm text-gray-500">or click to browse</p>
                <Button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                  Select Photo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="relative overflow-hidden rounded-lg border border-gray-200">
                {preview && (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-64 w-full object-cover"
                    />
                    <button
                      onClick={resetUpload}
                      className="bg-opacity-70 hover:bg-opacity-90 absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white"
                    >
                      <XIcon />
                    </button>
                  </div>
                )}

                <div className="bg-gray-50 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0 text-blue-500">
                      <UploadIcon />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              {status === "uploading" && (
                <div className="space-y-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    {uploadProgress}% processed
                  </p>
                </div>
              )}

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mr-3 text-green-500">
                    <CheckIcon />
                  </div>
                  <p className="text-green-700">
                    Photo analyzed successfully! View your results below.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="mr-3 text-red-500">
                    <AlertCircleIcon />
                  </div>
                  <p className="text-red-700">
                    There was a problem analyzing your photo. Please try again.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-center space-x-4">
                {status === "idle" && (
                  <button
                    onClick={handleAnalyze}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Analyze Skin Condition
                  </button>
                )}

                {status === "success" && (
                  <button
                    onClick={resetUpload}
                    className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                  >
                    Upload Another Photo
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Privacy note */}
          <div className="mx-auto mt-8 max-w-md text-center text-xs text-gray-500">
            <p>
              Your privacy matters. Photos are encrypted and only used for
              analysis. We never share your images without permission.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
