import React, { useState } from 'react';
import {
  Bell,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  MessageSquare,
  Users,
  Compass,
  Sparkles,
  Info,
  X,
  Eye,
  Smile
} from 'lucide-react';
import { CameraMode, TimeOfDay, CharacterId, ActiveSpeechBubble } from '../types';
import { CHARACTER_PROFILES } from '../data';
import { townSounds } from '../sound';

interface TownHUDProps {
  timeOfDay: TimeOfDay;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  cameraMode: CameraMode;
  onCameraModeChange: (mode: CameraMode) => void;
  onGatherAll: () => void;
  activeSpeech: ActiveSpeechBubble | null;
  chatHistory: { speakerId: CharacterId; textZh: string; time: string }[];
  selectedCharacterId: CharacterId | null;
  onSelectCharacter: (id: CharacterId | null) => void;
  onPokeCharacter: (id: CharacterId) => void;
}

export const TownHUD: React.FC<TownHUDProps> = ({
  timeOfDay,
  onTimeOfDayChange,
  cameraMode,
  onCameraModeChange,
  onGatherAll,
  activeSpeech,
  chatHistory,
  selectedCharacterId,
  onSelectCharacter,
  onPokeCharacter
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const [showCitizensList, setShowCitizensList] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleSound = () => {
    townSounds.isMuted = !townSounds.isMuted;
    setIsMuted(townSounds.isMuted);
    if (!townSounds.isMuted) {
      townSounds.playBoing();
    }
  };

  const selectedProfile = selectedCharacterId ? CHARACTER_PROFILES[selectedCharacterId] : null;

  return (
    <>
      {/* 1. Верхняя панель управления */}
      <header className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-30 pointer-events-none flex items-center justify-between gap-2.5">
        {/* Логотип городка и статус */}
        <div className="pointer-events-auto flex items-center gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 shadow-lg text-slate-800 dark:text-slate-100">
          <div className="flex -space-x-1.5 overflow-hidden">
            {Object.values(CHARACTER_PROFILES).slice(0, 5).map((char) => (
              <span
                key={char.id}
                className={`inline-block w-6 h-6 rounded-full ${char.avatarBg} text-[10px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm`}
                title={char.nameZh}
              >
                {char.tagZh.slice(0, 2)}
              </span>
            ))}
            <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-[9px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-slate-800">
              +2
            </span>
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold leading-tight flex items-center gap-1.5">
              <span>微型好友小镇 3D</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
              7位居民正在快乐生活、工作与交谈
            </p>
          </div>
        </div>

        {/* Правые контролы */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Собрать всех колоколом */}
          <button
            onClick={onGatherAll}
            className="px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            title="敲响钟楼金钟：全员在中央喷泉集合"
          >
            <Bell className="w-4 h-4 animate-bounce" />
            <span className="hidden md:inline">全员集合</span>
          </button>

          {/* Список жителей */}
          <button
            onClick={() => {
              setShowCitizensList(!showCitizensList);
              if (showChatLog) setShowChatLog(false);
            }}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl backdrop-blur-md border shadow-lg cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold ${
              showCitizensList
                ? 'bg-sky-500 text-white border-sky-400 shadow-sky-500/25'
                : 'bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-700/70'
            }`}
            title="小镇居民名录"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">居民名录</span>
            <span className="px-1.5 py-0.2 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
              7
            </span>
          </button>

          {/* Журнал разговоров */}
          <button
            onClick={() => {
              setShowChatLog(!showChatLog);
              if (showCitizensList) setShowCitizensList(false);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md border shadow-lg cursor-pointer transition-all relative ${
              showChatLog
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-200'
            }`}
            title="小镇对话日志"
          >
            <MessageSquare className="w-4 h-4" />
            {chatHistory.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] text-white font-bold flex items-center justify-center">
                {chatHistory.length > 9 ? '9+' : chatHistory.length}
              </span>
            )}
          </button>

          {/* Время суток */}
          <div className="flex items-center p-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 shadow-lg">
            <button
              onClick={() => onTimeOfDayChange('day')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                timeOfDay === 'day'
                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="白天"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onTimeOfDayChange('sunset')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                timeOfDay === 'sunset'
                  ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="黄昏"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onTimeOfDayChange('night')}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                timeOfDay === 'night'
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="夜晚"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Звук */}
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 shadow-lg cursor-pointer transition-all"
            title={isMuted ? '开启音效' : '静音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          {/* Справка */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 text-slate-500 hover:text-slate-800 dark:text-slate-400 shadow-lg cursor-pointer transition-all"
            title="游玩指南"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Живое облачко речи активного диалога по центру экрана */}
      {activeSpeech && (
        <div className="absolute top-18 sm:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-[92%] max-w-lg transition-all animate-in fade-in zoom-in-95 duration-300">
          {(() => {
            const profile = CHARACTER_PROFILES[activeSpeech.speakerId];
            return (
              <div
                className={`p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border-2 ${profile.accentColor} text-white shadow-2xl flex items-start gap-3`}
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${profile.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md border-2 border-white/40`}
                >
                  {profile.tagZh}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      {profile.nameZh}
                    </span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                      {profile.roleZh}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/95">
                    {activeSpeech.textZh}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 3. Карточка выбранного персонажа (при клике в 3D или в списке) */}
      {selectedProfile && (
        <div className="absolute bottom-20 left-4 z-30 pointer-events-auto max-w-xs w-[88vw] sm:w-80 rounded-2xl bg-slate-900/95 backdrop-blur-xl border-2 border-slate-700 shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full ${selectedProfile.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white/40`}
              >
                {selectedProfile.tagZh}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold leading-tight">{selectedProfile.nameZh}</h3>
                <p className="text-[10px] text-amber-300">{selectedProfile.roleZh}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectCharacter(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-3 text-xs text-slate-300 space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold">当前日程与活动：</div>
            <p className="text-white/90 text-xs font-medium leading-relaxed">
              {selectedProfile.defaultTaskZh}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onPokeCharacter(selectedProfile.id)}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <Smile className="w-3.5 h-3.5" />
              <span>互动欢呼</span>
            </button>
            <button
              onClick={() => {
                const followModes: Record<CharacterId, CameraMode> = {
                  red_ai: 'follow_red_ai',
                  fly_immortal: 'follow_fly',
                  pink_node: 'follow_pink_node',
                  blue_quantum: 'follow_blue_quantum',
                  green_sprout: 'follow_green_sprout',
                  golden_coin: 'follow_golden_coin',
                  white_cloud: 'follow_white_cloud'
                };
                onCameraModeChange(followModes[selectedProfile.id]);
              }}
              className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>跟随视角</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Нижняя панель быстрого переключения камер и жителей */}
      <footer className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto max-w-[96vw] overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-2xl text-white">
        {/* 小镇全景 */}
        <button
          onClick={() => onCameraModeChange('square_overview')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            cameraMode === 'square_overview'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>全景视角</span>
        </button>

        <div className="w-px h-4 bg-slate-700 shrink-0 mx-0.5" />

        {/* Кнопки 7 персонажей */}
        {(
          [
            ['red_ai', 'follow_red_ai', '小AI', 'bg-red-500'],
            ['fly_immortal', 'follow_fly', '永生苍蝇', 'bg-zinc-700 text-amber-300'],
            ['pink_node', 'follow_pink_node', '粉节点', 'bg-pink-500'],
            ['blue_quantum', 'follow_blue_quantum', '量子小蓝', 'bg-sky-500'],
            ['green_sprout', 'follow_green_sprout', '萌芽园丁', 'bg-emerald-500'],
            ['golden_coin', 'follow_golden_coin', '金灿灿', 'bg-amber-500 text-slate-950'],
            ['white_cloud', 'follow_white_cloud', '云朵大厨', 'bg-slate-200 text-slate-900']
          ] as const
        ).map(([id, mode, label, activeBg]) => {
          const isActive = cameraMode === mode;
          return (
            <button
              key={id}
              onClick={() => {
                onCameraModeChange(mode);
                onSelectCharacter(id);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive ? `${activeBg} font-bold shadow-md` : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  id === 'fly_immortal' ? 'bg-amber-400' : id === 'white_cloud' ? 'bg-sky-400' : 'bg-current'
                }`}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </footer>

      {/* 5. Модальное окно: 名录居民列表 (7 персонажей с описанием дел) */}
      {showCitizensList && (
        <div className="absolute top-18 right-4 z-40 w-80 sm:w-96 max-h-[75vh] rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl p-4 flex flex-col text-white animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold">小镇居民名录 (共7位)</h3>
            </div>
            <button
              onClick={() => setShowCitizensList(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 text-xs">
            {Object.values(CHARACTER_PROFILES).map((profile) => (
              <div
                key={profile.id}
                onClick={() => {
                  onSelectCharacter(profile.id);
                  onPokeCharacter(profile.id);
                }}
                className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-start gap-2.5 group"
              >
                <div
                  className={`w-9 h-9 rounded-full ${profile.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border-2 border-white/30 group-hover:scale-105 transition-transform`}
                >
                  {profile.tagZh}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                      {profile.nameZh}
                    </span>
                    <span className="text-[10px] text-slate-400">{profile.roleZh}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug mt-1">
                    {profile.defaultTaskZh}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Модальное окно: 小镇闲聊日志 */}
      {showChatLog && (
        <div className="absolute top-18 right-4 z-40 w-80 sm:w-96 max-h-[75vh] rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl p-4 flex flex-col text-white animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold">小镇居民闲聊集</h3>
            </div>
            <button
              onClick={() => setShowChatLog(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 py-3 pr-1 text-xs">
            {chatHistory.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                居民们正在各自的岗位工作和散步，当他们相遇时就会展开有趣的闲聊对话哦...
              </div>
            ) : (
              chatHistory.map((item, idx) => {
                const profile = CHARACTER_PROFILES[item.speakerId];
                return (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-amber-300">{profile.nameZh}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{item.textZh}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 7. Модальное окно: 游玩指南 */}
      {showHelp && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>🏡</span>
                <span>微型好友小镇游玩指南</span>
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <span className="text-amber-400">✨</span>
                  <span>小镇全员 7 位伙伴：</span>
                </p>
                <p>• <b>🔴 小AI (赤红)</b>：智能算法工程师，常驻实验室研究路径优化与天气计算。</p>
                <p>• <b>🪰 永生苍蝇 (墨灰)</b>：自由哲学家，长着大红眼与薄翅，在钟楼与咖啡馆寻觅方糖。</p>
                <p>• <b>🌸 粉色节点 (立方)</b>：几何糕点师，在烘焙坊制作严格等角六面体甜点。</p>
                <p>• <b>💎 量子小蓝 (青空)</b>：物理学者，在中央喷泉校准量子纠缠与水晶粒子。</p>
                <p>• <b>🌱 萌芽园丁 (嫩绿)</b>：头顶绿芽手持水壶，每天给花圃里的彩色郁金香浇水。</p>
                <p>• <b>🪙 金灿灿 (辉金)</b>：金库大管家，随身带金币，在许愿池投掷幸运硬币祈福。</p>
                <p>• <b>☕ 云朵大厨 (奶白)</b>：头戴厨师帽，在甜心咖啡馆为大家冲泡香浓的焦糖玛奇朵。</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                <p className="font-semibold text-white">🎮 互动方式：</p>
                <p>• <b>点击角色</b>：角色会欢快起跳、发出专属音效并分享即时心声。</p>
                <p>• <b>点击地面</b>：呼唤离得最近的居民跑向该位置。</p>
                <p>• <b>敲响“全员集合”</b>：古钟楼钟声悠扬，全体7位居民会跑到喷泉边开大合照狂欢！</p>
                <p>• <b>自由社交</b>：居民在小镇漫步接近时会自动停下挥手热烈交谈。</p>
                <p>• <b>鼠标/触屏手势</b>：左键旋转角度、滚轮缩放景深、右键拖拽平移。</p>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-all"
            >
              我知道了，开始畅游小镇！
            </button>
          </div>
        </div>
      )}
    </>
  );
};
