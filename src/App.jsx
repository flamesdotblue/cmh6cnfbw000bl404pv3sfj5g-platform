import React from 'react';
import HeaderHero from './components/HeaderHero';
import ImageBadge from './components/ImageBadge';
import SoundPad from './components/SoundPad';
import RecorderPanel from './components/RecorderPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-orange-500 text-white flex flex-col">
      <HeaderHero />

      <main className="relative z-10 container mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">vbordv</h2>
          <ImageBadge label="screen3" size={50} />
        </div>

        <p className="mt-2 text-white/80">orchids</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SoundPad />
          </div>
          <div className="lg:col-span-1">
            <RecorderPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
