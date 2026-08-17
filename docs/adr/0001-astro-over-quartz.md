# ADR-0001: Migrate from Quartz to Astro

**Date:** 2026-08-17  
**Status:** Accepted  
**Deciders:** fy (author), Claude (advisor)

## Context

The blog was initially built with Quartz v5, a static site generator designed for publishing Obsidian vaults. Quartz's core value proposition is zero-friction publishing: write in Obsidian, run one command, get a website with wikilinks, graph, backlinks, and other Obsidian features intact.

However, after building the initial site, the author identified three blocking issues:

1. **Limited design freedom** — Quartz auto-generates layouts from Markdown. All pages follow a uniform template with no ability to customize individual articles. The author wants "a consistent base template + ability to tweak specific articles."

2. **Confusing information architecture** — Quartz blends folder hierarchy with tags into one navigation model, causing the graph to be noisy. The author wants **separate dimensions**: category (one per post) vs tags (many per post).

3. **Insufficient visual identity** — The current implementation only applies a basic purple color scheme. The Viola Garden brand identity (purple-dominant, white background, red accents, background watermark) requires deeper customization, which Quartz's plugin-based system doesn't facilitate.

When asked about the desired framework, the author chose **Astro** directly, citing its flexibility and MDX support.

## Decision

Migrate the blog from Quartz v5 to **Astro 7** using the **Monograph theme** as a starting point.

**Why Astro:**
- Content-first architecture with native MDX support (embed components in Markdown)
- Flexible layout system (frontmatter-controlled global switches + per-article component insertion)
- Active ecosystem with themes (Monograph provides a solid base to customize)
- Fast build times + excellent DX (developer experience)

**Why Monograph theme:**
- "Text-first by design" philosophy aligns with long-form writing
- Tailwind CSS 4 token system makes color customization straightforward (all colors defined as CSS variables in one file)
- Built-in MDX components (Callout, CodeGroup) cover common needs
- Clean codebase for further customization

## Consequences

**What we gain:**
- Full control over layouts (can tweak individual articles without changing the template)
- Clear information architecture (category via frontmatter `category`, tags via `tags` array — separate dimensions)
- Easier visual customization (modify `src/styles/global.css` to apply Viola Garden colors + background texture)
- Modern DX (TypeScript, fast HMR, component-based architecture)

**What we lose:**
- Obsidian integration features (wikilinks, graph, backlinks, popover preview, file explorer)
- Zero-config publishing (Astro requires explicit configuration of categories, navigation, etc.)
- Obsidian-native editing workflow (author can no longer edit `content/` as an Obsidian vault — must edit `.mdx` files in any Markdown editor)

**Migration cost:**
- Convert all `.md` files to `.mdx`
- Replace Obsidian syntax (wikilinks → Markdown links, Obsidian callouts → `<Callout>` component)
- Update frontmatter schema (add `category` field, ensure `date` is ISO 8601)
- Reconfigure deployment (Cloudflare Pages build command + output directory)
- Learn Astro's content collections API (for implementing category/tag pages)

**Reversibility:**
- **Hard to reverse** — once migrated, going back to Quartz requires re-migrating content (MDX → Markdown, reintroducing wikilinks). Feasible but costly (~1-2 days of work).

## Alternatives Considered

1. **Stay with Quartz, deeply customize it** — Rejected: Quartz's plugin architecture is opinionated around Obsidian features; achieving "traditional blog design" would fight the framework.

2. **Hugo + theme (e.g., PaperMod, Stack)** — Rejected: Hugo's templating (Go templates) is less flexible than Astro's component model; no native MDX support.

3. **Next.js (App Router) + Contentlayer** — Rejected: Overkill for a static blog; build times slower than Astro; runtime JavaScript overhead.

4. **Astro + AstroPaper / Cactus themes** — Considered: AstroPaper is more popular, but Monograph's "text-first" philosophy + Tailwind 4 token system aligned better with the author's needs.

## Notes

- The author explicitly confirmed: **accepts more complex writing** (willing to learn MDX/components), **Viola Garden is core identity** (purple must dominate), **visual customization deferred** (deploy first, style later).
- This decision was reached through systematic grilling (see conversation history 2026-08-17) — the author's dissatisfaction with Quartz was root-caused as "limited layout freedom + confusing information architecture," not just visual issues.

