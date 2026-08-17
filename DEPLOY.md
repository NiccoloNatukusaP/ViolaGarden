# Cloudflare Pages 部署指南

## 配置步骤

1. **连接 GitHub 仓库**
   - 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
   - 点击 "Create a project"
   - 选择 GitHub 仓库：`NiccoloNatukusaP/ViolaGarden`
   - 选择分支：`feat/astro-migration`（或合并到 main 后选择 `main`）

2. **构建设置**
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Node version: 22
   ```

3. **环境变量**（可选）
   ```
   SITE_URL=https://natukusa.cc
   ```

4. **自定义域名**
   - 在 Cloudflare Pages 项目设置中添加自定义域名
   - 域名：`natukusa.cc`
   - DNS 记录会自动配置（如果域名也在 Cloudflare）

## 验证清单

构建完成后，访问预览 URL 或自定义域名，检查：

- [ ] 首页显示博客名称「Niccolo's Viola Garden」
- [ ] 能看到两篇文章：《我爱紫百合》和《佛罗伦萨4-1贝内文托》
- [ ] 文章图片正常显示
- [ ] 搜索功能可用
- [ ] 深色/浅色模式切换正常
- [ ] RSS 订阅链接可访问（/rss.xml）
- [ ] 移动端显示正常
- [ ] 主题色为紫色（hue: 280）

## 构建日志检查

如果构建失败，检查：
1. Node 版本是否为 18 或更高
2. 是否所有依赖都正确安装
3. 构建命令是否为 `npm run build`
4. 输出目录是否设置为 `dist`

## 后续优化

部署成功后可以进行的视觉定制（Issue 06）：
- 调整紫百合配色（紫色 #7c3aed、白色、红色 #c62839）
- 添加背景紫百合暗纹
- 自定义字体
- Logo 设计

## 故障排查

### 构建超时
如果构建时间过长，可以：
- 禁用图片优化（在 `siteConfig.ts` 中调整）
- 减少字体子集化

### 图片 403 错误
已在 `imageOptimization.noReferrerDomains` 中配置防盗链规则

### 中文显示问题
Firefly 已配置 `lang: "zh_CN"`，中文应正常显示
