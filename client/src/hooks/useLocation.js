import { useState, useEffect } from "react";

import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (isFocused, callback) => {
  const [err, setErr] = useState(null);

  let subscriber;
  const startWatching = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        throw new Error("Location permission not granted");
      }

      subscriber = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          callback(location);
        }
      );
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [isFocused, callback]);

  return [err];
};
