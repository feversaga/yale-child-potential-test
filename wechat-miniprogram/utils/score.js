// utils/score.js
// 计分与报告生成
const { DIMENSIONS } = require('../data/questions.js');

// scores: { 1: 3, 2: 5, ... } 题号 -> 分值
// 返回按得分降序的维度数组，每项含 score、占比、描述
function computeResult(scores) {
  const ranked = DIMENSIONS.map((dim) => {
    const total = dim.questions.reduce((sum, qid) => sum + (scores[qid] || 0), 0);
    return { ...dim, score: total, max: dim.questions.length * 5 };
  }).sort((a, b) => b.score - a.score);

  return ranked;
}

// 根据分数生成差异化解读文本
function buildNarrative(dim, rank, gender) {
  const pronoun = gender === 'girl' ? '她' : gender === 'boy' ? '他' : '孩子';
  const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : '🥉';

  // 分数区间描述
  let level;
  if (dim.score >= 13) level = '非常突出';
  else if (dim.score >= 10) level = '比较突出';
  else level = '有一定表现';

  const intro = `${pronoun}在「${dim.behavior}」方面的表现${level}。`;

  // 高分组给出更具体的鼓励
  let detail = '';
  if (dim.score >= 13) {
    detail = `这三项观察全部拿到高分，说明${pronoun}天生对这块领域敏感，未来在相关方向上会很有潜力。`;
  } else if (dim.score >= 10) {
    detail = `${pronoun}在这方面的表现已经超过平均值，值得在日常生活里多留意和培养。`;
  } else {
    detail = `虽然这不是${pronoun}最亮眼的方向，但依然有一些苗头，可以作为兴趣拓展看看。`;
  }

  return {
    medal,
    name: dim.name,
    emoji: dim.emoji,
    score: dim.score,
    max: dim.max,
    intro,
    detail,
    careers: dim.careers,
    tips: dim.tips
  };
}

// 生成完整报告对象
function buildReport(scores, childInfo) {
  const ranked = computeResult(scores);
  const gender = childInfo ? childInfo.gender : '';
  const top3 = ranked.slice(0, 3).map((dim, i) => buildNarrative(dim, i, gender));

  return {
    ranked: ranked.map((d) => ({ key: d.key, name: d.name, emoji: d.emoji, score: d.score, max: d.max })),
    top3,
    childInfo
  };
}

module.exports = {
  computeResult,
  buildReport
};
