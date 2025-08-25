import { getLoginSchema } from '@/app/[locale]/auth/_components/auth-tabs/login-schema'
import { getRegisterSchema } from '@/app/[locale]/auth/_components/auth-tabs/register-schema'
import { ApiResponse } from '@/types/api-type'
import z from 'zod'

export type RegisterPayload = z.infer<ReturnType<typeof getRegisterSchema>>
export type RegisterResponse = ApiResponse<any>
export type LoginPayload = z.infer<ReturnType<typeof getLoginSchema>>
export type LoginResponse = ApiResponse<{
  accessToken: string
  refreshToken: string
}>
export type SaveTokenToCookiesPayload = {
  accessToken: string
  refreshToken: string
}
export type SaveTokenToCookiesResponse = LoginResponse
