import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, ArrowUpRight, Flame } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, TOKEN_INFO } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';

interface NavbarProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onSelectLang,
  soundEnabled,
  onToggleSound
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = CONTENT[lang].nav;

  const scrollToSection = (id: string) => {
    cyberAudio.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLangChange = (l: Language) => {
    cyberAudio.playClick();
    onSelectLang(l);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07080d]/85 border-b border-[#ff2d8d]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          onClick={() => {
            cyberAudio.playLaserBlip();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-black border-2 border-[#ff2d8d]/60 group-hover:border-[#ff2d8d] transition-all group-hover:shadow-[0_0_20px_rgba(255,45,141,0.6)]">
            <img 
              src="/six_logo.jpg" 
              alt="sixmeme logo" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff2d8d]/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-wider text-white group-hover:text-[#ff2d8d] transition-colors">
                sixmeme
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#ff2d8d]/20 text-[#ff2d8d] border border-[#ff2d8d]/40 tracking-wider">
                $SIX
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>BNB Chain</span>
              <span className="text-slate-600">•</span>
              <span className="text-[#ff409f] font-semibold flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-[#ff2d8d]" /> Genius
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-300">
          <button 
            onClick={() => scrollToSection('why-six')} 
            className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all"
          >
            {t.about}
          </button>
          <button 
            onClick={() => scrollToSection('tokenomics')} 
            className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all"
          >
            {t.tokenomics}
          </button>
          <button 
            onClick={() => scrollToSection('terminal')} 
            className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all text-[#ff409f] flex items-center gap-1"
          >
            <span>🤙</span> {t.terminal}
          </button>
          <button 
            onClick={() => scrollToSection('how-to-buy')} 
            className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all"
          >
            {t.howToBuy}
          </button>
          <button 
            onClick={() => scrollToSection('meme-pack')} 
            className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all"
          >
            {t.memes}
          </button>
        </nav>

        {/* Right Action Tools: Sound, Language & Buy Button */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) cyberAudio.playClick();
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#ff2d8d]/50 text-slate-300 hover:text-white transition-all shadow-sm"
            title={soundEnabled ? 'Mute Cyber Audio' : 'Enable Cyber Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#ff2d8d]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setLangMenuOpen(!langMenuOpen);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#ff2d8d]/50 text-slate-200 text-xs font-semibold transition-all shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#ff2d8d]" />
              <span className="uppercase">{lang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-[#0c0d16] border border-[#ff2d8d]/30 shadow-2xl p-1.5 z-50 flex flex-col gap-1 animate-fadeIn">
                <button
                  onClick={() => handleLangChange('ru')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    lang === 'ru' ? 'bg-[#ff2d8d]/20 text-[#ff2d8d] font-bold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>Русский</span>
                  <span>RU</span>
                </button>
                <button
                  onClick={() => handleLangChange('en')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    lang === 'en' ? 'bg-[#ff2d8d]/20 text-[#ff2d8d] font-bold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>English</span>
                  <span>EN</span>
                </button>
                <button
                  onClick={() => handleLangChange('zh')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    lang === 'zh' ? 'bg-[#ff2d8d]/20 text-[#ff2d8d] font-bold' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>中文</span>
                  <span>ZH</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <a
            href={TOKEN_INFO.geniusUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playCashChing()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff1493] via-[#ff2d8d] to-[#ff459e] hover:from-[#ff2d8d] hover:to-[#ff1493] text-white font-bold text-xs shadow-[0_0_20px_rgba(255,45,141,0.45)] hover:shadow-[0_0_30px_rgba(255,45,141,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.tradeBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
