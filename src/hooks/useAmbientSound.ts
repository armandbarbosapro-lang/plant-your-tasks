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
  const noteFreq = (note: number) => 440 * Math.pow(2, (note - 69) / 12);

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

  // Night melody - mysterious, slower, minor pentatonic
  const playNightLoop = useCallback(() => {
    const { ctx } = getCtx();
    const now = ctx.currentTime;
    const bpm = 55;
    const beat = 60 / bpm;

    // A minor pentatonic: A4=69, C5=72, D5=74, E5=76, G5=79
    const melodyNotes = [
      { note: 69, time: 0, dur: beat * 2.5 },
      { note: 72, time: beat * 3, dur: beat * 2 },
      { note: 74, time: beat * 5.5, dur: beat * 1.5 },
      { note: 72, time: beat * 7, dur: beat * 2.5 },
      // Phrase 2
      { note: 76, time: beat * 10, dur: beat * 2 },
      { note: 74, time: beat * 12.5, dur: beat * 1.5 },
      { note: 72, time: beat * 14, dur: beat * 2 },
      { note: 69, time: beat * 16.5, dur: beat * 3 },
      // Phrase 3
      { note: 79, time: beat * 20, dur: beat * 2 },
      { note: 76, time: beat * 22.5, dur: beat * 1.5 },
      { note: 74, time: beat * 24, dur: beat * 2 },
      { note: 72, time: beat * 26.5, dur: beat * 1.5 },
      { note: 69, time: beat * 28, dur: beat * 4 },
    ];

    // Bass
    const bassNotes = [
      { note: 45, time: 0, dur: beat * 9 },         // A2
      { note: 48, time: beat * 10, dur: beat * 6 },  // C3
      { note: 50, time: beat * 16.5, dur: beat * 3 },// D3
      { note: 45, time: beat * 20, dur: beat * 5 },  // A2
      { note: 48, time: beat * 25, dur: beat * 3 },  // C3
      { note: 45, time: beat * 28, dur: beat * 5 },  // A2
    ];

    melodyNotes.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, n.dur, 0.14, "square");
    });

    bassNotes.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, n.dur, 0.10, "triangle");
    });

    // Soft high arpeggios like twinkling
    const twinkles = [
      { note: 81, time: beat * 2 }, { note: 84, time: beat * 2.5 },
      { note: 81, time: beat * 8 }, { note: 84, time: beat * 8.5 },
      { note: 79, time: beat * 15 }, { note: 84, time: beat * 15.5 },
      { note: 81, time: beat * 23 }, { note: 84, time: beat * 23.5 },
    ];
    twinkles.forEach(n => {
      playNote(noteFreq(n.note), now + n.time, beat * 0.3, 0.04, "square");
    });

    const loopDuration = beat * 33;
    loopRef.current = window.setTimeout(() => playNightLoop(), loopDuration * 1000);
  }, [getCtx, playNote]);

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
