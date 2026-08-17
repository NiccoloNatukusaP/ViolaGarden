# ADR-0002: Use MDX over Plain Markdown

**Date:** 2026-08-17  
**Status:** Accepted  
**Deciders:** fy (author), Claude (advisor)

## Context

Astro supports both plain Markdown (`.md`) and MDX (`.mdx`) for content authoring. The key difference:

- **Markdown**: Pure text-based syntax. No ability to insert custom components. Simple and portable, but limited to standard Markdown features (headings, lists, code blocks, images, etc.).

- **MDX**: Markdown + the ability to import and use React/Astro components. Enables custom layouts (e.g., `<Timeline>`, `<Callout>`, `<CustomCard>`) within content files. More powerful but requires learning component syntax.

The author's stated requirement: **"需要更自定义的文章布局，对于每篇文章整体格式基本统一但要保证微调的能力"** (need more custom article layouts; overall format should be consistent, but with ability to tweak individual articles).

When asked about writing complexity, the author confirmed: **"我接受更复杂的写作"** (I accept more complex writing).

## Decision

Use **MDX** (`.mdx` files) as the content format for all posts.

**Why MDX:**
- **Local customization**: Enables inserting components directly into content (e.g., `<Callout type="warning">`, `<Timeline events={...} />`) without creating separate layout files.
- **Frontmatter + components = two-level control**: Frontmatter handles global switches (toc on/off, cover image, draft status); MDX components handle local layout tweaks (special cards, timelines, custom styling).
- **Future-proof**: As blog needs evolve (e.g., interactive diagrams, embedded widgets), MDX can accommodate without redesigning the content pipeline.
- **Monograph built-in support**: The chosen theme already provides MDX components (`<Callout>`, `<CodeGroup>`), so the infrastructure is ready.

**Why not plain Markdown:**
- Cannot embed custom components — would require separate layout templates per article type (e.g., `post-with-timeline.astro`), leading to layout proliferation.
- Author's requirement for "微调能力" (tweaking ability) cannot be met with Markdown alone.

## Consequences

**What we gain:**
- **Fine-grained layout control**: Can insert `<Callout>`, `<Timeline>`, custom cards, etc., anywhere in an article without touching layout files.
- **Consistent base + local overrides**: Most articles use the standard template; articles needing special treatment (e.g., match reports with embedded stats) can inject custom components inline.
- **Rich content types**: Can implement interactive elements (e.g., image galleries, expandable sections, embedded visualizations) as components.

**What we lose:**
- **Writing simplicity**: MDX requires learning component syntax (e.g., `<Callout type="note">` instead of Obsidian's `> [!note]`). Slightly higher cognitive load for non-technical authors.
- **Portability**: MDX files are less portable than Markdown — exporting to other platforms (e.g., Medium, Substack) requires stripping component syntax.
- **Editor support**: Some Markdown editors don't highlight MDX syntax correctly (though VSCode + Astro extension handles it well).

**Migration impact:**
- Convert existing `.md` files to `.mdx` (just rename file extension in most cases)
- Replace Obsidian callout syntax (`> [!note]`) with MDX component (`<Callout type="note">`)
- Author must learn component syntax for future articles (but Monograph docs + examples provided)

**Reversibility:**
- **Moderately hard to reverse** — can convert `.mdx` back to `.md` by removing all component usage and replacing with plain Markdown equivalents (e.g., blockquotes for callouts). Possible but tedious if components are heavily used.

## Alternatives Considered

1. **Plain Markdown + layout templates** — Rejected: Would require creating separate layouts for each article variant (e.g., `post-with-timeline.astro`, `post-with-gallery.astro`), leading to layout sprawl. Doesn't meet "微调能力" requirement.

2. **Markdown + shortcodes** (Hugo-style) — Rejected: Astro doesn't support shortcodes natively; would require custom preprocessing. Less powerful than MDX.

3. **Use MDX only for special articles, Markdown for standard articles** — Rejected: Mixing formats adds cognitive overhead ("which format for this article?"); dual pipeline increases complexity.

## Notes

- The author's confirmation **"我接受更复杂的写作"** was the green light for this decision. Without it, we would have chosen Markdown for simplicity.
- Monograph's built-in `<Callout>` component covers 80% of use cases (note/tip/warning/danger blocks). Custom components (e.g., `<Timeline>`) can be added incrementally as needed.
- **Writing workflow**: Author can use any editor (VSCode recommended for MDX syntax highlighting; Obsidian works but treats MDX as plain text). Preview via `npm run dev` to see components rendered.

