# Firefly Cloudflare Pages Deployment

**Feature Owner:** Niccolo  
**Status:** Blocked  
**Created:** 2026-08-17

## 目标

将基于 Firefly 主题（Astro 7）的个人博客成功部署到 Cloudflare Pages，域名 natukusa.cc。

## 当前阻塞

- [Issue #01](issues/01-pnpm-build-scripts-blocked.md): pnpm 在 CI 环境中阻止构建脚本运行

## 已完成的工作

1. ✅ 从 Quartz v5 迁移到 Astro 7 + Firefly 主题
2. ✅ 配置站点品牌为 "Niccolo's Viola Garden"
3. ✅ 迁移两篇博客文章（足球相关内容）
4. ✅ 清理所有 Quartz 遗留文件
5. ✅ 代码推送到 GitHub (NiccoloNatukusaP/ViolaGarden)
6. ✅ 解决 undici 版本兼容性（Node.js 22.16）
7. ✅ 配置 Git 远程仓库并合并到 main 分支

## 技术决策

- **包管理器**: pnpm（主题强制要求）
- **Node.js 版本**: 22.16.0（Cloudflare Pages 提供）
- **构建命令**: `npm run build`（实际会用 pnpm）
- **输出目录**: `dist/`

## 参考资料

- Firefly 主题源码: https://github.com/CuteLeaf/Firefly
- Cloudflare Pages 文档
- pnpm CI 配置文档
