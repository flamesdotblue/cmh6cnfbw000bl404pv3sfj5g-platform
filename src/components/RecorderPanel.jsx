import React, { useEffect, useRef, useState } from 'react';

export default function RecorderPanel() {
  const [isReady, setReady] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [mp3Url, setMp3Url] = useState('');
  const [error, setError] = useState('');

  const audioCtxRef = useRef(null);
  const processorRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const pcmBuffersRef = useRef([]);
  const sampleRateRef = useRef(44100);

  useEffect(() => {
    const existing = document.querySelector('script[data-lamejs]');
    if (existing) {
      setReady(true);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/lamejs@1.2.0/lame.all.js';
    s.async = true;
    s.defer = true;
    s.setAttribute('data-lamejs', 'true');
    s.onload = () => setReady(true);
    s.onerror = () => setError('Failed to load MP3 encoder.');
    document.head.appendChild(s);
  }, []);

  const floatTo16BitPCM = (input) => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output;
  };

  const concatInt16 = (chunks) => {
    let totalLength = 0;
    for (const c of chunks) totalLength += c.length;
    const result = new Int16Array(totalLength);
    let offset = 0;
    for (const c of chunks) {
      result.set(c, offset);
      offset += c.length;
    }
    return result;
  };

  const startRecording = async () => {
    setError('');
    setMp3Url('');
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext({ sampleRate: 44100 });
      audioCtxRef.current = ctx;
      sampleRateRef.current = ctx.sampleRate;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const source = ctx.createMediaStreamSource(stream);
      sourceRef.current = source;
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      pcmBuffersRef.current = [];
      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        const pcm16 = floatTo16BitPCM(input);
        pcmBuffersRef.current.push(pcm16);
      };
      source.connect(processor);
      processor.connect(ctx.destination);
      setRecording(true);
    } catch (e) {
      setError('Mic permission denied or unavailable.');
    }
  };

  const stopRecording = () => {
    setRecording(false);
    try {
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current.onaudioprocess = null;
      }
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioCtxRef.current) audioCtxRef.current.close();
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    } catch {}

    try {
      const lamejs = window.lamejs;
      if (!lamejs) throw new Error('Encoder not ready');
      const samples = concatInt16(pcmBuffersRef.current);
      const mp3encoder = new lamejs.Mp3Encoder(1, sampleRateRef.current, 128);
      const blockSize = 1152;
      let mp3Data = [];
      for (let i = 0; i < samples.length; i += blockSize) {
        const chunk = samples.subarray(i, i + blockSize);
        const mp3buf = mp3encoder.encodeBuffer(chunk);
        if (mp3buf.length > 0) mp3Data.push(mp3buf);
      }
      const end = mp3encoder.flush();
      if (end.length > 0) mp3Data.push(end);
      const blob = new Blob(mp3Data, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setMp3Url(url);
    } catch (e) {
      setError('Failed to encode MP3.');
    }
  };

  return (
    <div className="rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-2">4. Voice Recorder</h3>
      <p className="text-sm text-white/80 mb-4">Record your voice, then download as MP3.</p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={!isReady || isRecording}
          onClick={startRecording}
          className={`px-4 py-2 rounded-lg font-medium shadow ${!isReady || isRecording ? 'bg-white/20 text-white/60 cursor-not-allowed' : 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300'}`}
        >
          {isRecording ? 'Recording…' : 'Record'}
        </button>
        <button
          disabled={!isRecording}
          onClick={stopRecording}
          className={`px-4 py-2 rounded-lg font-medium shadow ${!isRecording ? 'bg-white/20 text-white/60 cursor-not-allowed' : 'bg-rose-400 text-rose-950 hover:bg-rose-300'}`}
        >
          Stop
        </button>
        {mp3Url && (
          <a
            href={mp3Url}
            download="recording.mp3"
            className="px-4 py-2 rounded-lg font-medium shadow bg-white text-gray-900 hover:bg-white/90"
          >
            Download MP3
          </a>
        )}
      </div>
      {error && <p className="mt-3 text-sm text-red-200">{error}</p>}
    </div>
  );
}
