import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()

  if (!data) {
    throw new Error('Token is required')
  }

  const response = NextResponse.json(
    {
      statusCode: 200,
      message: 'Save token to cookies is successfully',
      data
    },
    { status: 200 }
  )

  response.cookies.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  })

  response.cookies.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  })

  return response
}
