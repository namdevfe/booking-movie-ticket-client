export interface User {
  _id: string
  email: string
  username: string
  password?: string
  fullName: string
  phoneNumber: string
  dateOfBirth: string
  isActive: boolean
  role?: string
  refreshToken?: string
  otpCode?: string | null
  otpExpiresIn?: number | null
}
