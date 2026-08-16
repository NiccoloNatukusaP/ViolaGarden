# 01 — 清理 Quartz 模板残留，让仓库成为 Niccolo's Viola Garden

**What to build:** 访客打开这个博客的站点或仓库主页时，看到的是一套完整属于「Niccolo's Viola Garden」这个中文个人博客的标识与说明，而不是 Quartz 的模板默认内容：首页标题和作者昵称是作者本人的；浏览器标签页显示紫百合主题的博客自有图标而非 Quartz 默认徽标；仓库根目录的 README 在介绍这个中文博客，许可与行为准则等文件是作者自己的内容，GitHub 的 Issue/PR 模板、Funding 配置与 Actions 工作流也不再是 Quartz 上游模板自带的默认内容。

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

- [ ] 打开站点首页，可见博客名称「Niccolo's Viola Garden」与作者昵称（fy 或作者指定的中文昵称）。
- [ ] 浏览器标签页显示博客自有图标（紫百合主题），不再显示 Quartz 默认徽标；构建产物中的 favicon.ico 与 static/icon.png 已被替换为自有图标。
- [ ] README.md 已被替换为博客的自有说明：首屏标题为博客名，内容介绍这个中文博客，不再包含 Quartz 模板或上游作者（Jacky Zhao）的默认示例文案。
- [ ] 仓库根目录不再包含 Quartz 模板默认的 CODE_OF_CONDUCT.md（已删除，或替换为作者自己的行为准则内容）。
- [ ] LICENSE.txt 已被替换或精简为博客自己的授权说明，不再保留 Quartz 上游模板的许可文案；若博客不需要该文件则已移除。
- [ ] package.json 的 name 字段不再是 @jackyzha0/quartz，而是博客自有名称。
- [ ] .github 目录中 Quartz 模板自带的 FUNDING、ISSUE_TEMPLATE、pull_request_template、dependabot 配置已被移除或替换为博客自有内容。
- [ ] .github/workflows 中 Quartz 模板自带的 GitHub Actions 工作流已被移除或替换为博客自有内容，不再残留指向 Quartz 上游的模板工作流。
