import React from 'react';

export default function ImageBadge({ label = 'screen3', size = 50 }) {
  const px = typeof size === 'number' ? `${size}px` : size;
  const imgUrl = 'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?q=80&w=200&auto=format&fit=crop'; // orchid
  return (
    <div className="flex items-center gap-3">
      <img
        src={imgUrl}
        alt={label}
        width={size}
        height={size}
        className="rounded-full ring-2 ring-white/70 shadow-md"
        style={{ width: px, height: px, objectFit: 'cover' }}
      />
      <span className="text-sm uppercase tracking-wider text-white/80">{label}</span>
    </div>
  );
}
