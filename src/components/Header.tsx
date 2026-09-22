import React from 'react';
import { Volume2, VolumeX, Play, Pause, PlusCircle, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onOpenCustomModal: () => void;
  onOpenCatalog: () => void;
  onResetToStart: () => void;
  currentFormulaIndex: number;
  totalFormulas: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  isAutoPlaying,
  onToggleAutoPlay,
  onOpenCustomModal,
  onOpenCatalog,
  onResetToStart,
  currentFormulaIndex,
  totalFormulas
}) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 border-b border-amber-600/30 bg-[#191309]/85 backdrop-blur-md sticky top-0 z-40 transition-all shadow-md shadow-yellow-950/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Academic Title */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border border-yellow-200/80 flex items-center justify-center shadow-lg shadow-amber-950/60 transition-transform hover:scale-105">
            <span className="text-2xl filter drop-shadow">🐾</span>
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-amber-50">
                沉思猫咪学者与物理黑板
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-yellow-400 text-stone-950 border border-yellow-300 shadow-sm">
                猫咪科学院
              </span>
            </div>
            <p className="text-xs text-amber-200/80 font-chalk-hand text-base tracking-wide mt-0.5">
              第 {currentFormulaIndex + 1} / {totalFormulas} 条宇宙法则 • 凝视黑板，托腮沉思
            </p>
          </div>
        </div>

        {/* Action Controls & Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Auto Cycle Thoughts Button */}
          <button
            id="header-autoplay-toggle"
            onClick={onToggleAutoPlay}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              isAutoPlaying
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 ring-2 ring-yellow-300 shadow-md shadow-yellow-500/30 animate-pulse font-bold'
                : 'bg-[#241a0e] hover:bg-[#302213] text-amber-100 border border-amber-600/40 hover:border-amber-400'
            }`}
            title={isAutoPlaying ? '暂停自动思考' : '开启自动轮换思考'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? '沉思中...' : '自动轮播思考'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="header-sound-toggle"
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              soundEnabled
                ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50 hover:bg-amber-500/35 shadow-inner'
                : 'bg-[#22190d] text-amber-300/50 border border-amber-900/40 hover:bg-[#2b1f11]'
            }`}
            title={soundEnabled ? '关闭粉笔与呼噜声' : '开启粉笔书写声与呼噜声'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-yellow-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? '粉笔声效: 开启' : '静音模式'}</span>
          </button>

          {/* Catalog Button */}
          <button
            id="header-open-catalog-btn"
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#261c10] hover:bg-[#332515] text-amber-100 border border-amber-600/40 hover:border-yellow-400 transition-colors shadow-sm"
            title="查看完整学术公式秘籍"
          >
            <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
            <span>公式全集</span>
          </button>

          {/* Custom Formula / Ask Cat button */}
          <button
            id="header-custom-formula-btn"
            onClick={onOpenCustomModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 transition-all hover:scale-105 shadow-md shadow-yellow-950/60 ring-1 ring-yellow-200/50"
            title="向猫咪学者提出你的物理猜想或公式"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>写新公式</span>
          </button>
        </div>
      </div>
    </header>
  );
};
