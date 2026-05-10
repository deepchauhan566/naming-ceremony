'use client';

import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const cleanup = () => {
      document.removeEventListener('pointerdown', resumeOnInteraction);
      document.removeEventListener('keydown', resumeOnInteraction);
    };

    const start = () =>
      audio.play().then(() => {
        setIsPlaying(true);
      });

    const resumeOnInteraction = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest('.music-toggle')) return;
      start()
        .then(() => cleanup())
        .catch(() => {});
    };

    start()
      .then(() => cleanup())
      .catch(() => {
        document.addEventListener('pointerdown', resumeOnInteraction, { passive: true });
        document.addEventListener('keydown', resumeOnInteraction);
      });

    return () => {
      cleanup();
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="music-toggle" onClick={togglePlay} style={{ background: 'linear-gradient(135deg, var(--color-rose-dark), var(--color-gold))' }}>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        preload="auto"
        playsInline
      />
      {isPlaying ? (
        <span style={{ fontSize: '1.2rem' }}>🔊</span>
      ) : (
        <span style={{ fontSize: '1.2rem' }}>🔇</span>
      )}
    </div>
  );
}
