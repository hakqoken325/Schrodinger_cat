import React, { useState } from 'react';
import { Copy, Check, TrendingUp, Sparkles, ShieldCheck, Zap, ExternalLink, Bell, Send, Clock } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, TOKEN_INFO } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const t = CONTENT[lang].hero;

  const handleCopyCa = () => {
    cyberAudio.playCashChing();
    navigator.clipboard.writeText('sixmeme ($SIX) 官方合约即将正式发布，请关注官方 Telegram 获取首发通知！');
    setCopied(true);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ff2d8d', '#ff66b2', '#ffffff', '#ffd700']
    });

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleTriggerLogoGesture = () => {
    cyberAudio.playGeniusChime();
    confetti({
      particleCount: 66,
      spread: 70,
      origin: { y: 0.45 },
      colors: ['#ff2d8d', '#ff1493', '#ffffff', '#ff80bf']
    });
  };

  return (
    <section className="relative w-full pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden cyber-grid">
      {/* Ambient Neon Atmosphere Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2d8d]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#ff1493]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#7928ca]/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Top Verified Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131525]/90 border border-[#ff2d8d]/40 shadow-[0_0_20px_rgba(255,45,141,0.25)] text-xs font-mono font-bold text-[#ff66b2] mb-8 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#ff2d8d] animate-ping" />
          <span>{t.badge}</span>
          <span className="text-slate-600">|</span>
          <span className="text-white flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> $SIX
          </span>
        </div>

        {/* Central Visual: Glowing 🤙 SIX Hero Graphic with Interactive 3D Perspective */}
        <div className="relative mb-10 group">
          {/* Neon Ring Effect */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#ff1493] via-[#ff2d8d] to-[#ff459e] opacity-40 blur-2xl group-hover:opacity-75 transition-opacity duration-500 animate-pulse-glow" />

          {/* Interactive Card */}
          <div 
            onClick={handleTriggerLogoGesture}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl p-3 bg-[#0a0b12] border-2 border-[#ff2d8d]/60 shadow-[0_0_50px_rgba(255,45,141,0.5)] transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-1 cursor-pointer select-none"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black flex items-center justify-center">
              <img 
                src="/six_logo.jpg" 
                alt="sixmeme official gesture logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              
              {/* Overlay glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="font-bold text-[#ff66b2] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 🤙 666 MEME
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#ff2d8d]/30 text-white border border-[#ff2d8d]/50 text-[10px]">
                    GENIUS IQ
                  </span>
                </div>
              </div>
            </div>

            {/* Click to Throw 6 hint badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-[#161828] border border-[#ff2d8d]/60 text-[11px] font-mono font-bold text-white shadow-lg flex items-center gap-1.5">
              <span>🤙</span>
              <span className="text-[#ff66b2]">{lang === 'ru' ? 'Нажми для альфа-заряда' : lang === 'zh' ? '点击触发666暴击' : 'Click to unleash 666'}</span>
            </div>
          </div>
        </div>

        {/* Hero Headlines */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-5xl leading-none mb-6">
          <span>{t.titlePrimary} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d8d] via-[#ff66b2] to-[#ff2d8d] neon-pink-text">
            {t.titleHighlight}
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-10 font-normal">
          {t.subtitle}
        </p>

        {/* Contract Address Status Bar - Coming Soon (No raw CA) */}
        <div className="w-full max-w-2xl mb-10">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0f111d]/95 border border-[#ff2d8d]/40 hover:border-[#ff2d8d]/80 transition-all shadow-[0_0_35px_rgba(255,45,141,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 px-2 py-1 w-full sm:w-auto text-left">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-[#ff2d8d]/20 text-[#ff66b2] border border-[#ff2d8d]/40 font-bold shrink-0 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff2d8d] animate-ping" />
                <span>BNB 合约状态</span>
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                官方合约：即将正式公布 🤙 敬请期待！
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end px-2">
              <button
                onClick={handleCopyCa}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  copied 
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                    : 'bg-[#ff2d8d] hover:bg-[#ff1493] text-white shadow-[0_0_15px_rgba(255,45,141,0.4)]'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                <span>{copied ? '已复制上线通知！🤙' : '即将公布 (点击提醒)'}</span>
              </button>

              <a
                href={TOKEN_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-[#ff2d8d]/20 hover:text-[#ff2d8d] text-slate-300 transition-colors"
                title="Telegram 官方群"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={TOKEN_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playCashChing()}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#ff1493] via-[#ff2d8d] to-[#ff459e] hover:from-[#ff2d8d] hover:to-[#ff1493] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_35px_rgba(255,45,141,0.6)] hover:shadow-[0_0_50px_rgba(255,45,141,0.9)] transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
            <span>加入 Telegram 官方频道</span>
          </a>

          <a
            href={TOKEN_INFO.geniusUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playClick()}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#111322] hover:bg-[#1a1c32] text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-[#ff2d8d]/40 hover:border-[#ff2d8d] transition-all shadow-md transform hover:-translate-y-0.5"
          >
            <span>在 Genius 平台探索</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              cyberAudio.playLaserBlip();
              document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-[#ff66b2] font-mono text-sm border border-slate-800 hover:border-[#ff2d8d]/50 transition-all"
          >
            <span>🤙</span>
            <span>{lang === 'ru' ? 'Тест 666 IQ' : lang === 'zh' ? '体验666交易仪' : 'Test 666 Simulator'}</span>
          </button>
        </div>

        {/* 5 High-Impact Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full max-w-5xl">
          <div className="p-4 rounded-2xl bg-[#0c0e18]/80 border border-slate-800/80 hover:border-[#ff2d8d]/40 transition-colors text-left">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'ru' ? 'СИМВОЛ' : lang === 'zh' ? '代币符号' : 'SYMBOL'}
            </span>
            <span className="font-display font-black text-xl text-white text-[#ff2d8d]">
              $SIX
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0e18]/80 border border-slate-800/80 hover:border-[#ff2d8d]/40 transition-colors text-left">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'ru' ? 'ЭМИССИЯ' : lang === 'zh' ? '总发行量' : 'SUPPLY'}
            </span>
            <span className="font-display font-black text-xl text-white">
              666,666,666
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0e18]/80 border border-slate-800/80 hover:border-[#ff2d8d]/40 transition-colors text-left">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'ru' ? 'НАЛОГ' : lang === 'zh' ? '滑点税费' : 'TAX'}
            </span>
            <span className="font-display font-black text-xl text-emerald-400">
              0% / 0%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0e18]/80 border border-slate-800/80 hover:border-[#ff2d8d]/40 transition-colors text-left">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              {lang === 'ru' ? 'СЕТЬ' : lang === 'zh' ? '部署网络' : 'NETWORK'}
            </span>
            <span className="font-display font-black text-xl text-yellow-400">
              BNB Chain
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#0c0e18]/80 border border-[#ff2d8d]/40 hover:border-[#ff2d8d] transition-colors text-left shadow-[0_0_15px_rgba(255,45,141,0.2)]">
            <span className="text-[11px] font-mono text-[#ff66b2] block mb-1">
              {lang === 'ru' ? 'GENIUS IQ' : lang === 'zh' ? '天才评级' : 'GENIUS RATING'}
            </span>
            <span className="font-display font-black text-xl text-white flex items-center gap-1">
              666 / 10 <span>🤙</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
