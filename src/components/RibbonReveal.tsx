'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RibbonRevealCopy {
  countdownTitle: string;
  lockedMessage: string;
  pullHint: string;
  nameNote: string;
}

interface RibbonRevealProps {
  onReveal: () => void;
  isRevealed: boolean;
  canReveal: boolean;
  name: string;
  revealCountdown: { days: number; hours: number; minutes: number; seconds: number };
  copy: RibbonRevealCopy;
}

export default function RibbonReveal({ onReveal, isRevealed, canReveal, name, revealCountdown, copy }: RibbonRevealProps) {
  const [isUntying, setIsUntying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const revealInProgressRef = useRef(false);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startCountdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealCompleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (startCountdownTimeoutRef.current) clearTimeout(startCountdownTimeoutRef.current);
      if (revealCompleteTimeoutRef.current) clearTimeout(revealCompleteTimeoutRef.current);
    };
  }, []);

  const handleKnotClick = () => {
    if (!canReveal || isRevealed || isUntying || revealInProgressRef.current) return;
    revealInProgressRef.current = true;
    setIsUntying(true);

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (startCountdownTimeoutRef.current) clearTimeout(startCountdownTimeoutRef.current);

    // Sequence: Untie Ribbon -> 3 -> 2 -> 1 -> Reveal Name
    startCountdownTimeoutRef.current = setTimeout(() => {
      startCountdownTimeoutRef.current = null;
      setCountdown(3);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            revealCompleteTimeoutRef.current = setTimeout(() => {
              revealCompleteTimeoutRef.current = null;
              onReveal();
              setCountdown(null);
              setIsUntying(false);
              revealInProgressRef.current = false;
            }, 650);
            // Stay on 1 until reveal (returning 0 hid the digit and left a dead frame).
            return 1;
          }
          return prev && prev > 0 ? prev - 1 : null;
        });
      }, 1000);
    }, 800);
  };

  return (
    <div className="relative flex w-full max-w-full flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!isRevealed && !countdown && countdown !== 0 ? (
          <motion.div
            key="ribbon-container"
            className="relative cursor-pointer flex flex-col items-center rounded-[2rem] px-6 py-7 md:px-8 md:py-8"
            onClick={handleKnotClick}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={canReveal ? { scale: 1.05 } : {}}
            whileTap={canReveal ? { scale: 0.95 } : {}}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.64), rgba(255,245,248,0.42))',
              border: '1px solid rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 16px 40px rgba(255, 175, 189, 0.2), inset 0 1px 0 rgba(255,255,255,0.85)',
            }}
          >
            {/* The Bow / Knot SVG */}
            <svg
              width="250"
              height="150"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <motion.path
                d="M100 60 C 60 20, 20 40, 40 80 C 50 100, 90 70, 100 60"
                fill="var(--color-rose-dark)"
                stroke="var(--color-rose)"
                strokeWidth="2"
                initial={false}
                animate={isUntying ? { d: "M100 60 C 80 40, 40 40, 20 40", opacity: 0, x: -100, rotate: -90 } : { opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: "anticipate" }}
              />
              <motion.path
                d="M100 60 C 140 20, 180 40, 160 80 C 150 100, 110 70, 100 60"
                fill="var(--color-rose-dark)"
                stroke="var(--color-rose)"
                strokeWidth="2"
                initial={false}
                animate={isUntying ? { d: "M100 60 C 120 40, 160 40, 180 40", opacity: 0, x: 100, rotate: 90 } : { opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: "anticipate" }}
              />
              <motion.path
                d="M105 65 L 140 110"
                stroke="var(--color-rose-dark)"
                strokeWidth="12"
                strokeLinecap="round"
                animate={isUntying ? { y: 100, opacity: 0, rotate: 20 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              />
              <motion.path
                d="M95 65 L 60 110"
                stroke="var(--color-rose-dark)"
                strokeWidth="12"
                strokeLinecap="round"
                animate={isUntying ? { y: 100, opacity: 0, rotate: -20 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              />
              <motion.circle
                cx="100"
                cy="60"
                r="15"
                fill="var(--color-rose)"
                stroke="var(--color-gold)"
                strokeWidth="2"
                animate={isUntying ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1], opacity: 1 }}
                transition={isUntying ? { duration: 0.5 } : { repeat: Infinity, duration: 2 }}
              />
              {!isUntying && (
                <motion.path
                  d="M100 50 L 100 70 M 90 60 L 110 60"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
              )}
            </svg>

            {/* Instruction Text or Time Left */}
            <motion.div
              className="mt-6 flex flex-col items-center gap-4"
              animate={canReveal ? { y: [0, -5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {canReveal ? (
                <p className="text-elegant text-center text-sm md:text-base font-semibold tracking-wide" style={{ color: 'var(--color-rose-dark)' }}>
                  {copy.pullHint}
                </p>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <span
                    className="text-[10px] md:text-[11px] tracking-[0.2em] font-semibold"
                    style={{
                      color: 'var(--color-text-medium)',
                      textShadow: '0 1px 0 rgba(255,255,255,0.7)',
                    }}
                  >
                    {copy.countdownTitle}
                  </span>
                  <div className="flex gap-2.5 md:gap-3">
                    {[
                      { label: 'D', value: revealCountdown.days },
                      { label: 'H', value: revealCountdown.hours },
                      { label: 'M', value: revealCountdown.minutes },
                      { label: 'S', value: revealCountdown.seconds },
                    ].map((item) => (
                      <div 
                        key={item.label}
                        className="flex flex-col items-center justify-center rounded-xl w-12 h-14 md:w-14 md:h-16 shadow-md"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.86), rgba(255,245,249,0.62))',
                          border: '1px solid rgba(255, 175, 189, 0.2)',
                          boxShadow: '0 8px 20px rgba(255, 175, 189, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
                        }}
                      >
                        <span className="text-xl md:text-2xl font-extrabold leading-none" style={{
                          fontFamily: 'var(--font-display)',
                          background: 'linear-gradient(to bottom, var(--color-rose-dark), var(--color-gold))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          {String(item.value).padStart(2, '0')}
                        </span>
                        <span
                          className="text-[8px] font-bold tracking-[3px] mt-1 uppercase"
                          style={{ color: 'var(--color-text-medium)', opacity: 0.75 }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* <p
                    className="text-elegant text-center text-[11px] md:text-xs font-medium leading-snug px-2"
                    style={{ color: 'var(--color-text-light)', maxWidth: '22rem' }}
                  >
                    {copy.lockedMessage}
                  </p> */}
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : countdown !== null && countdown > 0 ? (
          <motion.div
            key={`countdown-${countdown}`}
            className="countdown-digit text-script flex items-center justify-center will-change-transform [transform:translateZ(0)]"
            initial={{ scale: 0.45, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 520,
              damping: 28,
              mass: 0.55,
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
            }}
            style={{
              color: 'var(--color-gold)',
              textShadow:
                '0 0 24px rgba(212, 168, 85, 0.4), 0 0 48px rgba(255, 175, 189, 0.2)',
            }}
          >
            {countdown}
          </motion.div>
        ) : isRevealed ? (
          <motion.div
            key="name-revealed"
            className="flex max-w-full flex-col items-center px-1"
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.9 }}
          >
            <h2 className="text-script text-center leading-tight" style={{ 
              // Adjusted to avoid overflowing/oversized text on most viewports.
              fontSize: 'clamp(3.25rem, 8vw, 6rem)',
              maxWidth: '100%',
              overflowWrap: 'anywhere',
              background: 'linear-gradient(135deg, var(--color-rose-dark), var(--color-gold), var(--color-rose-dark))', 
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text',
              marginBottom: '0.25rem'
            }}>
              {name}
            </h2>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '120%' }} 
              transition={{ delay: 0.5, duration: 1.5 }} 
              style={{ 
                height: '3px', 
                background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', 
                margin: '1.5rem auto' 
              }} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-elegant italic"
              style={{ color: 'var(--color-text-light)', fontSize: '1.2rem' }}
            >
              {copy.nameNote}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
