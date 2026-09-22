import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhySixSection } from './components/WhySixSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { TokenomicsSection } from './components/TokenomicsSection';
import { HowToBuySection } from './components/HowToBuySection';
import { MemeGallerySection } from './components/MemeGallerySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { cyberAudio } from './utils/cyberAudio';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync sound engine state
  useEffect(() => {
    cyberAudio.setMuted(!soundEnabled);
  }, [soundEnabled]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    cyberAudio.setMuted(!next);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 flex flex-col font-sans selection:bg-[#ff2d8d] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onSelectLang={setLang}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section: 3D Gesture, CA copy, Live Stats */}
        <HeroSection lang={lang} />

        {/* 2. The Lore: Why the number 6 & Genius Platform Synergy */}
        <WhySixSection lang={lang} />

        {/* 3. Interactive Alpha Simulator: Throw the 6, Earn IQ, Live Trades Feed */}
        <InteractiveTerminal lang={lang} />

        {/* 4. Tokenomics: 6-Nomics (666M, 0/0 Tax, 100% LP) */}
        <TokenomicsSection lang={lang} />

        {/* 5. How To Buy: 4 Smooth Visual Steps */}
        <HowToBuySection lang={lang} />

        {/* 6. Meme Gallery / Wall of Fame */}
        <MemeGallerySection lang={lang} />

        {/* 7. FAQ Section */}
        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
