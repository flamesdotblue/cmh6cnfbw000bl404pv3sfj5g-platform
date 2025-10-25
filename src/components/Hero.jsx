import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">jkon</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-white/80 max-w-xl">
          Colorful audio playground with Google sign-in, visuals, and instant sound design.
        </p>
      </div>
    </section>
  );
}
