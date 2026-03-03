import React, { useMemo } from "react";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

// Each plant template draws progressively more as stage increases (0-12)
const PLANT_TEMPLATES = [
  // Sunflower
  (s: number) => (
    <g key="sun">
      {s >= 1 && <rect x="15" y="28" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 2 && <rect x="15" y="24" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 3 && <rect x="15" y="20" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 4 && <><rect x="11" y="24" width="4" height="2" fill="hsl(142, 45%, 40%)" /></>}
      {s >= 5 && <rect x="17" y="22" width="4" height="2" fill="hsl(142, 45%, 40%)" />}
      {s >= 6 && <rect x="15" y="16" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 7 && <><rect x="14" y="12" width="4" height="4" fill="hsl(35, 70%, 40%)" /></>}
      {s >= 8 && <><rect x="12" y="10" width="2" height="4" fill="hsl(45, 85%, 55%)" /><rect x="18" y="10" width="2" height="4" fill="hsl(45, 85%, 55%)" /></>}
      {s >= 9 && <><rect x="14" y="8" width="4" height="2" fill="hsl(45, 85%, 55%)" /><rect x="14" y="16" width="4" height="2" fill="hsl(45, 85%, 55%)" /></>}
      {s >= 10 && <><rect x="12" y="8" width="2" height="2" fill="hsl(45, 90%, 58%)" /><rect x="18" y="8" width="2" height="2" fill="hsl(45, 90%, 58%)" /></>}
      {s >= 11 && <><rect x="12" y="14" width="2" height="2" fill="hsl(45, 90%, 58%)" /><rect x="18" y="14" width="2" height="2" fill="hsl(45, 90%, 58%)" /></>}
      {s >= 12 && <><rect x="9" y="20" width="2" height="2" fill="hsl(142, 45%, 42%)" /><rect x="21" y="18" width="2" height="2" fill="hsl(142, 45%, 42%)" /></>}
    </g>
  ),
  // Tulip
  (s: number) => (
    <g key="tulip">
      {s >= 1 && <rect x="15" y="28" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 2 && <rect x="15" y="24" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 3 && <rect x="15" y="20" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 4 && <rect x="11" y="26" width="4" height="2" fill="hsl(142, 45%, 40%)" />}
      {s >= 5 && <rect x="17" y="24" width="4" height="2" fill="hsl(142, 45%, 40%)" />}
      {s >= 6 && <rect x="15" y="16" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 7 && <rect x="13" y="12" width="6" height="4" fill="hsl(340, 65%, 55%)" />}
      {s >= 8 && <><rect x="11" y="14" width="2" height="2" fill="hsl(340, 60%, 50%)" /><rect x="19" y="14" width="2" height="2" fill="hsl(340, 60%, 50%)" /></>}
      {s >= 9 && <rect x="15" y="10" width="2" height="2" fill="hsl(340, 70%, 60%)" />}
      {s >= 10 && <><rect x="13" y="10" width="2" height="2" fill="hsl(340, 65%, 55%)" /><rect x="17" y="10" width="2" height="2" fill="hsl(340, 65%, 55%)" /></>}
      {s >= 11 && <><rect x="11" y="12" width="2" height="2" fill="hsl(340, 55%, 48%)" /><rect x="19" y="12" width="2" height="2" fill="hsl(340, 55%, 48%)" /></>}
      {s >= 12 && <><rect x="9" y="22" width="2" height="4" fill="hsl(142, 42%, 38%)" /><rect x="21" y="20" width="2" height="4" fill="hsl(142, 42%, 38%)" /></>}
    </g>
  ),
  // Cactus
  (s: number) => (
    <g key="cactus">
      {s >= 1 && <rect x="14" y="28" width="4" height="4" fill="hsl(142, 40%, 40%)" />}
      {s >= 2 && <rect x="14" y="24" width="4" height="4" fill="hsl(142, 40%, 40%)" />}
      {s >= 3 && <rect x="14" y="20" width="4" height="4" fill="hsl(142, 38%, 38%)" />}
      {s >= 4 && <rect x="14" y="16" width="4" height="4" fill="hsl(142, 38%, 38%)" />}
      {s >= 5 && <rect x="10" y="22" width="4" height="4" fill="hsl(142, 36%, 36%)" />}
      {s >= 6 && <rect x="18" y="20" width="4" height="4" fill="hsl(142, 36%, 36%)" />}
      {s >= 7 && <rect x="10" y="18" width="4" height="4" fill="hsl(142, 34%, 34%)" />}
      {s >= 8 && <rect x="18" y="16" width="4" height="4" fill="hsl(142, 34%, 34%)" />}
      {s >= 9 && <rect x="14" y="12" width="4" height="4" fill="hsl(142, 38%, 38%)" />}
      {s >= 10 && <rect x="14" y="10" width="4" height="2" fill="hsl(320, 60%, 55%)" />}
      {s >= 11 && <><rect x="12" y="10" width="2" height="2" fill="hsl(320, 65%, 60%)" /><rect x="18" y="10" width="2" height="2" fill="hsl(320, 65%, 60%)" /></>}
      {s >= 12 && <rect x="15" y="8" width="2" height="2" fill="hsl(320, 70%, 65%)" />}
    </g>
  ),
  // Daisy
  (s: number) => (
    <g key="daisy">
      {s >= 1 && <rect x="15" y="28" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 2 && <rect x="15" y="24" width="2" height="4" fill="hsl(142, 50%, 35%)" />}
      {s >= 3 && <rect x="15" y="20" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 4 && <rect x="11" y="26" width="4" height="2" fill="hsl(142, 45%, 42%)" />}
      {s >= 5 && <rect x="17" y="22" width="4" height="2" fill="hsl(142, 45%, 42%)" />}
      {s >= 6 && <rect x="15" y="16" width="2" height="4" fill="hsl(142, 48%, 33%)" />}
      {s >= 7 && <rect x="14" y="12" width="4" height="4" fill="hsl(45, 80%, 55%)" />}
      {s >= 8 && <><rect x="12" y="14" width="2" height="2" fill="hsl(0, 0%, 92%)" /><rect x="18" y="14" width="2" height="2" fill="hsl(0, 0%, 92%)" /></>}
      {s >= 9 && <><rect x="14" y="10" width="4" height="2" fill="hsl(0, 0%, 92%)" /><rect x="14" y="16" width="4" height="2" fill="hsl(0, 0%, 92%)" /></>}
      {s >= 10 && <><rect x="12" y="12" width="2" height="2" fill="hsl(0, 0%, 92%)" /><rect x="18" y="12" width="2" height="2" fill="hsl(0, 0%, 92%)" /></>}
      {s >= 11 && <><rect x="12" y="16" width="2" height="2" fill="hsl(0, 0%, 92%)" /><rect x="18" y="16" width="2" height="2" fill="hsl(0, 0%, 92%)" /></>}
      {s >= 12 && <><rect x="9" y="20" width="2" height="2" fill="hsl(142, 40%, 38%)" /><rect x="21" y="18" width="2" height="2" fill="hsl(142, 40%, 38%)" /></>}
    </g>
  ),
  // Rose
  (s: number) => (
    <g key="rose">
      {s >= 1 && <rect x="15" y="28" width="2" height="4" fill="hsl(142, 50%, 30%)" />}
      {s >= 2 && <rect x="15" y="24" width="2" height="4" fill="hsl(142, 50%, 30%)" />}
      {s >= 3 && <rect x="15" y="20" width="2" height="4" fill="hsl(142, 48%, 28%)" />}
      {s >= 4 && <><rect x="13" y="26" width="2" height="2" fill="hsl(142, 40%, 35%)" /><rect x="11" y="24" width="2" height="2" fill="hsl(142, 40%, 35%)" /></>}
      {s >= 5 && <><rect x="17" y="24" width="2" height="2" fill="hsl(142, 40%, 35%)" /><rect x="19" y="22" width="2" height="2" fill="hsl(142, 40%, 35%)" /></>}
      {s >= 6 && <rect x="15" y="16" width="2" height="4" fill="hsl(142, 48%, 28%)" />}
      {s >= 7 && <rect x="13" y="12" width="6" height="4" fill="hsl(350, 55%, 48%)" />}
      {s >= 8 && <rect x="15" y="10" width="2" height="2" fill="hsl(350, 60%, 52%)" />}
      {s >= 9 && <><rect x="11" y="14" width="2" height="2" fill="hsl(350, 50%, 44%)" /><rect x="19" y="14" width="2" height="2" fill="hsl(350, 50%, 44%)" /></>}
      {s >= 10 && <><rect x="11" y="12" width="2" height="2" fill="hsl(350, 50%, 44%)" /><rect x="19" y="12" width="2" height="2" fill="hsl(350, 50%, 44%)" /></>}
      {s >= 11 && <><rect x="13" y="10" width="2" height="2" fill="hsl(350, 58%, 50%)" /><rect x="17" y="10" width="2" height="2" fill="hsl(350, 58%, 50%)" /></>}
      {s >= 12 && <><rect x="9" y="18" width="2" height="4" fill="hsl(142, 38%, 32%)" /><rect x="21" y="16" width="2" height="4" fill="hsl(142, 38%, 32%)" /></>}
    </g>
  ),
];

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  const plantIndex = useMemo(() => {
    const seed = totalCount * 7 + 3;
    return seed % PLANT_TEMPLATES.length;
  }, [totalCount]);

  // Stage = completedCount directly (0 to 12)
  const stage = completedCount;

  if (totalCount === 0 || completedCount === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
            <rect x="14" y="28" width="4" height="3" fill="hsl(30, 40%, 45%)" />
            <rect x="15" y="27" width="2" height="1" fill="hsl(30, 35%, 40%)" />
          </svg>
        </div>
      </div>
    );
  }

  const renderPlant = PLANT_TEMPLATES[plantIndex];

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
          {renderPlant(stage)}
        </svg>
      </div>
    </div>
  );
};

export default PlantDisplay;
