import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Header from "../components/Header";
import Button from "../components/ui/Button";
import {
  AlertCircleIcon,
  CameraIconAlt,
  CheckIcon,
  UploadIcon,
  XIcon,
} from "../utils/Icons";
import { cn } from "../utils/cn";
import { useScanSkin } from "../features/scan/useScanSkin";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadScan, isLoading, error, cancel } = useScanSkin({
    onProgress: setUploadProgress,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selected);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    setFile(dropped);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(dropped);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleAnalyze = () => {
    if (!file) return;
    setStatus("idle");
    setUploadProgress(0);

    uploadScan(
      { image: file },
      {
        onSuccess: () => setStatus("success"),
        onError: () => setStatus("error"),
      },
    );
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
      <div className="flex min-h-screen items-center justify-center bg-[#FFFF] ps-4 pe-26">
        <div className="">
          <img src="/ScanGuide.png" alt="Scanning Guide" />
        </div>

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
              className={cn(
                "flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all",
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400",
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
            >
              {isDragging ? (
                <div className="flex flex-col items-center justify-center space-y-4 text-blue-600">
                  <UploadIcon size={40} />
                  <p className="text-lg font-medium">Drop your photo here</p>
                  <p className="text-sm text-gray-600">
                    Release to start upload
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="h-12 w-12 text-blue-500">
                    <CameraIconAlt />
                  </div>
                  <p className="text-lg font-medium">Drag Photos to Upload</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <Button
                    onClick={triggerFileInput}
                    className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  >
                    Select Photo
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
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
                      className="bg-opacity-70 hover:bg-opacity-90 absolute top-2 right-2 cursor-pointer rounded-full bg-gray-800 p-1 text-white"
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
                      <p className="max-w-xs truncate font-medium">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isLoading && (
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
                  <div className="text-center">
                    <button
                      onClick={cancel}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Cancel Upload
                    </button>
                  </div>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mr-3 text-green-500">
                    <CheckIcon />
                  </div>
                  <p className="text-green-700">Photo analyzed successfully!</p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="mr-3 text-red-500">
                    <AlertCircleIcon />
                  </div>
                  <p className="text-red-700">
                    {error?.message ||
                      "There was a problem analyzing your photo."}
                  </p>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                {!isLoading && status === "idle" && (
                  <button
                    onClick={handleAnalyze}
                    className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Analyze Skin Condition
                  </button>
                )}
              </div>
            </div>
          )}

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
