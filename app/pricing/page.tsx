import { MODEL_INFO, formatPricePerMillion } from '@/lib/pricing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Model Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing, pay-as-you-use. All prices are per 1 million tokens.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MODEL_INFO.map((model) => (
          <Card key={model.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <Badge variant="secondary">{model.provider}</Badge>
              </div>
              <CardDescription>{model.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Input</span>
                  <span className="font-semibold text-green-600">
                    {formatPricePerMillion(model.pricing.input)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Output</span>
                  <span className="font-semibold text-blue-600">
                    {formatPricePerMillion(model.pricing.output)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Pricing Details</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• <strong>Input costs</strong>: Based on the length of text you send to the AI</p>
          <p>• <strong>Output costs</strong>: Based on the length of the AI&apos;s response</p>
          <p>• <strong>Billing unit</strong>: Calculated by tokens, where 1 token ≈ 0.75 English words or 1 Chinese character</p>
          <p>• <strong>Real-time billing</strong>: Pay only for what you use, no hidden fees</p>
          <p>• <strong>Price updates</strong>: Prices are updated when upstream providers adjust their rates</p>
        </div>
      </div>
    </div>
  );
}
