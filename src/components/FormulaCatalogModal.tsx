import React, { useState } from 'react';
import { FormulaItem } from '../types';
import { X, Search, Sparkles, BookOpen } from 'lucide-react';

interface FormulaCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  formulas: FormulaItem[];
  currentFormulaId: string;
  onSelectFormula: (formula: FormulaItem) => void;
}

export const FormulaCatalogModal: React.FC<FormulaCatalogModalProps> = ({
  isOpen,
  onClose,
  formulas,
  currentFormulaId,
  onSelectFormula
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = formulas.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.explanation.toLowerCase().includes(search.toLowerCase()) ||
      f.categoryLabel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1b1309] border-2 border-yellow-500/50 rounded-3xl p-6 shadow-2xl text-amber-50 max-h-[85vh] flex flex-col shadow-yellow-950/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-amber-300/70 hover:text-white rounded-full bg-[#271b0e] hover:bg-[#382614] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-yellow-400 text-stone-950 shadow-md">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-amber-50">物理公式与学术定律宝典</h3>
            <p className="text-xs text-amber-200/80">点击任意科学定律，猫咪学者将即刻在黑板推导并深入沉思</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-400/70" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索公式名称、学科类别或物理定律..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#120b05] border border-amber-800/60 focus:border-yellow-400 focus:outline-none text-sm text-amber-100 placeholder:text-amber-500/40"
          />
        </div>

        {/* Formula Cards List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {filtered.map((item) => {
            const isSelected = item.id === currentFormulaId;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFormula(item);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#38230b]/90 border-yellow-400 ring-1 ring-yellow-400/80 shadow-md'
                    : 'bg-[#241a0e] hover:bg-[#302213] border-amber-800/40 hover:border-yellow-400/60'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                      {item.categoryLabel}
                    </span>
                    <h4 className="text-sm font-bold text-amber-100 truncate">{item.title}</h4>
                  </div>
                  <p className="text-xs text-amber-200/70 truncate">{item.explanation}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-yellow-300 font-mono">
                    {item.latex.slice(0, 18)}...
                  </span>
                  {isSelected && (
                    <div className="text-[11px] text-yellow-300 font-bold flex items-center justify-end gap-1 mt-1">
                      <Sparkles className="w-3 h-3 stroke-[2.5]" /> 正在黑板
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-amber-400/60 text-sm">
              未找到与“{search}”相关的学术定律或猜想
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
