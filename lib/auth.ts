import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { supabaseAdmin } from "./supabase"

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        httpOptions: {
          timeout: 10000, // 增加超时时间到10秒
        },
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string
      session.provider = token.provider as string
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Sign in attempt:', { user, account, profile })
      
      if (user?.email && account?.provider) {
        try {
          // 检查用户是否已存在
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // 创建新用户
            const { error } = await supabaseAdmin
              .from('users')
              .insert({
                email: user.email,
                type: account.provider,
                credits: 10 // 新用户默认10个credits
              })

            if (error) {
              console.error('Error creating user:', error)
            } else {
              console.log('New user created:', user.email)
            }
          } else {
            // 更新现有用户的登录类型（如果需要）
            if (existingUser.type !== account.provider) {
              const { error } = await supabaseAdmin
                .from('users')
                .update({ type: account.provider })
                .eq('email', user.email)

              if (error) {
                console.error('Error updating user type:', error)
              }
            }
          }
        } catch (error) {
          console.error('Error in signIn callback:', error)
        }
      }
      
      return true
    },
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

