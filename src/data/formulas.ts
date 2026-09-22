import { FormulaItem } from '../types';

export const FORMULA_COLLECTION: FormulaItem[] = [
  // ==========================================
  // 1. 猫咪物理学 (FELINE PHYSICS)
  // ==========================================
  {
    id: 'tygdyk_energy',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '凌晨三点猫咪跑酷动能定律',
    latex: 'E_{跑酷} = \\frac{1}{2} m_{猫} v_{厨房}^2 \\cdot e^{\\Delta t_{深度睡眠}}',
    explanation: '铲屎官的睡眠程度越深，猫咪夜间狂奔跑酷的动能便呈指数级爆发增长。',
    catThought: '两脚兽刚进入深度睡眠14分钟。脑电波显示最佳时机已到！启动后爪摩擦打滑增压，向客厅与走廊冲刺！',
    catMemeQuote: '「在寂静的深夜，诞生纯粹的运动力学」',
    chalkColor: 'yellow',
    difficultyStars: 4,
    subNotes: [
      '• v_{厨房} 在听到开罐器声响时瞬间趋近于 0.99c',
      '• 肉垫与木地板动摩擦系数 μ ≈ 0.02（支持180°甩尾漂移）'
    ]
  },
  {
    id: 'feline_fluidity',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '猫咪流体形态定理 (非牛顿流体假说)',
    latex: '\\forall \\text{ 纸箱 } B : \\text{Vol}(B) < \\text{Vol}(Cat) \\implies Cat \\subseteq B',
    explanation: '猫咪能打破经典立体欧氏几何公理，自发适应并填满任何已知容器的内部空间。',
    catThought: '只要纸箱存在，我必能完全安放其中。若有一只爪子露在外面，那绝非溢出，而是体积的宏观量子叠加态。',
    catMemeQuote: '「若能钻进，我便安居；若不能钻进，强行挤入亦可安居」',
    chalkColor: 'cyan',
    difficultyStars: 3,
    subNotes: [
      '• 猫的流体黏度 η 与毛毯的暖和程度成反比',
      '• 纸箱内密度 ρ = 0，而在铲屎官膝盖上密度瞬间达到 100 kg/m³'
    ]
  },
  {
    id: 'butter_cat_paradox',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '黄油猫反重力永动悬浮悖论',
    latex: '\\vec{g}_{猫} \\cdot \\vec{g}_{吐司} = -1 \\implies \\sum \\vec{F} = 0 \\implies \\text{无尽反重力悬浮}',
    explanation: '猫落地必定四脚着地，吐司落地必定抹黄油一面朝下。将二者贴合即可产生无穷的永动机悬浮能。',
    catThought: '如果把涂抹香浓黄油的面包绑在我的后背上，我们将在距地面1厘米处悬浮并自旋加速到类星体级别……只要我忍住不舔黄油的话。',
    catMemeQuote: '「在美味肉泥与金枪鱼面前，万有引力不值一提」',
    chalkColor: 'orange',
    difficultyStars: 5,
    subNotes: [
      '• 离心力由身体惬意的咕噜咕噜声精密抵消',
      '• 空气阻力损耗由蓬松软萌的猫毛完美补偿'
    ]
  },
  {
    id: 'bowl_superposition',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '猫碗见底波函数与绝对真空佯谬',
    latex: '|\\Psi_{猫碗}\\rangle = \\frac{1}{\\sqrt{2}} |\\text{已空 (碗底露出瓷面)}\\rangle + \\frac{1}{\\sqrt{2}} |\\text{边缘堆满猫粮}\\rangle',
    explanation: '只要食盆正中心暴露出哪怕1平方毫米的陶瓷底，在猫咪的观测坐标系中该碗即被判定为绝对真空。',
    catThought: '我已经清晰观测到了直径3毫米的陶瓷碗底！储备粮系统已100%瘫痪！立即启动最高分贝声波警报：喵——呜——！',
    catMemeQuote: '「一旦窥见碗底，猫生即面临灭顶饥荒」',
    chalkColor: 'pink',
    difficultyStars: 3,
    subNotes: [
      '• 喵叫声强 I ∝ 1 / S_{碗底可视面积}',
      '• 碗边残存的猫粮已被视作处于视界之外的虚无'
    ]
  },
  {
    id: 'table_drop_law',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '桌边推物测试宇宙重力加速度定律',
    latex: 'F_{推落} = G \\cdot \\frac{m_{猫} \\cdot m_{水杯}}{r^2} \\cdot \\text{sign}(\\text{两脚兽正在注视})',
    explanation: '猫爪推动桌面水杯坠落的几率，与人类目击者的注视关注度成强正相关。',
    catThought: '凝视两脚兽的双眼……爪子悄悄将马克杯推向桌沿悬崖……再挪动2毫米……本学者必须亲自验证重力常数是否稳固！',
    catMemeQuote: '「我不是蓄意打碎，我是在验证地球自由落体加速度 g = 9.8 m/s²」',
    chalkColor: 'white',
    difficultyStars: 2,
    subNotes: [
      '• 瓷器破碎瞬间将触发量子瞬移协议，立刻钻入沙发底隐蔽'
    ]
  },
  {
    id: 'pet_threshold',
    category: 'feline_physics',
    categoryLabel: '猫咪物理学',
    title: '摸肚皮危险临界阈值相变方程',
    latex: 'N_{抚摸} = \\begin{cases} +1 \\text{ (咕噜咕噜享受)}, & n < 3 \\\\ -100 \\text{ (闪电捕兽夹反击)}, & n \\ge 3 \\end{cases}',
    explanation: '抚摸猫肚皮时从极度温顺状态瞬间跃迁为全爪锁喉攻击状态的非线性突变。',
    catThought: '一下……挺舒服。两下……还行。第三下……警告！系统熵增越过阈值！启动前后四爪抱抓与尖牙威慑大招！',
    catMemeQuote: '「软萌蓬松的肚皮，是给天真人类设下的优雅陷阱」',
    chalkColor: 'pink',
    difficultyStars: 3,
    subNotes: [
      '• 抱咬攻击反应潜伏期 τ ≈ 0.001 秒',
      '• 即使在发动反击期间，喉咙深处的呼噜声亦未彻底停歇'
    ]
  },

  // ==========================================
  // 2. 量子力学 (QUANTUM MECHANICS)
  // ==========================================
  {
    id: 'schrodinger_cat',
    category: 'quantum',
    categoryLabel: '量子力学',
    title: '薛定谔的猫与罐头量子叠加态',
    latex: '|\\Psi\\rangle = \\frac{1}{\\sqrt{2}} |\\text{神采奕奕}\\rangle + \\frac{1}{\\sqrt{2}} |\\text{在盒中香甜酣睡}\\rangle',
    explanation: '在未被打开观测前，箱中的猫咪处于所有可能本征态的相干叠加，包括偷偷溜走吃冻干。',
    catThought: '埃尔温以为我坐在密闭铁箱里等待放射性衰变。其实我在纸箱侧面掏了个洞，吃饱回窝继续保持叠加态。',
    catMemeQuote: '「箱子没备好主食罐头之前，请勿随意揭开观测」',
    chalkColor: 'cyan',
    difficultyStars: 5,
    subNotes: [
      '• 冰箱门开启的清脆声响将导致波函数瞬间发生宏观坍缩',
      '• 相位演化因子：e^{-iEt/\\hbar}'
    ]
  },
  {
    id: 'schrodinger_wave',
    category: 'quantum',
    categoryLabel: '量子力学',
    title: '非相对论薛定谔波动演化方程',
    latex: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t)',
    explanation: '微观量子体系状态波函数随时间演化的核心基石方程。',
    catThought: '哈密顿算符刻画体系的总能量。只要两脚兽不看我，我的概率波函数就同时弥散在整个屋子的每一寸角落。',
    catMemeQuote: '「我在此处，亦同时潜伏在洗手间的门背后」',
    chalkColor: 'white',
    difficultyStars: 5,
    subNotes: [
      '• i = \\sqrt{-1} 为虚数单位，宛如铲屎官承诺按时回家的誓言',
      '• \\hbar 为约化普朗克常数'
    ]
  },
  {
    id: 'heisenberg_uncertainty',
    category: 'quantum',
    categoryLabel: '量子力学',
    title: '海森堡坐标与动量测不准原理',
    latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}',
    explanation: '无法在同一时刻对高速跑酷中的猫咪精准测定其空间坐标与动量。',
    catThought: '两脚兽只有在看到我静止打盹时才能确定我的位置；一旦我奔跑起来，动量确定了，但在相机里我只是一团残影！',
    catMemeQuote: '「你们永远无法在同一平面上同时锁定我的速度与坐标」',
    chalkColor: 'yellow',
    difficultyStars: 4,
    subNotes: [
      '• 手机对焦快门按下瞬间，\\Delta x 趋于无穷（俗称糊图定律）'
    ]
  },
  {
    id: 'dirac_equation',
    category: 'quantum',
    categoryLabel: '量子力学',
    title: '狄拉克自旋方程 (反物质猫咪预测)',
    latex: '(i\\gamma^\\mu \\partial_\\mu - m)\\psi = 0',
    explanation: '成功融合狭义相对论与量子力学的优美方程，理论预言了正电子与反物质。',
    catThought: '反物质真实存在！这意味着在遥远的镜像宇宙中，必定存在一只从不推落杯子、反而帮人类扶正杯子的反猫咪。',
    catMemeQuote: '「物理方程的数学优美性，远重于表面的质朴」',
    chalkColor: 'cyan',
    difficultyStars: 5,
    subNotes: [
      '• \\gamma^\\mu 为 4x4 狄拉克矩阵',
      '• 猫的固有自旋特性：恒有九条命'
    ]
  },

  // ==========================================
  // 3. 相对论 (RELATIVITY)
  // ==========================================
  {
    id: 'einstein_emc2',
    category: 'relativity',
    categoryLabel: '相对论',
    title: '爱因斯坦质能等价核心方程',
    latex: 'E = m c^2',
    explanation: '静止质量中蕴藏着难以想象的浩瀚能量，光速的平方构成了宇宙能量转化基数。',
    catThought: '本学者体重 4.5 公斤，乘以 c²（9 × 10¹⁶ m²/s²），相当于 4 × 10¹⁷ 焦耳！这股能量足够暖气片持续发烫一亿年。',
    catMemeQuote: '「整座浩瀚宇宙，皆是凝固的温热能量与午睡好梦」',
    chalkColor: 'yellow',
    difficultyStars: 3,
    subNotes: [
      '• 摄入一口冻干鸡肉粒后，静止质量瞬间增量 \\Delta m = E / c^2'
    ]
  },
  {
    id: 'einstein_field_eq',
    category: 'relativity',
    categoryLabel: '相对论',
    title: '爱因斯坦引力场方程 (时空曲率)',
    latex: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
    explanation: '物质告诉时空如何弯曲，弯曲的时空指引猫咪在哪里蜷缩成一团睡球。',
    catThought: '松软的床垫在我的身躯下塌陷形成时空引力深阱。难怪整张被窝对我散发着不可抗拒的坠入引力！',
    catMemeQuote: '「时空之网在猫咪沉睡的压迫下泛起阵阵涟漪」',
    chalkColor: 'white',
    difficultyStars: 5,
    subNotes: [
      '• G_{\\mu\\nu} 为爱因斯坦曲率张量',
      '• T_{\\mu\\nu} 为饱腹状态下的能量动量张量'
    ]
  },
  {
    id: 'lorentz_dilation',
    category: 'relativity',
    categoryLabel: '相对论',
    title: '狭义相对论钟慢尺缩效应',
    latex: '\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
    explanation: '高速运动或处于强引力势中时间流逝显著变缓。铲屎官出门的“5分钟”，在等饭猫咪看来恍如4个世纪。',
    catThought: '当两脚兽说“我就下楼拿个快递5分钟”，坐在空碗前的我已经跨越了整整一个白垩纪。纯粹的相对论效应！',
    catMemeQuote: '「时间是相对的，尤其是在空空如也的食盆面前」',
    chalkColor: 'pink',
    difficultyStars: 4,
    subNotes: [
      '• 当速度 v → c 时，猫身长度在运动方向上发生明显的洛伦兹收缩'
    ]
  },
  {
    id: 'schwarzschild_radius',
    category: 'relativity',
    categoryLabel: '相对论',
    title: '史瓦西黑洞引力半径公式',
    latex: 'r_s = \\frac{2GM}{c^2}',
    explanation: '任何质量被压缩至该球体临界半径以下，即不可逆坍缩为光线亦无法逃逸的黑洞天体。',
    catThought: '我的肠胃天然具备黑洞的奇异性质。凡是跨越事件视界的小鱼干，全部无影无踪地消失在胃部奇点之中。',
    catMemeQuote: '「掉进床底深处的逗猫棒，如同坠入事件视界再无回音」',
    chalkColor: 'orange',
    difficultyStars: 4,
    subNotes: [
      '• 4公斤体型猫咪的理论史瓦西半径：r_s ≈ 6 × 10^{-27} 米'
    ]
  },

  // ==========================================
  // 4. 数学之美 (MATHEMATICAL MASTERPIECES)
  // ==========================================
  {
    id: 'euler_identity',
    category: 'math',
    categoryLabel: '数学之美',
    title: '欧拉恒等式 (世间最美数学公式)',
    latex: 'e^{i\\pi} + 1 = 0',
    explanation: '将数学中五大基石常数 e, i, π, 1 与 0 融汇于一个令人叹为观止的极简和谐方程。',
    catThought: 'e 乃生长繁衍，i 乃虚幻深邃，π 乃猫球之圆满，1 乃独立个体，0 乃午后静谧。天地大美尽收眼底。',
    catMemeQuote: '「数学，是整座宇宙用来深思与构筑美梦的语言」',
    chalkColor: 'yellow',
    difficultyStars: 4,
    subNotes: [
      '• 为欧拉公式 e^{ix} = \\cos x + i\\sin x 在 x = \\pi 处的特例'
    ]
  },
  {
    id: 'gaussian_integral',
    category: 'math',
    categoryLabel: '数学之美',
    title: '高斯泊松积分 (正态钟形分布)',
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    explanation: '概率论与自然界的黄金基石，全实数轴正态积分结果惊艳地与圆周率平方根重合。',
    catThought: '这条优美的高斯钟形曲线，恰好精准贴合本学者午睡醒来拱起背脊伸懒腰时的脊梁轮廓。',
    catMemeQuote: '「即便在看似随机的尘世间，亦有严密的理性法则在运转」',
    chalkColor: 'cyan',
    difficultyStars: 4,
    subNotes: [
      '• 通过在平面上转入极坐标系二重积分即可轻巧求得'
    ]
  },
  {
    id: 'fibonacci_spiral',
    category: 'math',
    categoryLabel: '数学之美',
    title: '熟睡猫球的斐波那契黄金螺旋',
    latex: '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339887...',
    explanation: '黄金分割比例描绘出完美的对数螺线，这正是猫咪团缩入睡时散热面积最小的最优几何构型。',
    catThought: '我绝非随意一躺。我是在用 1, 1, 2, 3, 5, 8, 13... 斐波那契数列，向大自然的几何奥秘庄严致敬！',
    catMemeQuote: '「大自然崇尚高效与优雅，因此它偏爱黄金分割」',
    chalkColor: 'white',
    difficultyStars: 3,
    subNotes: [
      '• 极坐标对数螺线方程：r = a \\cdot e^{b\\theta}'
    ]
  },
  {
    id: 'fourier_transform',
    category: 'math',
    categoryLabel: '数学之美',
    title: '傅里叶变换 (猫咪呼噜声谱分解)',
    latex: '\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(t) e^{-2\\pi i t \\xi} dt',
    explanation: '将时间域连续振动的喉咙咕噜声，分解为纯净美妙的频域谐波能量谱。',
    catThought: '我的咕噜声在 25 Hz 与 50 Hz 处呈现显著谱峰——这是医学证明促进骨骼愈合与抚平人类神经的疗愈良方。',
    catMemeQuote: '「呼噜声不是噪音，而是传递爱与治愈的谐波频域展开」',
    chalkColor: 'pink',
    difficultyStars: 4,
    subNotes: [
      '• 开启此滤波模式可有效滤除吸尘器的嘈杂尖锐噪音'
    ]
  },

  // ==========================================
  // 5. 宇宙学与天体物理 (COSMOLOGY & ASTROPHYSICS)
  // ==========================================
  {
    id: 'hawking_radiation',
    category: 'cosmology',
    categoryLabel: '天体宇宙学',
    title: '霍金辐射温度方程 (黑洞量子蒸发)',
    latex: 'T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}',
    explanation: '事件视界周围的微观量子涨落导致黑洞不再全黑，而是向外辐射并极其缓慢地蒸发。',
    catThought: '黑洞缓慢蒸发将热量归还宇宙，正如本猫刚从沙发坐垫起身半秒钟，原本滚烫的被窝余温就迅速消散一般……',
    catMemeQuote: '「万物终将消逝，唯有引力与浓烈睡意长存」',
    chalkColor: 'cyan',
    difficultyStars: 5,
    subNotes: [
      '• 辐射温度 T_H 与天体质量 M 成严格反比'
    ]
  },
  {
    id: 'friedmann_equation',
    category: 'cosmology',
    categoryLabel: '天体宇宙学',
    title: '弗里德曼宇宙加速膨胀动力学方程',
    latex: '\\left( \\frac{\\dot{a}}{a} \\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{k c^2}{a^2} + \\frac{\\Lambda c^2}{3}',
    explanation: '广义相对论引力场下刻画大尺度宇宙空间度规随时间膨胀演化的核心动力学方程。',
    catThought: '宇宙正在加速膨胀。这深感宽慰：从宏观天文尺度来看，本猫与吸尘器之间的距离每分每秒都在被动拉开！',
    catMemeQuote: '「所谓的宇宙暗能量，或许就是一只在暗中推搡万千星系的无形巨猫」',
    chalkColor: 'yellow',
    difficultyStars: 5,
    subNotes: [
      '• a(t) 为空间膨胀比例因子',
      '• \\Lambda 为宇宙学常数'
    ]
  }
];
