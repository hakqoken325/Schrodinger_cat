import React from 'react';
import { FormulaCategory } from '../types';
import { Atom, Compass, Cat, Pi, Orbit, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: FormulaCategory | 'all';
  onSelectCategory: (cat: FormulaCategory | 'all') => void;
  onPrevFormula: () => void;
  onNextFormula: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  onPrevFormula,
  onNextFormula
}) => {
  const categories: { id: FormulaCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: '全部学科', icon: <Compass className="w-3.5 h-3.5 text-yellow-400" /> },
    { id: 'feline_physics', label: '猫咪物理学', icon: <Cat className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'quantum', label: '量子叠加态', icon: <Atom className="w-3.5 h-3.5 text-yellow-300" /> },
    { id: 'relativity', label: '时空相对论', icon: <Orbit className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'math', label: '纯粹数学之美', icon: <Pi className="w-3.5 h-3.5 text-yellow-200" /> },
    { id: 'cosmology', label: '天体宇宙学', icon: <Compass className="w-3.5 h-3.5 text-amber-300" /> }
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 py-1.5 px-2">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-stone-950 font-extrabold shadow-md shadow-yellow-950/60 scale-105 ring-1 ring-yellow-200'
                  : 'bg-[#22180c]/90 hover:bg-[#2f2111] text-amber-200/90 border border-amber-700/30 hover:border-yellow-500/50'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Prev / Next Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevFormula}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#22180c] hover:bg-[#302110] text-amber-200 border border-amber-700/40 hover:border-yellow-400 transition-colors shadow-sm"
          title="上一条公式与猫咪心声"
        >
          <ChevronLeft className="w-4 h-4 text-yellow-400" />
          <span className="hidden sm:inline">上一条</span>
        </button>

        <button
          onClick={onNextFormula}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 shadow-md shadow-yellow-950/60 transition-all hover:scale-105 ring-1 ring-yellow-200/60"
          title="下一条公式与猫咪心声"
        >
          <span>下一条思考</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
