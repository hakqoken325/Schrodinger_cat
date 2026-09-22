import React, { useState } from 'react';
import { FormulaItem } from '../types';
import { X, Sparkles, Wand2, Lightbulb } from 'lucide-react';

interface CustomFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newFormula: FormulaItem) => void;
}

const PRESET_IDEAS = [
  {
    title: '深夜咬脚踝法则',
    latex: 'F_{\\text{扑咬}} = \\mu \\cdot \\frac{\\text{外露脚踝}}{t_{\\text{熟睡}}}',
    explanation: '半夜被窝边缘露出的两脚兽脚踝对猫咪产生的捕猎向心力与熟睡时间成正比。',
    thought: '脚趾头在被子外面探出了三厘米，这明显是在公然挑衅领地安全守则！',
    categoryLabel: '猫咪物理学'
  },
  {
    title: '吸尘器奇点坍缩定理',
    latex: 'v_{\\text{逃逸}} \\ge 3 \\times 10^8 \\text{ m/s} \\iff \\text{吸尘器} = \\text{启动}',
    explanation: '只要吸尘器电机发出嗡鸣，猫咪即刻坍缩并以超光速遁入床底深渊。',
    thought: '那个吞噬一切的嗡鸣黑洞恶魔又启动了，战术性撤离至衣柜顶端！',
    categoryLabel: '猫咪物理学'
  },
  {
    title: '猫咪熵增与猫砂弥散律',
    latex: '\\Delta S_{\\text{居室}} \\ge 0 \\quad (\\text{飞溅猫砂})',
    explanation: '埋砂动作结束后，整个房间的混乱度自发单调递增，猫砂均匀分布在每个角落。',
    thought: '我只是把砂砾均匀摊平，为地毯提供更好的量子缓冲减震层罢了。',
    categoryLabel: '猫咪物理学'
  }
];

export const CustomFormulaModal: React.FC<CustomFormulaModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [latex, setLatex] = useState('');
  const [explanation, setExplanation] = useState('');
  const [catThought, setCatThought] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !latex.trim()) return;

    const customItem: FormulaItem = {
      id: `custom_${Date.now()}`,
      category: 'feline_physics',
      categoryLabel: '自创公式',
      title: title.trim(),
      latex: latex.trim(),
      explanation: explanation.trim() || '由两脚兽提出并经猫咪学者联合推导的物理新猜想。',
      catThought: catThought.trim() || '喵呜，这个切入点颇有深意！看来两脚兽终于领悟了喵星物理的基础...',
      catMemeQuote: '“科学的尽头是罐头与小鱼干”',
      chalkColor: 'yellow',
      difficultyStars: 5,
      subNotes: ['• 该公式已获猫咪科学院学术评审委员会全票通过']
    };

    onSubmit(customItem);
    onClose();
  };

  const applyPreset = (preset: typeof PRESET_IDEAS[0]) => {
    setTitle(preset.title);
    setLatex(preset.latex);
    setExplanation(preset.explanation);
    setCatThought(preset.thought);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1c140a] border-2 border-yellow-500/50 rounded-3xl p-6 shadow-2xl text-amber-50 shadow-yellow-950/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-amber-300/70 hover:text-white rounded-full bg-[#271c10] hover:bg-[#382717] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-yellow-400 text-stone-950 shadow-md">
            <Wand2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-amber-50">向猫咪学者呈递物理新猜想</h3>
            <p className="text-xs text-amber-200/80">猫咪学者会用粉笔工整抄写在黑板上，并展开学术沉思</p>
          </div>
        </div>

        {/* Presets */}
        <div className="mb-4">
          <label className="text-xs font-bold text-yellow-300 mb-1.5 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" /> 快捷灵感候选：
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_IDEAS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 text-xs rounded-xl bg-[#281c10] hover:bg-[#382716] text-amber-200 border border-amber-700/50 hover:border-yellow-400 transition-colors shadow-sm"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              公式或定理名称 *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：黑色长裤上的猫毛范德华吸附定理"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120c06] border border-amber-800/60 focus:border-yellow-400 focus:outline-none text-sm text-amber-100 placeholder:text-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              数学公式 (支持 LaTeX 或普通文本) *
            </label>
            <input
              type="text"
              required
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              placeholder="E = m c^2  或  F = m \\cdot a"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120c06] border border-amber-800/60 focus:border-yellow-400 focus:outline-none text-sm font-mono text-yellow-300 placeholder:text-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              通俗物理释义
            </label>
            <input
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="用浅显生动的文字解释这条定律..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120c06] border border-amber-800/60 focus:border-yellow-400 focus:outline-none text-sm text-amber-100 placeholder:text-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              猫咪内心独白 (展示在思考气泡中)
            </label>
            <textarea
              rows={2}
              value={catThought}
              onChange={(e) => setCatThought(e.target.value)}
              placeholder="猫咪学者凝视黑板时内心的独白..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#120c06] border border-amber-800/60 focus:border-yellow-400 focus:outline-none text-sm text-amber-100 placeholder:text-amber-500/40"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-300/80 hover:text-white hover:bg-[#281c10] transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 shadow-lg shadow-yellow-950/60 transition-all hover:scale-105 ring-1 ring-yellow-200"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>粉笔抄上黑板！</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
