# Credits系统简化版

## ✅ 简化完成

根据你的建议，credits系统已经简化为只显示total credits，这样更加简洁明了。

## 🔧 API响应格式

### 获取credits
```json
{
  "total": 100
}
```

### 购买credits
```json
{
  "total": 110
}
```

### 消费credits
```json
{
  "success": true,
  "total": 95,
  "message": "Successfully consumed 5 credits"
}
```

## 🎨 界面显示

测试页面现在只显示：
- 大号蓝色数字显示total credits
- 简洁的"Total Credits"标签

## 📱 使用场景

这种简化设计适合：
- 用户只需要知道剩余credits数量
- 不需要复杂的已用/剩余credits计算
- 界面更加简洁清晰
- 减少用户认知负担

## 🚀 测试

访问 `/test-supabase` 页面可以看到简化后的credits显示效果。
