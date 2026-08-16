# Niccolo's Viola Garden

我的个人博客 —— 记录生活、迷思与足球（ACF 佛罗伦萨 / 紫百合）。

> 作者：NIccoloNatukusaP

## 关于本站

基于 [Quartz v5](https://quartz.jzhao.xyz/) 构建的静态站点，用 Obsidian 写作：

- `content/` 目录就是 Obsidian 库，直接在 Obsidian 里写 Markdown
- 支持双向链接、关系图谱、callout、LaTeX、mermaid 等 Obsidian 语法
- 紫 + 白 + 红（紫百合）主题，中文本地化
- 自带搜索、深色模式、RSS 订阅、站点地图

## 写作

用 Obsidian 把 `content/` 目录作为库打开，直接写。文章 frontmatter 用：

- `title` — 标题
- `date` — 日期（`YYYY-MM-DD`）
- `tags` — 标签（列表）
- `description` — 摘要
- `aliases` — 别名（可选）
- `draft: true` — 标记草稿（构建时不发布）

## 构建与预览

```bash
npm install               # 首次安装依赖
npx quartz build          # 生成静态站点到 public/
npx quartz build --serve  # 本地预览
```

## 许可

本站基于 [Quartz](https://github.com/jackyzha0/quartz)（MIT License）构建；博客内容（`content/`）版权归作者本人所有。
