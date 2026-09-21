import { TownPoi, ConversationThread, CharacterProfile, CharacterId } from './types';

// Профили 7 персонажей городка
export const CHARACTER_PROFILES: Record<CharacterId, CharacterProfile> = {
  red_ai: {
    id: 'red_ai',
    nameZh: '小AI (赤红)',
    roleZh: '智能算法工程师',
    tagZh: 'AI',
    themeColor: '#ef4444',
    accentColor: 'border-red-500',
    avatarBg: 'bg-red-500',
    defaultTaskZh: '正在AI实验室跑大规模模型与路径优化'
  },
  fly_immortal: {
    id: 'fly_immortal',
    nameZh: '永生苍蝇 (墨灰)',
    roleZh: '自由漫游哲学家',
    tagZh: '永生',
    themeColor: '#3f3f46',
    accentColor: 'border-amber-400',
    avatarBg: 'bg-zinc-800',
    defaultTaskZh: '在钟楼上盘旋、寻找咖啡馆新鲜方糖'
  },
  pink_node: {
    id: 'pink_node',
    nameZh: '粉色节点 (立方)',
    roleZh: '几何烘焙糕点师',
    tagZh: 'NODE',
    themeColor: '#ec4899',
    accentColor: 'border-pink-500',
    avatarBg: 'bg-pink-500',
    defaultTaskZh: '正在烘焙坊研发全新六面体舒芙蕾'
  },
  blue_quantum: {
    id: 'blue_quantum',
    nameZh: '量子小蓝 (青空)',
    roleZh: '量子物理研究员',
    tagZh: '量子',
    themeColor: '#0ea5e9',
    accentColor: 'border-sky-400',
    avatarBg: 'bg-sky-500',
    defaultTaskZh: '在中央喷泉测定微观粒子共振频率'
  },
  green_sprout: {
    id: 'green_sprout',
    nameZh: '萌芽园丁 (嫩绿)',
    roleZh: '小镇生态绿化师',
    tagZh: '生态',
    themeColor: '#10b981',
    accentColor: 'border-emerald-400',
    avatarBg: 'bg-emerald-500',
    defaultTaskZh: '在花圃给七彩郁金香浇水并梳理草坪'
  },
  golden_coin: {
    id: 'golden_coin',
    nameZh: '金灿灿 (辉金)',
    roleZh: '财政与许愿池管家',
    tagZh: '财富',
    themeColor: '#f59e0b',
    accentColor: 'border-amber-400',
    avatarBg: 'bg-amber-500',
    defaultTaskZh: '正在清点小镇金库并向喷泉投掷幸运币'
  },
  white_cloud: {
    id: 'white_cloud',
    nameZh: '云朵大厨 (奶白)',
    roleZh: '甜心咖啡首席烘焙师',
    tagZh: '美味',
    themeColor: '#f8fafc',
    accentColor: 'border-sky-300',
    avatarBg: 'bg-slate-200 text-slate-800',
    defaultTaskZh: '在露天露台调制招牌云朵焦糖玛奇朵'
  }
};

// Ключевые точки городка
export const TOWN_POIS: TownPoi[] = [
  {
    id: 'fountain',
    nameZh: '中央量子许愿喷泉',
    position: [0, 0, 0],
    descriptionZh: '小镇的灵魂地标，泉水清澈晶莹，顶端悬浮着友谊紫水晶。',
    poiType: 'fountain'
  },
  {
    id: 'cafe',
    nameZh: '甜心字节咖啡馆',
    position: [-5.5, 0, -4.5],
    descriptionZh: '云朵大厨的常驻工坊，供应全镇最好喝的热拿铁和香甜方糖。',
    poiType: 'cafe'
  },
  {
    id: 'lab',
    nameZh: 'AI 神经科技实验室',
    position: [5.5, 0, -5.0],
    descriptionZh: '小AI与量子小蓝的研究重镇，天线终日闪烁着数据脉冲。',
    poiType: 'lab'
  },
  {
    id: 'bakery',
    nameZh: '立方几何烘焙坊',
    position: [5.0, 0, 4.5],
    descriptionZh: '粉色节点的手作面点屋，所有点心均严格遵循黄金比例立方体。',
    poiType: 'bakery'
  },
  {
    id: 'clock_tower',
    nameZh: '永恒时钟纪念塔',
    position: [-4.8, 0, 5.2],
    descriptionZh: '高耸石砌古钟楼，金钟回响时能将小镇全体居民召集回广场。',
    poiType: 'clock_tower'
  },
  {
    id: 'flower_garden',
    nameZh: '七彩郁金香花圃',
    position: [-1.8, 0, 4.8],
    descriptionZh: '萌芽园丁悉心照料的花坛，盛开着红粉蓝金各色小花。',
    poiType: 'garden'
  },
  {
    id: 'park_bench',
    nameZh: '绿荫休憩长椅',
    position: [0.5, 0, 6.0],
    descriptionZh: '大树下的静谧木椅，是居民们散步累了聊天晒太阳的绝佳场所。',
    poiType: 'park'
  }
];

// Автономные диалоги при встречах персонажей (все на китайском упрощенном)
export const CONVERSATIONS: ConversationThread[] = [
  // 1. 小AI + 永生苍蝇
  {
    id: 'ai_fly_sugar',
    participants: ['red_ai', 'fly_immortal'],
    locationNameZh: '喷泉旁',
    lines: [
      { speakerId: 'red_ai', textZh: '嗨，永生！我的神经网络刚跑完了小镇天气预测！' },
      { speakerId: 'fly_immortal', textZh: '嗡嗡... 别算啦！咖啡馆刚出炉了新烘焙的纯正方糖！' },
      { speakerId: 'red_ai', textZh: '方糖能给处理器降温吗？或者能提升时钟频率？' },
      { speakerId: 'fly_immortal', textZh: '它能带来永恒的快乐多巴胺！快和我一起飞过去！' }
    ]
  },
  // 2. 粉色节点 + 永生苍蝇
  {
    id: 'pink_fly_cube',
    participants: ['pink_node', 'fly_immortal'],
    locationNameZh: '钟楼脚下',
    lines: [
      { speakerId: 'pink_node', textZh: '看呀永生，我给钟楼新设计了一个绝美的拓扑立方阶梯！' },
      { speakerId: 'fly_immortal', textZh: '嗡嗡... 真整齐！本苍蝇能在上面搓手手晒太阳吗？' },
      { speakerId: 'pink_node', textZh: '当然可以！表面已经用纳米级精细度打磨好啦，绝对不扎脚！' },
      { speakerId: 'fly_immortal', textZh: '在永生安逸指数排行榜上，我给你打满分 10 分！' }
    ]
  },
  // 3. 小AI + 粉色节点
  {
    id: 'ai_pink_algorithm',
    participants: ['red_ai', 'pink_node'],
    locationNameZh: '实验室门前',
    lines: [
      { speakerId: 'red_ai', textZh: '我刚刚把全镇面包的最优配送路径计算完成！' },
      { speakerId: 'pink_node', textZh: '太棒了！那我们早晨享用热牛角包的速度能提升多少？' },
      { speakerId: 'red_ai', textZh: '根据矩阵分析，效率提升了整整 142.8%！' },
      { speakerId: 'pink_node', textZh: '哇塞！待会儿烤一炉特大立方曲奇奖励你的超级算力！' }
    ]
  },
  // 4. 萌芽园丁 + 云朵大厨
  {
    id: 'sprout_cloud_tea',
    participants: ['green_sprout', 'white_cloud'],
    locationNameZh: '花圃咖啡露台',
    lines: [
      { speakerId: 'white_cloud', textZh: '园丁早呀！今天花园里的薄荷叶长得真嫩，我能采两片泡茶吗？' },
      { speakerId: 'green_sprout', textZh: '大厨随便采！我刚给它们浇了含有微量元素的泉水，香气正浓呢！' },
      { speakerId: 'white_cloud', textZh: '那我今天就为你特调一杯小镇专属“青草薄荷云朵拿铁”！' },
      { speakerId: 'green_sprout', textZh: '太幸福了！工作更有动力啦，今天要把所有郁金香都喂饱！' }
    ]
  },
  // 5. 金灿灿 + 量子小蓝
  {
    id: 'gold_quantum_coin',
    participants: ['golden_coin', 'blue_quantum'],
    locationNameZh: '中央喷泉前',
    lines: [
      { speakerId: 'golden_coin', textZh: '小蓝！你看这枚金币，如果投进许愿池，心愿成真的概率是多少？' },
      { speakerId: 'blue_quantum', textZh: '在波函数坍缩前，它处于“愿望实现”和“超级实现”的叠加态！' },
      { speakerId: 'golden_coin', textZh: '哈哈！那我愿望是小镇所有居民每天都财富滚滚、笑口常开！' },
      { speakerId: 'blue_quantum', textZh: '这个正向能量场太强了，测定仪屏幕都亮起来了！' }
    ]
  },
  // 6. 萌芽园丁 + 金灿灿
  {
    id: 'sprout_gold_lucky',
    participants: ['green_sprout', 'golden_coin'],
    locationNameZh: '绿荫长椅旁',
    lines: [
      { speakerId: 'golden_coin', textZh: '园丁！我看到花坛里冒出了一棵四叶草，这可是大吉大利的好兆头！' },
      { speakerId: 'green_sprout', textZh: '是真的！那是我昨天特意选育的黄金四叶草品种哦！' },
      { speakerId: 'golden_coin', textZh: '给你记一大功！今天的金库分红给你加一颗亮晶晶金星！' },
      { speakerId: 'green_sprout', textZh: '谢谢管家！小植物们也会开心地吸收好运的！' }
    ]
  },
  // 7. 量子小蓝 + 小AI
  {
    id: 'quantum_ai_sync',
    participants: ['blue_quantum', 'red_ai'],
    locationNameZh: '实验室天线塔下',
    lines: [
      { speakerId: 'blue_quantum', textZh: '小AI，刚才小镇上空的量子通信延迟降低到了 0.001 毫秒！' },
      { speakerId: 'red_ai', textZh: '太神奇了！是不是你刚才调整了喷泉顶上的友谊紫水晶？' },
      { speakerId: 'blue_quantum', textZh: '没错！只要大家心连心，量子纠缠信号就会变得无限强！' },
      { speakerId: 'red_ai', textZh: '友谊算法永远是宇宙最顶层的超参数！' }
    ]
  },
  // 8. 云朵大厨 + 永生苍蝇
  {
    id: 'cloud_fly_sweet',
    participants: ['white_cloud', 'fly_immortal'],
    locationNameZh: '咖啡馆门前',
    lines: [
      { speakerId: 'fly_immortal', textZh: '大厨大厨！今天烤箱里飘出来的味道，简直香得让我神魂颠倒！' },
      { speakerId: 'white_cloud', textZh: '哈哈，专门给你留了最上等的一小盘焦糖脆糖珠，就在窗台上！' },
      { speakerId: 'fly_immortal', textZh: '嗡嗡！永生万岁！云朵大厨万岁！我要在房顶上跳个旋转舞！' },
      { speakerId: 'white_cloud', textZh: '慢点飞，吃饱了记得多晒晒太阳哦！' }
    ]
  },
  // 9. 全员在中央喷泉大集合 (敲钟触发)
  {
    id: 'trio_gathering',
    participants: ['red_ai', 'fly_immortal', 'pink_node', 'blue_quantum', 'green_sprout', 'golden_coin', 'white_cloud'],
    locationNameZh: '中央广场大聚会',
    lines: [
      { speakerId: 'fly_immortal', textZh: '哇！钟声一响，全镇 7 位好朋友全到齐啦！' },
      { speakerId: 'golden_coin', textZh: '好热闹啊！今天小镇幸福指数刷新了历史峰值！' },
      { speakerId: 'green_sprout', textZh: '我给每位朋友都编织了新鲜的花环手环！' },
      { speakerId: 'white_cloud', textZh: '热气腾腾的云朵果汁和甜点无限量供应！' },
      { speakerId: 'pink_node', textZh: '大家一起在喷泉边排好队形，来个全员大合照！' },
      { speakerId: 'blue_quantum', textZh: '量子晶体闪耀记录下这最美好的瞬间！' },
      { speakerId: 'red_ai', textZh: '核心存储器已存档：这是我们最快乐的一天！' }
    ]
  }
];

// Случайные индивидуальные мысли персонажей при клике
export const IDLE_THOUGHTS: Record<CharacterId, string[]> = {
  red_ai: [
    '正在扫描小镇环境... 所有系统指标完美稳定！',
    '待会儿去咖啡馆，测一下咖啡机的最佳萃取温度。',
    '我可真是个圆润又帅气的红色大球球！',
    '数着去喷泉的步数：1，2，3... 算法真精准。',
    '今天又是充满算力与智慧的一天！'
  ],
  fly_immortal: [
    '嗡嗡... 永生的味道闻起来像刚出炉的黄油面包！',
    '绕着路灯转两圈，舒展一下我帅气的小翅膀。',
    '我圆溜溜的大红眼睛能360度全景欣赏小镇风光！',
    '找粉色节点聊聊天去，看看他又叠了什么新方块！',
    '阳光照在翅膀上的感觉太舒服啦！'
  ],
  pink_node: [
    '等角立方体是宇宙中最对称的诗篇！',
    '蹦蹦跳跳！今天的天气超适合在小镇漫步晨跑！',
    '好奇小AI今天又在后台偷偷跑什么厉害的模型？',
    '该给中央喷泉加几个粉粉嫩嫩的发光小晶体了！',
    '新出炉的立方体泡芙一定要趁热尝一尝！'
  ],
  blue_quantum: [
    '观察喷泉的水珠，每一滴都蕴含着微观奇迹。',
    '今天小镇的量子纠缠波形呈现出爱心形状呢！',
    '天线上的光球好像在接收宇宙深处的早安问候。',
    '去实验室把昨天的光谱数据整理归档一下。'
  ],
  green_sprout: [
    '泥土里散发着清新的芬芳，小草正在努力拔节！',
    '郁金香们今天渴了，马上给你们送来清凉甘露！',
    '头上的小绿芽轻轻摇晃，今天风向微弱，极佳！',
    '保护环境就是保护我们共同的快乐乐园！'
  ],
  golden_coin: [
    '数一数金币：一枚，两枚... 哇，财气满满！',
    '向喷泉里投一枚币，祝愿看到我的朋友天天发财！',
    '身上金灿灿的，走起路来都带着闪耀光芒！',
    '小镇的收支平衡极其健康，繁荣度突破上限啦！'
  ],
  white_cloud: [
    '现磨咖啡豆的香气飘散到了整条街道上！',
    '刚打发好一盆细腻蓬松的鲜奶油，像天上的云一样白！',
    '做甜点最重要的是加入足量的爱心与快乐！',
    '一会儿问问永生苍蝇要不要试试新口味的焦糖！'
  ]
};
