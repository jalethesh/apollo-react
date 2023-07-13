import { useEffect, useState } from 'react';

import { getDistance, convertDistance } from 'geolib';

interface Location {
  latitude: string;
  longitude: string;
}

export const useGetDistance = (
  location: Location,
  lengthType: 'mi' | 'km' = 'mi'
) => {
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    // get user geolocation using W3C Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distanceInMeter = getDistance(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          {
            latitude: Number(location.latitude),
            longitude: Number(location.longitude),
          }
        );

        setDistance(distanceInMeter);
      },
      (e) => {
        console.warn(
          'Please allow app to use geo location to calculate distance'
        );
        setDistance(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: Infinity,
      }
    );
  }, [location]);

  if (distance === null) return null;

  return lengthType === 'mi'
    ? convertDistance(distance, 'mi').toFixed(2)
    : convertDistance(distance, 'km').toFixed(2);
};
