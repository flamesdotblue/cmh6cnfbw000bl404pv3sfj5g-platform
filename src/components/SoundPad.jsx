import React, { useMemo, useEffect, useRef, useState } from 'react';

function useAudioEngine() {
  const ctx = useMemo(() => new (window.AudioContext || window.webkitAudioContext)(), []);

  const now = () => ctx.currentTime;

  const playBassClick = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t0);
    osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.12);
    gain.gain.setValueAtTime(0.9, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.2);
  };

  const playLaserFx = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t0);
    osc.frequency.exponentialRampToValueAtTime(200, t0 + 0.35);
    gain.gain.setValueAtTime(0.5, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.45);
  };

  const playElectronicBassHit = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const dist = ctx.createWaveShaper();
    const curve = new Float32Array(44100);
    for (let i = 0; i < curve.length; i++) {
      const x = (i / curve.length) * 2 - 1;
      curve[i] = Math.tanh(3 * x);
    }
    dist.curve = curve;
    osc.type = 'square';
    osc.frequency.setValueAtTime(90, t0);
    osc.frequency.exponentialRampToValueAtTime(45, t0 + 0.15);
    gain.gain.setValueAtTime(0.6, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
    osc.connect(dist).connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.22);
  };

  const playBassDrum = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t0);
    osc.frequency.exponentialRampToValueAtTime(50, t0 + 0.18);
    gain.gain.setValueAtTime(1.0, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.25);
  };

  const playWhooshBass = () => {
    const t0 = now();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, t0);
    filter.frequency.exponentialRampToValueAtTime(4000, t0 + 0.8);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.7, t0 + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + 1.0);
  };

  const playDrumFx = () => {
    const t0 = now();
    const bufferSize = 0.2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + 0.2);
  };

  const playDrum = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, t0);
    osc.frequency.exponentialRampToValueAtTime(160, t0 + 0.12);
    gain.gain.setValueAtTime(0.8, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.16);
  };

  const playNoiseFx = () => {
    const t0 = now();
    const bufferSize = 0.35 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);
    noise.connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + 0.35);
  };

  const playClockTick = () => {
    // Short bright tick (metronome-like)
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    osc.type = 'square';
    osc.frequency.setValueAtTime(2000, t0);
    gain.gain.setValueAtTime(0.7, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.06);
  };

  return {
    playBassClick,
    playLaserFx,
    playElectronicBassHit,
    playBassDrum,
    playWhooshBass,
    playDrumFx,
    playDrum,
    playNoiseFx,
    playClockTick,
  };
}

function PadButton({ label, onTrigger }) {
  return (
    <button
      className="h-24 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] backdrop-blur-sm border border-white/20 shadow-lg transition flex items-center justify-center text-center font-medium"
      onClick={onTrigger}
    >
      {label}
    </button>
  );
}

export default function SoundPad() {
  const engine = useAudioEngine();
  const [clockAuto, setClockAuto] = useState(false);
  const clockRef = useRef(null);

  useEffect(() => {
    if (clockAuto) {
      // Start immediately and then repeat every 1s
      engine.playClockTick();
      clockRef.current = setInterval(() => engine.playClockTick(), 1000);
    } else if (clockRef.current) {
      clearInterval(clockRef.current);
      clockRef.current = null;
    }
    return () => {
      if (clockRef.current) {
        clearInterval(clockRef.current);
        clockRef.current = null;
      }
    };
  }, [clockAuto]);

  const pads = [
    { label: '1. Bass Click', fn: engine.playBassClick },
    { label: '2. Laser FX', fn: engine.playLaserFx },
    { label: '3. Electronic Bass Hit', fn: engine.playElectronicBassHit },
    { label: '5. Bass Drum', fn: engine.playBassDrum },
    { label: '6. Whoosh Bass', fn: engine.playWhooshBass },
    { label: '7. Drum FX', fn: engine.playDrumFx },
    { label: '8. Drum', fn: engine.playDrum },
    { label: '9. Noise FX', fn: engine.playNoiseFx },
    { label: '10. Clock Tick', fn: engine.playClockTick },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Sound Pad</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pads.map((p) => (
          <PadButton key={p.label} label={p.label} onTrigger={p.fn} />
        ))}
        <button
          className={`h-24 rounded-xl border shadow-lg transition flex items-center justify-center text-center font-medium ${clockAuto ? 'bg-emerald-400/90 text-emerald-950 border-emerald-300' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
          onClick={() => setClockAuto((v) => !v)}
        >
          {clockAuto ? 'Clock Auto: On' : 'Clock Auto: Off'}
        </button>
      </div>
      <p className="mt-3 text-sm text-white/70">Tap any pad to auto play the sound. Use Clock Auto to toggle continuous ticking.</p>
    </div>
  );
}
