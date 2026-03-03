import { useEffect, useRef, useCallback, useState } from "react";

// 8-bit ambient sound generator using Web Audio API
const useAmbientSound = (isNight: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem("bloom-sound-muted");
    return saved ? saved === "true" : true; // muted by default
  });

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      gainRef.current = ctxRef.current.createGain();
      gainRef.current.gain.value = 0.08;
      gainRef.current.connect(ctxRef.current.destination);
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return { ctx: ctxRef.current, gain: gainRef.current! };
  }, []);

  // 8-bit bird chirp
  const playBirdChirp = useCallback(() => {
    const { ctx, gain } = getCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "square";
    // Random chirp pattern
    const baseFreq = 800 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq + 200 + Math.random() * 300, now + 0.05);
    osc.frequency.linearRampToValueAtTime(baseFreq - 100, now + 0.1);
    osc.frequency.linearRampToValueAtTime(baseFreq + 400, now + 0.15);
    osc.frequency.linearRampToValueAtTime(baseFreq, now + 0.2);
    env.gain.setValueAtTime(0.3, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(env);
    env.connect(gain);
    osc.start(now);
    osc.stop(now + 0.25);

    // Sometimes add a second chirp
    if (Math.random() > 0.5) {
      const osc2 = ctx.createOscillator();
      const env2 = ctx.createGain();
      osc2.type = "square";
      const t = now + 0.3;
      osc2.frequency.setValueAtTime(baseFreq + 100, t);
      osc2.frequency.linearRampToValueAtTime(baseFreq + 500, t + 0.06);
      osc2.frequency.linearRampToValueAtTime(baseFreq + 200, t + 0.12);
      env2.gain.setValueAtTime(0.25, t);
      env2.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      osc2.connect(env2);
      env2.connect(gain);
      osc2.start(t);
      osc2.stop(t + 0.15);
    }
  }, [getCtx]);

  // 8-bit cricket chirp
  const playCricketChirp = useCallback(() => {
    const { ctx, gain } = getCtx();
    const now = ctx.currentTime;
    const chirps = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < chirps; i++) {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "square";
      const t = now + i * 0.08;
      osc.frequency.setValueAtTime(4200 + Math.random() * 400, t);
      env.gain.setValueAtTime(0.12, t);
      env.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
      osc.connect(env);
      env.connect(gain);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  }, [getCtx]);

  useEffect(() => {
    localStorage.setItem("bloom-sound-muted", String(muted));
  }, [muted]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (muted) return;

    const play = () => {
      if (isNight) {
        playCricketChirp();
      } else {
        playBirdChirp();
      }
    };

    // Random interval between sounds
    const scheduleNext = () => {
      const delay = isNight
        ? 1500 + Math.random() * 2500  // crickets: more frequent
        : 2000 + Math.random() * 4000; // birds: less frequent
      intervalRef.current = setTimeout(() => {
        play();
        scheduleNext();
      }, delay) as unknown as ReturnType<typeof setInterval>;
    };

    // Start after a short delay
    const startTimeout = setTimeout(() => scheduleNext(), 500);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearTimeout(intervalRef.current as unknown as number);
    };
  }, [muted, isNight, playBirdChirp, playCricketChirp]);

  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  return { muted, toggleMute };
};

export default useAmbientSound;
