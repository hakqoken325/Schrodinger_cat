import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, MEME_GALLERY } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';
import confetti from 'canvas-confetti';

interface MemeGallerySectionProps {
  lang: Language;
}

export const MemeGallerySection: React.FC<MemeGallerySectionProps> = ({ lang }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = CONTENT[lang].gallery;

  const handleCopyQuote = (id: string, text: string) => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(`${text} 🤙 $SIX #sixmeme #Genius`);
    setCopiedId(id);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ff2d8d', '#ffffff']
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="meme-pack" className="relative w-full py-20 bg-[#07080e] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {t.title}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Meme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MEME_GALLERY.map((meme) => (
            <div
              key={meme.id}
              className="p-6 rounded-3xl bg-[#0d0f1c] border border-slate-800 hover:border-[#ff2d8d]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,45,141,0.25)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff2d8d]/20 text-[#ff66b2] border border-[#ff2d8d]/40">
                    {meme.badge}
                  </span>
                  <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,45,141,0.5)] group-hover:scale-125 transition-transform">
                    {meme.gesture}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-white mb-2 group-hover:text-[#ff66b2] transition-colors">
                  {meme.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  “{meme.tagline}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleCopyQuote(meme.id, meme.tagline)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171a2e] hover:bg-[#20243e] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {copiedId === meme.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ff2d8d]" />}
                  <span>{copiedId === meme.id ? '已复制！🤙' : t.copyPrompt}</span>
                </button>

                <span className="font-mono text-xs text-slate-600">🤙 666</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
