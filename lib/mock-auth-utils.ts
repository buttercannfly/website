import { NextRequest } from 'next/server';
import { MOCK_USER } from './mock-auth';

// Check if we should use mock authentication
export function shouldUseMockAuth(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.USE_MOCK_AUTH === 'true';
}

// Get mock user data
export function getMockUser() {
  return MOCK_USER;
}

// Create a mock session for API routes
export function createMockSession() {
  return {
    user: {
      email: MOCK_USER.email,
      name: "Mock User",
      image: "https://avatars.githubusercontent.com/u/1?v=4"
    },
    accessToken: "mock-access-token",
    provider: "github"
  };
}

// Mock authentication middleware for API routes
export async function getMockAuth(req: NextRequest) {
  if (!shouldUseMockAuth()) {
    return null;
  }

  // Check if mock auth is enabled via headers or query params
  const mockAuthHeader = req.headers.get('x-mock-auth');
  const mockAuthQuery = new URL(req.url).searchParams.get('mock-auth');
  
  if (mockAuthHeader === 'true' || mockAuthQuery === 'true') {
    return {
      userId: MOCK_USER.id,
      email: MOCK_USER.email,
      provider: MOCK_USER.type
    };
  }

  return null;
}

// Helper to check if request is from local development
export function isLocalDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
