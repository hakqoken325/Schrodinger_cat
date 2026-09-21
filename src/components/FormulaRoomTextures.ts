import * as THREE from 'three';
import { RoomTheme } from '../types';

export class FormulaTextureGenerator {
  // 1. Текстура левой стены (Оптика, линзы, дифракция, нормали)
  public static createLeftWallTexture(theme: RoomTheme): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;

    let bg = '#f5f4ef';
    let ink = '#1e293b';
    let subInk = '#475569';
    let redInk = '#b91c1c';

    if (theme === 'warm') {
      bg = '#fbf4e4';
      ink = '#3d2e1e';
      subInk = '#6b543d';
      redInk = '#c2410c';
    } else if (theme === 'dark_chalk') {
      bg = '#18181b';
      ink = '#f4f4f5';
      subInk = '#a1a1aa';
      redInk = '#fde047';
    } else if (theme === 'neon_glow') {
      bg = '#070a12';
      ink = '#38bdf8';
      subInk = '#818cf8';
      redInk = '#f43f5e';
    }

    // Фоновая бумага / стена
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 2048, 2048);

    // Легкая текстура зернистости бумаги
    const isDark = theme === 'dark_chalk' || theme === 'neon_glow';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.02)';
    for (let i = 0; i < 6000; i++) {
      ctx.fillRect(Math.random() * 2048, Math.random() * 2048, 2, 2);
    }

    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // А. Чертеж линз вверху (как на фото)
    // Оптическая ось
    ctx.beginPath();
    ctx.setLineDash([12, 8]);
    ctx.moveTo(120, 240);
    ctx.lineTo(950, 240);
    ctx.stroke();
    ctx.setLineDash([]);

    // Две линзы
    const drawLens = (x: number, y: number, h: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, 16, h, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Стрелочки собирающей линзы
      ctx.beginPath();
      ctx.moveTo(x - 14, y - h);
      ctx.lineTo(x, y - h - 14);
      ctx.lineTo(x + 14, y - h);
      ctx.moveTo(x - 14, y + h);
      ctx.lineTo(x, y + h + 14);
      ctx.lineTo(x + 14, y + h);
      ctx.stroke();
    };

    drawLens(450, 240, 110);
    drawLens(720, 240, 95);

    // Лучи света через линзы
    ctx.strokeStyle = redInk;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(160, 170);
    ctx.lineTo(450, 170);
    ctx.lineTo(720, 260);
    ctx.lineTo(940, 240); // фокус

    ctx.moveTo(160, 310);
    ctx.lineTo(450, 310);
    ctx.lineTo(720, 220);
    ctx.lineTo(940, 240);
    ctx.stroke();

    // Подписи фокусов
    ctx.fillStyle = ink;
    ctx.font = 'italic 26px "JetBrains Mono", monospace';
    ctx.fillText('F₁', 450, 380);
    ctx.fillText('F₂', 720, 360);
    ctx.fillText('O (главная ось)', 160, 225);

    // Чертеж интерферометра / гребенки вверху справа (как на фото)
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(1150, 140);
    ctx.lineTo(1850, 140);
    ctx.lineTo(1850, 340);
    ctx.lineTo(1150, 340);
    ctx.closePath();
    ctx.stroke();

    for (let x = 1220; x <= 1780; x += 110) {
      ctx.beginPath();
      ctx.arc(x, 240, 48, 0, Math.PI);
      ctx.stroke();
      for (let w = -30; w <= 30; w += 15) {
        ctx.beginPath();
        ctx.moveTo(x + w, 240);
        ctx.lineTo(x + w, 320);
        ctx.stroke();
      }
    }

    // Б. Рукописный текст конспекта (как на фото)
    ctx.font = 'italic 25px "Caveat", cursive, sans-serif';
    ctx.fillStyle = ink;
    const notesLeft = [
      'Оптическая система из двух линз в воздухе:',
      'ΔV = K Δt (где K - коэффициент оптической плотности)',
      'При условии λ << d преломление лучей подчиняется закону Снеллиуса:',
      'ΔE = E₁ - E₂ · δ₀ · A₀ (фазовый набег волны в среде)',
      'Инвариант Лагранжа-Гельмгольца: y₁ · n₁ · u₁ = y₂ · n₂ · u₂ = const',
      'Для сферической преломляющей поверхности:',
      '(n₂ - n₁) / R = n₂/s₂ - n₁/s₁ = Ф (оптическая сила)',
      'Уравнение эйконала: (∇S)² = n²(x,y,z)',
      'Полнота волнового пакета в фокальной плоскости линзы:',
      'Ψ(x, y) = ∫∫ A(ξ, η) exp(-i(kx·ξ + ky·η)) dξ dη'
    ];
    let ty = 460;
    notesLeft.forEach((line) => {
      ctx.fillText(line, 140, ty);
      ty += 42;
    });

    // В. Чертеж сферы с нормалью n и площадкой dS (центр левой стены)
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3.0;
    // Полусфера
    ctx.beginPath();
    ctx.arc(1200, 920, 260, Math.PI * 0.75, Math.PI * 1.75);
    ctx.stroke();

    // Касательная площадка dS
    ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(203, 213, 225, 0.45)';
    ctx.beginPath();
    ctx.moveTo(960, 1100);
    ctx.lineTo(1120, 940);
    ctx.lineTo(1080, 860);
    ctx.lineTo(920, 1020);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Вектор нормали n
    ctx.strokeStyle = redInk;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(1020, 980);
    ctx.lineTo(910, 820);
    ctx.stroke();
    // Стрелка вектора n
    ctx.beginPath();
    ctx.moveTo(910, 820);
    ctx.lineTo(935, 840);
    ctx.moveTo(910, 820);
    ctx.lineTo(925, 855);
    ctx.stroke();

    ctx.fillStyle = redInk;
    ctx.font = 'bold italic 28px "JetBrains Mono", monospace';
    ctx.fillText('n', 880, 810);
    ctx.fillText('dS', 1010, 1040);

    // Г. Кольца дифракции Френеля (внизу слева как на фото)
    ctx.strokeStyle = subInk;
    ctx.lineWidth = 2.0;
    const cx = 320;
    const cy = 1350;
    for (let r = 25; r <= 180; r += 26) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Заштрихованное центральное кольцо
    ctx.fillStyle = subInk;
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = ink;
    ctx.font = 'italic 24px "Caveat", cursive, sans-serif';
    ctx.fillText('Зоны Френеля: rₘ = √(m·λ·a·b / (a + b))', 150, 1580);
    ctx.fillText('Интенсивность в центре I ~ A₀² / 4', 150, 1620);
    ctx.fillText('Теорема Бабине о взаимодополнительных экранах', 150, 1660);

    // Д. Нижний блок уравнений (ближе к углу пола)
    ctx.font = 'italic 30px "JetBrains Mono", monospace';
    ctx.fillText('rot E = -∂B/∂t', 980, 1420);
    ctx.fillText('rot H = j + ∂D/∂t', 980, 1480);
    ctx.fillText('div D = ρ', 980, 1540);
    ctx.fillText('div B = 0', 980, 1600);
    ctx.fillText('∇²E - (1/c²)∂²E/∂t² = 0', 980, 1680);

    // Текстура готова
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }

  // 2. Текстура правой стены (Большие интегралы лучистости и фотометрии, как на фото)
  public static createRightWallTexture(theme: RoomTheme): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;

    let bg = '#f5f4ef';
    let ink = '#1e293b';
    let accentInk = '#b45309';

    if (theme === 'warm') {
      bg = '#fbf4e4';
      ink = '#3d2e1e';
      accentInk = '#b45309';
    } else if (theme === 'dark_chalk') {
      bg = '#18181b';
      ink = '#f4f4f5';
      accentInk = '#fde047';
    } else if (theme === 'neon_glow') {
      bg = '#070a12';
      ink = '#38bdf8';
      accentInk = '#f59e0b';
    }

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 2048, 2048);

    const isDark = theme === 'dark_chalk' || theme === 'neon_glow';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.02)';
    for (let i = 0; i < 6000; i++) {
      ctx.fillRect(Math.random() * 2048, Math.random() * 2048, 2, 2);
    }

    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Верхняя надпись (как на фото)
    ctx.font = 'italic 32px "Caveat", cursive, sans-serif';
    ctx.fillText('Яркость и энергетическая светимость поверхности dS:', 140, 120);

    // Точные формулы с фотографии!
    let y = 200;
    const drawEquation = (text: string, size = 36, isHighlight = false) => {
      ctx.font = `${isHighlight ? 'bold ' : ''}italic ${size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = isHighlight ? accentInk : ink;
      ctx.fillText(text, 140, y);
      y += size + 38;
    };

    drawEquation('dΦ = L · dS · dΩ · cos ϑ', 40);
    drawEquation('dΩ = sin ϑ · dϑ · dφ', 38);
    drawEquation('dΦ = L · dS · sin ϑ · cos ϑ · dϑ · dφ', 42);

    // Большой интеграл (прямо как на фото!)
    y += 20;
    drawEquation('Φ = L · ΔS ∫₀²π dφ ∫₀^ϑ sin ϑ · cos ϑ · dϑ', 44, true);
    drawEquation('= 2π · L · ΔS ∫₀^ϑ sin ϑ · cos ϑ · dϑ', 46);
    drawEquation('= 2π · L · ΔS [ -½ cos 2ϑ ] |₀^ϑ', 48);
    drawEquation('= π · L · ΔS · ((1 - cos 2ϑ) / 2)', 50);
    drawEquation('= π · L · ΔS · sin² ϑ', 56, true);

    y += 30;
    drawEquation('M = Φ / ΔS', 44);
    drawEquation('M = π · L · sin² ϑ', 50, true);

    // Интеграл для полусферы
    y += 25;
    ctx.font = 'italic 30px "Caveat", cursive, sans-serif';
    ctx.fillStyle = ink;
    ctx.fillText('Для полупространства (ϑ = π/2):', 140, y);
    y += 50;

    drawEquation('Φ = L · ΔS ∫₀²π dφ ∫₀^(π/2) sin ϑ · cos ϑ · dϑ', 42);
    drawEquation('= 2π · L · ΔS [ -½ cos 2ϑ ] |₀^(π/2) = π · L · ΔS', 44);
    drawEquation('M = π · L', 56, true);

    // Дополнительные уравнения квантовой оптики и термодинамики ниже
    y += 40;
    ctx.font = 'italic 26px "Caveat", cursive, sans-serif';
    ctx.fillStyle = ink;
    ctx.fillText('Закон излучения Планка и формула Рэлея-Джинса:', 140, y);
    y += 45;
    drawEquation('u(ν, T) = (8π h ν³ / c³) · (1 / (e^(hν/kT) - 1))', 34);
    drawEquation('∫₀^∞ u(ν, T) dν = a · T⁴  (закон Стефана-Больцмана)', 34);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }

  // 3. Текстура пола (Призма, преломление dF, интегралы и следы лапок)
  public static createFloorTexture(theme: RoomTheme): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;

    let bg = '#f0efe9';
    let ink = '#334155';
    let catPawColor = 'rgba(30, 41, 59, 0.25)';

    if (theme === 'warm') {
      bg = '#f5eedb';
      ink = '#453323';
      catPawColor = 'rgba(69, 51, 35, 0.25)';
    } else if (theme === 'dark_chalk') {
      bg = '#141416';
      ink = '#cbd5e1';
      catPawColor = 'rgba(255, 255, 255, 0.25)';
    } else if (theme === 'neon_glow') {
      bg = '#05070c';
      ink = '#38bdf8';
      catPawColor = 'rgba(56, 189, 248, 0.35)';
    }

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 2048, 2048);

    const isDark = theme === 'dark_chalk' || theme === 'neon_glow';
    // Сетка тонких линий миллиметровки / паркета
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1.0;
    for (let pos = 0; pos <= 2048; pos += 64) {
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, 2048);
      ctx.moveTo(0, pos);
      ctx.lineTo(2048, pos);
      ctx.stroke();
    }

    ctx.fillStyle = ink;
    ctx.strokeStyle = ink;

    // Чертеж призмы / клина как внизу фото справа
    const px = 1400;
    const py = 1500;
    ctx.lineWidth = 3.5;

    // Заштрихованная грань призмы
    ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.35)';
    ctx.beginPath();
    ctx.moveTo(px - 320, py + 80);
    ctx.lineTo(px, py - 120);
    ctx.lineTo(px + 420, py + 80);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Штриховка грани
    ctx.lineWidth = 1.5;
    for (let sx = px - 300; sx <= px + 400; sx += 32) {
      ctx.beginPath();
      ctx.moveTo(sx, py + 75);
      ctx.lineTo(sx + 35, py - 40);
      ctx.stroke();
    }

    // Лучи через призму
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(px - 450, py + 140);
    ctx.lineTo(px - 160, py);
    ctx.lineTo(px + 220, py + 20);
    ctx.lineTo(px + 520, py + 160);
    ctx.stroke();

    ctx.font = 'italic 28px "JetBrains Mono", monospace';
    ctx.fillStyle = ink;
    ctx.fillText('dF', px - 20, py + 130);
    ctx.fillText('O', px + 10, py - 140);
    ctx.fillText('F\'', px + 360, py + 120);

    // Формулы на полу вокруг центра комнаты
    ctx.font = 'italic 32px "JetBrains Mono", monospace';
    ctx.fillText('M = (dΦ / dS) = ⅓ Φ₀', 850, 1750);
    ctx.fillText('∮ E · dl = -dΦ_B / dt', 250, 1600);
    ctx.fillText('∫∫ |Ψ(r, t)|² dV = 1', 320, 1250);
    ctx.fillText('Δx · Δp ≥ ℏ / 2', 450, 950);
    ctx.fillText('E² = (pc)² + (m₀c²)²', 220, 700);

    ctx.fillText('lim (t → ∞) Cat = Corner 🐾', 1200, 600);

    // Несколько милых отпечатков лапок кота мелом на полу
    const drawPaw = (cx: number, cy: number, scale = 1, angle = 0) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = catPawColor;

      // Главная подушечка
      ctx.beginPath();
      ctx.ellipse(0, 0, 16 * scale, 12 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4 пальчика
      const toes = [
        { x: -14, y: -16, rx: 5, ry: 7, rot: -0.3 },
        { x: -5, y: -20, rx: 5.5, ry: 8, rot: -0.1 },
        { x: 5, y: -20, rx: 5.5, ry: 8, rot: 0.1 },
        { x: 14, y: -16, rx: 5, ry: 7, rot: 0.3 }
      ];
      toes.forEach((t) => {
        ctx.beginPath();
        ctx.ellipse(t.x * scale, t.y * scale, t.rx * scale, t.ry * scale, t.rot, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    // Цепочка следов, ведущая от центра к углу
    drawPaw(900, 1100, 1.2, -0.6);
    drawPaw(820, 960, 1.2, -0.5);
    drawPaw(680, 800, 1.2, -0.7);
    drawPaw(520, 620, 1.2, -0.6);
    drawPaw(380, 440, 1.2, -0.7);
    drawPaw(220, 260, 1.2, -0.7); // у самого угла!

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }
}
