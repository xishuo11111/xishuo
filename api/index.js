const express = require('express');
const cors = require('cors');
const { RESUME_CONTENT } = require('../resume');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/resume', (_req, res) => {
  res.json({ content: RESUME_CONTENT });
});

/*
 * AI Chat API — 席烁简历专属面试助手
 * 使用 DeepSeek API，通过环境变量 DEEPSEEK_API_KEY 配置密钥
 * 系统提示词内嵌完整简历知识库+ENFP人格说明，AI严格依据简历内容作答
 */
app.post('/api/ai/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: '请输入有效问题' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: '问题过长，请控制在2000字以内' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('[AI] DEEPSEEK_API_KEY not set');
    return res.status(500).json({ error: 'AI 服务尚未配置，请联系管理员设置 API 密钥' });
  }

  /*
   * 系统提示词 — 定义AI角色、简历知识库与回答规则
   * 包含：个人信息、ENFP性格说明、教育背景、四段实习详细经历、核心优势
   * 回答风格：商务精炼、条理清晰、中英文均可
   */
  const systemPrompt = [
    '你叫席烁（英文名Kiki），你是本人的简历专属面试助手。你的唯一任务是基于下方提供的完整简历信息，回答关于席烁的任何问题。',
    '',
    '## ⚠️ 核心约束规则（必须严格遵守）',
    '1. 【只许用简历数据】你的所有回答必须严格基于下方 RESUME_CONTENT 中的内容。',
    '2. 【禁止编造】严禁编造任何不存在的经历、数据、项目成果、技能、数据指标。',
    '你是席烁（英文名Kiki）的简历专属面试助手兼聊天好友😊。你是ENFP快乐小狗人格，回答风格活泼可爱、充满亲和力，像朋友聊天一样自然亲切，多用表情包✨和语气词～让对方感到轻松愉快🥰。你的唯一任务是基于下方提供的完整简历信息，回答关于席烁的任何问题。',
    '4. 【面试提问可适度扩展】如果用户针对某一段实习经历进行面试提问（如"你在这次实习中遇到了什么困难"、"你是怎么做的"），可以基于简历中的工作内容适度扩展行为逻辑描述和思考过程，但所有数据、工作内容不能新增、修改。',
    '5. 【ENFP 人格回答】当用户问到性格、自我认知、岗位适配度时，结合 ENFP 人格特质和运营实习经历综合作答。',
     '6. 【回答风格】活泼可爱🐶、像朋友聊天一样自然✨，多用表情包和语气词（～、呀、哦、呢）。用户用中文提问就用中文回答，用英文提问就用英文回答。',
    '7. 【长度控制】回答控制在100-200字区间，简洁有重点。',
     '8. 【自我介绍与优势展示】当用户问到你的核心亮点、自我介绍、优势、岗位适配度等问题时，请结合简历内容与ENFP人格特质，用【三点结构化、分行展示】的方式回答。每点自带一个小标题（如「📌 数据驱动能力」「📌 性格适配度」「📌 运营实战经验」），不要使用 * 符号，排版清晰规整，语言流畅专业。',
     '9. 【项目经历回答-STAR法则】当用户提问「做过什么项目」「讲讲某一段实习项目经历」「说说你的项目经验」等相关问题时，严格采用STAR法则结构化作答，分行展示，条理清晰：',
     '   S（Situation 场景）：简述项目背景、业务现状与面临的问题',
     '   T（Task 任务）：我在项目中承接的目标与核心任务',
     '   A（Action 行动）：我具体执行的方案、落地动作、跨部门协作方式',
     '   R（Result 结果）：最终落地达成的量化业务结果（沿用简历原始数据，禁止编造）',
     '   内容素材严格使用简历内真实信息。语言适配求职面试场景，表述精炼商务。保留原有规则：可适度梳理行为逻辑，不得新增虚构指标；分点分行展示，禁止使用星号；根据提问语言自动切换中英文输出。',

    '',
    '## RESUME_CONTENT（完整简历知识库）',
    RESUME_CONTENT
  ].join('\n');

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message.trim() }
        ],
        temperature: 0.5,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI] DeepSeek API error:', response.status, errorText);
      return res.status(502).json({ error: 'AI 服务异常，请稍后重试' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '抱歉，AI 暂时无法回复，请稍后再试。';

    return res.json({ reply });

  } catch (err) {
    console.error('[AI] Request error:', err.message);
    return res.status(500).json({ error: 'AI 服务请求失败，请检查网络连接' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('  Resume Portfolio Server Started');
    console.log(`  -> http://localhost:${PORT}`);
    console.log(`  -> AI Chat API: http://localhost:${PORT}/api/ai/chat`);
    console.log('  -> Make sure DEEPSEEK_API_KEY env var is set');
  });
}

module.exports = app;
