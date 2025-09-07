import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 测试GitHub API连接
    const githubResponse = await fetch('https://api.github.com', {
      method: 'GET',
      headers: {
        'User-Agent': 'AIPex-Debug'
      },
      signal: AbortSignal.timeout(5000) // 5秒超时
    })

    const githubStatus = githubResponse.ok ? 'OK' : `Error: ${githubResponse.status}`

    // 测试GitHub OAuth端点
    const oauthResponse = await fetch('https://github.com/login/oauth/authorize', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    })

    const oauthStatus = oauthResponse.ok ? 'OK' : `Error: ${oauthResponse.status}`

    return NextResponse.json({
      success: true,
      network: {
        githubApi: githubStatus,
        githubOAuth: oauthStatus,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      network: {
        githubApi: 'Failed',
        githubOAuth: 'Failed',
        timestamp: new Date().toISOString()
      }
    })
  }
}
