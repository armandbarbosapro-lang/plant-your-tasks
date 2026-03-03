import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useTimeOfDay from "@/hooks/useTimeOfDay";

interface PlantDisplayProps {
  completedCount: number;
  totalCount: number;
}

const R = (x: number, y: number, w: number, h: number, fill: string) => (
  <rect x={x} y={y} width={w} height={h} fill={fill} />
);

// ===== PIXEL SUN =====
const PixelSun = ({ dayProgress }: { dayProgress: number }) => {
  if (dayProgress < 0.3) return null;
  const sunY = 8 + (1 - dayProgress) * 30;
  return (
    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>
      {/* Rays */}
      <rect x={155} y={sunY - 4} width={2} height={4} fill="hsl(45, 95%, 70%)" opacity={0.5} />
      <rect x={155} y={sunY + 12} width={2} height={4} fill="hsl(45, 95%, 70%)" opacity={0.5} />
      <rect x={146} y={sunY + 3} width={4} height={2} fill="hsl(45, 95%, 70%)" opacity={0.5} />
      <rect x={162} y={sunY + 3} width={4} height={2} fill="hsl(45, 95%, 70%)" opacity={0.5} />
      {/* Sun body */}
      <rect x={150} y={sunY} width={12} height={10} fill="hsl(45, 95%, 65%)" />
      <rect x={152} y={sunY - 2} width={8} height={2} fill="hsl(45, 90%, 70%)" />
      <rect x={152} y={sunY + 10} width={8} height={2} fill="hsl(45, 90%, 70%)" />
      <rect x={148} y={sunY + 2} width={2} height={6} fill="hsl(45, 90%, 70%)" />
      <rect x={162} y={sunY + 2} width={2} height={6} fill="hsl(45, 90%, 70%)" />
      <rect x={153} y={sunY + 2} width={6} height={6} fill="hsl(50, 100%, 75%)" />
    </motion.g>
  );
};

// ===== PIXEL MOON =====
const PixelMoon = ({ dayProgress }: { dayProgress: number }) => {
  if (dayProgress > 0.7) return null;
  const moonOpacity = dayProgress < 0.3 ? 1 : 1 - (dayProgress - 0.3) / 0.4;
  const moonY = 6 + dayProgress * 20;
  return (
    <g opacity={moonOpacity}>
      <rect x={30} y={moonY} width={10} height={10} fill="hsl(50, 30%, 85%)" />
      <rect x={32} y={moonY - 2} width={6} height={2} fill="hsl(50, 25%, 80%)" />
      <rect x={32} y={moonY + 10} width={6} height={2} fill="hsl(50, 25%, 80%)" />
      <rect x={28} y={moonY + 2} width={2} height={6} fill="hsl(50, 25%, 80%)" />
      {/* Craters */}
      <rect x={33} y={moonY + 2} width={2} height={2} fill="hsl(50, 20%, 75%)" />
      <rect x={36} y={moonY + 6} width={3} height={2} fill="hsl(50, 20%, 75%)" />
      {/* Moon glow */}
      <rect x={29} y={moonY - 1} width={12} height={12} fill="hsl(50, 40%, 90%)" opacity={0.15} />
    </g>
  );
};

// ===== STARS =====
const Star = ({ x, y, delay, dayProgress }: { x: number; y: number; delay: number; dayProgress: number }) => {
  if (dayProgress > 0.6) return null;
  const starOpacity = dayProgress < 0.3 ? 1 : 1 - (dayProgress - 0.3) / 0.3;
  return (
    <motion.g opacity={starOpacity} animate={{ opacity: [starOpacity * 0.4, starOpacity, starOpacity * 0.4] }}
      transition={{ duration: 2, repeat: Infinity, delay }}>
      <rect x={x} y={y} width={2} height={2} fill="hsl(50, 80%, 90%)" />
      <rect x={x + 1} y={y - 1} width={1} height={1} fill="hsl(50, 70%, 85%)" opacity={0.6} />
      <rect x={x - 1} y={y + 1} width={1} height={1} fill="hsl(50, 70%, 85%)" opacity={0.6} />
    </motion.g>
  );
};

// ===== FROG (awake/sleeping) =====
const PixelFrog = ({ x, y, sleeping }: { x: number; y: number; sleeping: boolean }) => {
  if (sleeping) {
    // Sleeping frog in pond - flatter, eyes closed, Zzz
    return (
      <g>
        {/* Flat body on lily pad */}
        <rect x={x} y={y + 4} width={8} height={4} fill="hsl(120, 55%, 40%)" />
        <rect x={x + 1} y={y + 2} width={6} height={3} fill="hsl(120, 60%, 45%)" />
        {/* Closed eyes */}
        <rect x={x} y={y + 1} width={3} height={2} fill="hsl(120, 60%, 45%)" />
        <rect x={x + 5} y={y + 1} width={3} height={2} fill="hsl(120, 60%, 45%)" />
        <rect x={x + 1} y={y + 2} width={1} height={1} fill="hsl(0, 0%, 15%)" />
        <rect x={x + 6} y={y + 2} width={1} height={1} fill="hsl(0, 0%, 15%)" />
        {/* Zzz */}
        <motion.g animate={{ opacity: [0, 1, 0], y: [0, -4, -8] }} transition={{ duration: 3, repeat: Infinity }}>
          <rect x={x + 8} y={y - 4} width={4} height={2} fill="hsl(200, 40%, 75%)" />
          <rect x={x + 8} y={y - 4} width={1} height={1} fill="hsl(200, 40%, 75%)" />
          <rect x={x + 11} y={y - 5} width={1} height={1} fill="hsl(200, 40%, 75%)" />
        </motion.g>
        <motion.g animate={{ opacity: [0, 1, 0], y: [0, -4, -8] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
          <rect x={x + 12} y={y - 8} width={3} height={1} fill="hsl(200, 40%, 80%)" />
        </motion.g>
      </g>
    );
  }
  return (
    <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }}>
      <rect x={x - 2} y={y + 6} width={3} height={2} fill="hsl(120, 45%, 35%)" />
      <rect x={x + 7} y={y + 6} width={3} height={2} fill="hsl(120, 45%, 35%)" />
      <rect x={x} y={y + 2} width={8} height={6} fill="hsl(120, 55%, 40%)" />
      <rect x={x + 1} y={y + 3} width={6} height={4} fill="hsl(120, 50%, 45%)" />
      <rect x={x + 1} y={y} width={6} height={4} fill="hsl(120, 60%, 45%)" />
      <rect x={x} y={y - 2} width={3} height={3} fill="hsl(60, 80%, 70%)" />
      <rect x={x + 5} y={y - 2} width={3} height={3} fill="hsl(60, 80%, 70%)" />
      <rect x={x + 1} y={y - 1} width={1} height={1} fill="hsl(0, 0%, 10%)" />
      <rect x={x + 6} y={y - 1} width={1} height={1} fill="hsl(0, 0%, 10%)" />
      <rect x={x + 2} y={y + 5} width={4} height={2} fill="hsl(90, 40%, 60%)" />
    </motion.g>
  );
};

// ===== OWL (night only) =====
const PixelOwl = ({ x, y, dayProgress }: { x: number; y: number; dayProgress: number }) => {
  if (dayProgress > 0.5) return null;
  const owlOpacity = dayProgress < 0.2 ? 1 : 1 - (dayProgress - 0.2) / 0.3;
  return (
    <motion.g opacity={owlOpacity}>
      {/* Body */}
      <rect x={x} y={y} width={8} height={8} fill="hsl(30, 30%, 35%)" />
      <rect x={x + 1} y={y + 1} width={6} height={6} fill="hsl(30, 35%, 40%)" />
      {/* Head */}
      <rect x={x} y={y - 4} width={8} height={5} fill="hsl(30, 30%, 38%)" />
      {/* Ear tufts */}
      <rect x={x - 1} y={y - 6} width={2} height={3} fill="hsl(30, 28%, 35%)" />
      <rect x={x + 7} y={y - 6} width={2} height={3} fill="hsl(30, 28%, 35%)" />
      {/* Big eyes */}
      <motion.g animate={{ scale: [1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}>
        <rect x={x + 1} y={y - 4} width={3} height={3} fill="hsl(45, 90%, 65%)" />
        <rect x={x + 4} y={y - 4} width={3} height={3} fill="hsl(45, 90%, 65%)" />
        <rect x={x + 2} y={y - 3} width={1} height={1} fill="hsl(0, 0%, 5%)" />
        <rect x={x + 5} y={y - 3} width={1} height={1} fill="hsl(0, 0%, 5%)" />
      </motion.g>
      {/* Beak */}
      <rect x={x + 3} y={y - 1} width={2} height={2} fill="hsl(35, 60%, 50%)" />
      {/* Belly pattern */}
      <rect x={x + 2} y={y + 3} width={4} height={3} fill="hsl(35, 25%, 50%)" />
      {/* Feet */}
      <rect x={x + 1} y={y + 8} width={2} height={1} fill="hsl(35, 50%, 45%)" />
      <rect x={x + 5} y={y + 8} width={2} height={1} fill="hsl(35, 50%, 45%)" />
    </motion.g>
  );
};

// ===== IMPROVED WATER POND =====
const Pond = ({ x, y, w, h, isNight }: { x: number; y: number; w: number; h: number; isNight: boolean }) => {
  const waterColor = isNight ? "hsl(220, 40%, 25%)" : "hsl(200, 50%, 45%)";
  const waterLight = isNight ? "hsl(220, 45%, 35%)" : "hsl(200, 55%, 55%)";
  const rippleColor = isNight ? "hsl(210, 40%, 45%)" : "hsl(180, 50%, 70%)";
  const moonReflect = isNight ? 0.3 : 0;
  return (
    <g>
      {/* Pond shape - rounded edges with rects */}
      <rect x={x + 2} y={y} width={w - 4} height={h} fill={waterColor} />
      <rect x={x} y={y + 2} width={w} height={h - 4} fill={waterColor} />
      <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill={waterColor} />
      {/* Light surface */}
      <rect x={x + 3} y={y + 1} width={w - 6} height={3} fill={waterLight} />
      <rect x={x + 5} y={y + 2} width={w - 10} height={2} fill={isNight ? "hsl(210, 45%, 40%)" : "hsl(190, 60%, 60%)"} opacity={0.6} />
      {/* Ripples */}
      <motion.rect x={x + 6} y={y + 2} width={6} height={1} fill={rippleColor}
        animate={{ opacity: [0.3, 0.8, 0.3], x: [x + 6, x + 8, x + 6] }}
        transition={{ duration: 3, repeat: Infinity }} />
      <motion.rect x={x + 18} y={y + 4} width={4} height={1} fill={rippleColor}
        animate={{ opacity: [0.5, 0.9, 0.5], x: [x + 18, x + 20, x + 18] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} />
      <motion.rect x={x + 30} y={y + 2} width={5} height={1} fill={rippleColor}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      {/* Lily pads */}
      <rect x={x + 8} y={y + 1} width={5} height={3} fill={isNight ? "hsl(130, 35%, 25%)" : "hsl(130, 50%, 40%)"} />
      <rect x={x + 9} y={y + 2} width={1} height={1} fill={isNight ? "hsl(130, 30%, 20%)" : "hsl(130, 40%, 35%)"} />
      <rect x={x + 24} y={y + 2} width={4} height={2} fill={isNight ? "hsl(130, 35%, 25%)" : "hsl(130, 45%, 38%)"} />
      {/* Flower on lily pad */}
      <rect x={x + 10} y={y} width={2} height={2} fill={isNight ? "hsl(320, 40%, 45%)" : "hsl(320, 60%, 70%)"} />
      {/* Edge rocks */}
      <rect x={x - 1} y={y + 3} width={3} height={3} fill="hsl(30, 15%, 45%)" />
      <rect x={x + w - 2} y={y + 2} width={3} height={4} fill="hsl(30, 15%, 45%)" />
      <rect x={x + 4} y={y + h - 2} width={4} height={3} fill="hsl(30, 18%, 42%)" />
      <rect x={x + w - 8} y={y + h - 1} width={4} height={2} fill="hsl(30, 18%, 42%)" />
      {/* Moon reflection at night */}
      {moonReflect > 0 && (
        <motion.rect x={x + 14} y={y + 3} width={6} height={3} fill="hsl(50, 30%, 80%)"
          opacity={moonReflect * 0.4}
          animate={{ opacity: [moonReflect * 0.2, moonReflect * 0.5, moonReflect * 0.2] }}
          transition={{ duration: 3, repeat: Infinity }} />
      )}
    </g>
  );
};

// ===== GLOWING FLOWER (night) =====
const GlowingFlower = ({ x, y, color, glowColor, isNight }: { x: number; y: number; color: string; glowColor: string; isNight: boolean }) => (
  <g>
    <rect x={x} y={y} width={2} height={4} fill={isNight ? "hsl(130, 30%, 25%)" : "hsl(130, 45%, 35%)"} />
    <rect x={x - 1} y={y - 2} width={4} height={3} fill={color} />
    <rect x={x} y={y - 3} width={2} height={2} fill={isNight ? glowColor : "hsl(50, 80%, 65%)"} />
    {isNight && (
      <motion.rect x={x - 2} y={y - 4} width={6} height={6} fill={glowColor} opacity={0.2}
        animate={{ opacity: [0.1, 0.35, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, delay: x * 0.05 }} />
    )}
  </g>
);

// ===== REGULAR GROUND FLOWER =====
const GroundFlower = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <g>
    <rect x={x} y={y} width={2} height={4} fill="hsl(130, 45%, 35%)" />
    <rect x={x - 1} y={y - 2} width={4} height={3} fill={color} />
    <rect x={x} y={y - 3} width={2} height={2} fill="hsl(50, 80%, 65%)" />
  </g>
);

// Swaying tall grass
const TallGrass = ({ x, y, delay, isNight }: { x: number; y: number; delay: number; isNight: boolean }) => (
  <motion.g
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ transformOrigin: `${x + 1}px ${y + 10}px` }}
  >
    <rect x={x} y={y} width={2} height={10} fill={isNight ? "hsl(120, 30%, 22%)" : "hsl(120, 50%, 40%)"} />
    <rect x={x - 1} y={y - 2} width={2} height={4} fill={isNight ? "hsl(120, 35%, 26%)" : "hsl(120, 55%, 45%)"} />
    <rect x={x + 2} y={y + 2} width={2} height={6} fill={isNight ? "hsl(115, 28%, 20%)" : "hsl(115, 45%, 38%)"} />
  </motion.g>
);

// Sun rays (day only)
const SunRays = ({ dayProgress }: { dayProgress: number }) => {
  if (dayProgress < 0.5) return null;
  const rayOpacity = (dayProgress - 0.5) * 2 * 0.12;
  return (
    <g>
      <motion.rect x={130} y={0} width={30} height={80} fill="hsl(50, 80%, 80%)" opacity={rayOpacity}
        animate={{ opacity: [rayOpacity * 0.5, rayOpacity, rayOpacity * 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        transform="rotate(25, 145, 0)" />
      <motion.rect x={110} y={0} width={20} height={70} fill="hsl(50, 80%, 80%)" opacity={rayOpacity * 0.7}
        animate={{ opacity: [rayOpacity * 0.3, rayOpacity * 0.8, rayOpacity * 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        transform="rotate(20, 120, 0)" />
    </g>
  );
};

// Sparkle
const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay }}>
    <rect x={x} y={y} width={2} height={2} fill="hsl(50, 95%, 85%)" />
  </motion.g>
);

// Firefly (enhanced at night)
const Firefly = ({ x, y, delay, isNight }: { x: number; y: number; delay: number; isNight: boolean }) => (
  <motion.g
    animate={{ x: [0, 8, -6, 10, 0], y: [0, -8, -4, -10, 0] }}
    transition={{ duration: 7, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <motion.rect x={x} y={y} width={2} height={2} fill={isNight ? "hsl(60, 100%, 70%)" : "hsl(55, 100%, 75%)"}
      animate={{ opacity: [0.1, isNight ? 1 : 0.5, 0.1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay }} />
    {isNight && (
      <motion.rect x={x - 1} y={y - 1} width={4} height={4} fill="hsl(60, 100%, 70%)" opacity={0.15}
        animate={{ opacity: [0.05, 0.25, 0.05] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }} />
    )}
  </motion.g>
);

// Tree with night variant + owl hole
const Tree = ({ x, flip, isNight }: { x: number; flip?: boolean; isNight: boolean }) => {
  const trunk = isNight ? "hsl(25, 30%, 18%)" : "hsl(25, 40%, 28%)";
  const trunkLight = isNight ? "hsl(25, 25%, 22%)" : "hsl(25, 35%, 32%)";
  const canopy1 = isNight ? "hsl(130, 30%, 16%)" : "hsl(130, 45%, 30%)";
  const canopy2 = isNight ? "hsl(130, 35%, 20%)" : "hsl(130, 50%, 35%)";
  const canopy3 = isNight ? "hsl(120, 38%, 22%)" : "hsl(120, 55%, 38%)";
  const canopy4 = isNight ? "hsl(115, 35%, 25%)" : "hsl(115, 50%, 42%)";
  const highlight = isNight ? "hsl(120, 30%, 28%)" : "hsl(120, 55%, 42%)";
  const sunspot = isNight ? "hsl(100, 25%, 30%)" : "hsl(100, 50%, 55%)";

  return (
    <g transform={flip ? `translate(${x * 2}, 0) scale(-1, 1)` : undefined}>
      <rect x={x + 8} y={60} width={10} height={50} fill={trunk} />
      <rect x={x + 10} y={65} width={4} height={40} fill={trunkLight} />
      <rect x={x + 4} y={105} width={6} height={4} fill={isNight ? "hsl(25, 28%, 15%)" : "hsl(25, 40%, 25%)"} />
      <rect x={x + 16} y={107} width={6} height={3} fill={isNight ? "hsl(25, 28%, 15%)" : "hsl(25, 40%, 25%)"} />
      <rect x={x + 2} y={70} width={8} height={4} fill={isNight ? "hsl(25, 28%, 20%)" : "hsl(25, 38%, 30%)"} />
      <rect x={x + 16} y={65} width={8} height={3} fill={isNight ? "hsl(25, 28%, 20%)" : "hsl(25, 38%, 30%)"} />
      {/* Owl hole in trunk */}
      <rect x={x + 11} y={72} width={4} height={5} fill="hsl(25, 20%, 15%)" />
      <rect x={x + 12} y={71} width={2} height={1} fill="hsl(25, 20%, 15%)" />
      {/* Canopy */}
      <rect x={x - 4} y={40} width={34} height={25} fill={canopy1} />
      <rect x={x - 2} y={35} width={30} height={10} fill={canopy2} />
      <rect x={x + 2} y={30} width={22} height={8} fill={canopy3} />
      <rect x={x + 6} y={26} width={14} height={6} fill={canopy4} />
      <rect x={x} y={38} width={6} height={4} fill={highlight} />
      <rect x={x + 14} y={42} width={8} height={4} fill={highlight} />
      <rect x={x + 8} y={32} width={6} height={3} fill={isNight ? "hsl(110, 30%, 28%)" : "hsl(110, 50%, 48%)"} />
      <rect x={x + 4} y={34} width={3} height={2} fill={sunspot} />
      <rect x={x + 18} y={40} width={2} height={2} fill={sunspot} />
    </g>
  );
};

// ===== PLANT TEMPLATES =====
// All plants: max height y=45, base at y=108, width stays within ox+30 to ox+66 (36px wide max)
// cx=96, ox=cx-48=48, so plants span x=78 to x=114 on the 192-wide viewBox

// 1. Rose bush - compact pink roses
const RoseBush = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="rose">
      {/* Soil */}
      {s >= 1 && R(ox - 4, 108, 44, 4, "hsl(30, 40%, 28%)")}
      {/* Main stem */}
      {s >= 1 && R(ox + 17, 100, 3, 8, "hsl(130, 45%, 32%)")}
      {s >= 2 && R(ox + 17, 92, 3, 8, "hsl(130, 48%, 35%)")}
      {s >= 3 && R(ox + 17, 84, 3, 8, "hsl(130, 50%, 36%)")}
      {/* Leaves */}
      {s >= 3 && <>{R(ox + 10, 94, 7, 3, "hsl(130, 55%, 40%)")}{R(ox + 20, 88, 7, 3, "hsl(130, 55%, 40%)")}</>}
      {s >= 4 && R(ox + 17, 76, 3, 8, "hsl(130, 52%, 37%)")}
      {s >= 4 && <>{R(ox + 8, 82, 9, 3, "hsl(140, 55%, 42%)")}{R(ox + 20, 78, 9, 3, "hsl(140, 55%, 42%)")}</>}
      {/* Side stems */}
      {s >= 5 && <>{R(ox + 12, 78, 3, 3, "hsl(130, 48%, 34%)")}{R(ox + 22, 74, 3, 3, "hsl(130, 48%, 34%)")}</>}
      {/* Small buds */}
      {s >= 6 && <>{R(ox + 6, 76, 6, 5, "hsl(340, 60%, 50%)")}{R(ox + 7, 74, 4, 3, "hsl(340, 55%, 55%)")}</>}
      {s >= 6 && <>{R(ox + 25, 72, 6, 5, "hsl(340, 60%, 50%)")}{R(ox + 26, 70, 4, 3, "hsl(340, 55%, 55%)")}</>}
      {/* Main bloom */}
      {s >= 7 && <>{R(ox + 13, 66, 12, 10, "hsl(350, 65%, 55%)")}{R(ox + 15, 63, 8, 5, "hsl(350, 60%, 60%)")}</>}
      {/* Side blooms grow */}
      {s >= 8 && <>{R(ox + 2, 70, 10, 8, "hsl(345, 65%, 55%)")}{R(ox + 4, 68, 6, 3, "hsl(345, 60%, 60%)")}</>}
      {s >= 8 && <>{R(ox + 25, 66, 10, 8, "hsl(345, 65%, 55%)")}{R(ox + 27, 64, 6, 3, "hsl(345, 60%, 60%)")}</>}
      {/* Crown */}
      {s >= 9 && <>{R(ox + 11, 58, 16, 8, "hsl(350, 70%, 58%)")}{R(ox + 14, 55, 10, 4, "hsl(350, 65%, 63%)")}</>}
      {/* Extra petals */}
      {s >= 10 && <>{R(ox, 66, 6, 5, "hsl(345, 60%, 52%)")}{R(ox + 31, 62, 6, 5, "hsl(345, 60%, 52%)")}</>}
      {/* Top bloom */}
      {s >= 11 && <>{R(ox + 13, 50, 12, 6, "hsl(355, 75%, 62%)")}{R(ox + 15, 47, 8, 4, "hsl(0, 70%, 68%)")}</>}
      {/* Golden center */}
      {s >= 12 && <>{R(ox + 16, 60, 5, 4, "hsl(45, 90%, 65%)")}{R(ox + 16, 47, 5, 3, "hsl(50, 95%, 75%)")}</>}
    </g>
  );
};

// 2. Crystal mushroom - purple crystals growing from a stump
const CrystalMushroom = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="crystal">
      {/* Stump base */}
      {s >= 1 && <>{R(ox + 10, 104, 16, 6, "hsl(25, 35%, 30%)")}{R(ox + 12, 102, 12, 3, "hsl(25, 30%, 35%)")}</>}
      {/* Main crystal stem */}
      {s >= 1 && R(ox + 16, 96, 4, 8, "hsl(270, 30%, 35%)")}
      {s >= 2 && R(ox + 16, 88, 4, 8, "hsl(270, 35%, 38%)")}
      {s >= 3 && R(ox + 16, 82, 4, 6, "hsl(270, 35%, 40%)")}
      {/* Small side crystals */}
      {s >= 4 && <>{R(ox + 8, 92, 3, 6, "hsl(280, 45%, 50%)")}{R(ox + 24, 90, 3, 6, "hsl(280, 45%, 50%)")}</>}
      {s >= 5 && <>{R(ox + 5, 88, 3, 5, "hsl(290, 50%, 55%)")}{R(ox + 27, 86, 3, 5, "hsl(290, 50%, 55%)")}</>}
      {/* Crystal caps */}
      {s >= 6 && <>{R(ox + 12, 76, 12, 8, "hsl(270, 55%, 55%)")}{R(ox + 14, 73, 8, 4, "hsl(270, 60%, 60%)")}</>}
      {s >= 7 && <>{R(ox + 4, 82, 8, 6, "hsl(280, 55%, 58%)")}{R(ox + 24, 80, 8, 6, "hsl(280, 55%, 58%)")}</>}
      {/* Larger formations */}
      {s >= 8 && <>{R(ox + 2, 78, 6, 5, "hsl(290, 60%, 62%)")}{R(ox + 28, 76, 6, 5, "hsl(290, 60%, 62%)")}</>}
      {s >= 9 && <>{R(ox + 10, 68, 16, 8, "hsl(275, 65%, 60%)")}{R(ox + 13, 64, 10, 5, "hsl(275, 70%, 65%)")}</>}
      {/* Top crystal point */}
      {s >= 10 && <>{R(ox + 14, 58, 8, 6, "hsl(270, 75%, 68%)")}{R(ox + 16, 54, 4, 4, "hsl(270, 78%, 72%)")}</>}
      {s >= 11 && <>{R(ox, 74, 4, 4, "hsl(280, 70%, 65%)")}{R(ox + 32, 72, 4, 4, "hsl(280, 70%, 65%)")}</>}
      {/* Sparkle tips */}
      {s >= 12 && <>{R(ox + 17, 52, 2, 2, "hsl(50, 90%, 85%)")}{R(ox + 2, 72, 2, 2, "hsl(50, 90%, 80%)")}{R(ox + 33, 70, 2, 2, "hsl(50, 90%, 80%)")}</>}
    </g>
  );
};

// 3. Sunflower - warm yellow/orange
const Sunflower = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="sunflower">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {s >= 1 && R(ox + 17, 100, 3, 8, "hsl(130, 50%, 30%)")}
      {s >= 2 && R(ox + 17, 92, 3, 8, "hsl(130, 52%, 32%)")}
      {s >= 3 && R(ox + 17, 84, 3, 8, "hsl(130, 55%, 34%)")}
      {/* Thick leaves */}
      {s >= 3 && <>{R(ox + 8, 96, 9, 3, "hsl(130, 55%, 40%)")}{R(ox + 20, 90, 9, 3, "hsl(130, 55%, 40%)")}</>}
      {s >= 4 && <>{R(ox + 6, 86, 11, 3, "hsl(130, 50%, 38%)")}{R(ox + 20, 82, 11, 3, "hsl(130, 50%, 38%)")}</>}
      {s >= 5 && R(ox + 17, 76, 3, 8, "hsl(130, 55%, 34%)")}
      {/* Bud forming */}
      {s >= 6 && <>{R(ox + 12, 72, 12, 6, "hsl(45, 70%, 45%)")}{R(ox + 14, 70, 8, 3, "hsl(45, 65%, 50%)")}</>}
      {/* Petals opening */}
      {s >= 7 && <>{R(ox + 8, 68, 20, 10, "hsl(45, 85%, 55%)")}{R(ox + 10, 66, 16, 4, "hsl(50, 90%, 60%)")}</>}
      {s >= 8 && <>{R(ox + 6, 66, 4, 6, "hsl(40, 80%, 50%)")}{R(ox + 26, 66, 4, 6, "hsl(40, 80%, 50%)")}</>}
      {/* Brown center */}
      {s >= 8 && R(ox + 14, 70, 8, 6, "hsl(30, 50%, 30%)")}
      {/* Full petals */}
      {s >= 9 && <>{R(ox + 6, 62, 24, 12, "hsl(48, 90%, 58%)")}{R(ox + 10, 58, 16, 5, "hsl(50, 92%, 62%)")}</>}
      {s >= 9 && R(ox + 13, 66, 10, 8, "hsl(30, 55%, 32%)")}
      {/* Second smaller flower */}
      {s >= 10 && <>{R(ox + 2, 80, 10, 8, "hsl(45, 85%, 55%)")}{R(ox + 4, 78, 6, 3, "hsl(50, 88%, 60%)")}{R(ox + 4, 82, 6, 4, "hsl(30, 50%, 32%)")}</>}
      {/* Top petals */}
      {s >= 11 && <>{R(ox + 4, 60, 4, 4, "hsl(42, 85%, 52%)")}{R(ox + 28, 60, 4, 4, "hsl(42, 85%, 52%)")}{R(ox + 14, 55, 8, 4, "hsl(50, 95%, 65%)")}</>}
      {/* Seeds detail */}
      {s >= 12 && <>{R(ox + 15, 68, 2, 2, "hsl(35, 45%, 25%)")}{R(ox + 19, 70, 2, 2, "hsl(35, 45%, 25%)")}{R(ox + 17, 66, 2, 2, "hsl(35, 45%, 25%)")}</>}
    </g>
  );
};

// 4. Blue bell flowers - delicate hanging bells
const BlueBell = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="bluebell">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {s >= 1 && R(ox + 17, 100, 2, 8, "hsl(130, 45%, 34%)")}
      {s >= 2 && R(ox + 17, 94, 2, 6, "hsl(130, 48%, 36%)")}
      {/* Thin side stems */}
      {s >= 3 && <>{R(ox + 12, 96, 2, 6, "hsl(130, 45%, 34%)")}{R(ox + 22, 94, 2, 6, "hsl(130, 45%, 34%)")}</>}
      {s >= 4 && <>{R(ox + 8, 92, 2, 5, "hsl(130, 42%, 32%)")}{R(ox + 26, 90, 2, 5, "hsl(130, 42%, 32%)")}</>}
      {/* First bells */}
      {s >= 5 && <>{R(ox + 10, 90, 5, 4, "hsl(220, 55%, 55%)")}{R(ox + 11, 94, 3, 2, "hsl(220, 50%, 50%)")}</>}
      {s >= 5 && <>{R(ox + 21, 88, 5, 4, "hsl(220, 55%, 55%)")}{R(ox + 22, 92, 3, 2, "hsl(220, 50%, 50%)")}</>}
      {/* More bells */}
      {s >= 6 && <>{R(ox + 6, 86, 5, 4, "hsl(225, 58%, 58%)")}{R(ox + 7, 90, 3, 2, "hsl(225, 52%, 52%)")}</>}
      {s >= 6 && <>{R(ox + 25, 84, 5, 4, "hsl(225, 58%, 58%)")}{R(ox + 26, 88, 3, 2, "hsl(225, 52%, 52%)")}</>}
      {/* Taller center */}
      {s >= 7 && R(ox + 17, 86, 2, 8, "hsl(130, 50%, 36%)")}
      {s >= 7 && <>{R(ox + 14, 82, 6, 5, "hsl(215, 60%, 55%)")}{R(ox + 15, 87, 4, 2, "hsl(215, 55%, 50%)")}</>}
      {/* More blooms up */}
      {s >= 8 && <>{R(ox + 4, 82, 5, 4, "hsl(230, 55%, 60%)")}{R(ox + 27, 80, 5, 4, "hsl(230, 55%, 60%)")}</>}
      {s >= 9 && <>{R(ox + 12, 76, 6, 5, "hsl(220, 62%, 58%)")}{R(ox + 19, 74, 6, 5, "hsl(220, 62%, 58%)")}</>}
      {/* Curving top stems */}
      {s >= 10 && <>{R(ox + 15, 72, 2, 4, "hsl(130, 48%, 36%)")}{R(ox + 20, 70, 2, 4, "hsl(130, 48%, 36%)")}</>}
      {s >= 10 && <>{R(ox + 13, 68, 5, 4, "hsl(218, 65%, 60%)")}{R(ox + 20, 66, 5, 4, "hsl(218, 65%, 60%)")}</>}
      {/* Top flowers */}
      {s >= 11 && <>{R(ox + 10, 64, 6, 5, "hsl(225, 68%, 62%)")}{R(ox + 22, 62, 6, 5, "hsl(225, 68%, 62%)")}</>}
      {/* Highlights */}
      {s >= 12 && <>{R(ox + 12, 66, 2, 2, "hsl(210, 70%, 75%)")}{R(ox + 24, 64, 2, 2, "hsl(210, 70%, 75%)")}{R(ox + 16, 70, 2, 2, "hsl(210, 70%, 75%)")}</>}
    </g>
  );
};

// 5. Fire cactus flower - desert-style with warm bloom
const FireCactus = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="fire">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {/* Cactus body */}
      {s >= 1 && R(ox + 14, 96, 8, 12, "hsl(142, 40%, 30%)")}
      {s >= 2 && R(ox + 14, 88, 8, 8, "hsl(142, 42%, 32%)")}
      {s >= 2 && R(ox + 16, 90, 4, 14, "hsl(142, 45%, 35%)")}
      {/* Arms */}
      {s >= 3 && <>{R(ox + 8, 92, 6, 4, "hsl(142, 38%, 30%)")}{R(ox + 8, 86, 4, 6, "hsl(142, 40%, 32%)")}</>}
      {s >= 4 && <>{R(ox + 22, 88, 6, 4, "hsl(142, 38%, 30%)")}{R(ox + 24, 82, 4, 6, "hsl(142, 40%, 32%)")}</>}
      {/* Spines */}
      {s >= 5 && <>{R(ox + 13, 94, 1, 2, "hsl(50, 40%, 50%)")}{R(ox + 22, 90, 1, 2, "hsl(50, 40%, 50%)")}{R(ox + 7, 88, 1, 2, "hsl(50, 40%, 50%)")}{R(ox + 28, 84, 1, 2, "hsl(50, 40%, 50%)")}</>}
      {/* Bud */}
      {s >= 6 && <>{R(ox + 14, 82, 8, 6, "hsl(25, 70%, 45%)")}{R(ox + 16, 80, 4, 3, "hsl(30, 65%, 50%)")}</>}
      {/* Flower opening */}
      {s >= 7 && <>{R(ox + 10, 76, 16, 8, "hsl(15, 80%, 50%)")}{R(ox + 12, 74, 12, 4, "hsl(25, 85%, 55%)")}</>}
      {s >= 8 && <>{R(ox + 8, 74, 4, 6, "hsl(10, 75%, 48%)")}{R(ox + 24, 74, 4, 6, "hsl(10, 75%, 48%)")}</>}
      {/* Bright center */}
      {s >= 9 && <>{R(ox + 14, 76, 8, 4, "hsl(45, 95%, 60%)")}</>}
      {/* Second arm flower */}
      {s >= 10 && <>{R(ox + 4, 78, 8, 6, "hsl(20, 80%, 52%)")}{R(ox + 6, 76, 4, 3, "hsl(30, 85%, 56%)")}</>}
      {s >= 10 && <>{R(ox + 24, 74, 8, 6, "hsl(20, 80%, 52%)")}{R(ox + 26, 72, 4, 3, "hsl(30, 85%, 56%)")}</>}
      {/* Top flame petals */}
      {s >= 11 && <>{R(ox + 12, 68, 12, 6, "hsl(40, 92%, 58%)")}{R(ox + 14, 64, 8, 5, "hsl(48, 95%, 62%)")}</>}
      {/* Glow */}
      {s >= 12 && <>{R(ox + 16, 62, 4, 3, "hsl(55, 100%, 72%)")}{R(ox + 6, 74, 2, 2, "hsl(45, 90%, 65%)")}{R(ox + 28, 70, 2, 2, "hsl(45, 90%, 65%)")}</>}
    </g>
  );
};

// 6. Orchid - elegant purple/pink with arching stems
const Orchid = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="orchid">
      {s >= 1 && R(ox + 10, 108, 16, 4, "hsl(30, 40%, 28%)")}
      {s >= 1 && R(ox + 17, 100, 2, 8, "hsl(130, 40%, 32%)")}
      {s >= 2 && R(ox + 17, 92, 2, 8, "hsl(130, 42%, 34%)")}
      {/* Thick leaves at base */}
      {s >= 2 && <>{R(ox + 10, 100, 6, 4, "hsl(130, 50%, 35%)")}{R(ox + 20, 98, 6, 4, "hsl(130, 50%, 35%)")}</>}
      {s >= 3 && <>{R(ox + 8, 96, 8, 5, "hsl(130, 55%, 38%)")}{R(ox + 20, 94, 8, 5, "hsl(130, 55%, 38%)")}</>}
      {/* Arching stem */}
      {s >= 4 && <>{R(ox + 17, 86, 2, 6, "hsl(130, 45%, 34%)")}{R(ox + 15, 84, 2, 3, "hsl(130, 45%, 34%)")}</>}
      {s >= 5 && <>{R(ox + 13, 80, 2, 4, "hsl(130, 45%, 34%)")}{R(ox + 14, 78, 2, 3, "hsl(130, 45%, 34%)")}</>}
      {/* First orchid bloom */}
      {s >= 6 && <>{R(ox + 10, 74, 8, 6, "hsl(300, 50%, 60%)")}{R(ox + 12, 72, 4, 3, "hsl(300, 55%, 65%)")}</>}
      {s >= 7 && <>{R(ox + 8, 72, 3, 4, "hsl(310, 55%, 62%)")}{R(ox + 18, 72, 3, 4, "hsl(310, 55%, 62%)")}</>}
      {/* Second stem curves right */}
      {s >= 7 && <>{R(ox + 19, 84, 2, 4, "hsl(130, 45%, 34%)")}{R(ox + 21, 80, 2, 4, "hsl(130, 45%, 34%)")}</>}
      {/* Second bloom */}
      {s >= 8 && <>{R(ox + 18, 74, 8, 6, "hsl(295, 52%, 58%)")}{R(ox + 20, 72, 4, 3, "hsl(295, 58%, 64%)")}</>}
      {/* More blooms */}
      {s >= 9 && <>{R(ox + 6, 68, 8, 6, "hsl(305, 55%, 62%)")}{R(ox + 8, 66, 4, 3, "hsl(305, 60%, 68%)")}</>}
      {s >= 10 && <>{R(ox + 22, 66, 8, 6, "hsl(298, 55%, 60%)")}{R(ox + 24, 64, 4, 3, "hsl(298, 60%, 66%)")}</>}
      {/* Top bloom */}
      {s >= 11 && <>{R(ox + 12, 62, 12, 8, "hsl(302, 60%, 64%)")}{R(ox + 14, 60, 8, 4, "hsl(302, 65%, 70%)")}</>}
      {/* Center dots */}
      {s >= 12 && <>{R(ox + 16, 64, 4, 3, "hsl(50, 80%, 65%)")}{R(ox + 12, 70, 2, 2, "hsl(50, 80%, 65%)")}{R(ox + 22, 68, 2, 2, "hsl(50, 80%, 65%)")}</>}
    </g>
  );
};

// 7. Bamboo grove - tall thin green stalks with leaves
const BambooGrove = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="bamboo">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {/* Center stalk */}
      {s >= 1 && R(ox + 17, 96, 3, 12, "hsl(120, 45%, 38%)")}
      {s >= 1 && R(ox + 16, 98, 5, 2, "hsl(120, 40%, 32%)")}
      {s >= 2 && R(ox + 17, 86, 3, 10, "hsl(120, 48%, 40%)")}
      {s >= 2 && R(ox + 16, 88, 5, 2, "hsl(120, 42%, 34%)")}
      {/* Left stalk */}
      {s >= 3 && <>{R(ox + 10, 98, 3, 10, "hsl(125, 42%, 36%)")}{R(ox + 9, 100, 5, 2, "hsl(125, 38%, 30%)")}</>}
      {s >= 4 && <>{R(ox + 10, 88, 3, 10, "hsl(125, 45%, 38%)")}{R(ox + 9, 90, 5, 2, "hsl(125, 40%, 32%)")}</>}
      {/* Right stalk */}
      {s >= 4 && <>{R(ox + 23, 96, 3, 12, "hsl(118, 42%, 36%)")}{R(ox + 22, 98, 5, 2, "hsl(118, 38%, 30%)")}</>}
      {s >= 5 && <>{R(ox + 23, 86, 3, 10, "hsl(118, 45%, 38%)")}{R(ox + 22, 88, 5, 2, "hsl(118, 40%, 32%)")}</>}
      {/* Leaves */}
      {s >= 5 && <>{R(ox + 20, 86, 6, 2, "hsl(115, 55%, 42%)")}{R(ox + 6, 94, 6, 2, "hsl(115, 55%, 42%)")}</>}
      {s >= 6 && <>{R(ox + 12, 84, 6, 2, "hsl(120, 58%, 44%)")}{R(ox + 25, 82, 6, 2, "hsl(120, 58%, 44%)")}</>}
      {/* Taller */}
      {s >= 7 && <>{R(ox + 17, 78, 3, 8, "hsl(120, 50%, 42%)")}{R(ox + 16, 80, 5, 2, "hsl(120, 44%, 36%)")}</>}
      {s >= 8 && <>{R(ox + 10, 80, 3, 8, "hsl(125, 47%, 40%)")}{R(ox + 23, 78, 3, 8, "hsl(118, 47%, 40%)")}</>}
      {/* More leaves */}
      {s >= 8 && <>{R(ox + 4, 82, 6, 2, "hsl(115, 55%, 42%)")}{R(ox + 26, 78, 7, 2, "hsl(115, 55%, 42%)")}</>}
      {s >= 9 && <>{R(ox + 20, 76, 6, 2, "hsl(110, 60%, 46%)")}{R(ox + 7, 80, 5, 2, "hsl(110, 60%, 46%)")}</>}
      {/* Top sections */}
      {s >= 10 && <>{R(ox + 17, 70, 3, 8, "hsl(120, 52%, 44%)")}{R(ox + 16, 72, 5, 2, "hsl(120, 46%, 38%)")}</>}
      {s >= 11 && <>{R(ox + 14, 68, 8, 3, "hsl(115, 58%, 46%)")}{R(ox + 22, 70, 6, 2, "hsl(115, 58%, 46%)")}</>}
      {/* Leaf cluster top */}
      {s >= 12 && <>{R(ox + 10, 66, 6, 2, "hsl(110, 62%, 50%)")}{R(ox + 20, 64, 6, 2, "hsl(110, 62%, 50%)")}{R(ox + 14, 64, 8, 2, "hsl(108, 60%, 52%)")}</>}
    </g>
  );
};

// 8. Lotus - water-inspired with layered petals
const Lotus = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="lotus">
      {s >= 1 && <>{R(ox + 6, 108, 24, 4, "hsl(30, 40%, 28%)")}{R(ox + 8, 106, 20, 3, "hsl(200, 30%, 40%)")}</>}
      {/* Pad base */}
      {s >= 1 && R(ox + 8, 102, 20, 4, "hsl(130, 45%, 35%)")}
      {s >= 2 && R(ox + 6, 100, 24, 3, "hsl(130, 50%, 38%)")}
      {/* Center stem */}
      {s >= 2 && R(ox + 17, 94, 2, 6, "hsl(130, 45%, 32%)")}
      {s >= 3 && R(ox + 17, 88, 2, 6, "hsl(130, 48%, 34%)")}
      {/* First petal layer */}
      {s >= 4 && <>{R(ox + 12, 88, 12, 6, "hsl(340, 45%, 72%)")}{R(ox + 14, 86, 8, 3, "hsl(340, 50%, 76%)")}</>}
      {/* Side petals */}
      {s >= 5 && <>{R(ox + 8, 86, 6, 5, "hsl(335, 48%, 70%)")}{R(ox + 22, 86, 6, 5, "hsl(335, 48%, 70%)")}</>}
      {/* Second layer */}
      {s >= 6 && <>{R(ox + 10, 82, 16, 6, "hsl(338, 52%, 68%)")}{R(ox + 12, 80, 12, 3, "hsl(338, 55%, 72%)")}</>}
      {s >= 7 && <>{R(ox + 6, 80, 6, 5, "hsl(330, 50%, 66%)")}{R(ox + 24, 80, 6, 5, "hsl(330, 50%, 66%)")}</>}
      {/* Inner petals */}
      {s >= 8 && <>{R(ox + 12, 76, 12, 5, "hsl(342, 55%, 74%)")}{R(ox + 14, 74, 8, 3, "hsl(342, 60%, 78%)")}</>}
      {/* Outer petals wider */}
      {s >= 9 && <>{R(ox + 4, 78, 6, 4, "hsl(332, 48%, 64%)")}{R(ox + 26, 78, 6, 4, "hsl(332, 48%, 64%)")}</>}
      {/* Top center */}
      {s >= 10 && <>{R(ox + 14, 70, 8, 5, "hsl(345, 58%, 76%)")}{R(ox + 16, 68, 4, 3, "hsl(345, 62%, 80%)")}</>}
      {/* Stamen */}
      {s >= 11 && <>{R(ox + 16, 66, 4, 3, "hsl(50, 80%, 65%)")}{R(ox + 14, 64, 8, 3, "hsl(50, 85%, 70%)")}</>}
      {/* Glow */}
      {s >= 12 && <>{R(ox + 17, 62, 2, 2, "hsl(50, 95%, 80%)")}{R(ox + 6, 76, 2, 2, "hsl(340, 50%, 80%)")}{R(ox + 28, 76, 2, 2, "hsl(340, 50%, 80%)")}</>}
    </g>
  );
};

// 9. Mushroom cluster - cute spotted mushrooms
const MushroomCluster = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="mushroom">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {/* First small mushroom stem */}
      {s >= 1 && R(ox + 16, 100, 4, 8, "hsl(40, 25%, 75%)")}
      {s >= 2 && <>{R(ox + 12, 96, 12, 6, "hsl(0, 65%, 50%)")}{R(ox + 14, 94, 8, 3, "hsl(0, 60%, 55%)")}</>}
      {/* Spots */}
      {s >= 2 && <>{R(ox + 14, 95, 2, 2, "white")}{R(ox + 19, 96, 2, 2, "white")}</>}
      {/* Second mushroom - smaller */}
      {s >= 3 && <>{R(ox + 24, 102, 3, 6, "hsl(40, 25%, 72%)")}</>}
      {s >= 4 && <>{R(ox + 21, 98, 9, 5, "hsl(25, 60%, 50%)")}{R(ox + 23, 96, 5, 3, "hsl(25, 55%, 55%)")}</>}
      {s >= 4 && R(ox + 24, 97, 2, 2, "hsl(40, 30%, 80%)")}
      {/* Third mushroom left */}
      {s >= 5 && R(ox + 8, 104, 3, 4, "hsl(40, 25%, 70%)")}
      {s >= 6 && <>{R(ox + 5, 100, 9, 5, "hsl(35, 55%, 52%)")}{R(ox + 7, 98, 5, 3, "hsl(35, 50%, 56%)")}</>}
      {s >= 6 && R(ox + 8, 99, 2, 2, "hsl(40, 30%, 80%)")}
      {/* Tall center mushroom */}
      {s >= 7 && R(ox + 16, 88, 4, 8, "hsl(40, 28%, 72%)")}
      {s >= 8 && <>{R(ox + 10, 82, 16, 8, "hsl(350, 60%, 52%)")}{R(ox + 12, 80, 12, 4, "hsl(350, 55%, 57%)")}</>}
      {s >= 8 && <>{R(ox + 13, 81, 2, 2, "white")}{R(ox + 18, 83, 3, 2, "white")}{R(ox + 22, 81, 2, 2, "white")}</>}
      {/* Tiny mushrooms around */}
      {s >= 9 && <>{R(ox + 4, 106, 2, 3, "hsl(40, 25%, 68%)")}{R(ox + 2, 104, 6, 3, "hsl(15, 50%, 48%)")}</>}
      {s >= 10 && <>{R(ox + 30, 104, 2, 4, "hsl(40, 25%, 70%)")}{R(ox + 28, 102, 6, 3, "hsl(45, 55%, 50%)")}</>}
      {/* Fairy ring glow */}
      {s >= 11 && <>{R(ox + 14, 76, 8, 4, "hsl(355, 65%, 55%)")}{R(ox + 16, 74, 4, 3, "hsl(355, 60%, 60%)")}{R(ox + 17, 75, 2, 2, "white")}</>}
      {s >= 12 && <>{R(ox + 4, 102, 2, 2, "hsl(50, 90%, 75%)")}{R(ox + 30, 100, 2, 2, "hsl(50, 90%, 75%)")}{R(ox + 17, 72, 2, 2, "hsl(50, 95%, 85%)")}</>}
    </g>
  );
};

// 10. Wisteria - cascading purple vine
const Wisteria = (s: number, cx: number) => {
  const ox = cx - 18;
  return (
    <g key="wisteria">
      {s >= 1 && R(ox + 8, 108, 20, 4, "hsl(30, 40%, 28%)")}
      {/* Woody trunk */}
      {s >= 1 && R(ox + 16, 98, 4, 10, "hsl(25, 35%, 30%)")}
      {s >= 2 && R(ox + 16, 90, 4, 8, "hsl(25, 38%, 32%)")}
      {s >= 3 && R(ox + 16, 82, 4, 8, "hsl(25, 38%, 34%)")}
      {/* Branches spread */}
      {s >= 3 && <>{R(ox + 10, 86, 6, 3, "hsl(25, 35%, 30%)")}{R(ox + 20, 84, 6, 3, "hsl(25, 35%, 30%)")}</>}
      {s >= 4 && <>{R(ox + 6, 82, 6, 3, "hsl(25, 32%, 28%)")}{R(ox + 24, 80, 6, 3, "hsl(25, 32%, 28%)")}</>}
      {/* Leaves */}
      {s >= 4 && <>{R(ox + 8, 78, 8, 3, "hsl(130, 45%, 38%)")}{R(ox + 20, 76, 8, 3, "hsl(130, 45%, 38%)")}</>}
      {s >= 5 && <>{R(ox + 4, 76, 8, 3, "hsl(130, 48%, 40%)")}{R(ox + 24, 74, 8, 3, "hsl(130, 48%, 40%)")}</>}
      {/* Hanging flower clusters */}
      {s >= 6 && <>{R(ox + 8, 82, 4, 8, "hsl(270, 50%, 60%)")}{R(ox + 9, 90, 2, 4, "hsl(270, 45%, 55%)")}</>}
      {s >= 7 && <>{R(ox + 24, 80, 4, 8, "hsl(265, 52%, 62%)")}{R(ox + 25, 88, 2, 4, "hsl(265, 47%, 57%)")}</>}
      {s >= 8 && <>{R(ox + 4, 78, 4, 10, "hsl(275, 48%, 58%)")}{R(ox + 5, 88, 2, 4, "hsl(275, 43%, 53%)")}</>}
      {s >= 9 && <>{R(ox + 28, 76, 4, 10, "hsl(268, 50%, 60%)")}{R(ox + 29, 86, 2, 4, "hsl(268, 45%, 55%)")}</>}
      {/* Denser clusters */}
      {s >= 10 && <>{R(ox + 14, 76, 4, 10, "hsl(272, 55%, 64%)")}{R(ox + 15, 86, 2, 3, "hsl(272, 50%, 58%)")}</>}
      {s >= 10 && <>{R(ox + 18, 74, 4, 10, "hsl(260, 52%, 62%)")}{R(ox + 19, 84, 2, 3, "hsl(260, 47%, 56%)")}</>}
      {/* Top canopy */}
      {s >= 11 && <>{R(ox + 6, 72, 24, 5, "hsl(130, 50%, 38%)")}{R(ox + 10, 70, 16, 3, "hsl(125, 52%, 42%)")}</>}
      {/* Light tips */}
      {s >= 12 && <>{R(ox + 9, 92, 2, 2, "hsl(270, 60%, 75%)")}{R(ox + 25, 90, 2, 2, "hsl(270, 60%, 75%)")}{R(ox + 5, 90, 2, 2, "hsl(275, 58%, 72%)")}{R(ox + 29, 88, 2, 2, "hsl(268, 58%, 72%)")}</>}
    </g>
  );
};

const PLANT_TEMPLATES = [RoseBush, CrystalMushroom, Sunflower, BlueBell, FireCactus, Orchid, BambooGrove, Lotus, MushroomCluster, Wisteria];

const PlantDisplay: React.FC<PlantDisplayProps> = ({ completedCount, totalCount }) => {
  const dayProgress = useTimeOfDay();
  const isNight = dayProgress < 0.4;

  const plantIndex = useMemo(() => {
    const seed = totalCount * 7 + 3;
    return seed % PLANT_TEMPLATES.length;
  }, [totalCount]);

  const stage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 12);
  const renderPlant = PLANT_TEMPLATES[plantIndex];

  const vw = 192;
  const vh = 140;
  const cx = vw / 2;

  // Sky colors based on time
  const sky1 = isNight ? "hsl(230, 40%, 12%)" : dayProgress < 0.7 ? `hsl(200, 55%, ${60 + dayProgress * 30}%)` : "hsl(200, 55%, 82%)";
  const sky2 = isNight ? "hsl(230, 35%, 15%)" : dayProgress < 0.7 ? `hsl(195, 50%, ${65 + dayProgress * 25}%)` : "hsl(195, 50%, 85%)";
  const sky3 = isNight ? "hsl(225, 30%, 18%)" : dayProgress < 0.7 ? `hsl(190, 45%, ${70 + dayProgress * 22}%)` : "hsl(190, 45%, 88%)";
  
  const grassMain = isNight ? "hsl(120, 28%, 18%)" : "hsl(120, 40%, 38%)";
  const grassLight = isNight ? "hsl(110, 30%, 22%)" : "hsl(110, 45%, 45%)";
  const grassMid = isNight ? "hsl(115, 28%, 20%)" : "hsl(115, 42%, 42%)";
  const grassSpot = isNight ? "hsl(100, 30%, 25%)" : "hsl(100, 50%, 50%)";
  const dirt = isNight ? "hsl(30, 25%, 18%)" : "hsl(30, 35%, 30%)";
  const dirtLight = isNight ? "hsl(30, 20%, 22%)" : "hsl(30, 30%, 35%)";
  const bushDark = isNight ? "hsl(130, 28%, 16%)" : "hsl(130, 42%, 32%)";
  const bushLight = isNight ? "hsl(125, 30%, 20%)" : "hsl(125, 45%, 36%)";
  const stone = isNight ? "hsl(40, 12%, 35%)" : "hsl(40, 20%, 55%)";

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full h-auto block" style={{ imageRendering: "pixelated" }} preserveAspectRatio="xMidYMax meet">
        {/* Sky */}
        <rect x="0" y="0" width={vw} height="80" fill={sky1} />
        <rect x="0" y="15" width={vw} height="65" fill={sky2} />
        <rect x="0" y="40" width={vw} height="40" fill={sky3} />

        {/* Sun / Moon / Stars */}
        <PixelSun dayProgress={dayProgress} />
        <PixelMoon dayProgress={dayProgress} />
        <Star x={15} y={5} delay={0} dayProgress={dayProgress} />
        <Star x={50} y={12} delay={0.5} dayProgress={dayProgress} />
        <Star x={80} y={4} delay={1} dayProgress={dayProgress} />
        <Star x={110} y={10} delay={1.5} dayProgress={dayProgress} />
        <Star x={145} y={18} delay={0.8} dayProgress={dayProgress} />
        <Star x={170} y={6} delay={2} dayProgress={dayProgress} />
        <Star x={60} y={20} delay={1.2} dayProgress={dayProgress} />
        <Star x={130} y={3} delay={0.3} dayProgress={dayProgress} />
        <Star x={25} y={18} delay={1.8} dayProgress={dayProgress} />
        <Star x={95} y={8} delay={2.2} dayProgress={dayProgress} />

        {/* Sun rays (day) */}
        <SunRays dayProgress={dayProgress} />

        {/* Clouds (day only) */}
        {dayProgress > 0.3 && (
          <g opacity={dayProgress > 0.6 ? 0.7 : (dayProgress - 0.3) * 2.3}>
            <rect x="20" y="8" width="16" height="4" fill="white" opacity={0.7} />
            <rect x="18" y="10" width="20" height="4" fill="white" opacity={0.6} />
            <rect x="120" y="14" width="12" height="3" fill="white" opacity={0.5} />
            <rect x="118" y="16" width="16" height="3" fill="white" opacity={0.4} />
            <rect x="155" y="22" width="14" height="4" fill="white" opacity={0.5} />
            <rect x="153" y="25" width="18" height="3" fill="white" opacity={0.4} />
          </g>
        )}

        {/* Trees on sides */}
        <Tree x={-6} isNight={isNight} />
        <Tree x={160} flip isNight={isNight} />

        {/* Owl on left tree (night) */}
        <PixelOwl x={5} y={58} dayProgress={dayProgress} />

        {/* Background bushes */}
        <rect x="30" y="72" width="20" height="12" fill={bushDark} />
        <rect x="32" y="68" width="16" height="8" fill={bushLight} />
        <rect x="140" y="70" width="22" height="14" fill={bushDark} />
        <rect x="142" y="66" width="18" height="8" fill={bushLight} />

        {/* Ground */}
        <rect x="0" y="80" width={vw} height="60" fill={grassMain} />
        <rect x="0" y="80" width={vw} height="6" fill={grassLight} />
        <rect x="0" y="84" width={vw} height="4" fill={grassMid} />
        <rect x="10" y="82" width="4" height="2" fill={grassSpot} />
        <rect x="40" y="81" width="3" height="2" fill={grassSpot} />
        <rect x="80" y="83" width="5" height="2" fill={isNight ? "hsl(105, 28%, 24%)" : "hsl(105, 48%, 48%)"} />
        <rect x="120" y="82" width="4" height="2" fill={grassSpot} />
        <rect x="160" y="81" width="3" height="2" fill={grassSpot} />

        {/* Dirt bottom */}
        <rect x="0" y="126" width={vw} height="14" fill={dirt} />
        <rect x="0" y="126" width={vw} height="3" fill={dirtLight} />

        {/* Path stones */}
        <rect x="70" y="108" width="8" height="4" fill={stone} />
        <rect x="82" y="112" width="6" height="4" fill={stone} />
        <rect x="62" y="114" width="7" height="3" fill={stone} />
        <rect x="90" y="108" width="5" height="3" fill={stone} />
        <rect x="100" y="112" width="6" height="3" fill={stone} />

        {/* Pond */}
        <Pond x={8} y={112} w={42} h={12} isNight={isNight} />

        {/* Glowing flowers (glow at night) - varied sizes, kept away from edges */}
        <GlowingFlower x={60} y={100} color="hsl(280, 55%, 60%)" glowColor="hsl(280, 70%, 75%)" isNight={isNight} />
        <GlowingFlower x={140} y={100} color="hsl(200, 55%, 60%)" glowColor="hsl(200, 80%, 78%)" isNight={isNight} />
        <GlowingFlower x={158} y={106} color="hsl(320, 60%, 55%)" glowColor="hsl(320, 70%, 72%)" isNight={isNight} />

        {/* Regular flowers - spread within safe zone (x: 30-165) */}
        <GroundFlower x={130} y={102} color={isNight ? "hsl(45, 50%, 35%)" : "hsl(45, 80%, 60%)"} />
        <GroundFlower x={38} y={98} color={isNight ? "hsl(10, 40%, 32%)" : "hsl(10, 70%, 58%)"} />
        <GroundFlower x={110} y={100} color={isNight ? "hsl(340, 35%, 30%)" : "hsl(340, 65%, 60%)"} />
        <GroundFlower x={50} y={102} color={isNight ? "hsl(55, 40%, 30%)" : "hsl(55, 75%, 55%)"} />

        {/* Tall grass - kept within safe margins */}
        <TallGrass x={56} y={92} delay={0} isNight={isNight} />
        <TallGrass x={70} y={94} delay={0.5} isNight={isNight} />
        <TallGrass x={125} y={92} delay={1} isNight={isNight} />
        <TallGrass x={138} y={96} delay={0.3} isNight={isNight} />
        <TallGrass x={34} y={96} delay={0.8} isNight={isNight} />
        <TallGrass x={162} y={94} delay={1.2} isNight={isNight} />
        <TallGrass x={100} y={96} delay={0.6} isNight={isNight} />

        {/* PLANT or EMPTY POT */}
        {(totalCount === 0 || completedCount === 0) ? (
          <>
            <rect x={cx - 10} y={104} width={20} height={10} fill="hsl(20, 50%, 45%)" />
            <rect x={cx - 12} y={102} width={24} height={4} fill="hsl(20, 45%, 40%)" />
            <rect x={cx - 6} y={98} width={12} height={5} fill="hsl(30, 40%, 35%)" />
          </>
        ) : renderPlant(stage, cx)}

        {/* Frog - sleeping in pond at night, jumping near water during day */}
        {isNight ? (
          <PixelFrog x={20} y={110} sleeping={true} />
        ) : (
          <PixelFrog x={46} y={106} sleeping={false} />
        )}

        {/* Fireflies (enhanced at night) */}
        <Firefly x={50} y={88} delay={0} isNight={isNight} />
        <Firefly x={140} y={85} delay={1} isNight={isNight} />
        <Firefly x={100} y={92} delay={2} isNight={isNight} />
        <Firefly x={75} y={78} delay={3} isNight={isNight} />
        {isNight && <>
          <Firefly x={30} y={82} delay={0.5} isNight={true} />
          <Firefly x={160} y={90} delay={1.5} isNight={true} />
          <Firefly x={120} y={76} delay={2.5} isNight={true} />
          <Firefly x={60} y={95} delay={3.5} isNight={true} />
        </>}

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
