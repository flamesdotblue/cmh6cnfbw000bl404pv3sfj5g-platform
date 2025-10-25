import React, { useMemo } from 'react';

function useAudioEngine(speed = 44) {
  const ctx = useMemo(() => new (window.AudioContext || window.webkitAudioContext)(), []);

  const now = () => ctx.currentTime;
  const timeScale = 100 / Math.max(1, speed); // higher speed => shorter times
  const d = (seconds) => seconds * timeScale;

  const playBassClick = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t0);
    osc.frequency.exponentialRampToValueAtTime(60, t0 + d(0.12));
    gain.gain.setValueAtTime(0.9, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.14));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + d(0.2));
  };

  const playLaserFx = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t0);
    osc.frequency.exponentialRampToValueAtTime(200, t0 + d(0.35));
    gain.gain.setValueAtTime(0.5, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.4));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + d(0.45));
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
    osc.frequency.exponentialRampToValueAtTime(45, t0 + d(0.15));
    gain.gain.setValueAtTime(0.6, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.18));
    osc.connect(dist).connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + d(0.22));
  };

  const playBassDrum = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t0);
    osc.frequency.exponentialRampToValueAtTime(50, t0 + d(0.18));
    gain.gain.setValueAtTime(1.0, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.22));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + d(0.25));
  };

  const playWhooshBass = () => {
    const t0 = now();
    const seconds = d(1.0);
    const bufferSize = Math.max(1, Math.floor(seconds * ctx.sampleRate));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, t0);
    filter.frequency.exponentialRampToValueAtTime(4000, t0 + d(0.8));
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.7, t0 + d(0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.9));
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + seconds);
  };

  const playDrumFx = () => {
    const t0 = now();
    const seconds = d(0.2);
    const bufferSize = Math.max(1, Math.floor(seconds * ctx.sampleRate));
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
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.18));
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + seconds);
  };

  const playDrum = () => {
    const t0 = now();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, t0);
    osc.frequency.exponentialRampToValueAtTime(160, t0 + d(0.12));
    gain.gain.setValueAtTime(0.8, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.14));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + d(0.16));
  };

  const playNoiseFx = () => {
    const t0 = now();
    const seconds = d(0.35);
    const bufferSize = Math.max(1, Math.floor(seconds * ctx.sampleRate));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + d(0.32));
    noise.connect(gain).connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + seconds);
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
  const speed = 44;
  const engine = useAudioEngine(speed);

  const pads = [
    { label: '1. Bass Click', fn: engine.playBassClick },
    { label: '2. Laser FX', fn: engine.playLaserFx },
    { label: '3. Electronic Bass Hit', fn: engine.playElectronicBassHit },
    { label: '5. Bass Drum', fn: engine.playBassDrum },
    { label: '6. Whoosh Bass', fn: engine.playWhooshBass },
    { label: '7. Drum FX', fn: engine.playDrumFx },
    { label: '8. Drum', fn: engine.playDrum },
    { label: '9. Noise FX', fn: engine.playNoiseFx },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Sound Pad</h3>
        <span className="text-sm text-white/80">Speed: {speed}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pads.map((p) => (
          <PadButton key={p.label} label={p.label} onTrigger={p.fn} />
        ))}
      </div>
      <p className="mt-3 text-sm text-white/70">روی هر دکمه کلیک کنید تا صدا به صورت خودکار پخش شود. سرعت = ۴۴</p>
    </div>
  );
}
