export interface ModelPricing {
  input: number;  // 每1M tokens的输入价格
  output: number; // 每1M tokens的输出价格
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  pricing: ModelPricing;
  description?: string;
}

export const MODEL_PRICING: Record<string, ModelPricing> = {
  // Anthropic Claude 模型
  'anthropic/claude-3.5-haiku': { input: 0.96, output: 4.80 },
  'anthropic/claude-3.5-sonnet': { input: 3.60, output: 18.00 },
  'anthropic/claude-3.7-sonnet': { input: 3.60, output: 18.00 },
  'anthropic/claude-sonnet-4': { input: 3.60, output: 18.00 },
  'anthropic/claude-3-haiku': { input: 0.30, output: 1.50 },
  // DeepSeek 模型
  'deepseek/deepseek-chat-v3.1': { input: 0.30, output: 1.20 },
};

export const MODEL_INFO: ModelInfo[] = [
  {
    id: 'anthropic/claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    pricing: MODEL_PRICING['anthropic/claude-3.5-haiku'],
    description: 'Fast and efficient AI assistant, perfect for daily tasks'
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    pricing: MODEL_PRICING['anthropic/claude-3.5-sonnet'],
    description: 'Balanced performance and cost, ideal for complex tasks'
  },
  {
    id: 'anthropic/claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    pricing: MODEL_PRICING['anthropic/claude-3.7-sonnet'],
    description: 'Latest version with enhanced performance'
  },
  {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    pricing: MODEL_PRICING['anthropic/claude-sonnet-4'],
    description: 'Top-tier performance for the most complex tasks'
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    pricing: MODEL_PRICING['anthropic/claude-3-haiku'],
    description: 'Cost-effective choice for basic tasks'
  },
  {
    id: 'deepseek/deepseek-chat-v3.1',
    name: 'DeepSeek Chat v3.1',
    provider: 'DeepSeek',
    pricing: MODEL_PRICING['deepseek/deepseek-chat-v3.1'],
    description: 'Open-source model with excellent value for money'
  }
];

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatPricePerMillion(price: number): string {
  return `$${price.toFixed(2)}/1M tokens`;
}
