export type AsiSlide =
  | {
      id: string;
      type: 'cover';
      kicker: string;
      title: string;
      subtitle: string;
      eyebrow?: string;
    }
  | {
      id: string;
      type: 'definition';
      kicker: string;
      title: string;
      definition: string;
      notes: string[];
    }
  | {
      id: string;
      type: 'comparison';
      kicker: string;
      title: string;
      left: { title: string; points: string[] };
      right: { title: string; points: string[] };
    }
  | {
      id: string;
      type: 'reasons';
      kicker: string;
      title: string;
      reasons: { no: string; title: string; body: string }[];
    }
  | {
      id: string;
      type: 'faq';
      kicker: string;
      question: string;
      answer: string;
      takeaway?: string;
    }
  | {
      id: string;
      type: 'summary';
      kicker: string;
      title: string;
      bullets: string[];
      ending: string;
    };

export const asiSlides: AsiSlide[] = [
  {
    id: '01-cover',
    type: 'cover',
    kicker: 'AI CARD #001',
    eyebrow: 'Artificial Superintelligence',
    title: '如果 AI 在大多数重要脑力任务上都超过人类，会发生什么？',
    subtitle: '这就是很多人讨论 ASI 时，真正想问的问题。',
  },
  {
    id: '02-definition',
    type: 'definition',
    kicker: '什么是 ASI',
    title: 'ASI 不是“更聪明一点的 AI”，而是“在很多关键脑力任务上都明显强于人类的 AI”',
    definition:
      '它指向的是一种假想中的更强系统：不只是会聊天、会写代码，而是在研究、分析、规划、决策这些重要任务上都可能比人类更强。',
    notes: [
      '重点不是单项能力，而是整体能力上限',
      '它现在并没有被公开公认已经实现',
      '现在更多是在讨论未来风险和准备方式',
    ],
  },
  {
    id: '03-comparison',
    type: 'comparison',
    kicker: 'AGI vs ASI',
    title: '很多人把 AGI 和 ASI 混在一起，但它们不是一回事',
    left: {
      title: 'AGI',
      points: ['更像“通用型 AI”', '能做很多不同的脑力工作', '重点在：通用'],
    },
    right: {
      title: 'ASI',
      points: ['更像“超级强的 AI”', '在很多关键任务上明显强于人类', '重点在：全面超人'],
    },
  },
  {
    id: '04-reasons',
    type: 'reasons',
    kicker: '为什么最近总被提起',
    title: '因为过去几年，AI 的变化速度真的很快',
    reasons: [
      {
        no: '01',
        title: '模型能力上升很快',
        body: 'AI 在写作、编程、搜索、语音、图像这些方面的进步，让更多人开始认真讨论“更强 AI”的未来。',
      },
      {
        no: '02',
        title: '投入规模越来越大',
        body: '训练算力、资金和资源持续增加，这意味着 AI 不只是概念热，而是现实投入在不断加码。',
      },
      {
        no: '03',
        title: '治理问题被提前了',
        body: '越来越多机构不再只聊“AI 能做什么”，而开始问“谁来约束更强的 AI”。',
      },
    ],
  },
  {
    id: '05-faq-now',
    type: 'faq',
    kicker: '最常见问题 01',
    question: 'ASI 现在已经出现了吗？',
    answer: '没有。至少从公开层面看，现在并没有一个被普遍承认已经达到“人工超级智能”的系统。',
    takeaway: '今天更接近现实的是：大家在提前讨论它，而不是宣布它已经实现。',
  },
  {
    id: '06-faq-scifi',
    type: 'faq',
    kicker: '最常见问题 02',
    question: '这是不是纯科幻？',
    answer: '也不能这么说。ASI 本身还没出现，但围绕它的安全、治理和权力问题，已经是现实世界里的讨论对象。',
    takeaway: '不是“已经实现”，但也不只是“随便幻想”。',
  },
  {
    id: '07-faq-why-care',
    type: 'faq',
    kicker: '最常见问题 03',
    question: '普通人为什么要关心？',
    answer: '因为一旦 AI 继续增强，影响的不只是技术圈。它可能牵动工作、教育、内容生产、国家竞争，甚至是谁来决定“什么是安全”的规则。',
    takeaway: '这不是只属于工程师的话题。',
  },
  {
    id: '08-summary',
    type: 'summary',
    kicker: '一句话收尾',
    title: '今天真正确定的，不是 ASI 已经来了，而是人类已经开始为“更强的 AI”提前做准备。',
    bullets: [
      '不要把“正在讨论”误解成“已经实现”',
      '不要把“担心风险”误解成“全是危言耸听”',
      '真正现实的争论，其实是治理、控制和权力边界',
    ],
    ending: '如果你只想记住一句话：ASI 不是今天的现实，但它已经是今天的议题。',
  },
];
