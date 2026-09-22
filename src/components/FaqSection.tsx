import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { CONTENT } from '../data/translations';
import { cyberAudio } from '../utils/cyberAudio';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = CONTENT[lang].faq;

  const toggleFaq = (idx: number) => {
    cyberAudio.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-20 bg-[#080911] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151728] border border-[#ff2d8d]/30 text-xs font-mono font-bold text-[#ff66b2] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff2d8d]" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            {t.title}
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0d0f1c] border border-slate-800 hover:border-[#ff2d8d]/40 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#ff2d8d]">Q:</span> {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ff2d8d] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
