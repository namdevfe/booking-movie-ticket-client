import {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  SaveTokenToCookiesPayload,
  SaveTokenToCookiesResponse
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
  }
}

export default authService
