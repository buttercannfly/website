'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_USER } from '@/lib/mock-auth';

export default function DevAuthPage() {
  const [isMockEnabled, setIsMockEnabled] = useState(false);

  const enableMockAuth = () => {
    // Set mock auth flag in localStorage
    localStorage.setItem('USE_MOCK_AUTH', 'true');
    localStorage.setItem('MOCK_USER', JSON.stringify(MOCK_USER));
    setIsMockEnabled(true);
    alert('Mock authentication enabled! Refresh the page to see the effect.');
  };

  const disableMockAuth = () => {
    localStorage.removeItem('USE_MOCK_AUTH');
    localStorage.removeItem('MOCK_USER');
    setIsMockEnabled(false);
    alert('Mock authentication disabled!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Development Authentication</CardTitle>
          <CardDescription>
            Mock authentication for local development
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Mock User Data:</Label>
              <div className="mt-2 p-4 bg-muted rounded-lg">
                <pre className="text-sm">
                  {JSON.stringify(MOCK_USER, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={enableMockAuth}
                disabled={isMockEnabled}
                className="flex-1"
              >
                Enable Mock Auth
              </Button>
              <Button 
                onClick={disableMockAuth}
                variant="outline"
                disabled={!isMockEnabled}
                className="flex-1"
              >
                Disable Mock Auth
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>• Mock user has 3 credits and 0.9717 remaining balance</p>
              <p>• This allows you to access authenticated pages locally</p>
              <p>• Remember to disable mock auth before deploying</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
