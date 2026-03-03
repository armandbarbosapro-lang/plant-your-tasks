import { useState, useEffect } from "react";

const useTimeOfDay = () => {
  const [hour, setHour] = useState(new Date().getHours());
  useEffect(() => {
    const interval = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  let dayProgress: number;
  if (hour >= 9 && hour < 17) dayProgress = 1;
  else if (hour >= 21 || hour < 5) dayProgress = 0;
  else if (hour >= 5 && hour < 9) dayProgress = (hour - 5) / 4;
  else dayProgress = 1 - (hour - 17) / 4;

  return dayProgress;
};

export default useTimeOfDay;
