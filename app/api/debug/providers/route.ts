import { NextResponse } from 'next/server'
import { getProviders } from 'next-auth/react'

export async function GET() {
  try {
    const providers = await getProviders()
    return NextResponse.json({
      success: true,
      providers: providers ? Object.keys(providers) : [],
      providerCount: providers ? Object.keys(providers).length : 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      providers: [],
      providerCount: 0
    })
  }
}
