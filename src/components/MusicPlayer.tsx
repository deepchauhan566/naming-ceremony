'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      />
      {isPlaying ? (
        <span style={{ fontSize: '1.2rem' }}>🔊</span>
      ) : (
        <span style={{ fontSize: '1.2rem' }}>🔇</span>
      )}
    </div>
  );
}
