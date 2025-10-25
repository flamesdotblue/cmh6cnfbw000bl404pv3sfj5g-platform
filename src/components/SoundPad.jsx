import React, { useMemo, useRef, useState } from 'react';

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

  return {
    playBassClick,
    playLaserFx,
    playElectronicBassHit,
    playBassDrum,
    playWhooshBass,
    playDrumFx,
    playDrum,
    playNoiseFx,
    ctx,
  };
}

function PadButton({ label, active, onToggle }) {
  return (
    <button
      className={`h-24 rounded-xl border shadow-lg transition flex items-center justify-center text-center font-medium select-none ${
        active
          ? 'bg-emerald-400/90 text-emerald-950 border-emerald-300'
          : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
      }`}
      onClick={onToggle}
    >
      {label}{active ? ' • Looping' : ''}
    </button>
  );
}

export default function SoundPad() {
  const engine = useAudioEngine();

  const pads = [
    { key: '1', label: '1. Bass Click', fn: engine.playBassClick },
    { key: '2', label: '2. Laser FX', fn: engine.playLaserFx },
    { key: '3', label: '3. Electronic Bass Hit', fn: engine.playElectronicBassHit },
    { key: '5', label: '5. Bass Drum', fn: engine.playBassDrum },
    { key: '6', label: '6. Whoosh Bass', fn: engine.playWhooshBass },
    { key: '7', label: '7. Drum FX', fn: engine.playDrumFx },
    { key: '8', label: '8. Drum', fn: engine.playDrum },
    { key: '9', label: '9. Noise FX', fn: engine.playNoiseFx },
  ];

  // Loop state per pad
  const [loops, setLoops] = useState({}); // { [key]: true/false }
  const timersRef = useRef({}); // { [key]: number }

  const defaultIntervalMs = 400; // ~150 BPM

  const togglePad = async (key, fn) => {
    try {
      // Resume context if needed (first user gesture)
      if (engine.ctx && engine.ctx.state === 'suspended') {
        await engine.ctx.resume();
      }
    } catch {}

    setLoops((prev) => {
      const nowActive = !prev[key];

      // Clear any existing interval
      if (timersRef.current[key]) {
        clearInterval(timersRef.current[key]);
        delete timersRef.current[key];
      }

      if (nowActive) {
        // Play immediately, then start interval
        fn();
        const id = setInterval(fn, defaultIntervalMs);
        timersRef.current[key] = id;
      }

      return { ...prev, [key]: nowActive };
    });
  };

  const stopAll = () => {
    Object.values(timersRef.current).forEach((id) => clearInterval(id));
    timersRef.current = {};
    setLoops({});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Sound Pad</h3>
        <button
          className="px-3 py-2 rounded-lg bg-rose-400 text-rose-950 hover:bg-rose-300 font-medium shadow"
          onClick={stopAll}
        >
          Stop All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pads.map((p) => (
          <PadButton
            key={p.key}
            label={p.label}
            active={!!loops[p.key]}
            onToggle={() => togglePad(p.key, p.fn)}
          />
        ))}
      </div>

      <div className="mt-3 text-sm text-white/80 space-y-1">
        <p>روی هر دکمه کلیک کنید تا به‌صورت خودکار تکرار شود (مثل دی‌جی). برای توقف دوباره روی همان دکمه کلیک کنید.</p>
        <p>برای توقف همه دکمه‌ها، روی Stop All کلیک کنید.</p>
      </div>
    </div>
  );
}
