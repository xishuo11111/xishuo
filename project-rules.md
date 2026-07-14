# 项目构建规则 — 分步推进原则

本规则适用于所有涉及多文件、大产出或高复杂度（预估超过 300 行产出或涉及 5 个以上文件）的任务。

## 1. 分层构建，逐层推进

大项目按自然构建层拆成独立回合或子任务，每一层完成后经确认再进入下一层。

Layer 0: 项目结构 + 配置文件 + 依赖声明
Layer 1: 核心数据模型 / 类型定义 / API 层
Layer 2: 基础 UI 组件 + 路由骨架
Layer 3: 业务逻辑 + 状态管理
Layer 4: 样式打磨 + 边界情况 + 测试

## 2. 先出骨架，再填充血肉

动手写代码前，先输出一份轻量架构文档，包含：
- 文件结构
- 组件树 / 数据流图
- 核心接口签名

这份文档作为后续所有子任务的上下文锚点，每个子任务只需引用它 + 当前要改的文件，不需要重述整个项目。

## 3. 显式声明每步边界

每个任务在提示中明确声明：
- 只改哪几个文件（精确到路径）
- 不改什么（防止过度发挥）
- 产出量上限（如不超过 150 行）
- 不需要什么（如「不需要解释设计决策」「不需要添加样式」）

## 4. 引用代替重复

稳定的接口定义、类型声明、项目规范放在独立文件中，子任务通过读取该文件获取上下文，而不是内联粘贴重复内容。

## 5. 预留验证回合

大任务在规划时就留出约 20% 的预算进行：
- 代码审查（让 AI 检查自己的输出）
- 边界情况补丁
- 集成验证

## 6. 遇到容量瓶颈时的降级策略

当 AI 报告「输出超过容量」「响应被截断」或明确表示无法一次完成时：
- 立即停止当前回合，不要强行续写
- 将任务拆成更小的子任务
- 每一子任务的输出量控制在 150 行以内
- 优先输出核心逻辑，样式、注释、文档后续补充
## 部署教程：Vercel 公网部署

本项目的完整部署指南：

### 前提条件
- GitHub 账号
- Vercel 账号（绑定 GitHub）
- DeepSeek API Key（从 https://platform.deepseek.com/api_keys 获取）

### 部署步骤

**1. 上传代码到 GitHub**
```bash
# 在项目目录执行
git init
git add .
git commit -m "init: 互联网运营简历作品集"
# 在 GitHub 新建仓库后
git remote add origin https://github.com/你的用户名/resume-portfolio.git
git push -u origin main
```

**2. 导入到 Vercel**
- 登录 https://vercel.com
- 点击 "Add New" → "Project"
- 选择刚推送的 GitHub 仓库
- Framework Preset: 选择 "Other"
- Root Directory: 保持默认 `./`
- Build & Output Settings: 无需改动
- 点击 "Deploy"

**3. 配置环境变量**
- 部署完成后，进入项目页面
- 点击 "Settings" → "Environment Variables"
- 添加：
  - Name: `DEEPSEEK_API_KEY`
  - Value: 你的 DeepSeek API Key
- 保存后，进入 "Deployments" 页面
- 找到最新部署，点击 "..." → "Redeploy"

**4. 验证部署**
- 访问 Vercel 分配的域名（your-project.vercel.app）
- 确认首页正常显示
- 测试 AI 问答功能是否正常响应

### 本地开发
```bash
cd 简历网站
npm install
# 设置环境变量后启动
$env:DEEPSEEK_API_KEY="sk-your-key"
node api/index.js
# 访问 http://localhost:3000
```

### 项目文件结构
```
resume-portfolio/
├── api/
│   └── index.js          # Express 后端 + DeepSeek API
├── public/
│   ├── index.html        # 主页面 SPA
│   ├── style.css         # 自定义样式
│   └── app.js            # 前端交互逻辑
├── resume.js             # RESUME_CONTENT 简历常量
├── vercel.json           # Vercel 部署配置
├── package.json          # 依赖声明
├── .env.example          # 环境变量示例
└── .gitignore
```

### 注意事项
- API Key 存储在 Vercel 环境变量，前端不会暴露
- AI 问答严格依据 `resume.js` 中的 RESUME_CONTENT 回答
- 如需更新简历内容，编辑 `resume.js` 中的 RESUME_CONTENT 即可
- 首次部署后需配置环境变量并重新部署
- 本项目的 AI API 调用基于 DeepSeek 官方接口，模型为 `deepseek-chat`（DeepSeek V4 最新版）
