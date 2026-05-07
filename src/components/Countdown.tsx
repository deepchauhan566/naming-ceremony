'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const targetDate = new Date('2026-05-10T18:30:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-section" style={{ gap: '0.75rem', marginTop: '2rem' }}>
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          className="countdown-item shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 248, 0.4))',
            borderColor: 'rgba(255, 175, 189, 0.2)',
            padding: '1rem 1.25rem',
            minWidth: '85px',
            borderRadius: '1.25rem'
          }}
        >
          <span className="countdown-number" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="countdown-label" style={{ color: 'var(--color-rose-dark)', fontWeight: 600, letterSpacing: '2px' }}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
