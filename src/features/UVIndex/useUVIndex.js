import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { getUVIndex } from "../../services/api/apiUVIndex";

export function useUVIndex() {
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by your browser.");
      setHasPermission(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        setGeoError(null);
        setHasPermission(true);
      },
      (err) => {
        setHasPermission(false);

        if (err.code === err.PERMISSION_DENIED) {
          setGeoError(
            'Please allow location access manually in your browser settings and then click "Refresh"',
          );
        } else {
          setGeoError("Unable to retrieve location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 30000 },
    );
  }, [refreshKey]);

  const {
    data: res,
    isLoading,
    error,
  } = useQuery({
    queryKey: coords
      ? ["uvIndex", coords.latitude, coords.longitude]
      : ["uvIndex"],
    queryFn: () => getUVIndex({ lat: coords.latitude, lon: coords.longitude }),
    enabled: !!coords,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: false,
  });

  const uvIndex = res?.data?.uvIndex ?? 0;
  const riskLevel = res?.data?.riskLevel ?? "N/A";

  return {
    uvIndex,
    riskLevel,
    isLoading,
    geoError,
    error,
    hasPermission,
    refresh,
  };
}
