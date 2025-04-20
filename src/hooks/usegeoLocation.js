import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPOsition] = useState(defaultPosition);
  function getCurrentPosition() {
    if (!navigator.geolocation) {
      setError("YPUR BROWSERS DOESNT SUPPORT GEOlOCATION");
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPOsition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (erroe) => {
        setError(erroe.massage);
      }
    );
  }
  return {isLoading,error,currentPosition}
}

