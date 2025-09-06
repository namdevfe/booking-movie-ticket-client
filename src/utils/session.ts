import { STORAGE } from '@/constants/storage'
import authService from '@/services/auth-service'
import { Profile } from '@/types/auth-type'
import { cookies } from 'next/headers'

export const setSession = async ({ token, user }: { token: string; user?: Profile }) => {
  await authService.setSession({ token: token as string, user })
}

export const getSession = async () => {
  const token = cookies().get(STORAGE.ACCESS_TOKEN)?.value

  if (token) {
    const { user } = await authService.getSession(token)
    return { user }
  }

  return { user: null }
}
