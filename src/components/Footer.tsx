import React from 'react';
import { Send, Twitter, ExternalLink, Flame, ShieldAlert, Heart } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, TOKEN_INFO } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = CONTENT[lang].footer;

  const handleEasterEgg = () => {
    cyberAudio.playGeniusChime();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.9 },
      colors: ['#ff2d8d', '#ff1493', '#ffffff', '#ffd700']
    });
  };

  return (
    <footer className="w-full bg-[#05060a] border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div 
              onClick={handleEasterEgg}
              className="flex items-center gap-3 cursor-pointer group mb-4 select-none"
            >
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black border border-[#ff2d8d]/60 shadow-[0_0_15px_rgba(255,45,141,0.5)] group-hover:scale-105 transition-transform">
                <img src="/six_logo.jpg" alt="sixmeme logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white group-hover:text-[#ff2d8d] transition-colors">
                  sixmeme
                </span>
                <span className="text-xs font-mono text-[#ff66b2] ml-2 font-bold">
                  $SIX 🤙
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
              {t.text}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={TOKEN_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff2d8d] text-slate-300 hover:text-[#ff2d8d] flex items-center justify-center transition-all shadow-sm"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={TOKEN_INFO.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff2d8d] text-slate-300 hover:text-[#ff2d8d] flex items-center justify-center transition-all shadow-sm"
                title="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={TOKEN_INFO.chartUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="px-3.5 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff2d8d] text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm"
              >
                <span>DexScreener</span>
                <ExternalLink className="w-3 h-3 text-[#ff2d8d]" />
              </a>

              <a
                href={TOKEN_INFO.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="px-3.5 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff2d8d] text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm"
              >
                <span>BscScan</span>
                <ExternalLink className="w-3 h-3 text-[#ff2d8d]" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Genius 生态链接
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a
                  href={TOKEN_INFO.geniusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff2d8d] transition-colors flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-[#ff2d8d]" />
                  <span>Genius 交易终端</span>
                </a>
              </li>
              <li>
                <a
                  href={TOKEN_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff2d8d] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#ff2d8d]" />
                  <span>Telegram 官方频道</span>
                </a>
              </li>
              <li>
                <a
                  href={TOKEN_INFO.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ff2d8d] transition-colors flex items-center gap-1.5"
                >
                  <Twitter className="w-3.5 h-3.5 text-[#ff2d8d]" />
                  <span>X (Twitter) 官方推特</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Easter Egg / 666 Salute */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                致敬数字 6
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                打出标志性 6 手势，激活超神交易灵感，迎接属于你的百倍阿尔法！
              </p>
            </div>

            <button
              onClick={handleEasterEgg}
              className="w-full py-2.5 px-4 rounded-xl bg-[#141628] hover:bg-[#1f223d] border border-[#ff2d8d]/30 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,45,141,0.2)] flex items-center justify-center gap-2"
            >
              <span>🤙</span>
              <span>点击打出 666 暴击</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.rights}</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <span className="text-[#ff2d8d]">♥</span>
            <span>for Genius degens & 6-believers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
