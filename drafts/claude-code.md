# Claude Code

# 安装

# 定义 API 配置

# 命令

> 只列出有用的命令

# 基础

- `/init` 初始化一个新的 CLAUDE.md 文件，包含代码库文档
- `/exit (quit)` 退出
- `/help` 显示帮助和可用命令
- `/status` 显示 Claude Code 状态，包括版本、模型、账户、API 连接和工具状态
- `/add-dir` 添加一个新的工作目录

# 上下文

- `/context` 将当前上下文使用情况可视化为彩色网格
- `/clear (reset, new)` 清除对话历史并释放上下文
- `/export` 导出当前对话到文件或剪贴板
- `/compact` 清除对话历史但保留上下文中的摘要。可选：`/compact [摘要说明]`
- `/memory` 编辑 Claude 内存文件，`CLAUDE.MD`文件
- `/todos` 列出当前的待办事项
- `/resume` 恢复对话
- `/rewind (checkpoint)` 将代码和/或对话恢复到之前的某个时间点

### 拓展

- `/mcp` 管理 MCP 服务器
- `/plugin (plugins, marketplace)` 管理 Claude Code 插件
- `/agents` 管理代理配置
- `/bashes` 列出和管理后台任务
- `/hooks` 管理工具事件的钩子配置
- `/ide` 管理 IDE 集成并显示状态

### 配置

- `/config (theme)` 打开配置面板
- `/statusline` 设置 Claude Code 的状态栏 UI
- `/output-style` 直接设置输出样式或从选择菜单设置
- `/permissions (allowed-tools)` 管理允许和拒绝工具权限规则
- `/model` 设置 Claude Code 的 AI 模型
- `/vim` 在 Vim 和普通编辑模式之间切换
- `/terminal-setup` 安装 Shift+Enter 键绑定用于换行

### 账户

- `/login` 使用您的 Anthropic 账户登录
- `/logout` 从您的 Anthropic 账户登出
- `/upgrade` 升级到 Max 版本
- `/usage` 显示计划使用限制
- `/cost` 显示当前会话的总成本和持续时间

### github

- `/install-github-app` 为仓库设置 Claude GitHub Actions
- `/review` 审查拉取请求
- `/pr-comments` 从 GitHub 拉取请求获取评论
- `/security-review` 对当前分支上的待处理更改进行安全审查

### 其他

- `/doctor` 诊断和验证您的 Claude Code 安装和设置
- `/feedback (bug)` 提交关于 Claude Code 的反馈
- `/release-notes` 查看发布说明
- `/stickers` 订购 Claude Code 贴纸
- `/migrate-installer` 从全局 npm 安装迁移到本地安装
