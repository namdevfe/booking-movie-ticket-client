import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResendOTPPayload,
  ResendOTPResponse,
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
  }
}

export default authService
