# Account & Credits Feature

## 功能概述

这个功能为 aipex-website 添加了用户账户管理和 credits 显示功能。

## 新增功能

### 1. 用户头像和认证
- 在 Header 组件中添加了用户头像
- 支持点击头像显示下拉菜单
- 包含"Account & Credits"和"Log out"选项
- 未登录用户显示"Sign In"按钮

### 2. Account 页面 (`/account`)
- 显示用户个人信息
- 展示 credits 使用情况
- 包含以下信息：
  - 总 credits 数量
  - 已使用 credits
  - 剩余 credits
  - 使用进度条
  - Credits 状态（Good/Low/Empty）

### 3. Credits API (`/api/credits`)
- `GET /api/credits` - 获取用户 credits 信息
- `POST /api/credits` - 购买更多 credits（模拟）

## 文件结构

```
aipex-website/
├── app/
│   ├── account/
│   │   └── page.tsx          # Account 页面
│   └── api/
│       └── credits/
│           └── route.ts      # Credits API
├── components/
│   └── ui/
│       └── header.tsx        # 更新的 Header 组件
└── ACCOUNT_FEATURE.md        # 本文档
```

## 使用方法

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问网站并登录

3. 点击右上角的用户头像

4. 选择"Account & Credits"查看账户信息

5. 在账户页面可以：
   - 查看 credits 使用情况
   - 购买更多 credits（模拟功能）
   - 管理账户设置

## 技术实现

- 使用 NextAuth.js 进行用户认证
- 使用 Radix UI 组件构建界面
- 使用 Tailwind CSS 进行样式设计
- 响应式设计，支持移动端

## 注意事项

- 当前 credits 数据是模拟数据
- 购买 credits 功能是演示功能
- 在实际部署时需要连接真实的数据库和支付系统

## 未来改进

- 连接真实数据库存储用户 credits
- 集成支付系统
- 添加 credits 使用历史
- 添加更多账户管理功能

