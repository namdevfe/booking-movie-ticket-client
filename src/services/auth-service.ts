import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  GetProfileResponse,
  LoginResponse,
  Profile,
  RegisterPayload,
  RegisterResponse,
  ResendOTPPayload,
  ResendOTPResponse,
  ResetPasswordResponse,
  SaveTokenToCookiesPayload,
  SaveTokenToCookiesResponse,
  VerifyEmailPayload,
  VerifyEmailResponse
} from '@/types/auth-type'
import http from '@/utils/http'

const authService = {
  register: (payload: Omit<RegisterPayload, 'confirmPassword'>) => {
    return http.post<RegisterResponse>('/auth/register', payload)
  },
  login: (payload: ({ email?: string } | { username?: string }) & { password: string }) => {
    return http.post<LoginResponse>('/auth/login', payload)
  },
  saveTokenToCookies: (payload: SaveTokenToCookiesPayload) => {
    return http.post<SaveTokenToCookiesResponse>('/auth', payload, {
      baseUrl: ''
    })
  },
  verifyEmail: (payload: VerifyEmailPayload) => {
    return http.put<VerifyEmailResponse>('/auth/verify-email', payload)
  },
  resendOTP: (payload: ResendOTPPayload) => {
    return http.put<ResendOTPResponse>('/auth/resend-otp', payload)
  },
  forgotPassword: (payload: ForgotPasswordPayload) => {
    return http.put<ForgotPasswordResponse>('/auth/forgot-password', payload)
  },
  resetPassword: (payload: { email: string; password: string; resetPasswordToken: string }) => {
    return http.put<ResetPasswordResponse>('/auth/reset-password', payload)
  },
  getProfile: (accessToken?: string) => {
    return http.get<GetProfileResponse>('/auth/profile', {
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
      }
    })
  },
  setSession: ({ token, user }: { token: string; user?: Profile }) => {
    return http.post<any>(
      '/sessions',
      { token, user },
      {
        baseUrl: ''
      }
    )
  },
  getSession: (token: string) => {
    return http.get<any>('/sessions', {
      baseUrl: '',
      headers: {
        token
      }
    })
  }
}

export default authService
