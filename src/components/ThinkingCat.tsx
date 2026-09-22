import React, { useState, useEffect } from 'react';
import { FormulaItem, CatMood } from '../types';
import { chalkAudio } from '../utils/chalkAudio';
import catProfileImg from '../assets/images/cat_thinker_profile_1790049408094.jpg';
import { Lightbulb, Heart, Brain, Sparkles, MessageCircle } from 'lucide-react';

interface ThinkingCatProps {
  currentFormula: FormulaItem;
  onNewThoughtTrigger: () => void;
  soundEnabled: boolean;
}

export const ThinkingCat: React.FC<ThinkingCatProps> = ({
  currentFormula,
  onNewThoughtTrigger,
  soundEnabled
}) => {
  const [mood, setMood] = useState<CatMood>('philosophical');
  const [petCount, setPetCount] = useState<number>(0);
  const [isSparkling, setIsSparkling] = useState<boolean>(false);
  const [catSpeechToast, setCatSpeechToast] = useState<string | null>(null);
  const [blinkEye, setBlinkEye] = useState<boolean>(false);

  // Periodic eye blink / meditation state
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkEye(true);
      setTimeout(() => setBlinkEye(false), 240);
    }, 4500 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // When formula changes, trigger breakthrough epiphany sparkle
  useEffect(() => {
    setIsSparkling(true);
    setMood('genius');
    if (soundEnabled) {
      chalkAudio.playBreakthroughChime();
    }
    const timer = setTimeout(() => {
      setIsSparkling(false);
      setMood('philosophical');
    }, 1800);
    return () => clearTimeout(timer);
  }, [currentFormula.id, soundEnabled]);

  // Pet the cat interaction
  const handlePetCat = () => {
    const newCount = petCount + 1;
    setPetCount(newCount);

    if (soundEnabled) {
      chalkAudio.playPurr();
    }

    // Interactive humorous cat reactions in Chinese
    const quotes = [
      '喵呜... 你打断了我对量子引力的推导！不过被挠得挺舒服...',
      '喵里卡（Eureka）！一道灵光在毛茸茸的脑海中闪现！',
      '再挠挠本学者的耳根——我就能证明 P 与 NP 猜想！',
      '呼噜噜... 两脚兽，快奉上三文鱼罐头以刺激神经突触！',
      '根据贝叶斯定理测算，连续抚摸超过4次后产生轻咬的概率为 85%！'
    ];

    setCatSpeechToast(quotes[newCount % quotes.length]);
    setIsSparkling(true);

    setTimeout(() => {
      setCatSpeechToast(null);
      setIsSparkling(false);
    }, 3200);

    // After 3 pets, trigger a breakthrough new formula
    if (newCount % 3 === 0) {
      onNewThoughtTrigger();
    }
  };

  return (
    <div
      id="thinking-cat-widget"
      className="relative flex flex-col items-center select-none"
    >
      {/* ======================================================== */}
      {/* 1. FLOATING THOUGHT BUBBLE (猫咪飘浮思想云泡)             */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-md mb-2">
        {/* Main Thought Cloud */}
        <div
          className="relative bg-gradient-to-br from-[#24190c]/95 via-[#1e140a]/95 to-[#291b0d]/90 backdrop-blur-md text-amber-50 p-5 rounded-3xl border-2 border-yellow-400/50 shadow-2xl transition-all duration-300"
          style={{
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(250, 204, 21, 0.2)'
          }}
        >
          {/* Header of the thought bubble */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-600/30 text-xs">
            <div className="flex items-center gap-2 text-yellow-300 font-bold tracking-wide">
              <Brain className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>猫咪脑力风暴回路</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-950 font-bold text-[11px] bg-yellow-400 px-2.5 py-0.5 rounded-full border border-yellow-300 shadow-sm">
              <Sparkles className="w-3 h-3 stroke-[2.5]" />
              <span>神经元利用率: 160%</span>
            </div>
          </div>

          {/* Deep Cat Inner Monologue */}
          <p className="font-chalk-hand text-2xl text-amber-100 leading-snug tracking-wide italic min-h-[56px] flex items-center">
            “{currentFormula.catThought}”
          </p>

          {/* Toast speech if petted */}
          {catSpeechToast && (
            <div className="mt-2 text-xs font-sans text-yellow-100 bg-[#38230b]/90 p-2.5 rounded-xl border border-yellow-400/60 animate-bounce flex items-center gap-2 shadow-lg">
              <Heart className="w-3.5 h-3.5 text-yellow-400 shrink-0 fill-yellow-400" />
              <span>{catSpeechToast}</span>
            </div>
          )}

          {/* Subtle bottom note in thought bubble */}
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-800/30 text-[11px] text-amber-300/80">
            <span className="flex items-center gap-1 text-amber-200">
              <MessageCircle className="w-3.5 h-3.5 text-yellow-400" />
              主题: {currentFormula.categoryLabel}
            </span>
            <button
              onClick={onNewThoughtTrigger}
              className="text-yellow-300 hover:text-yellow-100 font-semibold underline underline-offset-2 hover:scale-105 transition-transform"
            >
              下一条灵感 →
            </button>
          </div>
        </div>

        {/* Comic Thought Bubble Trail Dots */}
        <div className="flex flex-col items-center gap-1.5 -mb-2 mt-1">
          <div className="w-4 h-4 rounded-full bg-[#24190c] border-2 border-yellow-400/60 shadow-md" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#24190c] border border-yellow-400/60 shadow-sm" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#24190c] border border-yellow-400/60" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. THE THINKING CAT IN RODIN POSE                        */}
      {/* ======================================================== */}
      <div className="relative group cursor-pointer" onClick={handlePetCat}>
        {/* Glow of inspiration around the cat */}
        <div
          className={`absolute -inset-4 rounded-full transition-opacity duration-700 pointer-events-none ${
            isSparkling ? 'opacity-90 bg-yellow-400/30 blur-2xl animate-pulse' : 'opacity-25 bg-amber-500/20 blur-xl'
          }`}
        />

        {/* Lightbulb of Epiphany over head */}
        {isSparkling && (
          <div className="absolute -top-6 right-1/4 z-30 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-lg shadow-yellow-500/40 animate-bounce ring-2 ring-yellow-200">
            <Lightbulb className="w-4 h-4 fill-stone-950" />
            <span>顿悟灵光！</span>
          </div>
        )}

        {/* Cat Card / Portrait in exact Thinker Pose */}
        <div
          className="relative w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-92 rounded-3xl overflow-hidden border-2 border-amber-500/60 shadow-2xl transition-all duration-300 group-hover:border-yellow-300 group-hover:shadow-[0_0_35px_rgba(250,204,21,0.4)]"
          style={{
            background: 'linear-gradient(to bottom, #2b1b0b, #170e05)'
          }}
        >
          {/* Thinking Cat Profile Image */}
          <img
            src={catProfileImg}
            alt="沉思猫咪学者托腮端坐在黑板前思考物理公式"
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
              blinkEye ? 'brightness-95 contrast-105' : 'brightness-100'
            }`}
          />

          {/* Ambient Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150d05] via-transparent to-black/25 pointer-events-none" />

          {/* Academic Badge */}
          <div className="absolute top-3 left-3 bg-[#191107]/85 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-400/50 text-[11px] font-bold text-yellow-200 flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <span>正在黑板前托腮沉思</span>
          </div>

          {/* Petting prompt on hover */}
          <div className="absolute bottom-3 inset-x-3 bg-[#1c1207]/90 backdrop-blur-sm py-2 px-3 rounded-2xl border border-amber-600/50 flex items-center justify-between text-xs text-amber-100 group-hover:border-yellow-400 transition-colors shadow-lg">
            <div className="flex items-center gap-1.5 text-yellow-300 font-bold">
              <Heart className="w-3.5 h-3.5 text-yellow-400 group-hover:animate-ping fill-yellow-400" />
              <span>抚摸猫咪学者 ({petCount})</span>
            </div>
            <span className="text-[10px] text-amber-300/80 font-mono">呼噜呼噜中</span>
          </div>
        </div>

        {/* Wooden desk table under the cat */}
        <div
          className="w-full h-4 mt-1 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(to right, #341d0c, #5c3514, #341d0c)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.8), 0 0 12px rgba(234,179,8,0.15)'
          }}
        />
      </div>
    </div>
  );
};
