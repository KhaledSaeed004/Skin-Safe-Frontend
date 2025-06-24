import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUVIndex } from "../../services/api/apiUVIndex";

export function useUVIndex() {
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        setGeoError(err.message);
        toast.error("Failed to get location");
      },
      { enableHighAccuracy: true, timeout: 30000 },
    );
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: coords
      ? ["uvIndex", coords.latitude, coords.longitude]
      : ["uvIndex"],
    queryFn: () => getUVIndex({ lat: coords.latitude, lon: coords.longitude }),
    enabled: !!coords,
  });

  const uvIndex = data?.data?.uvIndex;
  const riskLevel = data?.data?.riskLevel;

  return {
    uvIndex,
    riskLevel,
    isLoading,
    error: error || geoError,
  };
}
