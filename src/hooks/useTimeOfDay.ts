import { useState, useEffect } from "react";

// Returns 0-1 where 0=full night, 1=full day
const useTimeOfDay = () => {
  const [hour, setHour] = useState(new Date().getHours());
  useEffect(() => {
    const interval = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);
  if (hour >= 9 && hour < 17) return 1;
  if (hour >= 21 || hour < 5) return 0;
  if (hour >= 5 && hour < 9) return (hour - 5) / 4;
  return 1 - (hour - 17) / 4;
};

export default useTimeOfDay;
