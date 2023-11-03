import { useEffect, useState } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    setSeconds((prev) => (prev += 1));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return new Date(seconds * 1000).toISOString().substring(14, 19);
};
