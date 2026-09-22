export type Language = 'ru' | 'en' | 'zh';

export interface TokenInfo {
  name: string;
  symbol: string;
  chain: string;
  contractAddress: string;
  totalSupply: string;
  tax: string;
  liquidity: string;
  dexUrl: string;
  chartUrl: string;
  explorerUrl: string;
  telegramUrl: string;
  twitterUrl: string;
  geniusUrl: string;
}

export interface TradeQuote {
  id: string;
  text: string;
  multiplier: string;
  tag: string;
}

export interface MemeItem {
  id: string;
  title: string;
  tagline: string;
  gesture: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type FormulaCategory =
  | 'feline_physics'
  | 'quantum'
  | 'relativity'
  | 'math'
  | 'cosmology';

export interface FormulaItem {
  id: string;
  category: FormulaCategory;
  categoryLabel: string;
  title: string;
  latex: string;
  explanation: string;
  catThought: string;
  catMemeQuote: string;
  chalkColor?: 'white' | 'yellow' | 'cyan' | 'pink' | 'orange';
  difficultyStars: number;
  subNotes?: string[];
}

export type CatMood = 'philosophical' | 'curious' | 'genius' | 'sleepy' | 'hungry';

export interface ChalkStroke {
  points: { x: number; y: number }[];
  color: string;
  width: number;
}
