import React from 'react';
import Spline from '@splinetool/react-spline';

function GoogleButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full bg-white/90 text-gray-900 hover:bg-white px-5 py-2.5 shadow-lg shadow-black/10 transition"
      onClick={() => alert('Continue with Google (demo)')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-5 w-5">
        <path fill="#4285F4" d="M533.5 278.4c0-18.6-1.5-37.2-4.7-55.3H272.1v104.8h146.9c-6.3 34-25.6 62.7-54.5 81.8v67.8h88.1c51.5-47.4 80.9-117.5 80.9-199.1z"/>
        <path fill="#34A853" d="M272.1 544.3c73.1 0 134.6-24.1 179.5-65.5l-88.1-67.8c-24.5 16.4-56 25.9-91.4 25.9-70.1 0-129.6-47.3-150.8-110.9H31.6v69.6c44.6 88.5 135.8 148.7 240.5 148.7z"/>
        <path fill="#FBBC05" d="M121.3 325.9c-9.9-29.6-9.9-61.7 0-91.3V165H31.6c-39.9 79.4-39.9 174.8 0 254.2l89.7-93.3z"/>
        <path fill="#EA4335" d="M272.1 106.6c37.7-.6 73.9 12.9 101.6 37.8l76.1-76.1C406.7 25.6 344.9 0 272.1 0 167.4 0 76.2 60.2 31.6 148.7l89.7 69.6c21.2-63.6 80.7-111 150.8-111.7z"/>
      </svg>
      Continue with Google
    </button>
  );
}

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
          <div className="mt-4">
            <GoogleButton />
          </div>
        </div>
      </div>
    </section>
  );
}
