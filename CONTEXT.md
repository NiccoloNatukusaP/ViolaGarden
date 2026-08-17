# Context — Niccolo's Viola Garden

This is the domain glossary for the personal blog project. It defines the canonical terms used across code, configuration, and documentation.

---

## Core Entities

### Post / Article（文章）
A piece of content written by the author, stored as an MDX file in `src/content/posts/`. Each post has:
- A **slug** (URL-safe identifier, derived from filename, e.g., `wo-ai-zi-bai-he.mdx` → `/posts/wo-ai-zi-bai-he`)
- **Frontmatter** (metadata: title, date, category, tags, description, etc.)
- **Body** (content in MDX format, supporting Markdown + React/Astro components)

### Category（分类）
A high-level content grouping defined in `src/config/categories.ts`. Each category has:
- **key** (internal identifier, e.g., `football`)
- **name** (display name in Chinese, e.g., `足球`)
- **slug** (URL path segment, e.g., `/categories/football`)

**Rules:**
- Each post belongs to **exactly one** category (via frontmatter `category` field).
- Categories are **pre-defined** in configuration (not auto-generated from content).
- Categories and tags are **separate dimensions** — a post has one category + multiple tags.

### Tag（标签）
A fine-grained keyword assigned to a post via frontmatter `tags` array (e.g., `tags: ["赛后总结", "战术分析"]`). Tags are **free-form** (no pre-definition required) and **auto-aggregated** — Astro generates tag pages dynamically based on what tags appear in posts.

**Rules:**
- A post can have **zero or more** tags.
- Tags are for thematic cross-cutting (e.g., all "赛后总结" posts across categories).
- Tag names are case-sensitive and must match exactly across posts for aggregation.

### Slug
The URL-safe identifier for a resource (post, category, tag). For posts, the slug is derived from the MDX **filename** (e.g., `my-post.mdx` → slug `my-post` → URL `/posts/my-post`). Slugs use **kebab-case** (lowercase + hyphens), never Chinese characters or spaces.

### Draft（草稿）
A post marked as **not ready for publication** via frontmatter `draft: true`. Draft posts are **excluded** from the build output (not rendered to `dist/`, not listed in any index, not included in RSS/sitemap).

---

## Configuration Concepts

### Site Config（站点配置）
Global site metadata defined in `src/config/site.ts`:
- `siteUrl`: canonical domain (e.g., `https://natukusa.cc`)
- `siteName`: blog title (e.g., `Niccolo's Viola Garden`)
- `author`: author name/nickname
- Navigation menu items

### Categories Config（分类配置）
List of all categories defined in `src/config/categories.ts`. Each entry declares a category's `key`, `name`, and `slug`. Posts reference categories by `key` in frontmatter.

---

## Content Format

### MDX
Markdown eXtended — Markdown syntax + ability to import/use React/Astro components. Posts are written in `.mdx` files (not plain `.md`) to enable component-based customization (e.g., `<Callout>`, `<Timeline>`).

### Frontmatter
YAML metadata block at the top of an MDX file, enclosed by `---`. Defines post metadata:
- **Required:** `title` (string), `date` (ISO 8601 date, e.g., `2026-08-16`)
- **Optional:** `description`, `category` (category key), `tags` (array of strings), `cover` (image path), `draft` (boolean), `toc` (boolean, controls table-of-contents display)

---

## Visual Identity

### Viola Garden（紫百合花园）
The blog's brand identity, themed around **ACF Fiorentina** (Italian football club, nicknamed "Viola" for their purple jerseys). Core visual elements:
- **Purple** (`#7c3aed`) as the primary brand color
- **White** (`#ffffff`) as base background
- **Red** (`#c62839`) as accent (referencing Fiorentina's city, Florence)
- **Background watermark/texture** of viola (violet flower) pattern

The visual customization is **deferred** to a post-deployment phase (not implemented in the initial migration).

---

## Dropped Concepts (from Quartz)

The following concepts were part of the previous Quartz implementation but are **not** part of the Astro/Monograph architecture:

- **Wikilink（双向链接）**: `[[Page Name]]` syntax for internal linking — replaced with standard Markdown links `[text](/posts/slug)`.
- **Graph（关系图谱）**: Visual graph showing connections between posts — not implemented (traditional blogs don't need this).
- **Backlinks（反向链接）**: List of pages linking to the current page — not implemented.
- **Explorer（文件树侧边栏）**: Sidebar showing folder structure — not applicable (content is organized by category/tags, not folders).
- **Popover Preview（悬停预览）**: Hovering over a link shows target content — not implemented.

