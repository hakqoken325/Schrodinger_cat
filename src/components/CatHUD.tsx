import React, { useState } from 'react';
import {
  Camera,
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Heart,
  CornerDownRight,
  BookOpen
} from 'lucide-react';
import { CameraViewPreset, RoomTheme } from '../types';
import { catSounds } from '../sound';

interface CatHUDProps {
  theme: RoomTheme;
  onThemeChange: (theme: RoomTheme) => void;
  cameraPreset: CameraViewPreset;
  onCameraPresetChange: (preset: CameraViewPreset) => void;
  catThought: string;
  onPetCat: () => void;
}

export const CatHUD: React.FC<CatHUDProps> = ({
  theme,
  onThemeChange,
  cameraPreset,
  onCameraPresetChange,
  catThought,
  onPetCat
}) => {
  const [zenMode, setZenMode] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    catSounds.isMuted = !catSounds.isMuted;
    setMuted(catSounds.isMuted);
    if (!catSounds.isMuted) {
      catSounds.playPurr(1.5);
    }
  };

  const getThemeLabel = (t: RoomTheme) => {
    switch (t) {
      case 'classic_paper':
        return '草稿纸';
      case 'warm':
        return '暖光书房';
      case 'dark_chalk':
        return '黑板粉笔';
      case 'neon_glow':
        return '赛博霓虹';
    }
  };

  const cycleTheme = () => {
    const themes: RoomTheme[] = ['classic_paper', 'warm', 'dark_chalk', 'neon_glow'];
    const idx = themes.indexOf(theme);
    const next = themes[(idx + 1) % themes.length];
    onThemeChange(next);
    catSounds.playChalkScritch();
  };

  return (
    <>
      {/* 禅模式切换按钮（常驻右上角） */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setZenMode(!zenMode)}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white/90 hover:text-white transition-all shadow-xl cursor-pointer"
          title={zenMode ? '显示操作面板' : '进入禅模式（极简纯享）'}
        >
          {zenMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* 当开启禅模式时，其余所有 UI 平滑淡出 */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          zenMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* 左上角：猫咪思考气泡与内心活动（简体中文） */}
        <div className="absolute top-4 left-4 z-30 pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 shadow-2xl text-white">
            <span className="text-2xl select-none animate-pulse">🐈‍⬛</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80">
                思考过程 · 当前推导
              </span>
              <span className="text-xs font-medium text-white/95 max-w-[260px] sm:max-w-md truncate">
                {catThought}
              </span>
            </div>
          </div>
        </div>

        {/* 右上侧浮动控制面板：抚摸、切换壁纸氛围、音效 */}
        <div className="absolute top-16 right-4 z-30 pointer-events-auto flex flex-col gap-2">
          {/* 抚摸猫咪 */}
          <button
            onClick={() => {
              onPetCat();
              catSounds.playMeow();
              catSounds.playPurr(2.5);
            }}
            className="p-2.5 rounded-2xl bg-black/50 hover:bg-rose-950/70 backdrop-blur-md border border-white/15 text-rose-300 hover:text-rose-200 transition-all shadow-xl flex items-center gap-2 text-xs font-semibold cursor-pointer group"
            title="抚摸黑猫"
          >
            <Heart className="w-4 h-4 group-hover:scale-125 transition-transform text-rose-400" />
            <span className="hidden sm:inline">抚摸猫咪</span>
          </button>

          {/* 切换环境主题 */}
          <button
            onClick={cycleTheme}
            className="p-2.5 rounded-2xl bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white/90 hover:text-white transition-all shadow-xl flex items-center gap-2 text-xs font-semibold cursor-pointer"
            title="切换房间光照与公式壁纸"
          >
            {theme === 'classic_paper' ? (
              <BookOpen className="w-4 h-4 text-emerald-400" />
            ) : theme === 'warm' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : theme === 'dark_chalk' ? (
              <Moon className="w-4 h-4 text-slate-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-sky-400" />
            )}
            <span className="hidden sm:inline">{getThemeLabel(theme)}</span>
          </button>

          {/* 声音切换 */}
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-2xl bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white/90 hover:text-white transition-all shadow-xl cursor-pointer flex items-center gap-2 text-xs"
            title={muted ? '开启声音' : '静音'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
            <span className="hidden sm:inline">{muted ? '已静音' : '音效'}</span>
          </button>
        </div>

        {/* 底部中央：经典机位切换（简体中文） */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
          {/* 照片同款经典梗图机位 */}
          <button
            onClick={() => {
              onCameraPresetChange('corner_meme');
              catSounds.playInsight();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              cameraPreset === 'corner_meme'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
            title="对准照片同款经典墙角视角"
          >
            <CornerDownRight className="w-4 h-4" />
            <span>梗图同款机位</span>
          </button>

          {/* 跟随猫咪 */}
          <button
            onClick={() => {
              onCameraPresetChange('follow_cat');
              catSounds.playPurr(1.0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              cameraPreset === 'follow_cat'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
            title="镜头紧随猫咪走动"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>跟随猫咪</span>
          </button>

          {/* 全景俯瞰 */}
          <button
            onClick={() => {
              onCameraPresetChange('room_wide');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              cameraPreset === 'room_wide'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
            title="宽阔全景视角"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">全景视角</span>
          </button>
        </div>

        {/* 底部悬浮操作提示（简体中文） */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-xs text-white/70 shadow-lg">
          <span>🖱️ <b>鼠标左键</b> 旋转</span>
          <span className="text-white/20">|</span>
          <span>🔍 <b>滚轮</b> 缩放</span>
          <span className="text-white/20">|</span>
          <span>✋ <b>右键</b> 平移</span>
          <span className="text-white/20">|</span>
          <span>🎯 <b>点击地面</b> 引导猫咪探索</span>
        </div>
      </div>
    </>
  );
};
