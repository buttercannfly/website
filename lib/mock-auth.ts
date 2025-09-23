// Mock authentication for local development
export const MOCK_USER = {
  idx: 33,
  id: 38,
  created_at: "2025-09-21 03:34:02.501+00",
  email: "1710085142@qq.com",
  type: "github",
  credits: 3,
  last_refresh_date: null,
  remaining: 0.9717
};

export const MOCK_SESSION = {
  user: {
    email: MOCK_USER.email,
    name: "Mock User",
    image: "https://avatars.githubusercontent.com/u/1?v=4"
  },
  accessToken: "mock-access-token",
  provider: "github"
};

// Function to check if we're in development mode and should use mock auth
export function shouldUseMockAuth(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.USE_MOCK_AUTH === 'true';
}
