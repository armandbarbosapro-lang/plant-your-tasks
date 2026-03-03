import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

const R = (x: number, y: number, w: number, h: number, fill: string) => (
  <rect x={x} y={y} width={w} height={h} fill={fill} />
);

// Pixel butterfly that flutters around
const PixelButterfly = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.g
    animate={{
      x: [0, 8, -6, 12, -4, 0],
      y: [0, -10, -6, -14, -8, 0],
    }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <rect x={x} y={8} width={4} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
    <rect x={x - 3} y={6} width={3} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
    <rect x={x + 4} y={6} width={3} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
    <motion.rect
      x={x - 5} y={4} width={3} height={3} fill={color}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, delay }}
      style={{ imageRendering: "pixelated" }}
    />
    <motion.rect
      x={x + 6} y={4} width={3} height={3} fill={color}
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: delay + 0.3 }}
      style={{ imageRendering: "pixelated" }}
    />
  </motion.g>
);

// Pixel bird flying across
const PixelBird = ({ delay, startX, y }: { delay: number; startX: number; y: number }) => (
  <motion.g
    animate={{ x: [0, 80] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "linear" }}
  >
    <rect x={startX} y={y} width={2} height={2} fill="hsl(30, 50%, 25%)" style={{ imageRendering: "pixelated" }} />
    <motion.rect
      x={startX - 3} y={y - 2} width={3} height={2} fill="hsl(30, 45%, 30%)"
      animate={{ y: [y - 2, y - 4, y - 2] }}
      transition={{ duration: 0.4, repeat: Infinity }}
      style={{ imageRendering: "pixelated" }}
    />
    <motion.rect
      x={startX + 2} y={y - 2} width={3} height={2} fill="hsl(30, 45%, 30%)"
      animate={{ y: [y - 2, y - 4, y - 2] }}
      transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
      style={{ imageRendering: "pixelated" }}
    />
  </motion.g>
);

// Pixel frog sitting on ground
const PixelFrog = ({ x }: { x: number }) => (
  <motion.g
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeOut" }}
  >
    {/* Body */}
    <rect x={x} y={116} width={8} height={6} fill="hsl(120, 55%, 40%)" style={{ imageRendering: "pixelated" }} />
    {/* Head */}
    <rect x={x + 1} y={112} width={6} height={5} fill="hsl(120, 60%, 45%)" style={{ imageRendering: "pixelated" }} />
    {/* Eyes */}
    <rect x={x + 1} y={111} width={2} height={2} fill="hsl(60, 80%, 70%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 5} y={111} width={2} height={2} fill="hsl(60, 80%, 70%)" style={{ imageRendering: "pixelated" }} />
    {/* Pupils */}
    <rect x={x + 2} y={111} width={1} height={1} fill="hsl(0, 0%, 10%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 5} y={111} width={1} height={1} fill="hsl(0, 0%, 10%)" style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Floating sparkle
const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.rect
    x={x} y={y} width={2} height={2}
    fill="hsl(50, 95%, 82%)"
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
    style={{ imageRendering: "pixelated" }}
  />
);

// Small pixel flowers on the ground
const GroundFlower = ({ x, color }: { x: number; color: string }) => (
  <g>
    <rect x={x} y={118} width={2} height={4} fill="hsl(130, 45%, 40%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 1} y={116} width={4} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
    <rect x={x} y={115} width={2} height={2} fill="hsl(50, 80%, 65%)" style={{ imageRendering: "pixelated" }} />
  </g>
);

// Swaying grass
const Grass = ({ x, delay }: { x: number; delay: number }) => (
  <motion.g
    animate={{ rotate: [-3, 3, -3] }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ transformOrigin: `${x + 1}px 122px` }}
  >
    <rect x={x} y={116} width={2} height={6} fill="hsl(120, 50%, 45%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 1} y={114} width={2} height={3} fill="hsl(120, 55%, 50%)" style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

const MagicalGardenRose = (s: number) => (
  <g key="garden-rose">
    {s >= 1 && <>{R(20, 118, 56, 6, "hsl(30, 40%, 28%)")}{R(24, 116, 48, 4, "hsl(30, 35%, 32%)")}</>}
    {s >= 1 && R(46, 108, 4, 10, "hsl(130, 45%, 32%)")}
    {s >= 2 && R(46, 94, 4, 14, "hsl(130, 48%, 35%)")}
    {s >= 3 && R(46, 78, 4, 16, "hsl(130, 50%, 36%)")}
    {s >= 3 && <>{R(34, 96, 12, 4, "hsl(130, 55%, 40%)")}{R(50, 88, 12, 4, "hsl(130, 55%, 40%)")}{R(30, 94, 4, 4, "hsl(130, 50%, 38%)")}{R(62, 86, 4, 4, "hsl(130, 50%, 38%)")}</>}
    {s >= 4 && R(46, 62, 4, 16, "hsl(130, 52%, 37%)")}
    {s >= 4 && <>{R(34, 74, 12, 4, "hsl(140, 55%, 42%)")}{R(50, 68, 12, 4, "hsl(140, 55%, 42%)")}{R(30, 72, 4, 4, "hsl(140, 50%, 40%)")}{R(62, 66, 4, 4, "hsl(140, 50%, 40%)")}</>}
    {s >= 5 && <>{R(38, 62, 4, 4, "hsl(130, 48%, 34%)")}{R(34, 58, 4, 8, "hsl(130, 48%, 34%)")}{R(54, 58, 4, 4, "hsl(130, 48%, 34%)")}{R(58, 54, 4, 8, "hsl(130, 48%, 34%)")}</>}
    {s >= 5 && R(46, 48, 4, 14, "hsl(130, 52%, 37%)")}
    {s >= 6 && <>{R(26, 50, 12, 10, "hsl(340, 60%, 50%)")}{R(28, 48, 8, 4, "hsl(340, 55%, 55%)")}</>}
    {s >= 6 && <>{R(58, 46, 12, 10, "hsl(340, 60%, 50%)")}{R(60, 44, 8, 4, "hsl(340, 55%, 55%)")}</>}
    {s >= 7 && <>{R(40, 36, 16, 12, "hsl(350, 65%, 55%)")}{R(42, 32, 12, 6, "hsl(350, 60%, 60%)")}</>}
    {s >= 8 && <>{R(20, 44, 20, 16, "hsl(345, 65%, 55%)")}{R(22, 42, 16, 4, "hsl(345, 60%, 60%)")}{R(24, 40, 12, 4, "hsl(345, 55%, 65%)")}{R(18, 48, 4, 8, "hsl(340, 60%, 50%)")}</>}
    {s >= 8 && <>{R(56, 40, 20, 16, "hsl(345, 65%, 55%)")}{R(58, 38, 16, 4, "hsl(345, 60%, 60%)")}{R(60, 36, 12, 4, "hsl(345, 55%, 65%)")}{R(74, 44, 4, 8, "hsl(340, 60%, 50%)")}</>}
    {s >= 9 && <>{R(34, 26, 28, 18, "hsl(350, 70%, 58%)")}{R(38, 22, 20, 6, "hsl(350, 65%, 63%)")}{R(42, 18, 12, 6, "hsl(350, 60%, 68%)")}{R(32, 30, 4, 10, "hsl(340, 60%, 52%)")}{R(60, 30, 4, 10, "hsl(340, 60%, 52%)")}</>}
    {s >= 10 && <>{R(10, 52, 10, 8, "hsl(30, 75%, 60%)")}{R(12, 50, 6, 4, "hsl(40, 80%, 65%)")}{R(76, 48, 10, 8, "hsl(30, 75%, 60%)")}{R(78, 46, 6, 4, "hsl(40, 80%, 65%)")}{R(14, 60, 8, 4, "hsl(140, 50%, 42%)")}{R(74, 56, 8, 4, "hsl(140, 50%, 42%)")}</>}
    {s >= 11 && <>{R(36, 14, 24, 8, "hsl(355, 75%, 62%)")}{R(40, 10, 16, 6, "hsl(355, 70%, 68%)")}{R(44, 6, 8, 6, "hsl(0, 70%, 72%)")}{R(14, 38, 10, 10, "hsl(350, 68%, 58%)")}{R(72, 34, 10, 10, "hsl(350, 68%, 58%)")}{R(16, 36, 6, 4, "hsl(350, 62%, 64%)")}{R(74, 32, 6, 4, "hsl(350, 62%, 64%)")}</>}
    {s >= 12 && <>{R(44, 30, 8, 6, "hsl(45, 90%, 65%)")}{R(28, 48, 6, 4, "hsl(45, 90%, 65%)")}{R(64, 44, 6, 4, "hsl(45, 90%, 65%)")}{R(46, 2, 4, 4, "hsl(50, 95%, 85%)")}{R(16, 8, 4, 4, "hsl(345, 60%, 70%)")}{R(76, 6, 4, 4, "hsl(345, 60%, 70%)")}{R(34, 2, 4, 4, "hsl(0, 65%, 72%)")}{R(58, 4, 4, 4, "hsl(0, 65%, 72%)")}</>}
  </g>
);

// Keep other templates but import from a simpler structure
const PLANT_TEMPLATES = [
  MagicalGardenRose,
  // Crystal Tree (compact)
  (s: number) => (
    <g key="crystal">
      {s >= 1 && R(46, 108, 4, 14, "hsl(270, 30%, 35%)")}
      {s >= 2 && R(46, 94, 4, 14, "hsl(270, 35%, 38%)")}
      {s >= 3 && R(46, 80, 4, 14, "hsl(270, 35%, 38%)")}
      {s >= 4 && <>{R(38, 92, 8, 3, "hsl(280, 50%, 55%)")}{R(50, 86, 8, 3, "hsl(280, 50%, 55%)")}</>}
      {s >= 5 && R(46, 66, 4, 14, "hsl(270, 38%, 40%)")}
      {s >= 6 && <>{R(34, 78, 12, 4, "hsl(280, 55%, 58%)")}{R(50, 72, 12, 4, "hsl(280, 55%, 58%)")}</>}
      {s >= 7 && <>{R(38, 54, 20, 12, "hsl(270, 60%, 60%)")}{R(42, 46, 12, 8, "hsl(270, 65%, 65%)")}</>}
      {s >= 8 && <>{R(30, 50, 10, 10, "hsl(290, 60%, 62%)")}{R(56, 50, 10, 10, "hsl(290, 60%, 62%)")}</>}
      {s >= 9 && <>{R(44, 38, 8, 8, "hsl(280, 70%, 68%)")}{R(28, 44, 8, 8, "hsl(290, 55%, 58%)")}{R(60, 44, 8, 8, "hsl(290, 55%, 58%)")}</>}
      {s >= 10 && <>{R(36, 32, 24, 6, "hsl(270, 75%, 72%)")}{R(22, 40, 8, 8, "hsl(300, 60%, 65%)")}{R(66, 40, 8, 8, "hsl(300, 60%, 65%)")}</>}
      {s >= 11 && <>{R(18, 34, 8, 8, "hsl(300, 65%, 70%)")}{R(70, 34, 8, 8, "hsl(300, 65%, 70%)")}{R(40, 24, 16, 8, "hsl(280, 80%, 75%)")}{R(44, 18, 8, 6, "hsl(280, 82%, 78%)")}</>}
      {s >= 12 && <>{R(14, 28, 4, 4, "hsl(50, 90%, 80%)")}{R(78, 26, 4, 4, "hsl(50, 90%, 80%)")}{R(32, 20, 4, 4, "hsl(50, 90%, 80%)")}{R(60, 22, 4, 4, "hsl(50, 90%, 80%)")}{R(46, 12, 4, 4, "hsl(50, 95%, 85%)")}</>}
    </g>
  ),
  // Fire Flower
  (s: number) => (
    <g key="fire">
      {s >= 1 && R(46, 108, 4, 14, "hsl(142, 40%, 30%)")}
      {s >= 2 && R(46, 94, 4, 14, "hsl(142, 42%, 32%)")}
      {s >= 3 && R(46, 80, 4, 14, "hsl(142, 42%, 32%)")}
      {s >= 4 && <>{R(36, 96, 10, 3, "hsl(142, 38%, 35%)")}{R(50, 90, 10, 3, "hsl(142, 38%, 35%)")}</>}
      {s >= 5 && R(46, 66, 4, 14, "hsl(142, 44%, 34%)")}
      {s >= 6 && <>{R(32, 80, 14, 4, "hsl(142, 40%, 38%)")}{R(50, 74, 14, 4, "hsl(142, 40%, 38%)")}</>}
      {s >= 7 && R(40, 52, 16, 14, "hsl(25, 80%, 50%)")}
      {s >= 8 && <>{R(30, 48, 12, 12, "hsl(10, 75%, 50%)")}{R(54, 48, 12, 12, "hsl(10, 75%, 50%)")}</>}
      {s >= 9 && <>{R(40, 40, 16, 12, "hsl(40, 90%, 55%)")}{R(26, 42, 8, 10, "hsl(15, 80%, 52%)")}{R(62, 42, 8, 10, "hsl(15, 80%, 52%)")}</>}
      {s >= 10 && <>{R(34, 32, 28, 8, "hsl(45, 95%, 60%)")}{R(22, 38, 8, 10, "hsl(5, 70%, 48%)")}{R(66, 38, 8, 10, "hsl(5, 70%, 48%)")}</>}
      {s >= 11 && <>{R(38, 24, 20, 8, "hsl(50, 95%, 65%)")}{R(28, 30, 10, 8, "hsl(30, 85%, 55%)")}{R(58, 30, 10, 8, "hsl(30, 85%, 55%)")}{R(42, 18, 12, 6, "hsl(50, 98%, 68%)")}</>}
      {s >= 12 && <>{R(44, 12, 8, 6, "hsl(55, 100%, 72%)")}{R(18, 34, 6, 6, "hsl(10, 75%, 52%)")}{R(72, 34, 6, 6, "hsl(10, 75%, 52%)")}{R(46, 8, 4, 4, "hsl(55, 100%, 75%)")}</>}
    </g>
  ),
];

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  const plantIndex = useMemo(() => {
    const seed = totalCount * 7 + 3;
    return seed % PLANT_TEMPLATES.length;
  }, [totalCount]);

  const stage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 12);

  const renderPlant = PLANT_TEMPLATES[plantIndex];

  return (
    <div className="flex flex-col items-center">
      <div className="w-52 h-52 flex items-center justify-center rounded-2xl bg-white/80 border-2 border-primary/20 shadow-lg overflow-hidden relative">
        <svg viewBox="0 0 96 128" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
          {/* Sky gradient background */}
          <rect x="0" y="0" width="96" height="90" fill="hsl(200, 60%, 88%)" />
          <rect x="0" y="10" width="96" height="80" fill="hsl(190, 50%, 90%)" />
          {/* Clouds */}
          <rect x="5" y="8" width="12" height="4" fill="white" />
          <rect x="3" y="10" width="16" height="3" fill="white" />
          <rect x="70" y="14" width="10" height="3" fill="white" />
          <rect x="68" y="16" width="14" height="3" fill="white" />
          {/* Ground */}
          <rect x="0" y="90" width="96" height="38" fill="hsl(100, 40%, 50%)" />
          <rect x="0" y="90" width="96" height="4" fill="hsl(100, 45%, 55%)" />
          <rect x="0" y="120" width="96" height="8" fill="hsl(30, 35%, 35%)" />

          {/* Small ground flowers */}
          <GroundFlower x={8} color="hsl(340, 65%, 60%)" />
          <GroundFlower x={82} color="hsl(45, 80%, 60%)" />
          <GroundFlower x={18} color="hsl(280, 55%, 60%)" />
          <GroundFlower x={72} color="hsl(10, 70%, 58%)" />

          {/* Grass patches */}
          <Grass x={4} delay={0} />
          <Grass x={14} delay={0.5} />
          <Grass x={28} delay={1} />
          <Grass x={64} delay={0.3} />
          <Grass x={78} delay={0.8} />
          <Grass x={88} delay={1.2} />

          {/* Plant or empty pot */}
          {(totalCount === 0 || completedCount === 0) ? (
            <>
              <rect x="38" y="110" width="20" height="10" fill="hsl(20, 50%, 45%)" />
              <rect x="36" y="108" width="24" height="4" fill="hsl(20, 45%, 40%)" />
              <rect x="42" y="104" width="12" height="5" fill="hsl(30, 40%, 35%)" />
            </>
          ) : renderPlant(stage)}

          {/* Frog */}
          <PixelFrog x={76} />

          {/* Butterflies */}
          <PixelButterfly delay={0} x={16} color="hsl(280, 70%, 70%)" />
          <PixelButterfly delay={2} x={72} color="hsl(200, 70%, 65%)" />

          {/* Birds */}
          <PixelBird delay={0} startX={-10} y={6} />
          <PixelBird delay={4} startX={-20} y={16} />

          {/* Sparkles when plant is growing */}
          {stage >= 6 && <>
            <Sparkle x={20} y={30} delay={0} />
            <Sparkle x={74} y={24} delay={1} />
            <Sparkle x={48} y={8} delay={2} />
          </>}
          {stage >= 10 && <>
            <Sparkle x={10} y={20} delay={0.5} />
            <Sparkle x={84} y={14} delay={1.5} />
          </>}
        </svg>
      </div>
    </div>
  );
};

export default PlantDisplay;
