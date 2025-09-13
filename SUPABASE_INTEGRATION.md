# Supabase Integration Guide

本项目已成功集成Supabase，用于管理用户信息和credits系统。

## 功能特性

### 1. 用户管理
- 自动创建新用户（首次登录时）
- 存储用户邮箱、登录类型和credits
- 支持Google和GitHub OAuth登录

### 2. Credits系统
- 新用户默认获得10个credits
- 支持购买credits（增加credits）
- 支持消费credits（减少credits）
- 实时查询credits余额

## API端点

### 用户信息
- `GET /api/user` - 获取当前用户信息
- `PUT /api/user` - 更新用户信息

### Credits管理
- `GET /api/credits` - 获取用户credits信息
- `POST /api/credits` - 购买credits
- `POST /api/credits/consume` - 消费credits

## 数据库结构

### users表
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email VARCHAR,
  type VARCHAR,
  credits BIGINT
);
```

## 环境变量配置

在`.env.local`文件中添加以下配置：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hurbnpkzpwzuptjbpwzd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 测试页面

访问 `/test-supabase` 页面可以测试所有Supabase集成功能：
- 查看用户信息
- 查看credits信息
- 购买credits
- 消费credits

## 使用示例

### 获取用户信息
```typescript
const response = await fetch('/api/user')
const userInfo = await response.json()
```

### 获取credits信息
```typescript
const response = await fetch('/api/credits')
const credits = await response.json()
// 返回: { total: 100 }
```

### 购买credits
```typescript
const response = await fetch('/api/credits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100 })
})
const newCredits = await response.json()
// 返回: { total: 110 }
```

### 消费credits
```typescript
const response = await fetch('/api/credits/consume', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 5 })
})
const result = await response.json()
// 返回: { success: true, total: 95, message: "Successfully consumed 5 credits" }
```

## 安全注意事项

1. 所有API端点都需要用户认证
2. 使用服务端Supabase客户端进行数据库操作
3. 验证用户输入数据
4. 错误处理和日志记录

## 部署说明

1. 确保环境变量正确配置
2. 数据库表已创建
3. RLS（Row Level Security）策略已配置（如需要）
4. 测试所有API端点功能正常
