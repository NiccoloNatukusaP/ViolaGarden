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

### pnpm 文档调研
- pnpm CI 文档没有提及 ignored builds 的处理方法
- 错误代码文档中没有 `ERR_PNPM_IGNORED_BUILDS` 的条目
- 这个错误可能是 pnpm v8+ 的新安全特性

## 下一步行动

### 方案 E：简化 .npmrc，参考 Fuwari 官方配置
尝试使用最简配置：
```
manage-package-manager-versions = true
```
