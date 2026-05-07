'use client';

export default function CornerOrnament() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 5 C5 5, 5 40, 5 50 C5 60, 10 65, 15 60 C20 55, 18 45, 15 42 C12 39, 8 42, 10 46"
        stroke="var(--color-gold)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M5 5 C5 5, 40 5, 50 5 C60 5, 65 10, 60 15 C55 20, 45 18, 42 15 C39 12, 42 8, 46 10"
        stroke="var(--color-gold)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <circle cx="15" cy="15" r="3" fill="var(--color-pink)" opacity="0.4" />
      <circle cx="15" cy="15" r="1.5" fill="var(--color-gold)" opacity="0.5" />
      <circle cx="30" cy="8" r="2" fill="var(--color-rose)" opacity="0.3" />
      <circle cx="8" cy="30" r="2" fill="var(--color-pink-light)" opacity="0.3" />
      <ellipse cx="22" cy="10" rx="3" ry="1.5" transform="rotate(30 22 10)" fill="var(--color-pink-light)" opacity="0.4" />
      <ellipse cx="10" cy="22" rx="3" ry="1.5" transform="rotate(60 10 22)" fill="var(--color-rose-light)" opacity="0.4" />
      <circle cx="38" cy="6" r="1" fill="var(--color-gold)" opacity="0.3" />
      <circle cx="6" cy="38" r="1" fill="var(--color-gold)" opacity="0.3" />
      <circle cx="25" cy="6" r="0.8" fill="var(--color-pink)" opacity="0.3" />
      <circle cx="6" cy="25" r="0.8" fill="var(--color-pink)" opacity="0.3" />
      <path d="M35 12 Q40 8 45 10 Q40 14 35 12Z" fill="#a8c8a0" opacity="0.2" />
      <path d="M12 35 Q8 40 10 45 Q14 40 12 35Z" fill="#a8c8a0" opacity="0.2" />
    </svg>
  );
}
