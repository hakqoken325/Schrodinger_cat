import { FormulaPoint } from './types';

export const FORMULA_POINTS: FormulaPoint[] = [
  {
    id: 'corner_origin',
    name: '经典墙角（照片同款）',
    category: 'corner',
    position: [0.35, 0, 0.35],
    lookAt: [0, 0.45, 0],
    thought: '面朝墙角，公式自然就解开了：lim(t → ∞) 猫咪 = 墙角 🐾',
    formulaLatex: '\\lim_{t \\to \\infty} \\text{Cat}(t) = \\text{Corner}'
  },
  {
    id: 'radiance_integral',
    name: '辐射能通量与光度学积分',
    category: 'calculus',
    position: [1.2, 0, 0.4],
    lookAt: [1.6, 0.75, 0],
    thought: '凝视右侧墙面：Φ = π·L·ΔS·sin²θ... 看来温暖的阳光刚好照在后背上。',
    formulaLatex: '\\Phi = \\pi L \\Delta S \\sin^2 \\vartheta'
  },
  {
    id: 'lens_optics',
    name: '双透镜光学系统与折射光路',
    category: 'optics',
    position: [0.4, 0, 1.2],
    lookAt: [0, 0.75, 1.6],
    thought: '端详焦平面折射：入射角等于反射角，但红外激光点还是抓不住。',
    formulaLatex: 'n_1 \\sin \\alpha = n_2 \\sin \\beta'
  },
  {
    id: 'fresnel_zones',
    name: '菲涅耳半波带与圆孔衍射',
    category: 'optics',
    position: [0.3, 0, 1.8],
    lookAt: [0, 0.5, 1.8],
    thought: '衍射同心圆环看起来像极了猫粮碗。',
    formulaLatex: 'r_k = \\sqrt{k \\lambda \\frac{a b}{a + b}}'
  },
  {
    id: 'floor_prism',
    name: '地面折射棱镜与波前色散',
    category: 'quantum',
    position: [1.2, 0, 1.2],
    lookAt: [1.2, 0, 1.2],
    thought: '地面密密麻麻写着波前折射公式，趴在 dF 公式上睡觉最舒服。',
    formulaLatex: 'M = \\frac{d\\Phi}{dS} = \\frac{1}{J} \\overline{\\Phi}_0'
  },
  {
    id: 'schrodinger',
    name: '猫咪量子波动方程',
    category: 'quantum',
    position: [1.5, 0, 1.8],
    lookAt: [1.5, 0, 1.8],
    thought: '在无人注视的时候，我同时存在于这间房间的所有墙角。',
    formulaLatex: 'i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi'
  }
];

export const CAT_THOUGHTS = [
  '正在全神贯注推导墙上的辐射能通量双重积分...',
  '凝视双透镜系统的焦平面与光轴折射光路...',
  '对立体角 dΩ 和张角 ϑ 求解偏导数中...',
  '思考光子波粒二象性与永远抓不住的激光笔红点...',
  '面朝墙角深度思考中：复杂的微积分正在脑海激荡 🐾',
  '仔细检查两面公式墙交界处的麦克斯韦边界连续性条件...',
  '在脑海中心算方位角 φ 从 0 到 2π 的闭合积分...',
  '发现黑猫的优雅引力场让这间屋子的四维时空发生了弯曲...',
  '仰头端详左侧墙壁上的菲涅耳衍射环与泊松亮点...',
  '求解猫咪态波函数：处于打瞌睡与解开宇宙奥秘的叠加态...'
];
