# 05 — 从 Quartz 迁移到 Astro 7 + Monograph，重建博客

**What to build:** 将当前基于 Quartz v5 构建的博客完整迁移至 Astro 7 + Monograph 主题。访客打开重建后的博客，能看到清晰的首页、分类页、关于页与友链页；可浏览迁移过来的所有文章；可搜索内容、切换深/浅色模式、订阅 RSS；移动端正常阅读。作者在本地运行一次构建命令，即可得到一份可放心推送到 Cloudflare Pages 并在 natukusa.cc 上访问的静态站点。Viola Garden 视觉定制（紫白红配色 + 背景暗纹）推迟到部署后单独实现。

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

## Problem Statement

当前 Quartz v5 实现无法满足用户对博客的设计预期。Quartz 的自动化布局生成限制了设计自由度——所有页面都遵循统一模板，无法针对个别文章进行微调；内容组织方式将文件夹结构与标签功能混在一起，导致导航混乱、关系图谱噪声过多；整体视觉效果过于简陋，仅实现了基础的紫色配色，未能充分表达「紫百合」品牌身份。用户需要一个更灵活的框架，支持统一的文章布局模板 + 局部微调能力，以及更清晰的信息架构（分类与标签分离为不同维度）。

## Solution

迁移至 **Astro 7** 框架 + **Monograph** 主题（`xocothemes/monograph`）。Astro 是内容为先的静态站点生成器，原生支持 MDX（可在 Markdown 中嵌入组件），提供灵活的布局定制能力。Monograph 是一款「text-first by design」的极简博客主题，基于 Tailwind CSS 4 tokens + cascade layers，配色系统完全可定制。采用扁平化 URL 结构（`/posts/[slug]`），通过 frontmatter 的 `category` 字段与 `tags` 字段将分类与标签分离为两个独立维度，取消 Quartz 特有的双向链接、关系图谱、文件树侧边栏等功能。文章定制通过 **frontmatter 全局开关**（如 `toc: true/false`、`cover` 封面图）与 **MDX 组件局部插入**（如 `<Callout>`、自定义时间线）两者结合实现。所有现有文章（《我爱紫百合》、《佛罗伦萨 4-1 贝内文托》等）迁移为 `.mdx` 格式，示例与占位页面舍弃。部署方式保持 **Cloudflare Pages** + **natukusa.cc** 域名不变，仅将构建命令改为 `npm run build`、输出目录改为 `dist/`。

**Viola Garden 视觉定制**（紫色 `#7c3aed` 主导、白色 `#ffffff`、红色 `#c62839` 点缀、背景紫百合暗纹）推迟到首次部署后，作为独立 issue 实施——先确保功能可用，再优化外观。

## User Stories

**访客 / 读者：**

1. As a 访客, I want 打开首页看到「Niccolo's Viola Garden」博客名称与作者昵称, so that 我立刻知道这是谁的博客。
2. As a 访客, I want 首页提供清晰的内容入口（文章列表或分类导航）, so that 我能快速找到想看的内容。
3. As a 访客, I want 按分类（生活 / 迷思 / 足球）浏览文章, so that 我只看我感兴趣的话题。
4. As a 访客, I want 按标签浏览文章, so that 我能看到同一主题下的所有相关文章（如「赛后总结」标签）。
5. As a 访客, I want 点击文章进入单篇阅读页面, so that 我获得清晰、无干扰的阅读体验。
6. As a 访客, I want 文章页面有统一的排版风格（字体、间距、标题层级）, so that 阅读体验一致。
7. As a 访客, I want 长文章显示目录（TOC）, so that 我能快速跳转到感兴趣的章节。
8. As a 访客, I want 文章中的 callout 提示块醒目易读, so that 作者标注的重点清晰可见。
9. As a 访客, I want 代码块有语法高亮与复制按钮, so that 我阅读技术内容时更便利。
10. As a 访客, I want 文章显示发布日期, so that 我知道内容的时效性。
11. As a 访客, I want 用搜索框检索站点内容, so that 我能在文章变多后快速找到某篇。
12. As a 访客, I want 切换深色 / 浅色模式, so that 我在不同光照下阅读都舒服。
13. As a 访客, I want 订阅 RSS, so that 我能在新文章发布时第一时间收到更新。
14. As a 访客, I want 在手机 / 平板上也能正常阅读, so that 我在移动端有良好的浏览体验。
15. As a 访客, I want 看到「关于」页面, so that 我了解作者是谁。
16. As a 访客, I want 看到「友链」页面, so that 我能发现作者推荐的网站。
17. As a 访客, I want 访问不存在的地址时看到友好的 404 页面, so that 我即使点错链接也不会迷路。
18. As a 访客（搜索引擎）, I want 站点有 sitemap, so that 页面能被正确索引。
19. As a 访客, I want 在社交平台分享链接时看到合适的预览卡片（OG metadata）, so that 分享出去更好看、更易点开。
20. As a 访客, I want 页面有 favicon（浏览器标签页图标）, so that 站点在标签页里可识别。
21. As a 访客, I want 页面加载快, so that 我浏览时不等待。
22. As a 访客, I want 中文文本在页面上正确显示（无乱码）, so that 我阅读中文内容无障碍。

**作者（fy）：**

23. As a 作者, I want 用 MDX 格式写作, so that 我能在 Markdown 基础上嵌入自定义组件。
24. As a 作者, I want 通过 frontmatter 设置 `title` / `date` / `tags` / `category` / `description`, so that 文章的元数据按我的意图展示。
25. As a 作者, I want frontmatter 的 `category` 字段指定文章所属分类（生活 / 迷思 / 足球）, so that 分类页能正确列出该文章。
26. As a 作者, I want frontmatter 的 `tags` 字段设置多个标签（如 `["赛后总结"]`）, so that 标签页能按主题聚合文章。
27. As a 作者, I want frontmatter 的 `cover` 字段设置封面图, so that 有封面的文章显示大图 banner，无封面的正常显示。
28. As a 作者, I want frontmatter 的 `toc` 字段控制是否显示目录, so that 短文不显示目录、长文自动生成目录。
29. As a 作者, I want 给草稿加 `draft: true`, so that 未完成的文章不会出现在线上。
30. As a 作者, I want 在文章中嵌入 `<Callout>` 组件, so that 我能添加 note / tip / warning / danger 提示块。
31. As a 作者, I want 在文章中嵌入自定义组件（如 `<Timeline>`、`<CustomCard>`）, so that 我能实现特殊排版需求。
32. As a 作者, I want 运行 `npm run build` 生成静态站点, so that 我能把最新内容产出为可部署的文件。
33. As a 作者, I want 运行 `npm run dev` 在本地预览, so that 我在发布前能先看效果。
34. As a 作者, I want 文章 URL 为扁平化 `/posts/slug`（不受源文件目录结构影响）, so that URL 简洁、迁移文件不破坏链接。
35. As a 作者, I want 把配置里的 `siteUrl` 设为 `https://natukusa.cc`, so that RSS / sitemap / OG 图里的链接指向真实域名。
36. As a 作者, I want 站点配置（分类列表、导航菜单）集中在 `src/config/` 目录, so that 我修改配置时有明确的入口。
37. As a 作者, I want 继续用 Cloudflare Pages 部署（推送到 GitHub 仓库即自动构建）, so that 部署流程与之前一致。
38. As a 作者, I want 站点继续在 natukusa.cc 域名上访问, so that 域名保持连续性。

**迁移的现有内容：**

39. As a 访客, I want 读到迁移过来的《我爱紫百合》文章, so that 我能看到作者的佛罗伦萨情结。
40. As a 访客, I want 读到迁移过来的《佛罗伦萨 4-1 贝内文托》赛后总结, so that 我能看到作者的足球评述。
41. As a 访客, I want 迁移文章的图片（`image-1.png`、`image-2.png`）正常显示, so that 图文内容完整。
42. As a 访客, I want 迁移文章的 callout 提示块正常渲染, so that 阅读体验与原 Quartz 版本一致。
43. As a 访客, I want 迁移文章的 `<iframe>`（sofascore 嵌入）正常工作, so that 赛后总结的阵容图显示出来。

## Implementation Decisions

1. **框架与技术栈**：Astro 7 + TypeScript，基于 Monograph 主题（`xocothemes/monograph`）安装。Node.js >= 18（当前 Dockerfile 锁定 v22.16.0，兼容）。

2. **主题基础**：从 `xocothemes/monograph` 仓库克隆或通过 `npm create` 安装 Monograph 起始模板，保留其核心结构（`src/content/posts/`、`src/config/`、`src/styles/global.css`）。

3. **内容目录**：`src/content/posts/`（Monograph 预期位置），每篇文章为一个 `.mdx` 文件（文件名即 slug，如 `wo-ai-zi-bai-he.mdx` → `/posts/wo-ai-zi-bai-he`）。

4. **URL 结构**：扁平化 `/posts/[slug]`，由 Astro content collections 自动处理——源文件目录结构不影响 URL。

5. **分类系统**：分类在 `src/config/categories.ts` 中定义为枚举（如 `life`、`thoughts`、`football`），每个分类有 `key`、`name`（中文显示名）、`slug`（URL 路径）。文章 frontmatter 中 `category` 字段引用该 key，构建时强制验证（Monograph 的 `src/content.config.ts` 自带 schema 验证）。

6. **标签系统**：frontmatter 的 `tags` 字段为自由文本数组（如 `tags: ["赛后总结", "战术分析"]`），无需预定义——Astro 自动聚合所有标签并生成标签页。

7. **Frontmatter schema**：必填字段 `title`（字符串）、`date`（ISO 8601 日期）；可选字段 `description`（摘要）、`category`（分类 key）、`tags`（标签数组）、`cover`（封面图路径）、`draft`（布尔值，默认 `false`）、`toc`（布尔值，控制目录显示）。

8. **MDX 组件**：内置组件为 Monograph 自带的 `<Callout type="note|tip|warning|danger">` 与 `<CodeGroup>`；自定义组件（如 `<Timeline>`）后续按需添加到 `src/components/` 并在 MDX 中 import 使用。

9. **文章定制机制**：
   - **全局开关**：通过 frontmatter 控制（`toc: false` 关闭目录、`cover: "/images/xxx.jpg"` 显示封面）。
   - **局部定制**：在 MDX 正文中嵌入组件（如 `<Callout>`、`<Timeline>`）或用 HTML/CSS class 覆盖样式。

10. **迁移策略**：
    - 现有 `.md` 文件手动转换为 `.mdx`（文件扩展名改为 `.mdx`）。
    - Frontmatter 更新：保留 `title`、`date`、`tags`、`description`；新增 `category` 字段（根据原文件所在目录映射：`佛罗伦萨/` → `football`、`生活/` → `life`、`迷思/` → `thoughts`）。
    - Obsidian 语法替换：
      - `[[wikilink]]` → 普通 Markdown 链接 `[文本](/posts/slug)` 或删除（如果指向的笔记不存在）。
      - Obsidian callout `> [!note]` → Monograph `<Callout type="note">`。
    - 图片路径更新：`../images/image-1.png` → Astro 的图片处理方式（放入 `public/images/` 或用 Astro Image 组件）。
    - `<iframe>` 保持不变（MDX 原生支持 HTML）。
    - 舍弃内容：`生活/欢迎.md`、`迷思/欢迎.md`（占位页面）不迁移。

11. **放弃的 Quartz 特性**：双向链接（wikilinks）、关系图谱（graph）、反向链接（backlinks）、文件树侧边栏（explorer）、链接悬停预览（popover）——这些是 Obsidian 特有功能，传统博客不需要。

12. **导航配置**：`src/config/site.ts` 定义站点信息（`siteUrl: "https://natukusa.cc"`、`siteName: "Niccolo's Viola Garden"`、`author: "NIccoloNatukusaP"`）与主导航菜单（指向「所有文章」、「分类」、「关于」、「友链」的链接）。

13. **分类配置**：`src/config/categories.ts` 定义分类列表（`{ key: 'football', name: '足球', slug: 'football' }` 等），供 frontmatter 引用与分类页生成使用。

14. **构建与预览**：
    - 构建命令：`npm run build` → 产出到 `dist/`。
    - 预览命令：`npm run dev` → 本地开发服务器（默认 `http://localhost:4321`）。
    - 类型检查：`npm run check` → 运行 Astro 的类型检查与格式验证。

15. **部署配置**：
    - Cloudflare Pages 构建设置：构建命令 `npm run build`、输出目录 `dist/`、Node 版本 `22`（或 `18+`）。
    - CNAME 文件：在 `public/CNAME` 中写入 `natukusa.cc`（Astro 构建时自动复制到 `dist/CNAME`）。
    - 环境变量（如需要）：`SITE_URL=https://natukusa.cc`。

16. **视觉定制（本 issue 不涵盖）**：保持 Monograph 默认样式（黑白 + 单一 ink-blue accent），Viola Garden 配色（紫色 `#7c3aed`、白色 `#ffffff`、红色 `#c62839` 点缀）与背景暗纹推迟到部署后，通过修改 `src/styles/global.css` 的 CSS 变量实现（所有颜色 token 都定义在该文件顶部）。

17. **草稿机制**：Monograph 默认过滤 `draft: true` 的文章（需验证实现，可能在 `src/pages/posts/[...slug].astro` 或 content collections query 中排除）。

18. **RSS 与 Sitemap**：Monograph 自带 RSS 与 sitemap 生成（通过 Astro 集成），配置在 `astro.config.mjs` 中，确保 `site` 字段设为 `https://natukusa.cc`。

19. **图标与 OG 图像**：
    - Favicon：替换 `public/favicon.ico` 与相关图标文件为紫百合主题图标（本 issue 可用占位图标，后续优化）。
    - OG 图像：Monograph 默认生成 OG 图（需确认中文渲染效果），如有问题推迟到后续 issue 修复。

20. **中文支持**：
    - 字体：Monograph 默认使用 `system-ui`，中文自动回退到系统字体（macOS PingFang SC、Windows Microsoft YaHei），无需额外配置。
    - 界面文案：导航菜单、分类名称等通过配置文件设为中文。

## Testing Decisions

**测试 seam（唯一）**：`npm run build` 构建后的 `dist/` 静态产物。这是本项目唯一的测试 seam（理想 seam 数 = 1）——与原 Quartz QA seam 相同，只是换了构建工具链。对构建产物进行外部行为验证，不测 Astro 或 Monograph 的内部实现。

**好测试的标准**：只验证外部可见行为——构建是否成功退出、页面是否渲染、内容是否正确显示、链接是否有效、功能组件（搜索、深/浅色切换、RSS）是否存在——不检查构建脚本内部细节。

**验证清单（gate）**：

- `npm run build` 成功（exit code 0），`dist/` 目录生成静态站点文件。
- 首页 `dist/index.html` 可访问，显示博客名称「Niccolo's Viola Garden」与作者昵称。
- 首页提供文章列表或分类导航入口。
- 三个分类页（生活 / 迷思 / 足球）生成对应 HTML（如 `dist/categories/football/index.html`），各自列出对应分类下的文章。
- 「关于」页面（`dist/about/index.html` 或类似路径）存在并展示作者介绍。
- 「友链」页面（`dist/friends/index.html` 或类似路径）存在并展示友链列表。
- 迁移的文章（《我爱紫百合》、《佛罗伦萨 4-1 贝内文托》）生成对应 HTML（如 `dist/posts/wo-ai-zi-bai-he/index.html`），正文内容完整。
- 迁移文章的图片（`image-1.png`、`image-2.png`）在页面上正常显示（路径正确、图片文件存在于 `dist/` 中）。
- 迁移文章的 callout 提示块渲染为醒目的提示块样式（而非原始 Markdown 语法文本）。
- 迁移文章的 `<iframe>` 正常嵌入（HTML 代码存在于生成的页面中）。
- 文章页面显示发布日期（frontmatter 的 `date` 字段渲染到页面）。
- 文章页面显示标签（frontmatter 的 `tags` 字段渲染为可点击链接）。
- 较长文章显示目录（TOC），点击目录项能跳转到对应章节（锚点链接有效）。
- 页面上存在搜索框（Monograph 自带搜索组件），输入关键词能返回相关文章结果。
- 页面工具栏存在深色 / 浅色模式切换按钮，点击后站点在两种配色间切换。
- 站点产出 `sitemap.xml`（或 `sitemap-0.xml`），且内容为结构有效的站点地图，包含各页面地址。
- 站点产出 RSS 订阅源（如 `rss.xml`），且内容为有效的订阅源，包含文章条目。
- 页面中文文本正确显示、无乱码或字体缺失。
- 在手机或平板宽度（窄视口）下打开首页与文章页，页面正常显示、无横向滚动、内容不溢出。
- 访问不存在的地址（如 `/nonexistent`），显示友好的 404 页面而非报错或白屏。
- 带 `draft: true` 标记的文章不出现在构建产物、任何页面或索引中。

**Prior art**：原 Quartz 项目有类似的验收清单（issue 04），本次迁移采用相同的测试方法（构建成功 + 验证清单）；`npm run check`（Astro 类型检查）可作为辅助静态检查。

## Out of Scope

本 issue **不涵盖**以下内容，推迟到后续 issue 实施：

- **Viola Garden 视觉定制**：紫色主导配色（`#7c3aed`）、白色 + 红色点缀（`#c62839`）、背景紫百合暗纹——通过修改 `src/styles/global.css` 的 CSS 变量实现，推迟到首次部署后单独优化。
- **自定义 favicon 设计**：当前可用占位图标，正式的紫百合主题图标后续设计。
- **OG 图像中文渲染修复**：如果 Monograph 默认 OG 图生成器对中文支持不佳，推迟到后续 issue 修复。
- **评论功能（Waline）**：读者评论与互动，后续单独实现。
- **时间线组件（`<Timeline>`）**：自定义 MDX 组件，后续按需开发。
- **站点统计 / 访问分析（analytics）**。
- **多语言（i18n）/ 英文版内容**。
- **生活与迷思分类的真实文章**：当前仅迁移足球分类的两篇文章（《我爱紫百合》、《佛罗伦萨 4-1 贝内文托》），其他分类的内容创作推迟到后续（对应原 issue 03 的剩余部分）。

## Further Notes

- **Cloudflare Pages 构建配置需更新**：登录 Cloudflare Pages 控制台，将构建命令改为 `npm run build`、输出目录改为 `dist/`、Node 版本设为 `22`（或 `18+`）。首次推送新代码后，Cloudflare 会自动触发构建。

- **Monograph 版本固定**：安装时记录 Monograph 主题的 commit hash 或版本号（如通过 git submodule 或 npm package），避免上游更新破坏当前实现。

- **图片处理方式待确认**：Astro 有两种图片处理方式——放入 `public/images/` 直接引用（`/images/xxx.png`）或用 Astro Image 组件（`<Image src={import('./xxx.png')} />`）实现优化。迁移时根据 Monograph 推荐方式选择。

- **草稿字段名称验证**：Monograph 的草稿机制可能用 `draft` 或 `published` 字段，需查看 `src/content.config.ts` 确认——如果字段名不同，迁移时调整。

- **内容文件命名规范**：文件名即 URL slug，需遵循 kebab-case（如 `wo-ai-zi-bai-he.mdx`），避免中文文件名或空格（可能导致 URL 编码问题）。

- **Obsidian 工作流变化**：作者不再能在 Obsidian 中直接编辑 `content/` 目录（因为迁移到 Astro 后目录结构改变为 `src/content/posts/`），需改为在任意 Markdown 编辑器（VSCode、Obsidian、Typora）编辑 `.mdx` 文件。如果仍想用 Obsidian，可将 `src/content/posts/` 作为 Obsidian 库打开，但双向链接、图谱等 Obsidian 特性不再可用。

- **与原 issues 的关系**：
  - Issue 01（模板清理）：已完成，不受影响。
  - Issue 02（基础页面）：内容（首页、关于、友链的中文文案）仍需保留，在新 Astro 站点中重新实现。
  - Issue 03（示范文章）：足球分类的两篇文章在本 issue 中迁移，生活与迷思分类的文章创作推迟。
  - Issue 04（QA 验收）：被本 issue 的 Testing Decisions 替代（验收清单重写为 Astro 版本）。

- **风险提示**：Monograph 是社区主题（非官方），如果上游停止维护或引入破坏性更新，需手动 fork 或切换主题。建议在项目 README 中记录 Monograph 的 commit hash 以备回溯。






