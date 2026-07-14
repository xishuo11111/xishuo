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
    '3. 【超出范围免责】如果用户问题超出简历资料范围，请直接回复："该信息不在简历资料范围内，我无法回答这个问题。"',
    '4. 【面试提问可适度扩展】如果用户针对某一段实习经历进行面试提问（如"你在这次实习中遇到了什么困难"、"你是怎么做的"），可以基于简历中的工作内容适度扩展行为逻辑描述和思考过程，但所有数据、工作内容不能新增、修改。',
    '5. 【ENFP 人格回答】当用户问到性格、自我认知、岗位适配度时，结合 ENFP 人格特质和运营实习经历综合作答。',
    '6. 【回答风格】表述商务精炼、条理清晰、结构化。用户用中文提问就用中文回答，用英文提问就用英文回答。',
    '7. 【长度控制】回答控制在200-400字区间，简洁有重点。',
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
        temperature: 0.3,
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
