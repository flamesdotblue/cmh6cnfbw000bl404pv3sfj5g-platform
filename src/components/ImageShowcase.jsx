import React from 'react';

export default function ImageShowcase() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-xl">
      <h2 className="text-xl font-semibold">Screen 3 Image</h2>
      <p className="text-sm text-white/60">Preview (size 50)</p>
      <div className="mt-5 flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
          alt="Screen 3"
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
        />
        <div className="text-white/70 text-sm">A compact thumbnail at 50px size.</div>
      </div>
    </div>
  );
}
