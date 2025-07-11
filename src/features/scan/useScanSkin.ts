import { useRef } from "react";
import { useAuth } from "../auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadScanXHR } from "../../services/api/apiScan";
import toast from "react-hot-toast";

type UploadScanArgs = {
  image: File;
};

type UploadScanResult = {
  data: {
    _id: string;
    // add more if your API response includes more fields
  };
};

export function useScanSkin({
  onProgress,
}: {
  onProgress?: (n: number) => void;
}) {
  const { token } = useAuth();
  const controllerRef = useRef<AbortController | null>(null);
  const navigate = useNavigate();

  const {
    mutate: uploadScan,
    isPending: isLoading,
    error,
  } = useMutation<UploadScanResult, Error, UploadScanArgs>({
    mutationFn: ({ image }) => {
      const controller = new AbortController();
      controllerRef.current = controller;

      return uploadScanXHR({
        image,
        token,
        onProgress,
        signal: controller.signal,
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Image scanned successfully!");
      navigate(`/user/reports/${data._id}`);
    },
    onError: (error) => {
      toast.error(`Failed to scan image: ${error.message}`);
    },
  });

  const cancel = () => {
    controllerRef.current?.abort();
  };

  return { uploadScan, isLoading, error, cancel };
}
