import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeaderHero() {
  return (
    <section className="relative h-[46vh] md:h-[56vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />
      <div className="relative z-10 h-full container mx-auto px-4 md:px-8 flex items-end pb-6 md:pb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">vbordv</h1>
          <p className="mt-2 text-white/80 max-w-xl">Colorful sound pad with instant FX and mic recorder. Play. Record. Download.</p>
        </div>
      </div>
    </section>
  );
}
