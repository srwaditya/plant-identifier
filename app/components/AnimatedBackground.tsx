'use client';

import { useEffect, useState } from 'react';

// Seeded random number generator for consistent results
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const CIRCLE_CONFIGS = [
  { color: 'from-green-300 to-green-500', size: 'w-72 h-72' },
  { color: 'from-emerald-300 to-emerald-500', size: 'w-96 h-96' },
  { color: 'from-teal-300 to-teal-500', size: 'w-72 h-72' },
  { color: 'from-green-300 to-green-500', size: 'w-96 h-96' },
  { color: 'from-emerald-300 to-emerald-500', size: 'w-72 h-72' },
  { color: 'from-teal-300 to-teal-500', size: 'w-96 h-96' },
  { color: 'from-green-300 to-green-500', size: 'w-72 h-72' },
  { color: 'from-emerald-300 to-emerald-500', size: 'w-96 h-96' },
  { color: 'from-teal-300 to-teal-500', size: 'w-72 h-72' },
  { color: 'from-green-300 to-green-500', size: 'w-96 h-96' },
];

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {CIRCLE_CONFIGS.map((config, i) => {
        // Use deterministic values for positioning
        const leftPos = (seededRandom(i * 1) * 100).toFixed(2);
        const topPos = (seededRandom(i * 2) * 100).toFixed(2);
        
        return (
          <div
            key={i}
            className={`
              absolute rounded-full mix-blend-multiply filter blur-xl opacity-70
              bg-gradient-to-b ${config.color} ${config.size}
            `}
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
              animation: `float ${12 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * -0.5}s`,
            }}
          />
        );
      })}
    </div>
  );
}
