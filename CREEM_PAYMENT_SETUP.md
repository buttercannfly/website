# Creem支付平台集成配置指南

## 概述

本项目已成功集成Creem支付平台，用于处理用户购买Credits的支付流程。Creem是一个安全、可靠的支付处理平台，支持多种支付方式。

## 功能特性

### 🎯 核心功能
- **多种积分套餐**: Starter (100积分), Standard (500积分), Premium (1000积分)
- **安全支付**: 通过Creem平台处理所有支付交易
- **即时到账**: 支付成功后积分立即到账
- **Webhook处理**: 自动处理支付成功/失败/取消事件
- **用户友好界面**: 美观的产品选择界面

### 💳 支付流程
1. 用户点击"Buy credits"按钮
2. 选择积分套餐
3. 重定向到Creem支付页面
4. 完成支付后自动返回账户页面
5. 积分自动添加到用户账户

## 配置步骤

### 1. 注册Creem账户
1. 访问 [Creem官网](https://creem.com) 注册账户
2. 完成商家认证流程
3. 获取API密钥和Webhook密钥

### 2. 产品信息
您已经在Creem后台创建了产品：
- **产品名称**: AIPex
- **价格**: $4.49
- **产品ID**: prod_3Y5uBhxL8Gu76Ts2tODWbs
- **支付链接**: https://www.creem.io/payment/prod_3Y5uBhxL8Gu76Ts2tODWbs

### 3. 配置环境变量
在 `.env.local` 文件中添加以下配置：

```env
# Creem Payment Platform Configuration
CREEM_ENV=test  # 测试环境使用 "test"，生产环境使用 "prod"
CREEM_API_KEY=your-creem-api-key
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret

# Creem Product IDs
CREEM_BASIC_PRODUCT_ID=prod_3Y5uBhxL8Gu76Ts2tODWbs
CREEM_STANDARD_PRODUCT_ID=prod_standard_id

# Creem Payment URLs
NEXT_PUBLIC_CREEM_SUCCESS_URL=https://funny-meme.com/payment/success
NEXT_PUBLIC_CREEM_CANCEL_URL=https://funny-meme.com/pricing?cancel=true
```

### 4. 设置Webhook
在Creem后台配置Webhook地址：
- **Webhook URL**: `https://yourdomain.com/api/creem/webhook`
- **Events**: 选择 `payment.completed`, `payment.failed`, `payment.cancelled`
- **Signing Secret**: 复制并填入 `CREEM_WEBHOOK_SECRET`

## 文件结构

```
├── lib/
│   └── creem.ts                    # Creem配置和API客户端
├── app/api/creem/
│   ├── create-payment/
│   │   └── route.ts               # 创建支付订单API
│   └── webhook/
│       └── route.ts               # Webhook处理器
├── components/payment/
│   └── credits-purchase-modal.tsx # 支付产品选择组件
└── app/account/
    └── page.tsx                   # 更新的账户页面
```

## API端点

### 创建支付订单
```
POST /api/creem/create-payment
Content-Type: application/json

{
  "productId": "aipex"
}
```

**响应:**
```json
{
  "success": true,
  "paymentUrl": "https://creem.com/pay/...",
  "paymentId": "pay_xxx",
  "product": {
    "id": "aipex",
    "name": "AIPex Credits",
    "credits": 100,
    "price": 4.49,
    "currency": "USD"
  }
}
```

### Webhook处理
```
POST /api/creem/webhook
X-Creem-Signature: signature
Content-Type: application/json

{
  "event": "payment.completed",
  "paymentId": "pay_xxx",
  "status": "completed",
  "amount": 4.49,
  "currency": "USD",
  "userId": "user@example.com",
  "productId": "aipex",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 产品配置

### 积分套餐详情
| 套餐 | 积分数量 | 价格 | 描述 |
|------|----------|------|------|
| AIPex | 100 | $4.49 | AIPex积分套餐 |

### 产品特性
- ✅ 即时到账
- ✅ 永不过期
- ✅ 安全支付
- ✅ 支持退款

## 测试流程

### 1. 测试环境配置
```env
CREEM_ENV=test
CREEM_API_KEY=test_api_key_xxx
```

### 2. 测试支付流程
1. 启动开发服务器: `npm run dev`
2. 访问 `/account` 页面
3. 点击"Buy credits"按钮
4. 选择测试产品
5. 使用测试卡号完成支付
6. 验证积分是否正确添加

### 3. 测试Webhook
使用工具如ngrok或类似服务将本地服务器暴露到公网，然后在Creem后台配置Webhook URL。

## 生产环境部署

### 1. 更新环境变量
```env
CREEM_ENV=prod
CREEM_API_KEY=prod_api_key_xxx
```

### 2. 配置生产Webhook
- 更新Webhook URL为生产域名
- 确保HTTPS证书有效
- 测试Webhook连接

### 3. 监控和日志
- 监控支付成功率
- 检查Webhook处理日志
- 设置错误告警

## 安全注意事项

1. **API密钥安全**: 不要在代码中硬编码API密钥
2. **Webhook验证**: 始终验证Webhook签名
3. **HTTPS**: 生产环境必须使用HTTPS
4. **日志记录**: 记录所有支付相关操作
5. **错误处理**: 妥善处理支付失败情况

## 故障排除

### 常见问题

**Q: 支付创建失败**
A: 检查API密钥是否正确，网络连接是否正常

**Q: Webhook未收到**
A: 检查Webhook URL是否正确，服务器是否可访问

**Q: 积分未到账**
A: 检查Webhook处理逻辑，查看服务器日志

**Q: 支付页面无法加载**
A: 检查Creem API配置，确认产品ID正确

### 调试工具
- 使用 `/api/debug/config` 检查配置
- 查看浏览器开发者工具网络请求
- 检查服务器日志

## 支持

如有问题，请：
1. 查看Creem官方文档
2. 检查项目日志
3. 联系技术支持

---

**注意**: 在生产环境使用前，请确保完成所有测试并验证支付流程正常工作。
