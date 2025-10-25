import React from 'react';
import Hero from './components/Hero';
import GoogleAuthCard from './components/GoogleAuthCard';
import ImageShowcase from './components/ImageShowcase';
import SoundLab from './components/SoundLab';

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-blue-900 to-black text-white">
      <Hero />
      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 -mt-24">
          <GoogleAuthCard />
          <ImageShowcase />
        </section>
        <section className="mt-10 md:mt-16">
          <SoundLab />
        </section>
      </main>
      <footer className="mt-16 py-8 text-center text-sm text-white/60">
        <span className="font-semibold text-white/80">jkon</span> · Crafted with React + Tailwind
      </footer>
    </div>
  );
}
