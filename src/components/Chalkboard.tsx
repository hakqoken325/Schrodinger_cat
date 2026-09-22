import React, { useEffect, useRef, useState, useMemo } from 'react';
import katex from 'katex';
import { FormulaItem } from '../types';
import { chalkAudio } from '../utils/chalkAudio';
import { Eraser, Pencil, Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface ChalkboardProps {
  formula: FormulaItem;
  isWriting: boolean;
  onWritingDone: () => void;
  onClearBoard: () => void;
  soundEnabled: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface UserDoodle {
  points: Point[];
  color: string;
  width: number;
}

export const Chalkboard: React.FC<ChalkboardProps> = ({
  formula,
  isWriting,
  onWritingDone,
  onClearBoard,
  soundEnabled
}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [formulaProgress, setFormulaProgress] = useState(0); // 0 to 1
  const [notesProgress, setNotesProgress] = useState<number[]>([]);
  const [activeChalkColor, setActiveChalkColor] = useState<string>('#ffffff');
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
  const [showDerivation, setShowDerivation] = useState<boolean>(true);
  const [doodles, setDoodles] = useState<UserDoodle[]>([]);
  const [isWiping, setIsWiping] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<Point[]>([]);

  // Sound sync helper
  const soundRef = useRef(soundEnabled);
  useEffect(() => {
    soundRef.current = soundEnabled;
  }, [soundEnabled]);

  // Progressive chalk handwriting animation when formula changes
  useEffect(() => {
    setDisplayedTitle('');
    setFormulaProgress(0);
    setNotesProgress(formula.subNotes ? formula.subNotes.map(() => 0) : []);

    let titleIndex = 0;
    const titleText = formula.title;
    let cancelled = false;

    // Step 1: Write Title
    const titleInterval = setInterval(() => {
      if (cancelled) return;
      if (titleIndex < titleText.length) {
        titleIndex++;
        setDisplayedTitle(titleText.slice(0, titleIndex));
        if (soundRef.current && titleIndex % 3 === 0) {
          chalkAudio.playChalkScratch(0.4);
        }
      } else {
        clearInterval(titleInterval);

        // Step 2: Write Main Formula smoothly
        let progress = 0;
        const formulaInterval = setInterval(() => {
          if (cancelled) return;
          progress += 0.08;
          if (progress >= 1) {
            setFormulaProgress(1);
            clearInterval(formulaInterval);

            // Step 3: Write subnotes
            if (formula.subNotes && formula.subNotes.length > 0) {
              let noteIdx = 0;
              const noteInterval = setInterval(() => {
                if (cancelled) return;
                setNotesProgress((prev) => {
                  const next = [...prev];
                  if (noteIdx < next.length) {
                    next[noteIdx] = 1;
                    noteIdx++;
                    if (soundRef.current) chalkAudio.playChalkScratch(0.35);
                    return next;
                  }
                  clearInterval(noteInterval);
                  onWritingDone();
                  return next;
                });
              }, 400);
            } else {
              onWritingDone();
            }
          } else {
            setFormulaProgress(progress);
            if (soundRef.current && Math.random() > 0.4) {
              chalkAudio.playChalkScratch(0.5);
            }
          }
        }, 60);
      }
    }, 45);

    return () => {
      cancelled = true;
      clearInterval(titleInterval);
    };
  }, [formula.id]);

  // Render KaTeX HTML
  const renderedLatexHtml = useMemo(() => {
    try {
      return katex.renderToString(formula.latex, {
        displayMode: true,
        throwOnError: false
      });
    } catch {
      return `<span class="text-rose-300">${formula.latex}</span>`;
    }
  }, [formula.latex]);

  // Color mapping for chalk theme
  const chalkColorClass = useMemo(() => {
    switch (formula.chalkColor) {
      case 'yellow':
        return 'text-amber-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.35)]';
      case 'cyan':
        return 'text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,0.35)]';
      case 'pink':
        return 'text-pink-200 drop-shadow-[0_0_8px_rgba(244,114,182,0.35)]';
      case 'orange':
        return 'text-orange-200 drop-shadow-[0_0_8px_rgba(251,146,60,0.35)]';
      default:
        return 'text-stone-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]';
    }
  }, [formula.chalkColor]);

  // Freehand drawing canvas handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        redrawCanvas();
      }
    };

    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      doodles.forEach((stroke) => {
        if (stroke.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 3;

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      });
    };

    resizeCanvas();
    redrawCanvas();
  }, [doodles]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;
    isMouseDownRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentStrokeRef.current = [{ x, y }];

    if (soundRef.current) {
      chalkAudio.playChalkScratch(0.4);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !isMouseDownRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentStrokeRef.current.push({ x, y });

    // Live draw on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx && currentStrokeRef.current.length >= 2) {
        const p1 = currentStrokeRef.current[currentStrokeRef.current.length - 2];
        const p2 = currentStrokeRef.current[currentStrokeRef.current.length - 1];

        ctx.beginPath();
        ctx.strokeStyle = activeChalkColor;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = activeChalkColor;
        ctx.shadowBlur = 3;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        if (soundRef.current && Math.random() > 0.6) {
          chalkAudio.playChalkScratch(0.3);
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDrawingMode || !isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    if (currentStrokeRef.current.length > 0) {
      setDoodles((prev) => [
        ...prev,
        {
          points: [...currentStrokeRef.current],
          color: activeChalkColor,
          width: 3.5
        }
      ]);
      currentStrokeRef.current = [];
    }
  };

  const handleClearBoardWipe = () => {
    if (soundRef.current) {
      chalkAudio.playEraserWipe();
    }
    setIsWiping(true);
    setTimeout(() => {
      setDoodles([]);
      onClearBoard();
      setIsWiping(false);
    }, 600);
  };

  return (
    <div
      id="main-chalkboard-container"
      className="relative w-full rounded-2xl shadow-2xl p-3 sm:p-5 md:p-6 transition-all duration-300 border-2 border-yellow-500/40"
      style={{
        background: 'linear-gradient(145deg, #73431a, #4a280d, #291505)',
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(234, 179, 8, 0.12), inset 0 2px 4px rgba(254, 240, 138, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.7)'
      }}
    >
      {/* Golden Brass Corner Filigree */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-400 rounded-tl-sm pointer-events-none drop-shadow" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400 rounded-tr-sm pointer-events-none drop-shadow" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400 rounded-bl-sm pointer-events-none drop-shadow" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-400 rounded-br-sm pointer-events-none drop-shadow" />

      {/* Chalkboard Slate Area */}
      <div
        id="chalkboard-slate-surface"
        className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] rounded-xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 md:p-8"
        style={{
          backgroundColor: '#151d18',
          backgroundImage: `
            radial-gradient(ellipse at 40% 30%, rgba(34, 46, 38, 0.95), rgba(15, 22, 18, 0.98)),
            radial-gradient(circle at 85% 80%, rgba(254, 240, 138, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)
          `,
          boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.85), inset 0 2px 6px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Authentic chalk smudges texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(254,240,138,0.12) 0%, transparent 60%)`,
            filter: 'blur(30px)'
          }}
        />

        {/* Board Top Header: Category Tag & Eraser controls */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-amber-600/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 border border-yellow-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              {formula.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: formula.difficultyStars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs select-none">★</span>
              ))}
            </div>
          </div>

          {/* Interactive Chalk & Eraser Tools */}
          <div className="flex items-center gap-2 bg-[#1b140b]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-600/40 shadow-inner">
            <button
              id="chalkboard-toggle-draw-btn"
              onClick={() => setIsDrawingMode(!isDrawingMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                isDrawingMode
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 shadow-md scale-105 font-bold'
                  : 'text-amber-100 hover:text-white hover:bg-amber-950/40'
              }`}
              title="自由用粉笔在黑板上书写和涂鸦"
            >
              <Pencil className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isDrawingMode ? '正在粉笔板书' : '粉笔涂鸦'}</span>
            </button>

            {isDrawingMode && (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-amber-700/50">
                {['#ffffff', '#fde047', '#eab308', '#67e8f9', '#f472b6', '#fb923c'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveChalkColor(color)}
                    className={`w-4 h-4 rounded-full border transition-transform ${
                      activeChalkColor === color ? 'scale-125 border-yellow-200 ring-2 ring-yellow-400/80' : 'border-stone-500/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`选择粉笔颜色 ${color}`}
                  />
                ))}
              </div>
            )}

            <button
              id="chalkboard-clear-wipe-btn"
              onClick={handleClearBoardWipe}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs text-amber-200 hover:text-yellow-200 hover:bg-amber-950/40 transition-colors ml-1"
              title="使用板擦擦除涂鸦并清爽黑板"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">擦黑板</span>
            </button>

            <button
              onClick={() => setShowDerivation(!showDerivation)}
              className="p-1 rounded text-amber-300/80 hover:text-yellow-200 transition-colors"
              title={showDerivation ? '收起猫咪手记' : '展开猫咪手记'}
            >
              {showDerivation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Freehand Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 z-20 w-full h-full ${
            isDrawingMode ? 'cursor-crosshair' : 'pointer-events-none'
          }`}
        />

        {/* Eraser Wipe Animation Overlay */}
        {isWiping && (
          <div
            className="absolute inset-0 z-30 pointer-events-none bg-[#191309]/60 transition-opacity duration-500 animate-pulse flex items-center justify-center"
            style={{
              backdropFilter: 'blur(3px)'
            }}
          >
            <div className="bg-[#241a0e]/95 text-amber-200 px-5 py-2.5 rounded-2xl border border-yellow-500/50 text-sm font-chalk-hand text-2xl flex items-center gap-3 shadow-2xl">
              <Eraser className="w-5 h-5 text-yellow-400 animate-bounce" />
              毛毡板擦正在拂去粉笔灰...
            </div>
          </div>
        )}

        {/* Center Content: Formula Title & Equation */}
        <div className="relative z-10 my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center">
          {/* Handwritten Chalk Title */}
          <div className="min-h-[44px] flex items-center justify-center">
            <h2
              className="font-chalk-hand text-2xl sm:text-3xl md:text-4xl text-yellow-100 tracking-wide font-bold"
              style={{
                textShadow: '0 0 12px rgba(254, 240, 138, 0.6), 1px 2px 2px rgba(0,0,0,0.8)'
              }}
            >
              {displayedTitle}
              {displayedTitle.length < formula.title.length && (
                <span className="inline-block w-2.5 h-6 ml-1 bg-yellow-300 animate-pulse rounded-sm align-middle" />
              )}
            </h2>
          </div>

          {/* Large KaTeX Equation with Warm Chalk Style */}
          <div
            className={`mt-4 sm:mt-6 px-4 py-3 sm:py-5 max-w-full overflow-x-auto rounded-xl transition-all duration-500 ${chalkColorClass}`}
            style={{
              opacity: formulaProgress,
              transform: `scale(${0.92 + formulaProgress * 0.08})`,
              filter: `blur(${Math.max(0, (1 - formulaProgress) * 4)}px)`,
              letterSpacing: '0.02em'
            }}
          >
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl select-text"
              dangerouslySetInnerHTML={{ __html: renderedLatexHtml }}
            />
          </div>

          {/* Subtitle / Plain explanation in chalk script */}
          <p className="mt-4 max-w-2xl text-amber-100 font-chalk-hand text-xl sm:text-2xl tracking-wide leading-relaxed">
            {formula.explanation}
          </p>

          {/* Derivation / Subnotes */}
          {showDerivation && formula.subNotes && formula.subNotes.length > 0 && (
            <div className="mt-6 flex flex-col items-start gap-1.5 bg-black/40 px-5 py-3 rounded-xl border border-amber-600/40 max-w-xl w-full text-left shadow-lg">
              <span className="text-xs uppercase font-bold tracking-widest text-yellow-300 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                猫咪学者备忘手记：
              </span>
              {formula.subNotes.map((note: string, index: number) => {
                const isNoteVisible = (notesProgress[index] ?? 0) === 1;
                return (
                  <div
                    key={index}
                    className={`font-chalk-hand text-lg sm:text-xl text-amber-100 transition-all duration-300 ${
                      isNoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    {note}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Board Bottom: Cat Quote & Chalk Tray */}
        <div className="relative z-10 pt-4 border-t border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-300/80">
          <div className="font-chalk-hand text-lg sm:text-xl text-yellow-200 italic text-center sm:text-left">
            {formula.catMemeQuote}
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-yellow-300/80">
            <span>猫咪科学院</span>
            <span>•</span>
            <span>物理学客座学者</span>
          </div>
        </div>
      </div>

      {/* Wooden Chalk Tray at bottom */}
      <div
        id="chalkboard-wood-tray"
        className="relative mt-2.5 h-8 rounded-lg flex items-center justify-between px-6 shadow-inner border border-yellow-700/30"
        style={{
          background: 'linear-gradient(to bottom, #301b0b, #593114 50%, #241407)',
          boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.9), 0 2px 4px rgba(254,240,138,0.1)'
        }}
      >
        {/* Felt Eraser Resting in Tray */}
        <div
          onClick={handleClearBoardWipe}
          className="cursor-pointer group flex items-center gap-1.5 px-3 py-1 rounded bg-[#241a0f] hover:bg-[#332415] text-amber-200 border border-amber-700/50 shadow-md transition-transform hover:-translate-y-0.5"
          title="使用毛毡板擦擦拭黑板"
        >
          <div className="w-7 h-2.5 rounded-sm bg-yellow-900 border-b-2 border-stone-950" />
          <span className="text-[10px] font-mono text-amber-300 group-hover:text-yellow-200">毛毡板擦</span>
        </div>

        {/* Sticks of Colored Chalk */}
        <div className="flex items-center gap-2.5">
          {/* White Chalk */}
          <div
            onClick={() => {
              setActiveChalkColor('#ffffff');
              setIsDrawingMode(true);
            }}
            className="w-8 h-2.5 rounded-sm bg-stone-100 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform"
            title="白色粉笔"
          />
          {/* Yellow Chalk */}
          <div
            onClick={() => {
              setActiveChalkColor('#fde047');
              setIsDrawingMode(true);
            }}
            className="w-8 h-2.5 rounded-sm bg-yellow-300 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform ring-1 ring-yellow-400"
            title="明黄粉笔"
          />
          {/* Gold Chalk */}
          <div
            onClick={() => {
              setActiveChalkColor('#eab308');
              setIsDrawingMode(true);
            }}
            className="w-7 h-2.5 rounded-sm bg-amber-500 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform"
            title="金橙粉笔"
          />
          {/* Cyan Chalk */}
          <div
            onClick={() => {
              setActiveChalkColor('#67e8f9');
              setIsDrawingMode(true);
            }}
            className="w-7 h-2.5 rounded-sm bg-cyan-300 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform"
            title="天蓝粉笔"
          />
          {/* Pink Chalk */}
          <div
            onClick={() => {
              setActiveChalkColor('#f472b6');
              setIsDrawingMode(true);
            }}
            className="w-6 h-2.5 rounded-sm bg-pink-300 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-transform"
            title="淡粉粉笔"
          />
          {/* Chalk dust marks on tray */}
          <div className="w-14 h-1.5 rounded-full bg-yellow-200/20 blur-[1px]" />
        </div>
      </div>
    </div>
  );
};
