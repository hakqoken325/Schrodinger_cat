import React, { useState } from 'react';
import { Terminal, Zap, Flame, Award, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { Language, TradeQuote } from '../types';
import { CONTENT, TRADE_QUOTES } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';

interface InteractiveTerminalProps {
  lang: Language;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ lang }) => {
  const t = CONTENT[lang].terminal;
  const quotes = TRADE_QUOTES[lang];

  const [iqScore, setIqScore] = useState<number>(666);
  const [combo, setCombo] = useState<number>(0);
  const [simulatedProfit, setSimulatedProfit] = useState<number>(6660);
  const [recentTrades, setRecentTrades] = useState<TradeQuote[]>([
    quotes[0],
    quotes[1],
    quotes[2]
  ]);
  const [lastActionText, setLastActionText] = useState<string>('+666 IQ');
  const [isPressing, setIsPressing] = useState<boolean>(false);

  const getRank = (c: number) => {
    if (c >= 24) return lang === 'ru' ? 'ВЫСШИЙ БОГ ДЖИНИУСА 🤙' : lang === 'zh' ? '至尊666通天神仙 🤙' : 'SUPREME GENIUS OVERLORD 🤙';
    if (c >= 12) return lang === 'ru' ? 'КИБЕР-СНАЙПЕР GENIUS ⚡' : lang === 'zh' ? 'Genius极速黑客狙击手 ⚡' : 'GENIUS CYBER SNIPER ⚡';
    if (c >= 6) return lang === 'ru' ? 'МАСТЕР ЖЕСТА 666 🔥' : lang === 'zh' ? '666老铁入道大师 🔥' : '666 GESTURE MASTER 🔥';
    if (c >= 1) return lang === 'ru' ? 'ПРОДВИНУТЫЙ ДЕГЕН 📈' : lang === 'zh' ? '觉醒交易员 📈' : 'ENLIGHTENED DEGEN 📈';
    return lang === 'ru' ? 'НОВИЧОК В ТЕРМИНАЛЕ' : lang === 'zh' ? '初入终端玩家' : 'TERMINAL ROOKIE';
  };

  const handleThrowSix = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 200);

    // Audio effects
    cyberAudio.playGeniusChime();

    // Visual confetti
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#ff2d8d', '#ff1493', '#ffffff', '#ffd700', '#00f0ff']
    });

    // Score calculations
    const addedIq = 66 + Math.floor(Math.random() * 60);
    const addedProfit = 666 + Math.floor(Math.random() * 1200);
    const newCombo = combo + 1;

    setIqScore((prev) => prev + addedIq);
    setCombo(newCombo);
    setSimulatedProfit((prev) => prev + addedProfit);
    setLastActionText(`+${addedIq} IQ 🤙`);

    // Pick random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const uniqueIdQuote: TradeQuote = {
      ...randomQuote,
      id: `${Date.now()}_${Math.random()}`
    };

    setRecentTrades((prev) => [uniqueIdQuote, ...prev.slice(0, 4)]);
  };

  const handleReset = () => {
    cyberAudio.playClick();
    setCombo(0);
    setIqScore(666);
    setSimulatedProfit(6660);
    setRecentTrades([quotes[0], quotes[1], quotes[2]]);
  };

  return (
    <section id="terminal" className="relative w-full py-20 bg-[#07080f] overflow-hidden cyber-dots">
      {/* Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff2d8d]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-3">
            <Terminal className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {t.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* The Cyberpunk Terminal Window */}
        <div className="rounded-3xl bg-[#0c0d18] border-2 border-[#ff2d8d]/40 shadow-[0_0_50px_rgba(255,45,141,0.25)] overflow-hidden">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-[#121424] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="font-mono text-xs text-slate-400 font-semibold ml-2">
                GENIUS-OS :: v6.66.0 :: BNB-CHAIN-NODE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ff2d8d]/15 text-[#ff66b2] text-[11px] font-mono font-bold border border-[#ff2d8d]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d8d] animate-pulse" />
                STATUS: 666% ALPHA
              </span>
              <button
                onClick={handleReset}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                title="Reset Simulator"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Core Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Big Interactive "Throw 6" Button & Stats */}
            <div className="lg:col-span-7 flex flex-col items-center text-center">
              {/* Status Rank Badge */}
              <div className="px-4 py-1.5 rounded-full bg-[#16182a] border border-[#ff2d8d]/40 text-xs font-mono font-extrabold text-[#ff66b2] mb-6 shadow-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>{getRank(combo)}</span>
              </div>

              {/* The Big Pulsing Button */}
              <button
                onClick={handleThrowSix}
                className={`relative group w-full max-w-md py-6 sm:py-8 px-6 rounded-3xl bg-gradient-to-r from-[#ff1493] via-[#ff2d8d] to-[#ff459e] text-white font-display font-black text-xl sm:text-2xl tracking-wider shadow-[0_0_50px_rgba(255,45,141,0.6)] hover:shadow-[0_0_70px_rgba(255,45,141,0.9)] transition-all transform active:scale-95 cursor-pointer border-2 border-white/20 ${
                  isPressing ? 'scale-95' : 'hover:-translate-y-1'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl sm:text-5xl animate-bounce">🤙</span>
                  <span>{t.button}</span>
                  <span className="text-xs font-mono font-normal opacity-90 tracking-normal">
                    {lang === 'ru' ? 'Нажми, чтобы запустить альфа-выброс' : lang === 'zh' ? '连击打出至尊666' : 'Click to trigger alpha burst'}
                  </span>
                </div>

                {/* Floating feedback label */}
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-black/90 border border-yellow-400 text-yellow-300 font-mono text-xs font-bold shadow-lg animate-pulse">
                  {lastActionText}
                </div>
              </button>

              {/* Real-time stats bar */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
                <div className="p-3 rounded-2xl bg-[#121424] border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">{t.iqLabel}</span>
                  <span className="font-display font-bold text-lg text-[#ff66b2]">{iqScore}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#121424] border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">{t.comboLabel}</span>
                  <span className="font-display font-bold text-lg text-yellow-400">x{combo}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#121424] border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">{t.totalSimulated}</span>
                  <span className="font-display font-bold text-lg text-emerald-400">+${simulatedProfit}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Genius Trade Feed */}
            <div className="lg:col-span-5 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#ff2d8d]" />
                    {t.historyTitle}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">LIVE FEED</span>
                </div>

                <div className="space-y-2.5">
                  {recentTrades.map((trade) => (
                    <div
                      key={trade.id}
                      className="p-3 rounded-2xl bg-[#131525] border border-slate-800/80 hover:border-[#ff2d8d]/40 transition-colors flex items-center justify-between gap-3 animate-fadeIn"
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#ff2d8d]/20 text-[#ff66b2] border border-[#ff2d8d]/30 mr-2">
                          {trade.tag}
                        </span>
                        <p className="text-xs text-slate-200 font-medium truncate mt-1">
                          {trade.text}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="font-mono font-bold text-xs text-emerald-400 block">
                          {trade.multiplier}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">GENIUS 6</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Pro Tip */}
              <div className="mt-4 p-3 rounded-2xl bg-[#16182c]/80 border border-slate-800/60 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff2d8d] shrink-0" />
                <span>
                  {lang === 'ru'
                    ? 'Секрет торговли: при каждом удачном лонге на Genius выбрасывай 🤙!'
                    : lang === 'zh'
                    ? '交易秘籍：在Genius每一波盈利出局时，别忘了打出 🤙 666！'
                    : 'Trading pro-tip: Always throw up the 🤙 6 on every profitable Genius trade!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
