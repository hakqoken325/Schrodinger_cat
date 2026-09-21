import React, { useState, useCallback } from 'react';
import { Town3DScene } from './components/Town3DScene';
import { TownHUD } from './components/TownHUD';
import { CameraMode, TimeOfDay, CharacterId, ActiveSpeechBubble } from './types';
import { IDLE_THOUGHTS } from './data';
import { townSounds } from './sound';

export default function App() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [cameraMode, setCameraMode] = useState<CameraMode>('square_overview');
  const [gatherAllTrigger, setGatherAllTrigger] = useState(0);
  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId | null>(null);

  const [activeSpeech, setActiveSpeech] = useState<ActiveSpeechBubble | null>(null);
  const [chatHistory, setChatHistory] = useState<
    { speakerId: CharacterId; textZh: string; time: string }[]
  >([]);

  // Обработка новой реплики
  const handleSpeechBubble = useCallback((speech: ActiveSpeechBubble) => {
    setActiveSpeech(speech);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setChatHistory((prev) => [
      { ...speech, time: timeStr },
      ...prev.slice(0, 30) // храним последние 30 реплик
    ]);

    // Автоматическое скрытие речевого облачка через 4.5 секунды
    setTimeout(() => {
      setActiveSpeech((curr) => (curr?.textZh === speech.textZh ? null : curr));
    }, 4500);
  }, []);

  // Собрать всех жителей городка на площади
  const handleGatherAll = () => {
    setGatherAllTrigger((prev) => prev + 1);
    setCameraMode('square_overview');
    setSelectedCharacterId(null);
  };

  // Клик по персонажу в 3D сцене
  const handleCharacterClick = (id: CharacterId) => {
    setSelectedCharacterId(id);
  };

  // Интерактивное приветствие с персонажем
  const handlePokeCharacter = (id: CharacterId) => {
    townSounds.playBoing();
    townSounds.playVoice(id);

    const thoughts = IDLE_THOUGHTS[id];
    if (thoughts && thoughts.length > 0) {
      const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
      handleSpeechBubble({
        speakerId: id,
        textZh: thought
      });
    }
  };

  return (
    <div className="w-screen h-screen relative bg-slate-950 overflow-hidden select-none font-sans">
      {/* 3D Интерактивный Городок с 7 персонажами */}
      <Town3DScene
        timeOfDay={timeOfDay}
        cameraMode={cameraMode}
        onCharacterClick={handleCharacterClick}
        onSpeechBubble={handleSpeechBubble}
        gatherAllTrigger={gatherAllTrigger}
      />

      {/* Удобный интерфейс управления и диалогов на китайском упрощенном */}
      <TownHUD
        timeOfDay={timeOfDay}
        onTimeOfDayChange={setTimeOfDay}
        cameraMode={cameraMode}
        onCameraModeChange={setCameraMode}
        onGatherAll={handleGatherAll}
        activeSpeech={activeSpeech}
        chatHistory={chatHistory}
        selectedCharacterId={selectedCharacterId}
        onSelectCharacter={setSelectedCharacterId}
        onPokeCharacter={handlePokeCharacter}
      />
    </div>
  );
}
