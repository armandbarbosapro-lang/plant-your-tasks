import { useState, useEffect, useCallback } from "react";

// Returns 0-1 where 0=full night, 1=full day
// override: null=auto, 0=force night, 1=force day
const useTimeOfDay = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [override, setOverride] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleOverride = useCallback(() => {
    setOverride(prev => {
      if (prev === null) return 0;   // auto → night
      if (prev === 0) return 1;      // night → day
      return null;                    // day → auto
    });
  }, []);

  let natural: number;
  if (hour >= 9 && hour < 17) natural = 1;
  else if (hour >= 21 || hour < 5) natural = 0;
  else if (hour >= 5 && hour < 9) natural = (hour - 5) / 4;
  else natural = 1 - (hour - 17) / 4;

  const dayProgress = override !== null ? override : natural;

  return { dayProgress, override, toggleOverride };
};

export default useTimeOfDay;
