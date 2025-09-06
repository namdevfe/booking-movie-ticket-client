import { getLoginSchema } from '@/app/[locale]/(main)/auth/_components/auth-tabs/login-schema'
import { getRegisterSchema } from '@/app/[locale]/(main)/auth/_components/auth-tabs/register-schema'
import { getForgotPasswordSchema } from '@/app/[locale]/(main)/auth/_components/forgot-password-modal/forgot-password-schema'
import { getResetPasswordSchema } from '@/app/[locale]/(main)/auth/_components/reset-password-modal/reset-password-schema'
import { ApiResponse } from '@/types/api-type'
import { User } from '@/types/user-type'
import z from 'zod'

export type Profile = Pick<
  User,
  '_id' | 'email' | 'username' | 'dateOfBirth' | 'phoneNumber' | 'isActive' | 'roles'
>

export type RegisterPayload = z.infer<ReturnType<typeof getRegisterSchema>>
export type RegisterResponse = ApiResponse<
  Pick<User, '_id' | 'dateOfBirth' | 'email' | 'fullName' | 'isActive' | 'username'>
>
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

export type VerifyEmailPayload = Pick<User, 'email' | 'otpCode'>
export type VerifyEmailResponse = ApiResponse<undefined>

export type ResendOTPPayload = Pick<User, 'email'>
export type ResendOTPResponse = ApiResponse<undefined>

export type ForgotPasswordPayload = z.infer<ReturnType<typeof getForgotPasswordSchema>>
export type ForgotPasswordResponse = ApiResponse<undefined>

export type ResetPasswordPayload = z.infer<ReturnType<typeof getResetPasswordSchema>>
export type ResetPasswordResponse = ApiResponse<undefined>

export type GetProfileResponse = ApiResponse<Profile>
