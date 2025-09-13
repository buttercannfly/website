# Authentication Configuration

## Environment Variables

Create a `.env.local` file in the aipex-website directory with the following variables:

```env
# NextAuth Configuration
# 开发环境
NEXTAUTH_URL=http://localhost:3000
# 生产环境请设置为: NEXTAUTH_URL=https://claudechrome
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (if using Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/aipex"
```

## OAuth Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://claudechrome/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to environment variables

### GitHub OAuth Setup
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://claudechrome/api/auth/callback/github` (production)
4. Copy Client ID and Client Secret to environment variables

## Database Setup (Optional)

If you want to persist user sessions, set up a database:

1. Install and configure your preferred database
2. Update the DATABASE_URL in your environment variables
3. Run Prisma migrations if needed

## Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/auth/signin`
3. Test both Google and GitHub login flows

