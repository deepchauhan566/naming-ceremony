'use client';

import { useEffect, useState } from 'react';

const EMOJIS = ['🌸', '✨', '💖', '🎀', '🪄', '🎀'];

export default function FallingPetals() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 100;
      const duration = 5 + Math.random() * 10;
      const size = 15 + Math.random() * 15;
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      setPetals((prev) => [...prev, { id, left, duration, size, emoji }]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, duration * 1000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </>
  );
}
