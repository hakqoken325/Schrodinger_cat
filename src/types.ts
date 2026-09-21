export type CharacterId =
  | 'red_ai'
  | 'fly_immortal'
  | 'pink_node'
  | 'blue_quantum'
  | 'green_sprout'
  | 'golden_coin'
  | 'white_cloud';

export type CharacterAction =
  | 'idle'
  | 'walking'
  | 'flying'
  | 'talking'
  | 'working'
  | 'celebrating';

export type TimeOfDay = 'day' | 'sunset' | 'night';

export type CameraMode =
  | 'square_overview'
  | 'follow_red_ai'
  | 'follow_fly'
  | 'follow_pink_node'
  | 'follow_blue_quantum'
  | 'follow_green_sprout'
  | 'follow_golden_coin'
  | 'follow_white_cloud';

export interface CharacterDialogue {
  speakerId: CharacterId;
  textZh: string;
  durationMs?: number;
}

export interface ConversationThread {
  id: string;
  participants: CharacterId[];
  locationNameZh: string;
  lines: CharacterDialogue[];
}

export interface TownPoi {
  id: string;
  nameZh: string;
  position: [number, number, number];
  descriptionZh: string;
  poiType: 'fountain' | 'cafe' | 'lab' | 'bakery' | 'clock_tower' | 'park' | 'garden';
}

export interface ActiveSpeechBubble {
  speakerId: CharacterId;
  textZh: string;
}

export interface CharacterProfile {
  id: CharacterId;
  nameZh: string;
  roleZh: string;
  tagZh: string;
  themeColor: string;
  accentColor: string;
  avatarBg: string;
  defaultTaskZh: string;
}
