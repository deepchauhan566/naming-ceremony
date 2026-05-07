'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CornerOrnament from './CornerOrnament';
import Countdown from './Countdown';
import RibbonReveal from './RibbonReveal';
// import babyFaceImage from '../../baby-cropped.jpeg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' as const },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeInOut' as const },
  },
};

const translations = {
  en: {
    event: "Naming Ceremony",
    for: "of our little princess",
    littleAngel: "Our Little Angel",
    revealBtn: "✨ Click to reveal name",
    revealLocked: "✦ Name will be revealed at 08:00 PM ✦",
    revealNote: "✦ A name chosen with love ✦",
    message: "A tiny star has come to stay,\nto light our hearts in every way.\nWith joy and blessings all around,\nthe sweetest love has now been found.",
    inviteText: "We invite you to share in the joyous occasion of our\nlittle princess's naming ceremony. Your presence will\nmake this day even more special and memorable.",
    countdown: "Counting down to the special day...",
    date: "Date",
    time: "Time",
    venue: "Venue",
    sunday: "Sunday",
    onwards: "Onwards",
    venueName: "THE RIALTO BANQUET & RESTAURANT",
    venueAddress: "2nd Floor, Neelkanth Square - 2, Opp. Nexa Service Station, Near GIDC Gate-5, Naroda, Ahmedabad – 382330",
    regards: "With love & warm regards",
    invitee: "Chavhan & Chikhalkar Family",
    blessing: "Your gracious presence will be a blessing for our little one.",
    dressCode: "Dress Code: Traditional / Ethnic Wear 🪷",
    viewMap: "📍 View on Maps →",
    shreeGanesh: "॥ श्री गणेशाय नमः ॥",
    invitedTo: "You are cordially invited to the"
  },
  hi: {
    event: "नामकरण समारोह",
    for: "हमारी नन्हीं राजकुमारी का",
    littleAngel: "हमारी नन्हीं परी",
    revealBtn: "✨ नाम देखने के लिए क्लिक करें",
    revealLocked: "✦ नाम शाम 08:00 बजे दिखाया जाएगा ✦",
    revealNote: "✦ प्यार से चुना गया नाम ✦",
    message: "एक छोटा सा तारा रहने आया है,\nहमारे दिलों को हर तरह से रोशन करने के लिए।\nचारों ओर खुशी और आशीर्वाद के साथ,\nसबसे प्यारा प्यार अब मिल गया है।",
    inviteText: "हम आपको हमारी नन्हीं राजकुमारी के नामकरण समारोह के\nखुशी के अवसर में शामिल होने के लिए आमंत्रित करते हैं।\nआपकी उपस्थिति इस दिन को और भी खास बना देगी।",
    countdown: "विशेष दिन की प्रतीक्षा में...",
    date: "दिनांक",
    time: "समय",
    venue: "स्थान",
    sunday: "रविवार",
    onwards: "शाम से",
    venueName: "THE RIALTO BANQUET & RESTAURANT",
    venueAddress: "2nd Floor, Neelkanth Square - 2, Opp. Nexa Service Station, Near GIDC Gate-5, Naroda, Ahmedabad – 382330",
    regards: "सप्रेम एवं सादर",
    invitee: "चव्हाण और चिखलकर परिवार",
    blessing: "आपकी गरिमामयी उपस्थिति हमारे बच्चे के लिए आशीर्वाद होगी।",
    dressCode: "ड्रेस कोड: पारंपरिक / एथनिक वियर 🪷",
    viewMap: "📍 मानचित्र देखें →",
    shreeGanesh: "॥ श्री गणेशाय नमः ॥",
    invitedTo: "आप सादर आमंत्रित हैं"
  },
  gu: {
    event: "નામકરણ વિધિ",
    for: "અમારી નાની રાજકુમારીની",
    littleAngel: "અમારી નાની પરી",
    revealBtn: "✨ નામ જોવા માટે ક્લિક કરો",
    revealLocked: "✦ નામ સાંજે 08:00 વાગ્યે જાહેર કરવામાં આવશે ✦",
    revealNote: "✦ પ્રેમથી પસંદ કરેલું નામ ✦",
    message: "એક નાનો તારો રહેવા આવ્યો છે,\nઅમારા હૃદયને બધી રીતે પ્રકાશિત કરવા માટે.\nચારે બાજુ આનંદ અને આશીર્વાદ સાથે,\nસૌથી સુંદર પ્રેમ હવે મળી ગયો છે.",
    inviteText: "અમે તમને અમારી નાની રાજકુમારીની નામકરણ વિધિના\nઆનંદદાયક પ્રસંગમાં સહભાગી થવા માટે આમંત્રિત કરીએ છીએ.\nતમારી હાજરી આ દિવસને વધુ ખાસ બનાવશે.",
    countdown: "વિશેષ દિવસની રાહ જોઈ રહ્યા છીએ...",
    date: "તારીખ",
    time: "સમય",
    venue: "સ્થળ",
    sunday: "રવિવાર",
    onwards: "સાંજે થી",
    venueName: "THE RIALTO BANQUET & RESTAURANT",
    venueAddress: "2nd Floor, Neelkanth Square - 2, Opp. Nexa Service Station, Near GIDC Gate-5, Naroda, Ahmedabad – 382330",
    regards: "સ્નેહ અને સાદર",
    invitee: "ચવ્હાણ અને ચીખલકર પરિવાર",
    blessing: "તમારી ગરિમાપૂર્ણ હાજરી અમારા બાળક માટે આશીર્વાદરૂપ રહેશે.",
    dressCode: "ડ્રેસ કોડ: પરંપરાગત પોશાક 🪷",
    viewMap: "📍 નકશો જુઓ →",
    shreeGanesh: "॥ શ્રી ગણેશાય નમઃ ॥",
    invitedTo: "તમને હાર્દિક આમંત્રણ છે"
  }
};

export default function InvitationCard() {
  const [lang, setLang] = useState<'en' | 'hi' | 'gu'>('en');
  const [isRevealed, setIsRevealed] = useState(false);
  const [canReveal, setCanReveal] = useState(false);
  const t = translations[lang];

  const revealTime = new Date('2026-05-10T20:00:00+05:30').getTime();
  const [revealCountdown, setRevealCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const checkTime = () => {
      const now = Date.now();
      setCanReveal(now >= revealTime);
      
      const diff = revealTime - now;
      if (diff > 0) {
        setRevealCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [revealTime]);

  const handleReveal = () => {
    setIsRevealed(true);
    import('canvas-confetti').then((confetti) => {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 150 * (timeLeft / duration);
        confetti.default({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti.default({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 150);
    });
  };

  return (
    <motion.div
      className="invitation-card"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' as const }}
    >
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as 'en' | 'hi' | 'gu')}
          className="lang-select"
          style={{
            padding: '0.3rem 1.2rem 0.3rem 0.6rem',
            borderRadius: '1rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(5px)',
            color: 'var(--color-text-dark)',
            border: '1px solid var(--color-rose)',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(255, 175, 189, 0.15)',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%23ff85a1%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.4rem center',
          }}
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="gu">GU</option>
        </select>
      </div>

      <div className="corner-ornament corner-tl"><CornerOrnament /></div>
      <div className="corner-ornament corner-tr"><CornerOrnament /></div>
      <div className="corner-ornament corner-bl"><CornerOrnament /></div>
      <div className="corner-ornament corner-br"><CornerOrnament /></div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="ganesh-section" variants={itemVariants}>
          <div className="ganesh-symbol">🙏</div>
          <p className="text-elegant" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-rose-dark)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '0.25rem' }}>
            {t.shreeGanesh}
          </p>
        </motion.div>

        <motion.div className="ornate-divider" variants={itemVariants}>
          <div className="divider-line" />
          <div className="divider-dot" style={{ background: 'var(--color-gold)' }} />
          <div className="divider-line" />
        </motion.div>

        <motion.div style={{ textAlign: 'center', marginBottom: '0.5rem' }} variants={itemVariants}>
          <p className="text-body" style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-text-light)', fontWeight: 500 }}>
            {t.invitedTo}
          </p>
        </motion.div>

        <motion.h1 className="text-script" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--color-rose-dark)', marginBottom: '0.5rem', lineHeight: 1.2 }} variants={scaleVariants}>
          {t.event}
        </motion.h1>

        <motion.div className="text-elegant" style={{ textAlign: 'center', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-text-medium)', fontWeight: 400 }} variants={itemVariants}>
          {t.for}
        </motion.div>

        <motion.div variants={scaleVariants}>
          <div className="baby-image-wrapper" style={{ marginTop: '1.5rem' }}>
            <div className="glow-ring" style={{ borderColor: 'rgba(255, 175, 189, 0.2)' }} />
            <Image src="/baby-cropped.jpeg" alt="Baby Girl" width={180} height={180} style={{ objectFit: 'cover' }} priority />
          </div>
        </motion.div>

        <motion.div className="baby-name-container" variants={scaleVariants} style={{ background: 'linear-gradient(135deg, rgba(255, 175, 189, 0.1), rgba(255, 195, 160, 0.1))' }}>
          <p className="text-dance" style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {t.littleAngel}
          </p>
          <div className="name-reveal-stage">
            <RibbonReveal 
              onReveal={handleReveal} 
              isRevealed={isRevealed} 
              canReveal={canReveal} 
              name="Nitya Chavhan" 
              revealCountdown={revealCountdown}
            />
          </div>
        </motion.div>

        <motion.div className="message-box" variants={itemVariants} style={{ background: 'linear-gradient(135deg, rgba(255, 175, 189, 0.1), rgba(255, 245, 248, 0.1))', borderColor: 'var(--color-rose)' }}>
          <span className="quote-mark" style={{ color: 'var(--color-rose)' }}>&ldquo;</span>
          <p className="text-elegant" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-dark)', fontWeight: 400, whiteSpace: 'pre-line' }}>
            {t.message}
          </p>
          <span className="quote-mark" style={{ color: 'var(--color-rose)' }}>&rdquo;</span>
          <p className="text-body" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '0.75rem', lineHeight: 1.6 }}>
            {t.inviteText}
          </p>
        </motion.div>

        <motion.div className="ornate-divider" variants={itemVariants}>
          <div className="divider-line" />
          <span style={{ color: 'var(--color-rose)', fontSize: '1.2rem' }}>✿</span>
          <div className="divider-line" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-dance" style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--color-text-medium)', marginBottom: '0.5rem' }}>
            {t.countdown}
          </p>
          <Countdown />
        </motion.div>

        <motion.div className="event-details" variants={itemVariants}>
          <motion.div className="detail-item" whileHover={{ scale: 1.03 }} style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 245, 248, 0.3))', borderColor: 'rgba(255, 175, 189, 0.15)' }}>
            <div className="detail-icon" style={{ background: 'linear-gradient(135deg, var(--color-pink-light), var(--color-blush))' }}>📅</div>
            <span className="detail-label">{t.date}</span>
            <span className="detail-value">10 May 2026</span>
            <span className="text-elegant" style={{ fontSize: '0.8rem', color: 'var(--color-rose-dark)', fontStyle: 'italic' }}>{t.sunday}</span>
          </motion.div>
          <motion.div className="detail-item" whileHover={{ scale: 1.03 }} style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 245, 248, 0.3))', borderColor: 'rgba(255, 175, 189, 0.15)' }}>
            <div className="detail-icon" style={{ background: 'linear-gradient(135deg, var(--color-pink-light), var(--color-blush))' }}>🕕</div>
            <span className="detail-label">{t.time}</span>
            <span className="detail-value">06:30 PM</span>
            <span className="text-elegant" style={{ fontSize: '0.8rem', color: 'var(--color-rose-dark)', fontStyle: 'italic' }}>{t.onwards}</span>
          </motion.div>
          <motion.a 
            href="https://maps.app.goo.gl/m8eqRhsnFZ9rtAc5A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="detail-item detail-venue" 
            whileHover={{ scale: 1.02 }} 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 245, 248, 0.3))', 
              borderColor: 'rgba(255, 175, 189, 0.15)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div className="detail-icon" style={{ background: 'linear-gradient(135deg, var(--color-pink-light), var(--color-blush))' }}>📍</div>
            <span className="detail-label">{t.venue}</span>
            <span className="detail-value">{t.venueName}</span>
            <span className="text-elegant" style={{ fontSize: '0.8rem', color: 'var(--color-text-medium)', fontStyle: 'italic', textAlign: 'center', maxWidth: '280px', marginTop: '0.25rem' }}>{t.venueAddress}</span>
            <span className="map-link" style={{ color: 'var(--color-rose-dark)', marginTop: '0.5rem' }}>{t.viewMap}</span>
          </motion.a>
        </motion.div>

        <motion.div className="ornate-divider" variants={itemVariants}>
          <div className="divider-line" />
          <span style={{ color: 'var(--color-rose)', fontSize: '1rem' }}>🌸</span>
          <div className="divider-line" />
        </motion.div>

        <motion.div className="family-section" variants={itemVariants} style={{ borderColor: 'rgba(255, 175, 189, 0.2)' }}>
          <p className="text-body" style={{ fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
            {t.regards}
          </p>
          <h3 className="text-script" style={{ fontSize: '2.2rem', background: 'linear-gradient(135deg, var(--color-rose-dark), var(--color-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {t.invitee}
          </h3>
          <p className="text-elegant" style={{ fontSize: '0.9rem', color: 'var(--color-text-medium)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            &ldquo;{t.blessing}&rdquo;
          </p>
        </motion.div>

        {/* <motion.div className="text-elegant" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)', fontStyle: 'italic', marginTop: '1.5rem' }} variants={itemVariants}>
          {t.dressCode}
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
}
