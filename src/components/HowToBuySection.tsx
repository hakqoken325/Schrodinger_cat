import React, { useState } from 'react';
import { ShoppingCart, Copy, Check, ExternalLink, ArrowRight, Wallet, DollarSign, RefreshCw, Sparkles, Clock, Send } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, TOKEN_INFO } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';

interface HowToBuySectionProps {
  lang: Language;
}

export const HowToBuySection: React.FC<HowToBuySectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const t = CONTENT[lang].howToBuy;

  const handleCopy = () => {
    cyberAudio.playCashChing();
    navigator.clipboard.writeText('sixmeme ($SIX) 官方合约即将正式发布，请关注官方 Telegram 获取首发通知！');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Wallet className="w-6 h-6 text-[#ff2d8d]" />;
      case 1: return <DollarSign className="w-6 h-6 text-yellow-400" />;
      case 2: return <Clock className="w-6 h-6 text-cyan-400" />;
      case 3: return <Sparkles className="w-6 h-6 text-emerald-400" />;
      default: return <ShoppingCart className="w-6 h-6 text-[#ff2d8d]" />;
    }
  };

  return (
    <section id="how-to-buy" className="relative w-full py-20 bg-[#080911] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-3">
            <ShoppingCart className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {t.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            只需 4 个极简步骤，做好准备，随时加入 Genius 666 超级狂欢！
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#0d0f1b] border border-slate-800 hover:border-[#ff2d8d]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,141,0.2)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#14172a] border border-slate-800 group-hover:border-[#ff2d8d]/40 flex items-center justify-center transition-colors">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-display font-black text-3xl text-slate-800 group-hover:text-[#ff2d8d]/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#ff66b2] transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx === 2 && (
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <a
                    href={TOKEN_INFO.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playCashChing()}
                    className="w-full py-2 px-3 rounded-xl bg-[#171a2e] hover:bg-[#20243e] text-[11px] font-mono font-bold text-slate-200 border border-[#ff2d8d]/50 hover:border-[#ff2d8d] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#ff2d8d]" />
                    <span>关注官方频道 (即将公布)</span>
                  </a>
                </div>
              )}

              {idx === 3 && (
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <a
                    href={TOKEN_INFO.geniusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playCashChing()}
                    className="w-full py-2 px-3 rounded-xl bg-[#ff2d8d] hover:bg-[#ff1493] text-white text-[11px] font-bold shadow-[0_0_15px_rgba(255,45,141,0.4)] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>在 Genius 平台准备</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
