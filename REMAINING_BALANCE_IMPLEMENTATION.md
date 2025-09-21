# Remaining Balance 实现说明

## 功能概述

根据需求，我们实现了以下功能：

1. **每次请求用户信息后更新remaining字段**：将`remaining`字段更新为`remaining - cost`
2. **余额不足检查**：如果更新前发现`remaining`已经为0，则返回余额不足错误
3. **确保余额不为负数**：使用`Math.max(0, remaining - cost)`确保余额不会变成负数

## 实现细节

### 1. 数据库字段

数据库中的`users`表已经包含`remaining`字段：
- 类型：`double precision`
- 默认值：`1`
- 可为空

### 2. 类型定义更新

更新了`lib/supabase.ts`中的`User`接口，添加了`remaining`字段：

```typescript
export interface User {
  id: number
  created_at: string
  email: string | null
  type: string | null
  credits: number | null
  last_refresh_date: string | null
  remaining: number | null  // 新增字段
}
```

### 3. API端点实现

#### 3.1 用户API (`/api/user`)

**GET请求**：
- 支持通过URL参数`cost`指定消费金额（默认为1）
- 获取用户信息后自动更新`remaining`字段
- 如果余额不足，返回400错误

**PUT请求**：
- 支持在请求体中提供`cost`参数
- 更新用户信息后，如果提供了`cost`参数，会更新`remaining`字段

#### 3.2 专门的Remaining API (`/api/user/remaining`)

**GET请求**：获取用户当前`remaining`余额

**POST请求**：消费`remaining`余额
```json
{
  "cost": 1.5  // 消费金额
}
```

**PUT请求**：设置或重置`remaining`余额
```json
{
  "remaining": 10  // 设置余额为10
}
```

### 4. AI聊天API更新

更新了`/api/ai/chat/route.ts`：
- 将`consumeUserCredit`函数改为`consumeUserRemaining`
- 使用`remaining`字段而不是`credits`字段
- **重要修改**：使用实际的token使用量计算cost，而不是固定的1
- 对于OpenRouter模型，根据prompt_tokens和completion_tokens计算实际费用
- 对于其他模型，使用默认cost值1
- 在AI请求完成后扣除remaining余额，而不是在请求前
- 更新了错误处理，返回中文错误信息
- 更新了响应头，使用`X-User-Remaining`而不是`X-User-Credits`

### 5. 核心逻辑

```typescript
async function updateUserRemaining(userEmail: string, cost: number = 1) {
  // 1. 获取当前用户remaining值
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('remaining')
    .eq('email', userEmail)
    .single()

  const currentRemaining = user.remaining || 0

  // 2. 检查余额是否足够
  if (currentRemaining <= 0) {
    throw new Error('余额不足')
  }

  // 3. 计算新的remaining值，确保不小于0
  const newRemaining = Math.max(0, currentRemaining - cost)

  // 4. 更新数据库
  await supabaseAdmin
    .from('users')
    .update({ remaining: newRemaining })
    .eq('email', userEmail)
}
```

## 使用方法

### 1. 获取用户信息并消费余额

```javascript
// 获取用户信息，消费1个余额
const response = await fetch('/api/user?cost=1')
const userInfo = await response.json()
```

### 2. 专门消费余额

```javascript
const response = await fetch('/api/user/remaining', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cost: 1.5 })
})
```

### 3. 重置余额

```javascript
const response = await fetch('/api/user/remaining', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ remaining: 10 })
})
```

## 错误处理

当余额不足时，API会返回以下格式的错误：

```json
{
  "error": "余额不足",
  "message": "您的余额不足，请充值后再试",
  "code": "INSUFFICIENT_BALANCE"
}
```

## 测试页面

创建了`/test-remaining`页面用于测试所有功能：
- 查看用户信息和余额
- 测试消费余额功能
- 测试重置余额功能
- 测试带cost参数获取用户信息

## Cost计算逻辑

### OpenRouter模型
对于OpenRouter模型（如`anthropic/claude-3.5-haiku`），系统会根据实际的token使用量计算费用：

```typescript
function calculateOpenRouterCost(modelName: string, promptTokens: number, completionTokens: number): number | null {
  const pricing = OPENROUTER_PRICING[modelName]
  if (!pricing) return null
  
  const promptTokensM = promptTokens / 1000000
  const completionTokensM = completionTokens / 1000000
  
  const inputCost = promptTokensM * pricing.input
  const outputCost = completionTokensM * pricing.output
  const totalCost = inputCost + outputCost
  
  return Math.round(totalCost * 10000) / 10000 // 保留4位小数
}
```

### 其他模型
对于非OpenRouter模型，系统使用默认cost值1。

### 扣除时机
- **流式响应**：在流结束时计算cost并扣除remaining余额
- **非流式响应**：在解析完响应后计算cost并扣除remaining余额

## 注意事项

1. **余额检查**：在更新前检查`remaining <= 0`，如果为0则返回余额不足错误
2. **负数保护**：使用`Math.max(0, remaining - cost)`确保余额不会变成负数
3. **实际cost计算**：使用实际的token使用量计算费用，而不是固定值
4. **错误处理**：所有相关API都有一致的错误处理机制
5. **日志记录**：所有余额更新操作都会记录详细日志
6. **向后兼容**：保留了原有的`credits`字段，只是新增了`remaining`字段的使用

## 数据库迁移

如果需要在现有数据库中添加`remaining`字段，可以执行以下SQL：

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS remaining DOUBLE PRECISION DEFAULT 1;
```

现有用户的`remaining`字段将被设置为默认值1。
