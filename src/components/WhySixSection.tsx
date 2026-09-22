import React from 'react';
import { Sparkles, Zap, ShieldCheck, Flame, Award, Lightbulb } from 'lucide-react';
import { Language } from '../types';
import { CONTENT } from '../data/translations';

interface WhySixSectionProps {
  lang: Language;
}

export const WhySixSection: React.FC<WhySixSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].about;

  return (
    <section id="why-six" className="relative w-full py-20 bg-[#080911] border-y border-slate-800/80 overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff2d8d]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7928ca]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {t.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* 3 Main Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl p-8 bg-[#0d0f1c]/90 border border-slate-800 hover:border-[#ff2d8d]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,141,0.2)] group flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 font-display font-black text-4xl text-slate-800 group-hover:text-[#ff2d8d]/30 transition-colors">
                {card.num}
              </div>

              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff2d8d]/20 to-transparent border border-[#ff2d8d]/40 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <span>{card.icon}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-[#ff66b2] transition-colors">
                  {card.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>GENIUS PROTOCOL</span>
                <span className="text-[#ff2d8d] font-bold">🤙 666</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight Infographic Banner: The Formula of 6 */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#121426] via-[#1b1022] to-[#121426] border border-[#ff2d8d]/40 shadow-[0_0_40px_rgba(255,45,141,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-xs font-mono font-bold text-[#ff66b2] uppercase tracking-wider block mb-2">
              {lang === 'ru' ? 'КУЛЬТУРНАЯ МАТЕМАТИКА' : lang === 'zh' ? '文化数学共识' : 'CULTURAL MATHEMATICS'}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3">
              🤙 6 + GENIUS = <span className="text-[#ff2d8d] neon-pink-text">$SIX</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              {lang === 'ru'
                ? 'На платформе Genius тысячи трейдеров ежедневно ищут ту самую альфу. Когда сделка взлетает, весь чат взрывается жестом 🤙. Мы овеществили этот триумф в токене sixmeme.'
                : lang === 'zh'
                ? '在Genius交易终端上，万千交易员捕捉十倍百倍暴击。当交易大获全胜时，全屏刷满“666”与🤙手势。$SIX 就是将这份极致荣耀代币化的结晶。'
                : 'On the Genius trading terminal, thousands of traders seek unstoppable alpha. When a trade explodes, the community throws up the 🤙 6. sixmeme is the tokenized embodiment of that victory.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-black/60 border border-[#ff2d8d]/30 text-center">
              <span className="text-[11px] font-mono text-slate-400 block">
                {lang === 'zh' ? 'MEME 共识度' : 'MEME SYNERGY'}
              </span>
              <span className="text-lg font-bold text-white">
                {lang === 'zh' ? '100% 社区有机' : '100% Organic'}
              </span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-black/60 border border-[#ff2d8d]/30 text-center">
              <span className="text-[11px] font-mono text-slate-400 block">
                {lang === 'zh' ? 'GENIUS 极速' : 'GENIUS SPEED'}
              </span>
              <span className="text-lg font-bold text-[#ff66b2]">
                {lang === 'zh' ? '毫秒级狙击' : 'Instant Sniper'}
              </span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-black/60 border border-[#ff2d8d]/30 text-center">
              <span className="text-[11px] font-mono text-slate-400 block">
                {lang === 'zh' ? '能量共鸣' : 'VIBE CHECK'}
              </span>
              <span className="text-lg font-bold text-emerald-400">
                {lang === 'zh' ? '纯粹 666 🤙' : 'Pure 666 🤙'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
