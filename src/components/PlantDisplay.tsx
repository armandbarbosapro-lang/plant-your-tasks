import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

// Pixel rect helper
const R = (x: number, y: number, w: number, h: number, fill: string) => (
  <rect x={x} y={y} width={w} height={h} fill={fill} />
);

// Animated pixel butterfly with more detail
const PixelButterfly = ({ delay, x, y, color, color2 }: { delay: number; x: number; y: number; color: string; color2: string }) => (
  <motion.g
    animate={{
      x: [0, 12, -8, 16, -6, 0],
      y: [0, -14, -8, -18, -10, 0],
    }}
    transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {/* Body */}
    <rect x={x} y={y} width={2} height={6} fill="hsl(30, 40%, 20%)" style={{ imageRendering: "pixelated" }} />
    {/* Left wings */}
    <motion.g animate={{ scaleX: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay }} style={{ transformOrigin: `${x}px ${y + 2}px` }}>
      <rect x={x - 6} y={y - 2} width={6} height={4} fill={color} style={{ imageRendering: "pixelated" }} />
      <rect x={x - 4} y={y - 4} width={4} height={2} fill={color2} style={{ imageRendering: "pixelated" }} />
      <rect x={x - 4} y={y + 2} width={4} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
      <rect x={x - 2} y={y + 5} width={2} height={2} fill={color2} style={{ imageRendering: "pixelated" }} />
    </motion.g>
    {/* Right wings */}
    <motion.g animate={{ scaleX: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: delay + 0.05 }} style={{ transformOrigin: `${x + 2}px ${y + 2}px` }}>
      <rect x={x + 2} y={y - 2} width={6} height={4} fill={color} style={{ imageRendering: "pixelated" }} />
      <rect x={x + 2} y={y - 4} width={4} height={2} fill={color2} style={{ imageRendering: "pixelated" }} />
      <rect x={x + 2} y={y + 2} width={4} height={3} fill={color} style={{ imageRendering: "pixelated" }} />
      <rect x={x + 2} y={y + 5} width={2} height={2} fill={color2} style={{ imageRendering: "pixelated" }} />
    </motion.g>
    {/* Antennae */}
    <rect x={x - 1} y={y - 3} width={1} height={2} fill="hsl(30, 40%, 20%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 2} y={y - 3} width={1} height={2} fill="hsl(30, 40%, 20%)" style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Bird flying across
const PixelBird = ({ delay, startX, y }: { delay: number; startX: number; y: number }) => (
  <motion.g
    animate={{ x: [0, 200] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "linear" }}
  >
    <rect x={startX} y={y} width={3} height={2} fill="hsl(30, 50%, 25%)" style={{ imageRendering: "pixelated" }} />
    <rect x={startX + 1} y={y + 1} width={2} height={1} fill="hsl(30, 40%, 30%)" style={{ imageRendering: "pixelated" }} />
    <motion.rect x={startX - 4} y={y - 2} width={4} height={2} fill="hsl(30, 45%, 30%)"
      animate={{ y: [y - 2, y - 4, y - 2] }} transition={{ duration: 0.35, repeat: Infinity }} style={{ imageRendering: "pixelated" }} />
    <motion.rect x={startX + 3} y={y - 2} width={4} height={2} fill="hsl(30, 45%, 30%)"
      animate={{ y: [y - 2, y - 4, y - 2] }} transition={{ duration: 0.35, repeat: Infinity, delay: 0.15 }} style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Detailed frog
const PixelFrog = ({ x, y }: { x: number; y: number }) => (
  <motion.g
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }}
  >
    {/* Back legs */}
    <rect x={x - 2} y={y + 6} width={3} height={2} fill="hsl(120, 45%, 35%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 7} y={y + 6} width={3} height={2} fill="hsl(120, 45%, 35%)" style={{ imageRendering: "pixelated" }} />
    {/* Body */}
    <rect x={x} y={y + 2} width={8} height={6} fill="hsl(120, 55%, 40%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 1} y={y + 3} width={6} height={4} fill="hsl(120, 50%, 45%)" style={{ imageRendering: "pixelated" }} />
    {/* Head */}
    <rect x={x + 1} y={y} width={6} height={4} fill="hsl(120, 60%, 45%)" style={{ imageRendering: "pixelated" }} />
    {/* Eyes - bulging */}
    <rect x={x} y={y - 2} width={3} height={3} fill="hsl(60, 80%, 70%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 5} y={y - 2} width={3} height={3} fill="hsl(60, 80%, 70%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 1} y={y - 1} width={1} height={1} fill="hsl(0, 0%, 10%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 6} y={y - 1} width={1} height={1} fill="hsl(0, 0%, 10%)" style={{ imageRendering: "pixelated" }} />
    {/* Belly */}
    <rect x={x + 2} y={y + 5} width={4} height={2} fill="hsl(90, 40%, 60%)" style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Water with ripple animation
const Water = ({ x, y, w }: { x: number; y: number; w: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={12} fill="hsl(200, 50%, 45%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x} y={y} width={w} height={4} fill="hsl(200, 55%, 55%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 2} y={y + 2} width={w - 4} height={2} fill="hsl(190, 60%, 60%)" opacity={0.6} style={{ imageRendering: "pixelated" }} />
    {/* Animated ripples */}
    <motion.rect x={x + 4} y={y + 1} width={6} height={1} fill="hsl(180, 50%, 70%)"
      animate={{ opacity: [0.3, 0.8, 0.3], x: [x + 4, x + 6, x + 4] }}
      transition={{ duration: 3, repeat: Infinity }} style={{ imageRendering: "pixelated" }} />
    <motion.rect x={x + 14} y={y + 3} width={4} height={1} fill="hsl(180, 50%, 70%)"
      animate={{ opacity: [0.5, 0.9, 0.5], x: [x + 14, x + 16, x + 14] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} style={{ imageRendering: "pixelated" }} />
    <motion.rect x={x + 24} y={y + 1} width={5} height={1} fill="hsl(180, 50%, 75%)"
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} style={{ imageRendering: "pixelated" }} />
    {/* Lily pads */}
    <rect x={x + 6} y={y} width={5} height={3} rx={1} fill="hsl(130, 50%, 40%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 7} y={y + 1} width={1} height={1} fill="hsl(130, 40%, 35%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 20} y={y + 1} width={4} height={2} fill="hsl(130, 45%, 38%)" style={{ imageRendering: "pixelated" }} />
    {/* Tiny flower on lily pad */}
    <rect x={x + 8} y={y - 1} width={2} height={2} fill="hsl(320, 60%, 70%)" style={{ imageRendering: "pixelated" }} />
  </g>
);

// Detailed tree
const Tree = ({ x, flip }: { x: number; flip?: boolean }) => (
  <g transform={flip ? `translate(${x * 2}, 0) scale(-1, 1)` : undefined}>
    {/* Trunk */}
    <rect x={x + 8} y={60} width={10} height={50} fill="hsl(25, 40%, 28%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 10} y={65} width={4} height={40} fill="hsl(25, 35%, 32%)" style={{ imageRendering: "pixelated" }} />
    {/* Roots */}
    <rect x={x + 4} y={105} width={6} height={4} fill="hsl(25, 40%, 25%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 16} y={107} width={6} height={3} fill="hsl(25, 40%, 25%)" style={{ imageRendering: "pixelated" }} />
    {/* Branch left */}
    <rect x={x + 2} y={70} width={8} height={4} fill="hsl(25, 38%, 30%)" style={{ imageRendering: "pixelated" }} />
    {/* Branch right */}
    <rect x={x + 16} y={65} width={8} height={3} fill="hsl(25, 38%, 30%)" style={{ imageRendering: "pixelated" }} />
    {/* Canopy layers - dense foliage */}
    <rect x={x - 4} y={40} width={34} height={25} fill="hsl(130, 45%, 30%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 2} y={35} width={30} height={10} fill="hsl(130, 50%, 35%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 2} y={30} width={22} height={8} fill="hsl(120, 55%, 38%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 6} y={26} width={14} height={6} fill="hsl(115, 50%, 42%)" style={{ imageRendering: "pixelated" }} />
    {/* Light patches on leaves */}
    <rect x={x} y={38} width={6} height={4} fill="hsl(120, 55%, 42%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 14} y={42} width={8} height={4} fill="hsl(120, 55%, 42%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 8} y={32} width={6} height={3} fill="hsl(110, 50%, 48%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 20} y={36} width={4} height={4} fill="hsl(125, 45%, 45%)" style={{ imageRendering: "pixelated" }} />
    {/* Highlight spots (sunlight) */}
    <rect x={x + 4} y={34} width={3} height={2} fill="hsl(100, 50%, 55%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 18} y={40} width={2} height={2} fill="hsl(100, 50%, 55%)" style={{ imageRendering: "pixelated" }} />
  </g>
);

// Ground flowers
const GroundFlower = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g>
    <rect x={x} y={y} width={2 * size} height={4 * size} fill="hsl(130, 45%, 35%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 1 * size} y={y - 2 * size} width={4 * size} height={3 * size} fill={color} style={{ imageRendering: "pixelated" }} />
    <rect x={x} y={y - 3 * size} width={2 * size} height={2 * size} fill="hsl(50, 80%, 65%)" style={{ imageRendering: "pixelated" }} />
  </g>
);

// Swaying tall grass
const TallGrass = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ transformOrigin: `${x + 1}px ${y + 10}px` }}
  >
    <rect x={x} y={y} width={2} height={10} fill="hsl(120, 50%, 40%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 1} y={y - 2} width={2} height={4} fill="hsl(120, 55%, 45%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x + 2} y={y + 2} width={2} height={6} fill="hsl(115, 45%, 38%)" style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Sun rays
const SunRays = () => (
  <g>
    <motion.rect x={130} y={0} width={30} height={80} fill="hsl(50, 80%, 80%)" opacity={0.08}
      animate={{ opacity: [0.05, 0.12, 0.05] }}
      transition={{ duration: 4, repeat: Infinity }}
      transform="rotate(25, 145, 0)" style={{ imageRendering: "pixelated" }} />
    <motion.rect x={110} y={0} width={20} height={70} fill="hsl(50, 80%, 80%)" opacity={0.06}
      animate={{ opacity: [0.03, 0.1, 0.03] }}
      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      transform="rotate(20, 120, 0)" style={{ imageRendering: "pixelated" }} />
    <motion.rect x={90} y={0} width={15} height={60} fill="hsl(50, 70%, 85%)" opacity={0.05}
      animate={{ opacity: [0.02, 0.08, 0.02] }}
      transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      transform="rotate(15, 97, 0)" style={{ imageRendering: "pixelated" }} />
  </g>
);

// Sparkle
const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay }}>
    <rect x={x} y={y} width={2} height={2} fill="hsl(50, 95%, 85%)" style={{ imageRendering: "pixelated" }} />
    <rect x={x - 1} y={y + 1} width={1} height={1} fill="hsl(50, 90%, 80%)" opacity={0.6} style={{ imageRendering: "pixelated" }} />
    <rect x={x + 2} y={y + 1} width={1} height={1} fill="hsl(50, 90%, 80%)" opacity={0.6} style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// Firefly
const Firefly = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g
    animate={{ x: [0, 6, -4, 8, 0], y: [0, -6, -3, -8, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <motion.rect x={x} y={y} width={2} height={2} fill="hsl(55, 100%, 75%)"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.5, repeat: Infinity, delay }}
      style={{ imageRendering: "pixelated" }} />
  </motion.g>
);

// ===== PLANT TEMPLATES =====

const MagicalGardenRose = (s: number, cx: number) => {
  const ox = cx - 48; // offset from center
  return (
    <g key="garden-rose">
      {/* Soil mound */}
      {s >= 1 && <>{R(ox + 30, 108, 36, 6, "hsl(30, 40%, 28%)")}{R(ox + 34, 106, 28, 4, "hsl(30, 35%, 32%)")}</>}
      {/* Stem growth */}
      {s >= 1 && R(ox + 46, 98, 4, 10, "hsl(130, 45%, 32%)")}
      {s >= 2 && R(ox + 46, 86, 4, 12, "hsl(130, 48%, 35%)")}
      {s >= 3 && R(ox + 46, 72, 4, 14, "hsl(130, 50%, 36%)")}
      {/* First leaves */}
      {s >= 3 && <>{R(ox + 36, 90, 10, 3, "hsl(130, 55%, 40%)")}{R(ox + 50, 82, 10, 3, "hsl(130, 55%, 40%)")}{R(ox + 32, 88, 4, 3, "hsl(130, 50%, 38%)")}{R(ox + 60, 80, 4, 3, "hsl(130, 50%, 38%)")}</>}
      {s >= 4 && R(ox + 46, 58, 4, 14, "hsl(130, 52%, 37%)")}
      {/* More leaves */}
      {s >= 4 && <>{R(ox + 36, 68, 10, 3, "hsl(140, 55%, 42%)")}{R(ox + 50, 62, 10, 3, "hsl(140, 55%, 42%)")}</>}
      {/* Side stems */}
      {s >= 5 && <>{R(ox + 38, 58, 4, 4, "hsl(130, 48%, 34%)")}{R(ox + 34, 54, 4, 6, "hsl(130, 48%, 34%)")}{R(ox + 54, 54, 4, 4, "hsl(130, 48%, 34%)")}{R(ox + 58, 50, 4, 6, "hsl(130, 48%, 34%)")}</>}
      {s >= 5 && R(ox + 46, 44, 4, 14, "hsl(130, 52%, 37%)")}
      {/* Side buds */}
      {s >= 6 && <>{R(ox + 26, 46, 10, 8, "hsl(340, 60%, 50%)")}{R(ox + 28, 44, 6, 4, "hsl(340, 55%, 55%)")}</>}
      {s >= 6 && <>{R(ox + 60, 42, 10, 8, "hsl(340, 60%, 50%)")}{R(ox + 62, 40, 6, 4, "hsl(340, 55%, 55%)")}</>}
      {/* Main bloom */}
      {s >= 7 && <>{R(ox + 40, 32, 16, 12, "hsl(350, 65%, 55%)")}{R(ox + 42, 28, 12, 6, "hsl(350, 60%, 60%)")}</>}
      {/* Large side blooms */}
      {s >= 8 && <>{R(ox + 20, 40, 18, 14, "hsl(345, 65%, 55%)")}{R(ox + 22, 38, 14, 4, "hsl(345, 60%, 60%)")}{R(ox + 24, 36, 10, 4, "hsl(345, 55%, 65%)")}</>}
      {s >= 8 && <>{R(ox + 58, 36, 18, 14, "hsl(345, 65%, 55%)")}{R(ox + 60, 34, 14, 4, "hsl(345, 60%, 60%)")}{R(ox + 62, 32, 10, 4, "hsl(345, 55%, 65%)")}</>}
      {/* Crown bloom */}
      {s >= 9 && <>{R(ox + 34, 22, 28, 16, "hsl(350, 70%, 58%)")}{R(ox + 38, 18, 20, 6, "hsl(350, 65%, 63%)")}{R(ox + 42, 14, 12, 6, "hsl(350, 60%, 68%)")}</>}
      {/* Decorative buds */}
      {s >= 10 && <>{R(ox + 12, 48, 8, 6, "hsl(30, 75%, 60%)")}{R(ox + 14, 46, 4, 3, "hsl(40, 80%, 65%)")}{R(ox + 76, 44, 8, 6, "hsl(30, 75%, 60%)")}{R(ox + 78, 42, 4, 3, "hsl(40, 80%, 65%)")}</>}
      {/* Full bloom details */}
      {s >= 11 && <>{R(ox + 36, 10, 24, 8, "hsl(355, 75%, 62%)")}{R(ox + 40, 6, 16, 6, "hsl(355, 70%, 68%)")}{R(ox + 44, 2, 8, 6, "hsl(0, 70%, 72%)")}</>}
      {/* Golden center & petals */}
      {s >= 12 && <>{R(ox + 44, 26, 8, 6, "hsl(45, 90%, 65%)")}{R(ox + 30, 44, 4, 3, "hsl(45, 90%, 65%)")}{R(ox + 64, 40, 4, 3, "hsl(45, 90%, 65%)")}{R(ox + 46, 0, 4, 3, "hsl(50, 95%, 85%)")}</>}
    </g>
  );
};

const CrystalTree = (s: number, cx: number) => {
  const ox = cx - 48;
  return (
    <g key="crystal">
      {s >= 1 && R(ox + 46, 100, 4, 14, "hsl(270, 30%, 35%)")}
      {s >= 2 && R(ox + 46, 86, 4, 14, "hsl(270, 35%, 38%)")}
      {s >= 3 && R(ox + 46, 72, 4, 14, "hsl(270, 35%, 38%)")}
      {s >= 4 && <>{R(ox + 38, 84, 8, 3, "hsl(280, 50%, 55%)")}{R(ox + 50, 78, 8, 3, "hsl(280, 50%, 55%)")}</>}
      {s >= 5 && R(ox + 46, 58, 4, 14, "hsl(270, 38%, 40%)")}
      {s >= 6 && <>{R(ox + 34, 70, 12, 4, "hsl(280, 55%, 58%)")}{R(ox + 50, 64, 12, 4, "hsl(280, 55%, 58%)")}</>}
      {s >= 7 && <>{R(ox + 38, 46, 20, 12, "hsl(270, 60%, 60%)")}{R(ox + 42, 38, 12, 8, "hsl(270, 65%, 65%)")}</>}
      {s >= 8 && <>{R(ox + 30, 42, 10, 10, "hsl(290, 60%, 62%)")}{R(ox + 56, 42, 10, 10, "hsl(290, 60%, 62%)")}</>}
      {s >= 9 && <>{R(ox + 44, 30, 8, 8, "hsl(280, 70%, 68%)")}{R(ox + 28, 36, 8, 8, "hsl(290, 55%, 58%)")}{R(ox + 60, 36, 8, 8, "hsl(290, 55%, 58%)")}</>}
      {s >= 10 && <>{R(ox + 36, 24, 24, 6, "hsl(270, 75%, 72%)")}{R(ox + 22, 32, 8, 8, "hsl(300, 60%, 65%)")}{R(ox + 66, 32, 8, 8, "hsl(300, 60%, 65%)")}</>}
      {s >= 11 && <>{R(ox + 40, 16, 16, 8, "hsl(280, 80%, 75%)")}{R(ox + 44, 10, 8, 6, "hsl(280, 82%, 78%)")}</>}
      {s >= 12 && <>{R(ox + 14, 20, 4, 4, "hsl(50, 90%, 80%)")}{R(ox + 78, 18, 4, 4, "hsl(50, 90%, 80%)")}{R(ox + 46, 4, 4, 4, "hsl(50, 95%, 85%)")}</>}
    </g>
  );
};

const FireFlower = (s: number, cx: number) => {
  const ox = cx - 48;
  return (
    <g key="fire">
      {s >= 1 && R(ox + 46, 100, 4, 14, "hsl(142, 40%, 30%)")}
      {s >= 2 && R(ox + 46, 86, 4, 14, "hsl(142, 42%, 32%)")}
      {s >= 3 && R(ox + 46, 72, 4, 14, "hsl(142, 42%, 32%)")}
      {s >= 4 && <>{R(ox + 36, 88, 10, 3, "hsl(142, 38%, 35%)")}{R(ox + 50, 82, 10, 3, "hsl(142, 38%, 35%)")}</>}
      {s >= 5 && R(ox + 46, 58, 4, 14, "hsl(142, 44%, 34%)")}
      {s >= 6 && <>{R(ox + 32, 72, 14, 4, "hsl(142, 40%, 38%)")}{R(ox + 50, 66, 14, 4, "hsl(142, 40%, 38%)")}</>}
      {s >= 7 && R(ox + 40, 44, 16, 14, "hsl(25, 80%, 50%)")}
      {s >= 8 && <>{R(ox + 30, 40, 12, 12, "hsl(10, 75%, 50%)")}{R(ox + 54, 40, 12, 12, "hsl(10, 75%, 50%)")}</>}
      {s >= 9 && <>{R(ox + 40, 32, 16, 12, "hsl(40, 90%, 55%)")}{R(ox + 26, 34, 8, 10, "hsl(15, 80%, 52%)")}{R(ox + 62, 34, 8, 10, "hsl(15, 80%, 52%)")}</>}
      {s >= 10 && <>{R(ox + 34, 24, 28, 8, "hsl(45, 95%, 60%)")}{R(ox + 22, 30, 8, 10, "hsl(5, 70%, 48%)")}{R(ox + 66, 30, 8, 10, "hsl(5, 70%, 48%)")}</>}
      {s >= 11 && <>{R(ox + 38, 16, 20, 8, "hsl(50, 95%, 65%)")}{R(ox + 42, 10, 12, 6, "hsl(50, 98%, 68%)")}</>}
      {s >= 12 && <>{R(ox + 44, 4, 8, 6, "hsl(55, 100%, 72%)")}{R(ox + 46, 0, 4, 4, "hsl(55, 100%, 75%)")}</>}
    </g>
  );
};

const PLANT_TEMPLATES = [MagicalGardenRose, CrystalTree, FireFlower];

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  const plantIndex = useMemo(() => {
    const seed = totalCount * 7 + 3;
    return seed % PLANT_TEMPLATES.length;
  }, [totalCount]);

  const stage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 12);
  const renderPlant = PLANT_TEMPLATES[plantIndex];

  // The viewBox is wide to fill screen width; height scaled proportionally
  const vw = 192;
  const vh = 140;
  const cx = vw / 2; // center x for plant

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full h-auto block" style={{ imageRendering: "pixelated" }} preserveAspectRatio="xMidYMax meet">
        {/* Sky */}
        <rect x="0" y="0" width={vw} height="80" fill="hsl(200, 55%, 82%)" />
        <rect x="0" y="15" width={vw} height="65" fill="hsl(195, 50%, 85%)" />
        <rect x="0" y="40" width={vw} height="40" fill="hsl(190, 45%, 88%)" />

        {/* Sun rays */}
        <SunRays />

        {/* Clouds */}
        <rect x="20" y="8" width="16" height="4" fill="white" opacity={0.7} />
        <rect x="18" y="10" width="20" height="4" fill="white" opacity={0.6} />
        <rect x="120" y="14" width="12" height="3" fill="white" opacity={0.5} />
        <rect x="118" y="16" width="16" height="3" fill="white" opacity={0.4} />
        <rect x="155" y="6" width="14" height="4" fill="white" opacity={0.5} />
        <rect x="153" y="9" width="18" height="3" fill="white" opacity={0.4} />

        {/* Trees on sides */}
        <Tree x={-6} />
        <Tree x={160} flip />

        {/* Background bushes */}
        <rect x="30" y="72" width="20" height="12" fill="hsl(130, 42%, 32%)" />
        <rect x="32" y="68" width="16" height="8" fill="hsl(125, 45%, 36%)" />
        <rect x="140" y="70" width="22" height="14" fill="hsl(130, 42%, 32%)" />
        <rect x="142" y="66" width="18" height="8" fill="hsl(125, 45%, 36%)" />

        {/* Ground - lush grass layers */}
        <rect x="0" y="80" width={vw} height="60" fill="hsl(120, 40%, 38%)" />
        <rect x="0" y="80" width={vw} height="6" fill="hsl(110, 45%, 45%)" />
        <rect x="0" y="84" width={vw} height="4" fill="hsl(115, 42%, 42%)" />
        {/* Grass texture */}
        <rect x="10" y="82" width="4" height="2" fill="hsl(100, 50%, 50%)" />
        <rect x="40" y="81" width="3" height="2" fill="hsl(100, 50%, 50%)" />
        <rect x="80" y="83" width="5" height="2" fill="hsl(105, 48%, 48%)" />
        <rect x="120" y="82" width="4" height="2" fill="hsl(100, 50%, 50%)" />
        <rect x="160" y="81" width="3" height="2" fill="hsl(100, 50%, 50%)" />

        {/* Dirt bottom */}
        <rect x="0" y="126" width={vw} height="14" fill="hsl(30, 35%, 30%)" />
        <rect x="0" y="126" width={vw} height="3" fill="hsl(30, 30%, 35%)" />

        {/* Path stones */}
        <rect x="70" y="108" width="8" height="4" fill="hsl(40, 20%, 55%)" />
        <rect x="82" y="112" width="6" height="4" fill="hsl(40, 18%, 52%)" />
        <rect x="62" y="114" width="7" height="3" fill="hsl(40, 22%, 50%)" />
        <rect x="90" y="108" width="5" height="3" fill="hsl(40, 18%, 54%)" />
        <rect x="100" y="112" width="6" height="3" fill="hsl(40, 20%, 52%)" />

        {/* Water pond */}
        <Water x={10} y={114} w={40} />

        {/* Ground flowers */}
        <GroundFlower x={58} y={100} color="hsl(340, 65%, 60%)" />
        <GroundFlower x={135} y={102} color="hsl(45, 80%, 60%)" />
        <GroundFlower x={150} y={98} color="hsl(280, 55%, 60%)" />
        <GroundFlower x={28} y={96} color="hsl(10, 70%, 58%)" />
        <GroundFlower x={112} y={100} color="hsl(200, 55%, 60%)" />
        <GroundFlower x={170} y={104} color="hsl(320, 60%, 55%)" />
        <GroundFlower x={42} y={98} color="hsl(55, 75%, 55%)" size={1} />

        {/* Tall grass patches */}
        <TallGrass x={54} y={92} delay={0} />
        <TallGrass x={68} y={94} delay={0.5} />
        <TallGrass x={128} y={92} delay={1} />
        <TallGrass x={142} y={96} delay={0.3} />
        <TallGrass x={8} y={94} delay={0.8} />
        <TallGrass x={178} y={92} delay={1.2} />
        <TallGrass x={100} y={96} delay={0.6} />

        {/* ===== PLANT or EMPTY POT ===== */}
        {(totalCount === 0 || completedCount === 0) ? (
          <>
            {/* Empty pot in center */}
            <rect x={cx - 10} y={104} width={20} height={10} fill="hsl(20, 50%, 45%)" />
            <rect x={cx - 12} y={102} width={24} height={4} fill="hsl(20, 45%, 40%)" />
            <rect x={cx - 6} y={98} width={12} height={5} fill="hsl(30, 40%, 35%)" />
          </>
        ) : renderPlant(stage, cx)}

        {/* Frog near water */}
        <PixelFrog x={46} y={106} />

        {/* Fireflies */}
        <Firefly x={50} y={88} delay={0} />
        <Firefly x={140} y={85} delay={1} />
        <Firefly x={100} y={92} delay={2} />
        <Firefly x={75} y={78} delay={3} />

        {/* Sparkles when growing */}
        {stage >= 6 && <>
          <Sparkle x={cx - 20} y={40} delay={0} />
          <Sparkle x={cx + 20} y={35} delay={1} />
          <Sparkle x={cx} y={20} delay={2} />
        </>}
        {stage >= 10 && <>
          <Sparkle x={cx - 30} y={30} delay={0.5} />
          <Sparkle x={cx + 30} y={25} delay={1.5} />
          <Sparkle x={cx - 10} y={10} delay={0.8} />
          <Sparkle x={cx + 10} y={15} delay={2.2} />
        </>}
      </svg>
    </div>
  );
};

export default PlantDisplay;
