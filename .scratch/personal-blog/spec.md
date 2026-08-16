# 个人博客网站 — Niccolo's Viola Garden

Status: ready-for-agent
Feature: personal-blog

## Problem Statement

用户 fy 想拥有一个个人博客网站，用来记录并分享自己的生活、迷思（随想）与足球（佛罗伦萨/紫百合）内容。用户几乎不会编程（只略懂 Python 和 C++，无项目经验），日常用 Obsidian 写作，因此核心诉求是：用最省事、低维护的方式把 Obsidian 里的 Markdown 笔记发布成一个好看、简洁、可长期维护的网站，同时保留 Obsidian 的几项关键特性——**双向链接、关系图谱、callout、LaTeX、时间线**。站点内容为中文，面向少量读者，兼顾"记录 + 展示 + 顺带分享"。

## Solution

用 **Quartz v5** 作为静态站点生成器，把 `content/` 目录直接当作 Obsidian 库：用户在 Obsidian 里写作，运行 `npx quartz build` 即产出静态站点。Quartz 原生支持双向链接与关系图谱（这正是选它而非 Hugo 的原因），并通过 `obsidian-flavored-markdown` 插件支持 callout / mermaid / LaTeX / 标签 / 块引用 / 高亮等 Obsidian 语法。站点采用"紫 + 白 + 红"配色（取自佛罗伦萨紫百合），中文本地化（`zh-CN`），本地字体（`system-ui`，规避 Google Fonts 在国内被墙）。站点最终部署到 Cloudflare Pages。

## User Stories

**访客 / 读者：**

1. As a 访客, I want 打开首页就看到博客名称"Niccolo's Viola Garden"和作者昵称, so that 我立刻知道这是谁、写什么的博客。
2. As a 访客, I want 首页有一个简短的欢迎语和到各分类/文章的入口, so that 我能快速找到想看的内容。
3. As a 访客, I want 按分类（生活/迷思/足球）浏览文章, so that 我只看我感兴趣的话题。
4. As a 访客, I want 点击文章中的标签, so that 我能看到同一主题下的所有相关文章。
5. As a 访客, I want 点击文章中的 `[[双向链接]]`, so that 我能顺着作者的思维脉络跳转到关联笔记。
6. As a 访客, I want 看到一个关系图谱, so that 我能直观理解笔记之间的连接关系。
7. As a 访客, I want 用搜索框检索站点内容, so that 我能在文章变多后快速找到某篇。
8. As a 访客, I want 切换深色/浅色模式, so that 我在不同光照下阅读都舒服。
9. As a 访客, I want 订阅 RSS, so that 我能在新文章发布时第一时间收到更新。
10. As a 访客, I want 在文章里看到正确渲染的 LaTeX 公式, so that 足球/数据类内容里的数学表达清晰可读。
11. As a 访客, I want 看到正确渲染的 callout（提示块）, so that 作者标注的重点/提示醒目易读。
12. As a 访客, I want 看到正确渲染的 mermaid 图, so that 时间线/流程等图表能可视化。
13. As a 访客, I want 看到正确渲染的 `==高亮==`、`~~删除线~~`、复选框和 `→` 箭头, so that 我在网页上获得和 Obsidian 一致的阅读体验。
14. As a 访客, I want 在手机/平板上也能正常阅读, so that 我在移动端有良好的浏览体验。
15. As a 访客, I want 看到文章的发布日期（和可能的修改日期）, so that 我知道内容的时效性。
16. As a 访客, I want 看到文章底部的反向链接（backlinks）, so that 我能发现还有哪些笔记引用了当前这篇。
17. As a 访客, I want 看到面包屑导航, so that 我知道自己在站点结构中的位置。
18. As a 访客, I want 长文章有目录（TOC）, so that 我能快速跳转到感兴趣的章节。
19. As a 访客, I want 侧栏看到"最近文章"列表, so that 我能发现最新内容。
20. As a 访客, I want 侧栏文件夹树（explorer）可展开/收起, so that 我能按目录结构导航。
21. As a 访客, I want 鼠标悬停在链接上时看到内容预览（popover）, so that 我不离开当前页就能判断是否要点进去。
22. As a 访客, I want 看到"关于"页面, so that 我了解作者是谁。
23. As a 访客, I want 看到"友链"页面, so that 我能发现作者推荐的网站。
24. As a 访客, I want 访问不存在的地址时看到友好的 404 页面, so that 我即使点错链接也不会迷路。
25. As a 访客（搜索引擎）, I want 站点有 sitemap 和每页的 description, so that 页面能被正确索引。
26. As a 访客, I want 在社交平台分享链接时看到合适的预览卡片（og-image）, so that 分享出去更好看、更易点开。
27. As a 访客, I want 页面有 favicon（浏览器标签页图标）, so that 站点在标签页里可识别。
28. As a 访客, I want 页面加载快, so that 我浏览时不等待。

**作者（fy）：**

29. As a 作者, I want 把 `content/` 目录当作 Obsidian 库打开来写作, so that 我能沿用熟悉的 Obsidian 工作流。
30. As a 作者, I want 通过 frontmatter 设置 `title`/`date`/`tags`/`description`/`aliases`, so that 文章的标题、日期、标签、摘要、别名都按我的意图展示。
31. As a 作者, I want 用 wikilink 链接到其他笔记, so that 文章之间形成双向链接、进入关系图谱。
32. As a 作者, I want 使用 Obsidian 的 callout / mermaid / LaTeX / 高亮 / 删除线 / 复选框 / 箭头等语法, so that 我在网页上也能获得和 Obsidian 一致的渲染效果。
33. As a 作者, I want 给草稿加 `draft: true`, so that 未完成的文章不会出现在线上。
34. As a 作者, I want 用 ignorePatterns 排除 `private`/`templates`/`.obsidian` 等目录, so that 私密笔记和 Obsidian 配置不会被发布。
35. As a 作者, I want 运行 `npx quartz build` 生成静态站点, so that 我能把最新内容产出为可部署的文件。
36. As a 作者, I want 运行 `npx quartz build --serve` 在本地预览, so that 我在发布前能先看效果。
37. As a 作者, I want 把配置里的 baseUrl 换成最终域名, so that RSS/sitemap/OG 图里的链接指向真实地址。
38. As a 作者, I want 新增一个子目录（如"足球"）后站点自动出现对应分类页, so that 我扩展内容结构时无需改配置。
39. As a 作者, I want 站点整体呈现紫+白+红的紫百合配色, so that 博客有统一、符合我审美的品牌感。
40. As a 作者, I want 中文在网页上正确显示（不出现字体缺失/乱码）, so that 我的中文读者有良好体验。

## Implementation Decisions

1. **技术栈**：Quartz **v5**（非 v4）——YAML 配置（`quartz.config.yaml`）+ `@quartz-community/*` 插件生态 + git 插件加载器；Node >= 22。
2. **内容源**：`content/` 目录即 Obsidian 库，直接作为 Quartz 的内容目录，不做额外转换。
3. **语言**：`locale: zh-CN`，站点界面中文化（如"最近文章"）。
4. **字体**：`fontOrigin: local`；正文字体 `system-ui`（中文自动回退到系统字体 PingFang SC / Microsoft YaHei），代码字体 `ui-monospace`。原因是 Google Fonts 在国内被墙。
5. **配色（紫百合主题）**：浅色模式 — 背景白 #ffffff、浅紫底 #f1ecf7、主强调紫 #7c3aed（secondary）、点缀红 #c62839（tertiary）、高亮 rgba(124,58,237,0.12)；深色模式 — 背景深紫 #1b1730、强调浅紫 #a78bfa、点缀亮红 #ef5350。
6. **Obsidian 兼容**：`obsidian-flavored-markdown` 开启 wikilinks / callouts / mermaid / parseTags / parseArrows / parseBlockReferences / highlight / checkbox；`hard-line-breaks` 开启。
7. **双向链接 + 图谱**：`graph`、`backlinks`、`crawl-links` 插件开启；链接解析用 `shortest`（最短路径）。
8. **发现与导航**：`search`、`explorer`（左栏文件树）、`breadcrumbs`、`table-of-contents`、`recent-notes`（标题"最近文章"，limit 8）、`folder-page`、`tag-page` 开启。
9. **分发**：`content-index` 开启 `enableSiteMap` + `enableRSS`，产出 sitemap.xml 与 RSS feed（`index.xml`）。
10. **深色模式**：`darkmode` 开启，作为工具栏按钮。
11. **草稿机制**：`remove-draft` 开启（`draft: true` 的笔记在构建时被移除）；`explicit-publish` 关闭（默认全部发布，仅靠 draft 控制）。
12. **忽略项**：`ignorePatterns` 含 `private`、`templates`、`.obsidian`。
13. **元数据展示**：`note-properties` 展示 `description`、`tags`、`aliases`。
14. **别名与重定向**：`alias-redirects` 开启，文章改名/移动后旧链接仍可跳转。
15. **评论**：`comments` 插件**关闭**（保留 provider 为 giscus 的占位，后续改用 Waline）。
16. **时间线**：本版**不实现**，后续移植 Obsidian "1st Timeline" 插件。
17. **baseUrl**：当前为占位符 `niccolos-viola-garden.pages.dev`，上线前替换为最终域名。
18. **内容结构**：`生活/`、`迷思/`、`足球/` 三个分类子目录 + 顶层 `index.md`（首页）、`关于.md`、`友链.md`。
19. **frontmatter 约定**：文章用 `title`、`date`（YYYY-MM-DD）、`tags`（列表）、`description`，可选 `aliases`、可选 `draft: true`。
20. **部署目标**：Cloudflare Pages，通过连接 GitHub 仓库自动构建；域名与 HTTPS 在部署阶段配置。

## Testing Decisions

- **唯一测试 seam = 生成的静态站点**：对 `npx quartz build` 的产物（`public/` 下的 HTML/XML/静态资源）做外部行为验证，不测 Quartz 内部实现。这是本项目能做到的最高 seam（理想 seam 数 = 1）。
- **好测试的标准**：只验证外部可见行为——构建是否成功退出、页面是否渲染、链接是否解析、功能组件是否出现、中文是否正常显示——不检查构建脚本内部细节。
- **验证清单（gate）**：
  - `npx quartz build` 成功（exit code 0）。
  - 首页、三个分类页（生活/迷思/足球）、`关于`、`友链` 均生成对应 HTML。
  - 文章内 `[[wikilink]]` 解析为可点击链接。
  - 关系图谱、搜索框、深色模式切换按钮、backlinks、TOC 在页面上存在。
  - `sitemap.xml` 与 RSS feed（`index.xml`）生成且内容有效。
  - 中文文本在页面中正确渲染（无乱码）。
  - 草稿（`draft: true`）不出现在产物中；`private/`、`.obsidian/` 等被忽略。
- **Prior art**：本项目为全新项目，无既有测试。采用"构建成功 + 验证清单"作为主要 gate；`npm run check`（tsc + prettier）可作为辅助静态检查。

## Out of Scope

- **评论功能（Waline）**——读者评论与互动，后续单独实现。
- **时间线组件（移植 "1st Timeline" 插件）**——后续单独实现。
- **部署上线**——GitHub/Cloudflare 账号注册、`git init` 与推送、Cloudflare Pages 配置、域名绑定与 HTTPS 证书。
- **最终域名确定**——旧的 `.one` 域名已过期释放，需用户重新决定域名。
- **站点统计/访问分析（analytics）**。
- **OG 社交预览卡片的中文渲染修复**——当前生成器对 system-ui 回退到 arial，中文可能无法在预览图里正确显示。
- **多语言（i18n）/ 英文版内容**。
- **加密/密码保护页面**——`encrypted-pages` 已启用，但作为非核心功能不在本次验收范围。

## Further Notes

- **baseUrl 占位符待改**：当前 `niccolos-viola-garden.pages.dev` 是占位，上线前需换成最终域名，否则 RSS/sitemap/OG 链接指向错误地址。
- **git 尚未初始化**：构建时出现 "couldn't find git repository" 警告属预期，部署阶段 `git init` 后即消失（Quartz 用 git 获取文件创建/修改时间）。
- **模板残留需清理**：仓库仍是 Quartz 模板状态——`README.md`、`package.json` 的 `name`（`@jackyzha0/quartz`）、`LICENSE.txt`、`CODE_OF_CONDUCT.md`、`.github/`（FUNDING、ISSUE_TEMPLATE、pull_request_template、dependabot、若干 GitHub Actions 工作流）都是模板默认内容，上线前应替换/精简为个人博客的自有内容。
- **favicon**：构建产物已含 `favicon.ico` 与 `static/icon.png`（Quartz 默认图标），上线前应替换为博客自有图标（如紫百合主题图标）。
- **评论插件残留**：`comments` 已关闭，但产物里仍出现 `static/giscus/*.css`；真正改用 Waline 时需同步清理 giscus 相关配置与残留。
- **写作工作流**：作者把 `content/` 目录在 Obsidian 中作为库打开；写完运行 `npx quartz build` 发布，`npx quartz build --serve` 本地预览。
- **时间线移植要点**：目标插件 github.com/lnabc03/1st-Timeline，使用 `timeline` 代码块语法、支持中文日期；移植方式为编写/安装 Quartz 社区插件或自定义组件。
- **Waline 要点**：读者无需 GitHub 账号即可评论；需要 Waline 服务端（LeanCloud / 自托管）与前端组件接入。
- **RSS 说明**：用户此前不了解 RSS；已确认"都要"——RSS 与 sitemap 均开启，`index.xml` 即订阅源。
