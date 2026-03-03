import React from "react";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  const stage = totalCount === 0 ? 0 : Math.floor((completedCount / totalCount) * 6);

  const renderPlant = () => {
    // Simple pixel-art style plant that grows in stages
    const stages = [
      // Stage 0: seed
      (
        <g key="s0">
          <rect x="46" y="85" width="8" height="5" fill="hsl(30, 40%, 45%)" rx="2" />
        </g>
      ),
      // Stage 1: sprout
      (
        <g key="s1">
          <rect x="48" y="70" width="4" height="20" fill="hsl(142, 45%, 42%)" />
          <ellipse cx="42" cy="68" rx="8" ry="5" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="58" cy="68" rx="8" ry="5" fill="hsl(142, 50%, 50%)" />
        </g>
      ),
      // Stage 2: small plant
      (
        <g key="s2">
          <rect x="48" y="55" width="4" height="35" fill="hsl(142, 45%, 38%)" />
          <ellipse cx="38" cy="58" rx="10" ry="6" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="62" cy="58" rx="10" ry="6" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="40" cy="70" rx="8" ry="5" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="60" cy="70" rx="8" ry="5" fill="hsl(142, 45%, 45%)" />
        </g>
      ),
      // Stage 3: medium plant
      (
        <g key="s3">
          <rect x="48" y="40" width="4" height="50" fill="hsl(142, 45%, 35%)" />
          <ellipse cx="35" cy="48" rx="12" ry="7" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="65" cy="48" rx="12" ry="7" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="38" cy="60" rx="10" ry="6" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="62" cy="60" rx="10" ry="6" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="40" cy="72" rx="8" ry="5" fill="hsl(142, 40%, 40%)" />
          <ellipse cx="60" cy="72" rx="8" ry="5" fill="hsl(142, 40%, 40%)" />
        </g>
      ),
      // Stage 4: big plant with bud
      (
        <g key="s4">
          <rect x="48" y="30" width="4" height="60" fill="hsl(142, 45%, 32%)" />
          <ellipse cx="32" cy="40" rx="14" ry="8" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="68" cy="40" rx="14" ry="8" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="35" cy="54" rx="11" ry="7" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="65" cy="54" rx="11" ry="7" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="38" cy="66" rx="9" ry="6" fill="hsl(142, 40%, 40%)" />
          <ellipse cx="62" cy="66" rx="9" ry="6" fill="hsl(142, 40%, 40%)" />
          <circle cx="50" cy="28" r="6" fill="hsl(350, 60%, 60%)" />
        </g>
      ),
      // Stage 5: flower bloom
      (
        <g key="s5">
          <rect x="48" y="25" width="4" height="65" fill="hsl(142, 45%, 32%)" />
          <ellipse cx="30" cy="38" rx="15" ry="9" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="70" cy="38" rx="15" ry="9" fill="hsl(142, 50%, 50%)" />
          <ellipse cx="33" cy="52" rx="12" ry="7" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="67" cy="52" rx="12" ry="7" fill="hsl(142, 45%, 45%)" />
          <ellipse cx="36" cy="65" rx="10" ry="6" fill="hsl(142, 40%, 40%)" />
          <ellipse cx="64" cy="65" rx="10" ry="6" fill="hsl(142, 40%, 40%)" />
          <ellipse cx="40" cy="76" rx="8" ry="5" fill="hsl(142, 35%, 38%)" />
          <ellipse cx="60" cy="76" rx="8" ry="5" fill="hsl(142, 35%, 38%)" />
          {/* Flower */}
          <circle cx="50" cy="20" r="5" fill="hsl(45, 90%, 60%)" />
          <circle cx="43" cy="17" r="5" fill="hsl(350, 65%, 65%)" />
          <circle cx="57" cy="17" r="5" fill="hsl(350, 65%, 65%)" />
          <circle cx="45" cy="24" r="5" fill="hsl(350, 65%, 65%)" />
          <circle cx="55" cy="24" r="5" fill="hsl(350, 65%, 65%)" />
          <circle cx="43" cy="23" r="5" fill="hsl(350, 60%, 60%)" />
          <circle cx="57" cy="23" r="5" fill="hsl(350, 60%, 60%)" />
        </g>
      ),
      // Stage 6: full bloom with sparkles
      (
        <g key="s6">
          <rect x="48" y="20" width="4" height="70" fill="hsl(142, 45%, 30%)" />
          <ellipse cx="28" cy="35" rx="16" ry="10" fill="hsl(142, 55%, 52%)" />
          <ellipse cx="72" cy="35" rx="16" ry="10" fill="hsl(142, 55%, 52%)" />
          <ellipse cx="30" cy="50" rx="13" ry="8" fill="hsl(142, 50%, 48%)" />
          <ellipse cx="70" cy="50" rx="13" ry="8" fill="hsl(142, 50%, 48%)" />
          <ellipse cx="34" cy="63" rx="11" ry="7" fill="hsl(142, 45%, 44%)" />
          <ellipse cx="66" cy="63" rx="11" ry="7" fill="hsl(142, 45%, 44%)" />
          <ellipse cx="38" cy="75" rx="9" ry="6" fill="hsl(142, 40%, 40%)" />
          <ellipse cx="62" cy="75" rx="9" ry="6" fill="hsl(142, 40%, 40%)" />
          {/* Big flower */}
          <circle cx="50" cy="14" r="6" fill="hsl(45, 95%, 65%)" />
          <circle cx="41" cy="10" r="6" fill="hsl(320, 65%, 65%)" />
          <circle cx="59" cy="10" r="6" fill="hsl(320, 65%, 65%)" />
          <circle cx="42" cy="20" r="6" fill="hsl(320, 65%, 65%)" />
          <circle cx="58" cy="20" r="6" fill="hsl(320, 65%, 65%)" />
          <circle cx="38" cy="14" r="5" fill="hsl(320, 60%, 60%)" />
          <circle cx="62" cy="14" r="5" fill="hsl(320, 60%, 60%)" />
          {/* Sparkles */}
          <circle cx="20" cy="15" r="2" fill="hsl(45, 90%, 70%)" opacity="0.8" />
          <circle cx="80" cy="25" r="1.5" fill="hsl(45, 90%, 70%)" opacity="0.6" />
          <circle cx="15" cy="40" r="1.5" fill="hsl(45, 90%, 70%)" opacity="0.5" />
          <circle cx="85" cy="50" r="2" fill="hsl(45, 90%, 70%)" opacity="0.7" />
        </g>
      ),
    ];

    return stages[Math.min(stage, 6)];
  };

  const getMessage = () => {
    if (totalCount === 0) return "Ajoute des tâches ! 🌱";
    if (completedCount === 0) return "Plante ta graine ! 🌰";
    if (completedCount === totalCount) return "Magnifique ! 🌸";
    if (stage >= 4) return "Presque fleuri ! 🌿";
    if (stage >= 2) return "Ça pousse bien ! 🌱";
    return "Continue comme ça ! 💪";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Pot */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Ground/pot */}
          <path d="M30 88 Q30 98 50 98 Q70 98 70 88 L72 82 H28 Z" fill="hsl(25, 50%, 40%)" />
          <rect x="25" y="80" width="50" height="5" rx="2" fill="hsl(25, 55%, 45%)" />
          {/* Soil */}
          <ellipse cx="50" cy="82" rx="22" ry="3" fill="hsl(25, 30%, 25%)" />
          {/* Plant */}
          {renderPlant()}
        </svg>
      </div>
      <p className="text-sm font-semibold text-muted-foreground">{getMessage()}</p>
      <p className="text-xs text-muted-foreground">{completedCount}/{totalCount} tâches</p>
    </div>
  );
};

export default PlantDisplay;
