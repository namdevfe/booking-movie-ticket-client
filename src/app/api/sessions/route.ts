import { NextRequest } from 'next/server'
import fs from 'fs'

// Create session
export const POST = async (request: NextRequest) => {
  const { token, user } = await request.json()

  if (!!token) {
    const path = process.cwd() + '/session/' + token
    fs.writeFileSync(path, JSON.stringify(user))
  }

  return Response.json({ statusCode: 200, message: 'Set session is successfully' })
}

// Read session
export const GET = async (request: NextRequest) => {
  const token = request.headers.get('token')

  if (!!token) {
    const path = process.cwd() + '/session/' + token
    const user = JSON.parse(fs.readFileSync(path, 'utf-8'))
    return Response.json({ user })
  }

  return Response.json({ user: null })
}
