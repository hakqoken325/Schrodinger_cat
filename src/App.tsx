import React, { useState } from 'react';
import { FormulaRoomScene } from './components/FormulaRoomScene';
import { CatHUD } from './components/CatHUD';
import { CameraViewPreset, RoomTheme, CatActionState } from './types';
import { CAT_THOUGHTS } from './data';

export default function App() {
  const [theme, setTheme] = useState<RoomTheme>('classic_paper');
  const [cameraPreset, setCameraPreset] = useState<CameraViewPreset>('corner_meme');
  const [catThought, setCatThought] = useState<string>(CAT_THOUGHTS[4]);
  const [, setCatState] = useState<CatActionState>('corner_solving');

  const handlePetCat = () => {
    setCatThought('喵~ 咕噜咕噜... 猫咪很舒服，但黑板上的微积分还得继续推导 🐾');
  };

  return (
    <div className="w-screen h-screen relative bg-[#141518] overflow-hidden select-none font-sans">
      {/* 3D 交互式物理公式房间与黑猫 */}
      <FormulaRoomScene
        theme={theme}
        cameraPreset={cameraPreset}
        onCatThoughtChange={setCatThought}
        onCatStateChange={setCatState}
      />

      {/* 极简 UI（支持一键进入纯净禅模式） */}
      <CatHUD
        theme={theme}
        onThemeChange={setTheme}
        cameraPreset={cameraPreset}
        onCameraPresetChange={setCameraPreset}
        catThought={catThought}
        onPetCat={handlePetCat}
      />
    </div>
  );
}
