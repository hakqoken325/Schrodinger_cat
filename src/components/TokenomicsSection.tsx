import React from 'react';
import { PieChart, ShieldCheck, Flame, Lock, ArrowUpRight, Zap } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, TOKEN_INFO } from '../data/translations';

interface TokenomicsSectionProps {
  lang: Language;
}

export const TokenomicsSection: React.FC<TokenomicsSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].tokenomics;

  return (
    <section id="tokenomics" className="relative w-full py-20 bg-[#090a13] border-t border-slate-800/80 overflow-hidden">
      {/* Background neon ambient */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#ff2d8d]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-3">
            <PieChart className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {t.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* 4 Sleek Tokenomic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0e101d] border border-slate-800 hover:border-[#ff2d8d]/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,45,141,0.2)] flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  {item.label}
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block mb-2 group-hover:text-[#ff66b2]">
                  {item.value}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{item.note}</span>
                <span className="text-[#ff2d8d] font-bold">🤙 6</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Trust Bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#101222] border border-[#ff2d8d]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#ff2d8d]/20 border border-[#ff2d8d]/40 flex items-center justify-center text-[#ff2d8d] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                {lang === 'zh' ? '官方合约即将部署与开源认证' : '100% Transparent Smart Contract'}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                {lang === 'zh'
                  ? '无团队私税，0% 滑点磨损，上线即100%锁定流动性并在 BscScan 认证公布。'
                  : 'Open source, 0/0 tax, liquidity locked, community-driven on BNB Chain.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={TOKEN_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#181a2e] hover:bg-[#20233d] text-slate-200 hover:text-white text-xs font-bold border border-slate-700 hover:border-[#ff2d8d] transition-all"
            >
              <span>{lang === 'zh' ? '加入 Telegram 接收提醒' : 'Get Launch Alert'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={TOKEN_INFO.geniusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#ff2d8d] hover:bg-[#ff1493] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,45,141,0.4)] transition-all"
            >
              <span>{lang === 'zh' ? 'Genius 交易终端' : 'Genius Terminal'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
