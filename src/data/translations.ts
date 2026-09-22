import { TokenInfo, TradeQuote, MemeItem, FaqItem, Language } from '../types';

export const TOKEN_INFO: TokenInfo = {
  name: 'sixmeme',
  symbol: '$SIX',
  chain: 'BNB Chain',
  contractAddress: '即将正式公布 🤙 敬请期待',
  totalSupply: '666,666,666',
  tax: '0% / 0%',
  liquidity: '100% 锁定 / 极致通缩',
  dexUrl: 'https://pancakeswap.finance',
  chartUrl: 'https://dexscreener.com',
  explorerUrl: 'https://bscscan.com',
  telegramUrl: 'https://t.me/sixmeme_genius',
  twitterUrl: 'https://x.com/sixmeme_coin',
  geniusUrl: 'https://genius.fun'
};

export const TRADE_QUOTES: Record<Language, TradeQuote[]> = {
  ru: [
    { id: '1', text: 'ВХОД НА САМОМ ДНЕ: +666% ИДЕАЛЬНЫЙ ТАЙМИНГ 🤙', multiplier: '6.66x', tag: 'GENIUS ALPHA' },
    { id: '2', text: 'ЛИКВИДАЦИИ ШОРТОВ ВЫПОЛНЕНЫ! ТАК ДЕЛАЮТ НА GENIUS!', multiplier: '66.6x', tag: 'GOD CANDLE' },
    { id: '3', text: '1000x IQ МУВ: КИТЫ В ПАНИКЕ СКУПАЮТ ПО СТАКАНУ 🤙', multiplier: '16.6x', tag: 'SMART MONEY' },
    { id: '4', text: 'ЗАКРЫЛ ЛОНГ НА САМОМ ПИКЕ: КУЛЬТОВЫЙ ЖЕСТ ШЕСТЕРКИ 🤙', multiplier: '666x', tag: 'SNIPER ENTRY' },
    { id: '5', text: 'ЧИСТАЯ АЛЬФА В СЕТИ BNB: ТОЛЬКО ДЛЯ ТЕХ, КТО В ТЕМЕ!', multiplier: '106x', tag: 'ALPHA RADAR' },
    { id: '6', text: 'КНОПКА «ВЫБРОСИТЬ 6» АКТИВИРОВАЛА РЕЖИМ ГЕНИЯ 🤙', multiplier: '600x', tag: 'GENIUS MODE' }
  ],
  en: [
    { id: '1', text: 'SNIPED THE EXACT BOTTOM: +666% PERFECTION 🤙', multiplier: '6.66x', tag: 'GENIUS ALPHA' },
    { id: '2', text: 'SHORT SQUEEZE TRIGGERED! GENIUS TERMINAL ACTIVE!', multiplier: '66.6x', tag: 'GOD CANDLE' },
    { id: '3', text: '1000x IQ PLAY: WHALES ARE APING INTO $SIX 🤙', multiplier: '16.6x', tag: 'SMART MONEY' },
    { id: '4', text: 'EXITED AT THE TICK TOP: THROW UP THE SIX 🤙', multiplier: '666x', tag: 'SNIPER ENTRY' },
    { id: '5', text: 'UNSTOPPABLE BNB MOMENTUM: PURE MEME PERFECTION!', multiplier: '106x', tag: 'ALPHA RADAR' },
    { id: '6', text: 'HIT THE 6 BUTTON: MAXIMUM GENIUS UNLOCKED 🤙', multiplier: '600x', tag: 'GENIUS MODE' }
  ],
  zh: [
    { id: '1', text: '精准抄底！+666% 顶级神操作 🤙', multiplier: '6.66x', tag: '天才阿尔法' },
    { id: '2', text: '大单爆拉！Genius平台专属神级走势 🤙', multiplier: '66.6x', tag: '擎天巨柱' },
    { id: '3', text: '老铁666！巨鲸全速扫盘买入 $SIX', multiplier: '16.6x', tag: '聪明钱' },
    { id: '4', text: '逃顶大师！打出6手势，尽显天秀操作 🤙', multiplier: '666x', tag: '狙击入场' },
    { id: '5', text: 'BNB链最纯粹的Meme共识：只要打6就是天才！', multiplier: '106x', tag: '极致共识' },
    { id: '6', text: '666连击触发！天才模式全开 🤙', multiplier: '600x', tag: '天才模式' }
  ]
};

export const MEME_GALLERY: MemeItem[] = [
  { id: 'm1', title: 'Throw the 6', tagline: 'When the trade prints +666% on Genius', gesture: '🤙', badge: 'PRO TRADER' },
  { id: 'm2', title: '1000x IQ Move', tagline: 'Buying the dip when everyone else is scared', gesture: '🧠🤙', badge: 'HIGH IQ' },
  { id: 'm3', title: 'Genius Mode ON', tagline: 'Zero emotion, pure 6-energy sniper trades', gesture: '⚡🤙', badge: 'LEGEND' },
  { id: 'm4', title: 'BNB 666 Energy', tagline: 'Fastest blocks, lowest fees, maximum vibe', gesture: '🔥🤙', badge: 'BNB CHAIN' },
  { id: 'm5', title: 'Diamond Pinky', tagline: 'Holding through turbulence like a true genius', gesture: '💎🤙', badge: 'HODL 6' },
  { id: 'm6', title: 'The Universal Sign', tagline: 'From Shanghai to New York: 🤙 means Genius', gesture: '🌐🤙', badge: 'GLOBAL' }
];

export const CONTENT = {
  ru: {
    nav: {
      about: 'Суть 6',
      tokenomics: '6-номика',
      terminal: 'Genius Терминал',
      howToBuy: 'Как купить',
      memes: 'Мем-пак',
      tradeBtn: 'Торговать на Genius'
    },
    hero: {
      badge: 'BNB CHAIN • КУЛЬТОВЫЙ МЕМ ПЛАТФОРМЫ GENIUS',
      titlePrimary: '6 — ЭТО СИМВОЛ',
      titleHighlight: 'GENIUS',
      subtitle: 'Цифра 6 (🤙 / 666) — международный код гениальных трейдеров. Рожден для тех, кто торгует мем-коинами на платформе Genius с молниеносной скоростью и максимальным профитом.',
      copyCa: 'Скопировать CA',
      caCopied: 'Контракт скопирован! 🤙',
      viewChart: 'График на DexScreener',
      liveTrading: 'Торговать сейчас',
      stats: {
        symbol: 'Тикер: $SIX',
        supply: 'Сапплай: 666M',
        tax: 'Налог: 0% / 0%',
        chain: 'Сеть: BNB Chain',
        geniusRating: 'IQ Рейтинг: 666'
      }
    },
    about: {
      tag: 'КУЛЬТУРНЫЙ КОД ТРЕЙДИНГА',
      title: 'Почему именно цифра 6?',
      desc: 'В криптомире и на торговой платформе Genius жест «6» (🤙) — это не просто число. Это универсальный знак ультра-успешных сделок, когда ты закрыл иксы и показал всем высший класс.',
      cards: [
        {
          num: '01',
          icon: '🤙',
          title: '666 = Гениальный Мув',
          desc: 'В азиатской интернет-культуре и глобальном крипто-сообществе «666» (六六六) означает непревзойденное мастерство, безупречный тайминг и статус Джиниуса.'
        },
        {
          num: '02',
          icon: '⚡',
          title: 'Рожден для платформы Genius',
          desc: 'Genius — передовая платформа и терминал для торговли мем-коинами. $SIX создан как ее флагманский талисман и вирусный мем для всех трейдеров.'
        },
        {
          num: '03',
          icon: '🎯',
          title: '0% Налогов, 100% Честности',
          desc: 'Никаких скрытых комиссий, никаких заблокированных контрактов. Чистый мем для людей, любящих стиль, эстетику и легкие иксы.'
        }
      ]
    },
    terminal: {
      tag: 'ИНТЕРАКТИВНЫЙ ТРЕНАЖЕР АЛЬФЫ',
      title: 'Genius 666 IQ Simulator',
      desc: 'Проверь свои трейдерские рефлексы! Нажми на неоновую кнопку, выброси жест 🤙 и активируй режим Джиниуса!',
      button: 'ВЫБРОСИТЬ ЖЕСТ 🤙 (СДЕЛАТЬ 666)',
      iqLabel: 'Текущий Genius IQ',
      comboLabel: 'Комбо жестов 6',
      totalSimulated: 'Сгенерировано профита',
      historyTitle: 'Журнал гениальных сделок'
    },
    tokenomics: {
      tag: 'ПРОЗРАЧНОСТЬ И СТИЛЬ',
      title: 'Шестиномика ($SIX)',
      desc: 'Идеально выверенная математика для мем-сообщества платформы Genius.',
      items: [
        { label: 'Общая эмиссия', value: '666,666,666', note: 'Символическое число гениев' },
        { label: 'Налоги на покупку / продажу', value: '0% / 0%', note: 'Никаких поборов' },
        { label: 'Ликвидность', value: '100% Заблокирована', note: 'Безопасность инвесторов' },
        { label: 'Сеть запуска', value: 'BNB Chain', note: 'Минимальные комиссии' }
      ]
    },
    howToBuy: {
      tag: 'БЫСТРЫЙ СТАРТ',
      title: 'Как залететь в $SIX',
      steps: [
        { step: '01', title: 'Создай кошелек', desc: 'Установи MetaMask, Trust Wallet или Rabby и подключи сеть BNB Smart Chain.' },
        { step: '02', title: 'Пополни BNB', desc: 'Купи BNB на любой бирже или переведи на свой личный кошелек.' },
        { step: '03', title: 'Открой Genius / DEX', desc: 'Перейди на платформу Genius (или PancakeSwap) и вставь официальный контракт $SIX.' },
        { step: '04', title: 'Свапни и держи 🤙', desc: 'Обменяй BNB на $SIX, выброси жест 🤙 в Twitter/Telegram и встречай туземун!' }
      ]
    },
    gallery: {
      tag: 'МЕМ-АРСЕНАЛ',
      title: 'Стена славы Джиниуса',
      desc: 'Фирменные карточки и стикеры для крипто-твиттера и телеграм-чатов.',
      copyPrompt: 'Скопировать слоган'
    },
    faq: {
      tag: 'ВОПРОСЫ И ОТВЕТЫ',
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Что означает цифра 6 в sixmeme?',
          answer: 'Цифра 6 и жест 🤙 (шака / китайский знак 6) во всем мире символизируют виртуозное мастерство («666 = Genius», «老铁666»). На платформе Genius для торговли мем-коинами это главный опознавательный знак тех, кто делает лучший профит.'
        },
        {
          question: 'На каком блокчейне работает $SIX?',
          answer: 'Токен запущен в сети BNB Smart Chain (BEP-20) для мгновенной скорости транзакций и сверхнизких комиссий.'
        },
        {
          question: 'Есть ли налог на транзакции?',
          answer: 'Нет! Налог равен 0% как на покупку, так и на продажу (0/0 Tax). Вы получаете ровно то, что свапаете.'
        }
      ]
    },
    footer: {
      text: 'sixmeme ($SIX) — независимый культурный мем-токен, вдохновленный торговой платформой Genius. Мем создан исключительно для фана, красоты и объединения трейдеров.',
      rights: '© 2026 sixmeme. All rights reserved. Always throw up the 🤙.'
    }
  },
  en: {
    nav: {
      about: 'Why 6',
      tokenomics: '6-Nomics',
      terminal: 'Genius Terminal',
      howToBuy: 'How to Buy',
      memes: 'Meme Pack',
      tradeBtn: 'Trade on Genius'
    },
    hero: {
      badge: 'BNB CHAIN • THE OFFICIAL GENIUS MEME PHENOMENON',
      titlePrimary: '6 IS THE NEW',
      titleHighlight: 'GENIUS',
      subtitle: 'The number 6 (🤙 / 666) is the global calling card of alpha traders. Built for the degen geniuses dominating the Genius meme trading platform on BNB Chain.',
      copyCa: 'Copy CA',
      caCopied: 'Contract Copied! 🤙',
      viewChart: 'Live DexScreener Chart',
      liveTrading: 'Trade on Genius Now',
      stats: {
        symbol: 'Ticker: $SIX',
        supply: 'Supply: 666M',
        tax: 'Tax: 0% / 0%',
        chain: 'Network: BNB Chain',
        geniusRating: 'IQ Score: 666'
      }
    },
    about: {
      tag: 'THE CULTURE OF THE 6',
      title: 'Why The Number 6?',
      desc: 'In crypto and across the Genius trading ecosystem, the 6 gesture (🤙) represents god-tier trades, 1000x IQ execution, and effortless swagger.',
      cards: [
        {
          num: '01',
          icon: '🤙',
          title: '666 = God-Tier Genius',
          desc: 'In web3 lore, "666" means immaculate gameplay, surgical precision, and untouchable alpha. Throw up the six when you win.'
        },
        {
          num: '02',
          icon: '⚡',
          title: 'Born for Genius Platform',
          desc: 'Genius is the premier trading terminal for fast-paced meme coins. $SIX is the cultural soul and flagship meme of the ecosystem.'
        },
        {
          num: '03',
          icon: '🎯',
          title: 'Zero Tax, Pure Meme',
          desc: '0/0 tax, 100% fair launch, burnt liquidity. Built for real traders who appreciate sleek design, high aesthetics, and pure vibes.'
        }
      ]
    },
    terminal: {
      tag: 'INTERACTIVE ALPHA TESTER',
      title: 'Genius 666 IQ Simulator',
      desc: 'Test your trading instincts! Slam the glowing pink neon button, throw the 🤙 and trigger maximum Genius mode!',
      button: 'THROW THE 6 🤙 (HIT 666)',
      iqLabel: 'Current Genius IQ',
      comboLabel: '6-Gesture Streak',
      totalSimulated: 'Total Simulated Alpha',
      historyTitle: 'Live Genius Trade Feed'
    },
    tokenomics: {
      tag: 'TRANSPARENT & SLEEK',
      title: '6-Nomics ($SIX)',
      desc: 'Simple, bulletproof tokenomics designed for the community.',
      items: [
        { label: 'Total Supply', value: '666,666,666', note: 'The sacred number of Genius' },
        { label: 'Buy / Sell Tax', value: '0% / 0%', note: 'Zero friction trades' },
        { label: 'Liquidity', value: '100% Locked / Burnt', note: 'Rock-solid security' },
        { label: 'Chain', value: 'BNB Chain', note: 'Ultra-low gas fees' }
      ]
    },
    howToBuy: {
      tag: 'EASY ONBOARDING',
      title: 'How to Get $SIX',
      steps: [
        { step: '01', title: 'Get a Wallet', desc: 'Download MetaMask, Trust Wallet, or Rabby and connect to BNB Chain.' },
        { step: '02', title: 'Fund with BNB', desc: 'Transfer BNB to your wallet to cover the swap and tiny network gas.' },
        { step: '03', title: 'Open Genius or DEX', desc: 'Head over to Genius Terminal or PancakeSwap and paste the official $SIX contract.' },
        { step: '04', title: 'Swap & Throw the 6 🤙', desc: 'Execute your trade, join the community, and let the 666 green candles flow!' }
      ]
    },
    gallery: {
      tag: 'VIRAL ARSENAL',
      title: 'Genius Wall of Fame',
      desc: 'Exclusive neon cards and badges for your Telegram and X posts.',
      copyPrompt: 'Copy Meme Quote'
    },
    faq: {
      tag: 'FAQ',
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What does the number 6 mean for sixmeme?',
          answer: 'The number 6 and the 🤙 hand gesture symbolize unmatched skill, "Genius" plays, and good fortune in Asian and web3 gaming culture ("666"). On the Genius platform, it is the universal salute among winning traders.'
        },
        {
          question: 'Which network is $SIX on?',
          answer: '$SIX is deployed natively on BNB Chain (BEP-20) for lightning-fast block times and minimal gas fees.'
        },
        {
          question: 'Are there any hidden taxes?',
          answer: 'None! $SIX features a 0% buy and 0% sell tax policy for seamless trading.'
        }
      ]
    },
    footer: {
      text: 'sixmeme ($SIX) is a community meme coin inspired by the Genius trading platform. Crafted for visual delight, community vibes, and legendary trades.',
      rights: '© 2026 sixmeme. All rights reserved. Always throw up the 🤙.'
    }
  },
  zh: {
    nav: {
      about: '数字6渊源',
      tokenomics: '6的经济学',
      terminal: 'Genius终端',
      howToBuy: '如何购买',
      memes: 'Meme表情包',
      tradeBtn: '在Genius交易'
    },
    hero: {
      badge: 'BNB CHAIN • GENIUS 交易平台专属文化 MEME',
      titlePrimary: '数字 6 就是',
      titleHighlight: 'GENIUS 天才',
      subtitle: '数字 6 (🤙 / 666) 是全球 Web3 玩家公认的“秀翻全场”与“天才操作”代码。专为在 Genius 平台猎杀百倍金狗的顶级交易员而生。',
      copyCa: '即将正式公布 🤙',
      caCopied: '合约即将上线，敬请关注官方公告！🤙',
      viewChart: 'DexScreener (上线即看)',
      liveTrading: '官方 Telegram 频道',
      stats: {
        symbol: '代币代号: $SIX',
        supply: '发行量: 6.66亿',
        tax: '滑点税费: 0% / 0%',
        chain: '网络: BNB Chain',
        geniusRating: 'IQ 评级: 666'
      }
    },
    about: {
      tag: '文化共识',
      title: '为什么是数字 6？',
      desc: '在加密文化与 Genius 交易生态中，打出 6 (🤙) 手势代表着毫无破绽的精准逃顶、波段之王与天才级交易直觉。',
      cards: [
        {
          num: '01',
          icon: '🤙',
          title: '老铁 666 = 天才神操作',
          desc: '“666”源自中文网络顶级称赞，现已成为全球加密交易员表达“这波操作太秀了、太Genius了”的标志性手势。'
        },
        {
          num: '02',
          icon: '⚡',
          title: '为 Genius 平台而生',
          desc: 'Genius 是最前沿的多链与Meme交易终端，$SIX 是整个生态中最具凝聚力与视觉冲击力的代表代币。'
        },
        {
          num: '03',
          icon: '🎯',
          title: '0% 交易税，纯粹极致',
          desc: '无团队私税，流动性完全锁定，为每一个热爱高颜值与极致审美的Web3玩家打造。'
        }
      ]
    },
    terminal: {
      tag: '互动阿尔法模拟器',
      title: 'Genius 666 IQ 交易仪',
      desc: '测试你的交易盘感！按下荧光粉红按钮，打出 6 手势 🤙，瞬间解锁最高级天才状态！',
      button: '打出 666 🤙 (天才连击)',
      iqLabel: '当前 Genius 智商',
      comboLabel: '6手势连续连击',
      totalSimulated: '模拟收益总额',
      historyTitle: '天才实时交易战报'
    },
    tokenomics: {
      tag: '极致极简',
      title: '6-Nomics 代币模型',
      desc: '向“6”致敬的纯粹数字模型。',
      items: [
        { label: '代币总供应量', value: '666,666,666', note: '天才的幸运数字' },
        { label: '买入 / 卖出税', value: '0% / 0%', note: '无任何摩擦损耗' },
        { label: '流动性资金池', value: '100% 锁定/销毁', note: '安全无后顾之忧' },
        { label: '部署网络', value: 'BNB Chain', note: '低至几分钱的Gas费' }
      ]
    },
    howToBuy: {
      tag: '极简指南',
      title: '如何入手 $SIX',
      steps: [
        { step: '01', title: '准备钱包', desc: '安装 MetaMask、OKX Wallet 或 Trust Wallet 并切换至 BNB Chain。' },
        { step: '02', title: '充值 BNB', desc: '向钱包转入适量 BNB 用于兑换代币及极低的手续费。' },
        { step: '03', title: '关注官方公布合约', desc: '官方合约地址即将正式揭晓，请务必认准官方频道公布的唯一 CA。' },
        { step: '04', title: '即刻兑换并打出 6 🤙', desc: '上线后在 PancakeSwap 或 Genius 终端完成秒级兑换，打出 666 迎接大行情！' }
      ]
    },
    gallery: {
      tag: '表情包与传播',
      title: 'Genius 天才名人堂',
      desc: '高清霓虹风格 6 手势壁纸与社交徽章，随取随用。',
      copyPrompt: '复制经典金句'
    },
    faq: {
      tag: '常见问答',
      title: 'FAQ 常见问题',
      items: [
        {
          question: 'sixmeme 代币的寓意是什么？',
          answer: '数字 6 在东方与全球 Web3 文化中是“顺畅”、“牛逼”与“天才（Genius）”的代名词。sixmeme 是将数字 6 与 Genius 交易平台深度绑定打造的潮流代币。'
        },
        {
          question: '代币部署在哪个网络？',
          answer: '部署在速度极快、手续费极低的 BNB Smart Chain (BEP-20) 网络。'
        },
        {
          question: '是否有隐藏税费？',
          answer: '没有，买卖均为 0% 税率，完全公开透明。'
        }
      ]
    },
    footer: {
      text: 'sixmeme ($SIX) 是由 Genius 交易平台文化激发的社区艺术 Meme 代币。致力于极致视觉美感与欢畅的交易氛围。',
      rights: '© 2026 sixmeme. All rights reserved. 随时打出 🤙 666。'
    }
  }
};
