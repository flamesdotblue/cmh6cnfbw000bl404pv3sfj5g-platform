import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, Download, Volume2 } from 'lucide-react';

function useAudioEngine() {
  const ctxRef = useRef(null);
  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  };

  const now = () => ensureCtx().currentTime;

  const env = (gainNode, { a = 0.005, d = 0.3, s = 0.0, r = 0.2, peak = 1.0 } = {}) => {
    const ctx = ensureCtx();
    const t0 = ctx.currentTime;
    const g = gainNode.gain;
    g.cancelScheduledValues(0);
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t0 + a);
    g.exponentialRampToValueAtTime(Math.max(s, 0.0002), t0 + a + d);
    g.exponentialRampToValueAtTime(0.0001, t0 + a + d + r);
  };

  const play = (create) => {
    const ctx = ensureCtx();
    create(ctx);
  };

  const bass = () => play((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    o.type = 'sine';
    o.frequency.setValueAtTime(55, now());
    f.type = 'lowpass';
    f.frequency.setValueAtTime(800, now());
    env(g, { a: 0.005, d: 0.35, s: 0.0002, r: 0.25, peak: 1.2 });
    o.connect(f).connect(g).connect(ctx.destination);
    o.start();
    o.stop(now() + 0.8);
  });

  const laser = () => play((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    const t0 = now();
    o.frequency.setValueAtTime(1800, t0);
    o.frequency.exponentialRampToValueAtTime(120, t0 + 0.4);
    env(g, { a: 0.005, d: 0.25, r: 0.35, peak: 0.9 });
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(t0 + 0.5);
  });

  const electronicBassHeat = () => play((ctx) => {
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(600, now());

    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = 'sawtooth';
    o2.type = 'sawtooth';
    o1.frequency.setValueAtTime(65, now());
    o2.frequency.setValueAtTime(65, now());
    o2.detune.setValueAtTime(-8, now());

    env(g, { a: 0.004, d: 0.5, r: 0.5, peak: 1.0 });
    o1.connect(f);
    o2.connect(f);
    f.connect(g).connect(ctx.destination);

    o1.start();
    o2.start();
    const t1 = now() + 0.7;
    o1.stop(t1);
    o2.stop(t1);
  });

  const voiceKick = () => play((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    const t0 = now();
    o.frequency.setValueAtTime(120, t0);
    o.frequency.exponentialRampToValueAtTime(45, t0 + 0.3);
    env(g, { a: 0.002, d: 0.25, r: 0.2, peak: 1.3 });
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(t0 + 0.35);

    const click = ctx.createOscillator();
    const cg = ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(2000, t0);
    cg.gain.setValueAtTime(0.2, t0);
    cg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04);
    click.connect(cg).connect(ctx.destination);
    click.start();
    click.stop(t0 + 0.05);
  });

  const whooshBass = () => play((ctx) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(200, now());
    filt.frequency.exponentialRampToValueAtTime(2000, now() + 0.8);

    const g = ctx.createGain();
    env(g, { a: 0.01, d: 0.7, r: 0.4, peak: 0.8 });

    noise.connect(filt).connect(g).connect(ctx.destination);
    noise.start();
    noise.stop(now() + 1.2);
  });

  const drumFx = () => play((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    const t0 = now();
    o.frequency.setValueAtTime(200, t0);
    o.frequency.exponentialRampToValueAtTime(100, t0 + 0.25);
    env(g, { a: 0.003, d: 0.2, r: 0.25, peak: 1.0 });
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(t0 + 0.35);
  });

  const drumSnare = () => play((ctx) => {
    const t0 = now();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.5, t0);
    nG.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.15);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1800;
    noise.connect(bp).connect(nG).connect(ctx.destination);
    noise.start();
    noise.stop(t0 + 0.2);

    const tone = ctx.createOscillator();
    const tG = ctx.createGain();
    tone.type = 'triangle';
    tone.frequency.setValueAtTime(320, t0);
    tG.gain.setValueAtTime(0.2, t0);
    tG.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
    tone.connect(tG).connect(ctx.destination);
    tone.start();
    tone.stop(t0 + 0.15);
  });

  const noiseFx = () => play((ctx) => {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filt = ctx.createBiquadFilter();
    filt.type = 'highpass';
    filt.frequency.setValueAtTime(800, now());
    const g = ctx.createGain();
    env(g, { a: 0.002, d: 0.2, r: 0.2, peak: 0.8 });
    noise.connect(filt).connect(g).connect(ctx.destination);
    noise.start();
    noise.stop(now() + 0.25);
  });

  return {
    bass,
    laser,
    electronicBassHeat,
    voiceKick,
    whooshBass,
    drumFx,
    drumSnare,
    noiseFx,
  };
}

function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const start = async () => {
    if (recording) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    chunksRef.current = [];
    mr.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    };
    mr.start();
    setRecording(true);
  };

  const stop = () => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') {
      mr.stop();
      mr.stream.getTracks().forEach((t) => t.stop());
    }
    setRecording(false);
  };

  return { recording, audioURL, start, stop };
}

export default function SoundLab() {
  const {
    bass,
    laser,
    electronicBassHeat,
    voiceKick,
    whooshBass,
    drumFx,
    drumSnare,
    noiseFx,
  } = useAudioEngine();

  const { recording, audioURL, start, stop } = useVoiceRecorder();

  const buttons = [
    { id: 1, label: '1. Bass', action: bass },
    { id: 2, label: '2. Laser FX', action: laser },
    { id: 3, label: '3. Electronic Bass Heat', action: electronicBassHeat },
    { id: 4, label: '4. Voice Recorder', action: null },
    { id: 5, label: '5. Bass Drum', action: voiceKick },
    { id: 6, label: '6. Whoosh Bass', action: whooshBass },
    { id: 7, label: '7. Drum FX', action: drumFx },
    { id: 8, label: '8. Drum', action: drumSnare },
    { id: 9, label: '9. Noise FX', action: noiseFx },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl font-semibold">Sound Lab</h2>
        <div className="text-xs text-white/60 flex items-center gap-2"><Volume2 className="h-4 w-4"/> Click a button to auto play sound</div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {buttons.map((b) => (
          b.id !== 4 ? (
            <button
              key={b.id}
              onClick={b.action}
              className="rounded-xl bg-white/10 hover:bg-white/20 transition py-3 px-3 text-left"
            >
              <div className="text-sm font-medium">{b.label}</div>
              <div className="text-xs text-white/60">Click sound · auto play</div>
            </button>
          ) : (
            <div key={b.id} className="rounded-xl bg-white/10 p-3">
              <div className="text-sm font-medium">4. Voice Recorder</div>
              <div className="mt-2 flex items-center gap-2">
                {!recording ? (
                  <button
                    onClick={start}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 text-black font-medium px-3 py-2 hover:bg-emerald-300 transition"
                  >
                    <Mic className="h-4 w-4"/> Record
                  </button>
                ) : (
                  <button
                    onClick={stop}
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-500 text-white font-medium px-3 py-2 hover:bg-rose-400 transition"
                  >
                    <Square className="h-4 w-4"/> Stop
                  </button>
                )}
                {audioURL && (
                  <a
                    href={audioURL}
                    download="recording.mp3"
                    className="inline-flex items-center gap-2 rounded-lg bg-white text-black font-medium px-3 py-2 hover:bg-white/90 transition"
                  >
                    <Download className="h-4 w-4"/> Download MP3
                  </a>
                )}
              </div>
              <p className="text-xs text-white/60 mt-2">No time limit, click Stop to finish and download.</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
