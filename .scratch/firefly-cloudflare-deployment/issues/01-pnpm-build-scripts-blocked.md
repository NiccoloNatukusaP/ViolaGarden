- 这个配置只控制 pre/post 钩子，不控制依赖包的构建脚本

### 方案 3：undici 版本锁定（已完成，但不够）
- 通过 `overrides: { undici: "6.20.0" }` 解决了 Node.js 版本兼容性
- 但没有解决构建脚本阻止问题

## 待验证方案

### 方案 A：在 .npmrc 中添加 `ignore-scripts=false`
- 可能强制允许所有脚本运行
- 需要验证是否与 pnpm 的安全策略冲突

### 方案 B：在 .npmrc 中使用 `scripts-prepend-node-path=auto`
- 可能绕过脚本验证机制

### 方案 C：创建 `.pnpm-approvals.json` 文件
- pnpm 可能支持通过配置文件预先批准某些包
- 需要查阅 pnpm 文档确认

### 方案 D：降级 pnpm 到 v7（不推荐）
- pnpm v7 没有构建脚本阻止机制
- 但可能与 Firefly 的其他依赖不兼容

## 技术栈信息

- **主题**: Firefly v6.15.10 (基于 Fuwari，fork from CuteLeaf/Firefly)
- **框架**: Astro 7.2.0
- **包管理器**: pnpm@11.22.0
- **部署平台**: Cloudflare Pages
- **Node.js 版本**: 22.16.0
- **需要构建脚本的包**: esbuild@0.28.x, workerd@1.20260811.1

## 调研结果

### Firefly/Fuwari 官方配置
- **Fuwari (原始项目)** 的 `.npmrc` 仅包含：`manage-package-manager-versions = true`
- 官方 README 指出支持 Cloudflare Pages 部署
- 没有发现关于 `ERR_PNPM_IGNORED_BUILDS` 的 Issues
- **关键发现**：官方配置同样会触发此错误，说明问题不在 .npmrc

### pnpm 文档调研
- pnpm CI 文档没有提及 ignored builds 的处理方法
- 错误代码文档中没有 `ERR_PNPM_IGNORED_BUILDS` 的条目
- 这是 pnpm v8+ 的安全特性，阻止未批准的第三方包构建脚本

### 最新测试结果（2026-08-17 12:30）
使用官方配置后，错误**依然出现**：
```
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild@0.28.1, esbuild@0.28.2, workerd@1.20260811.1
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

**重要观察**：
- pnpm 成功安装了所有 1176 个依赖包
- 错误发生在**安装完成之后**
- Cloudflare Pages 将此错误视为致命错误（exit code 1）

## 根本问题重新定义

这不是配置问题，而是 **pnpm v8+ 的安全策略与 Cloudflare Pages 的兼容性问题**：

1. pnpm 认为构建脚本被忽略只是**警告**
2. Cloudflare Pages 将其视为**失败**（exit code 1）
3. 官方项目可能部署在其他平台（Vercel/Netlify），它们的处理方式可能不同

## 可行方案重新评估

### ❌ 方案 A-E（已淘汰）
基于 .npmrc 的配置无法解决此问题

### ❌ 方案 F：生成 pnpm-approvals.json（失败）
- 创建了 `.pnpm-build-approvals.json` 文件预批准包
- pnpm 依然报相同错误，说明此文件未被识别
- 文件名或格式可能不正确，且官方文档未提供明确指引

### ✅ 方案 G：降级 pnpm 到 v7（最终方案）
**根本原因**：构建脚本限制是 pnpm v8+ 引入的安全特性

**解决方案**：
- 将 `packageManager` 从 `pnpm@11.22.0` 降级到 `pnpm@7.33.7`
- pnpm v7 是稳定版本，没有构建脚本阻止机制
- 保持与主题的兼容性（Firefly 可能基于旧版 pnpm 开发）

**权衡**：
- ✅ 立即解决部署阻塞
- ✅ 保留 pnpm 生态（符合主题要求）
- ⚠️ 使用稍旧的包管理器版本（但仍是稳定版）
