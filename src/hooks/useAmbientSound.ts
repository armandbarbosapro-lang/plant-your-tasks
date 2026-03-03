import { useEffect, useRef, useCallback, useState } from "react";

// 8-bit Zelda-style chill music generator
const useAmbientSound = (isNight: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const loopRef = useRef<number | null>(null);
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem("bloom-sound-muted");
    return saved ? saved === "true" : true;
  });

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      gainRef.current = ctxRef.current.createGain();
      gainRef.current.gain.value = 0.06;
      gainRef.current.connect(ctxRef.current.destination);
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return { ctx: ctxRef.current, gain: gainRef.current! };
  }, []);

  // Note frequency helper
  const noteFreq = useCallback((note: number) => 440 * Math.pow(2, (note - 69) / 12), []);

  // Play a single 8-bit note
  const playNote = useCallback((freq: number, startTime: number, duration: number, volume: number, type: OscillatorType = "square") => {
    const { ctx, gain } = getCtx();
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(volume, startTime + 0.02);
    env.gain.setValueAtTime(volume, startTime + duration * 0.6);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(env);
    env.connect(gain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }, [getCtx]);

  // Day melody - peaceful Zelda village style (pentatonic, slow, dreamy)
  const playDayLoop = useCallback(() => {
    const { ctx } = getCtx();
    const now = ctx.currentTime;
    const bpm = 70;
    const beat = 60 / bpm;

    // C major pentatonic melody - gentle, wistful
    // MIDI: C5=72, D5=74, E5=76, G5=79, A5=81, C6=84
    const melodyNotes = [
      // Phrase 1
      { note: 72, time: 0, dur: beat * 2 },
      { note: 76, time: beat * 2, dur: beat * 1.5 },
      { note: 74, time: beat * 3.5, dur: beat },
      { note: 72, time: beat * 4.5, dur: beat * 1.5 },
      // Phrase 2
      { note: 79, time: beat * 6.5, dur: beat * 2 },
      { note: 76, time: beat * 8.5, dur: beat },
      { note: 74, time: beat * 9.5, dur: beat * 2 },
      // Phrase 3
      { note: 72, time: beat * 12, dur: beat * 1.5 },
      { note: 74, time: beat * 13.5, dur: beat },
      { note: 76, time: beat * 14.5, dur: beat * 1.5 },
      { note: 79, time: beat * 16, dur: beat * 2 },
      { note: 81, time: beat * 18, dur: beat },
      { note: 79, time: beat * 19, dur: beat * 2 },
      // Phrase 4 - resolve
      { note: 76, time: beat * 21.5, dur: beat * 1.5 },
      { note: 74, time: beat * 23, dur: beat },
      { note: 72, time: beat * 24, dur: beat * 3 },
    ];

    // Bass - simple root notes, triangle wave
    const bassNotes = [
      { note: 48, time: 0, dur: beat * 6 },          // C3
      { note: 55, time: beat * 6.5, dur: beat * 5 },  // G3
      { note: 53, time: beat * 12, dur: beat * 5 },   // F3
      { note: 48, time: beat * 17, dur: beat * 4 },   // C3
      { note: 53, time: beat * 21.5, dur: beat * 3 }, // F3
      { note: 48, time: beat * 24, dur: beat * 4 },   // C3
    ];

    melodyNotes.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, n.dur, 0.18, "square");
    });

    bassNotes.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, n.dur, 0.12, "triangle");
    });

    // Arpeggio decoration (very soft)
    const arps = [
      { note: 60, time: beat * 0.5 }, { note: 64, time: beat * 1 }, { note: 67, time: beat * 1.5 },
      { note: 60, time: beat * 7 }, { note: 64, time: beat * 7.5 }, { note: 67, time: beat * 8 },
      { note: 60, time: beat * 13 }, { note: 65, time: beat * 13.5 }, { note: 69, time: beat * 14 },
      { note: 60, time: beat * 21 }, { note: 64, time: beat * 21.5 }, { note: 67, time: beat * 22 },
    ];
    arps.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, beat * 0.4, 0.06, "triangle");
    });

    const loopDuration = beat * 28;
    loopRef.current = window.setTimeout(() => playDayLoop(), loopDuration * 1000);
  }, [getCtx, playNote]);

  // Night ambiance - crickets base + occasional owl/wind/forest sounds
  const playCrickets = useCallback((startTime: number, duration: number) => {
    const { ctx, gain } = getCtx();
    // Soft continuous cricket chirps
    const chirpInterval = 0.15;
    const numChirps = Math.floor(duration / chirpInterval);
    for (let i = 0; i < numChirps; i++) {
      const t = startTime + i * chirpInterval;
      // Alternate between two cricket pitches
      const freq = i % 6 < 3 ? 4200 : 4500;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq + Math.random() * 100, t);
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.04, t + 0.01);
      env.gain.linearRampToValueAtTime(0, t + 0.06);
      osc.connect(env);
      env.connect(gain);
      osc.start(t);
      osc.stop(t + 0.07);
    }
  }, [getCtx]);

  const playOwlHoot = useCallback((startTime: number) => {
    const { ctx, gain } = getCtx();
    // "Hou-houuu" - two descending tones
    const osc1 = ctx.createOscillator();
    const env1 = ctx.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(420, startTime);
    osc1.frequency.linearRampToValueAtTime(380, startTime + 0.3);
    env1.gain.setValueAtTime(0, startTime);
    env1.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
    env1.gain.setValueAtTime(0.12, startTime + 0.2);
    env1.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
    osc1.connect(env1);
    env1.connect(gain);
    osc1.start(startTime);
    osc1.stop(startTime + 0.4);

    // Second longer "houuuu"
    const osc2 = ctx.createOscillator();
    const env2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(350, startTime + 0.5);
    osc2.frequency.linearRampToValueAtTime(300, startTime + 1.2);
    env2.gain.setValueAtTime(0, startTime + 0.5);
    env2.gain.linearRampToValueAtTime(0.14, startTime + 0.55);
    env2.gain.setValueAtTime(0.14, startTime + 0.9);
    env2.gain.exponentialRampToValueAtTime(0.001, startTime + 1.3);
    osc2.connect(env2);
    env2.connect(gain);
    osc2.start(startTime + 0.5);
    osc2.stop(startTime + 1.3);
  }, [getCtx]);

  const playWindGust = useCallback((startTime: number) => {
    const { ctx, gain } = getCtx();
    // White noise filtered to sound like wind
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, startTime);
    filter.frequency.linearRampToValueAtTime(800, startTime + 1);
    filter.frequency.linearRampToValueAtTime(300, startTime + 2.5);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(0.06, startTime + 0.8);
    env.gain.setValueAtTime(0.06, startTime + 1.5);
    env.gain.linearRampToValueAtTime(0, startTime + 2.5);

    noise.connect(filter);
    filter.connect(env);
    env.connect(gain);
    noise.start(startTime);
    noise.stop(startTime + 2.5);
  }, [getCtx]);

  const playNightLoop = useCallback(() => {
    const { ctx } = getCtx();
    const now = ctx.currentTime;
    const loopDuration = 12; // 12 seconds per loop

    // Continuous crickets
    playCrickets(now, loopDuration);

    // Random events
    const r = Math.random();
    if (r < 0.3) {
      // Owl hoot
      playOwlHoot(now + 2 + Math.random() * 4);
    } else if (r < 0.55) {
      // Wind gust
      playWindGust(now + 1 + Math.random() * 3);
    }
    // Sometimes both
    if (Math.random() < 0.15) {
      playOwlHoot(now + 8 + Math.random() * 2);
    }

    loopRef.current = window.setTimeout(() => playNightLoop(), loopDuration * 1000);
  }, [getCtx, playCrickets, playOwlHoot, playWindGust]);

  useEffect(() => {
    localStorage.setItem("bloom-sound-muted", String(muted));
  }, [muted]);

  useEffect(() => {
    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }
    if (muted) return;

    const startTimeout = setTimeout(() => {
      if (isNight) {
        playNightLoop();
      } else {
        playDayLoop();
      }
    }, 300);

    return () => {
      clearTimeout(startTimeout);
      if (loopRef.current) clearTimeout(loopRef.current);
    };
  }, [muted, isNight, playDayLoop, playNightLoop]);

  const toggleMute = useCallback(() => setMuted(prev => !prev), []);

  return { muted, toggleMute };
};

export default useAmbientSound;
