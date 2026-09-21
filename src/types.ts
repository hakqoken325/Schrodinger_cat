export type CatActionState = 
  | 'corner_solving'     // Знаменитая поза в углу как на фото
  | 'inspecting_wall'    // Рассматривает формулу на стене
  | 'inspecting_floor'   // Рассматривает формулы на полу
  | 'walking'            // Идет к новой формуле или цели
  | 'sitting'            // Спокойно сидит и размышляет
  | 'purring';           // Мурлычет, когда погладили

export type CameraViewPreset = 
  | 'corner_meme'        // Ракурс точь-в-точь как на фото (из-за спины в угол)
  | 'follow_cat'         // Камера плавно следует за котом
  | 'room_wide'          // Широкий кинематографичный обзор всей комнаты
  | 'wall_left'          // Крупный план левой стены (оптика, линзы)
  | 'wall_right';        // Крупный план правой стены (интегралы освещенности)

export type RoomTheme = 'classic_paper' | 'warm' | 'neon_glow' | 'dark_chalk';

export interface FormulaPoint {
  id: string;
  name: string;
  category: 'optics' | 'calculus' | 'quantum' | 'corner';
  position: [number, number, number]; // x, y, z в 3D
  lookAt: [number, number, number];
  thought: string;
  formulaLatex: string;
}
