import React, { useMemo } from "react";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

// Pixel art plants - each is a unique flower/plant drawn with small rects
const PLANT_TEMPLATES = [
  // Sunflower
  (stage: number) => (
    <g key="sunflower">
      {stage >= 1 && <rect x="15" y="20" width="2" height="12" fill="hsl(142, 50%, 35%)" />}
      {stage >= 2 && <><rect x="11" y="18" width="2" height="6" fill="hsl(142, 45%, 40%)" /><rect x="13" y="16" width="2" height="4" fill="hsl(142, 45%, 40%)" /></>}
      {stage >= 3 && <><rect x="19" y="16" width="2" height="6" fill="hsl(142, 45%, 40%)" /><rect x="17" y="14" width="2" height="4" fill="hsl(142, 45%, 40%)" /></>}
      {stage >= 4 && <>
        <rect x="14" y="8" width="4" height="4" fill="hsl(35, 80%, 45%)" />
        <rect x="12" y="6" width="2" height="4" fill="hsl(45, 90%, 55%)" />
        <rect x="18" y="6" width="2" height="4" fill="hsl(45, 90%, 55%)" />
        <rect x="14" y="4" width="4" height="2" fill="hsl(45, 90%, 55%)" />
        <rect x="14" y="12" width="4" height="2" fill="hsl(45, 90%, 55%)" />
      </>}
    </g>
  ),
  // Tulip
  (stage: number) => (
    <g key="tulip">
      {stage >= 1 && <rect x="15" y="18" width="2" height="14" fill="hsl(142, 50%, 35%)" />}
      {stage >= 2 && <><rect x="11" y="22" width="4" height="2" fill="hsl(142, 45%, 40%)" /><rect x="17" y="20" width="4" height="2" fill="hsl(142, 45%, 40%)" /></>}
      {stage >= 3 && <>
        <rect x="13" y="10" width="6" height="8" fill="hsl(350, 65%, 55%)" />
        <rect x="11" y="12" width="2" height="4" fill="hsl(350, 60%, 50%)" />
        <rect x="19" y="12" width="2" height="4" fill="hsl(350, 60%, 50%)" />
      </>}
      {stage >= 4 && <rect x="15" y="8" width="2" height="2" fill="hsl(350, 70%, 60%)" />}
    </g>
  ),
  // Cactus flower
  (stage: number) => (
    <g key="cactus">
      {stage >= 1 && <rect x="14" y="16" width="4" height="16" fill="hsl(142, 40%, 40%)" />}
      {stage >= 2 && <><rect x="10" y="20" width="4" height="8" fill="hsl(142, 38%, 38%)" /><rect x="18" y="18" width="4" height="8" fill="hsl(142, 38%, 38%)" /></>}
      {stage >= 3 && <>
        <rect x="12" y="14" width="2" height="2" fill="hsl(142, 30%, 50%)" />
        <rect x="18" y="22" width="2" height="2" fill="hsl(142, 30%, 50%)" />
      </>}
      {stage >= 4 && <>
        <rect x="14" y="12" width="4" height="4" fill="hsl(320, 65%, 60%)" />
        <rect x="16" y="10" width="2" height="2" fill="hsl(320, 70%, 65%)" />
      </>}
    </g>
  ),
  // Daisy
  (stage: number) => (
    <g key="daisy">
      {stage >= 1 && <rect x="15" y="20" width="2" height="12" fill="hsl(142, 50%, 35%)" />}
      {stage >= 2 && <><rect x="11" y="24" width="4" height="2" fill="hsl(142, 45%, 42%)" /><rect x="17" y="22" width="4" height="2" fill="hsl(142, 45%, 42%)" /></>}
      {stage >= 3 && <>
        <rect x="14" y="14" width="4" height="4" fill="hsl(45, 85%, 60%)" />
        <rect x="12" y="16" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="18" y="16" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="14" y="12" width="4" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="14" y="18" width="4" height="2" fill="hsl(0, 0%, 95%)" />
      </>}
      {stage >= 4 && <>
        <rect x="12" y="14" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="18" y="14" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="12" y="18" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="18" y="18" width="2" height="2" fill="hsl(0, 0%, 95%)" />
      </>}
    </g>
  ),
  // Rose
  (stage: number) => (
    <g key="rose">
      {stage >= 1 && <>
        <rect x="15" y="20" width="2" height="12" fill="hsl(142, 50%, 30%)" />
        <rect x="13" y="24" width="2" height="2" fill="hsl(142, 40%, 35%)" />
      </>}
      {stage >= 2 && <><rect x="11" y="22" width="2" height="2" fill="hsl(142, 50%, 40%)" /><rect x="19" y="20" width="2" height="2" fill="hsl(142, 50%, 40%)" /></>}
      {stage >= 3 && <>
        <rect x="13" y="12" width="6" height="6" fill="hsl(350, 60%, 50%)" />
        <rect x="15" y="10" width="2" height="2" fill="hsl(350, 65%, 55%)" />
      </>}
      {stage >= 4 && <>
        <rect x="11" y="14" width="2" height="4" fill="hsl(350, 55%, 45%)" />
        <rect x="19" y="14" width="2" height="4" fill="hsl(350, 55%, 45%)" />
        <rect x="15" y="18" width="2" height="2" fill="hsl(350, 50%, 42%)" />
      </>}
    </g>
  ),
  // Mushroom
  (stage: number) => (
    <g key="mushroom">
      {stage >= 1 && <rect x="14" y="22" width="4" height="10" fill="hsl(40, 30%, 75%)" />}
      {stage >= 2 && <rect x="12" y="24" width="8" height="2" fill="hsl(40, 25%, 70%)" />}
      {stage >= 3 && <>
        <rect x="10" y="16" width="12" height="6" fill="hsl(0, 60%, 45%)" />
        <rect x="12" y="14" width="8" height="2" fill="hsl(0, 60%, 45%)" />
      </>}
      {stage >= 4 && <>
        <rect x="12" y="16" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="18" y="18" width="2" height="2" fill="hsl(0, 0%, 95%)" />
        <rect x="14" y="20" width="2" height="2" fill="hsl(0, 0%, 95%)" />
      </>}
    </g>
  ),
];

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  // Pick a "random" but stable plant based on totalCount
  const plantIndex = useMemo(() => {
    // Use totalCount as seed for deterministic but varied selection
    const seed = totalCount * 7 + 3;
    return seed % PLANT_TEMPLATES.length;
  }, [totalCount]);

  const stage = totalCount === 0 ? 0 : Math.min(Math.ceil((completedCount / totalCount) * 4), 4);

  if (totalCount === 0 || completedCount === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
            {/* Seed */}
            <rect x="14" y="26" width="4" height="4" fill="hsl(30, 40%, 45%)" />
            <rect x="15" y="25" width="2" height="1" fill="hsl(30, 35%, 40%)" />
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
