import { Base } from '@/types/common-type'

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user'
}

export interface Role extends Base {
  name: string
  description: string
  isDefault: boolean
  permissions: string[]
}

export interface User {
  _id: string
  email: string
  username: string
  password?: string
  fullName: string
  phoneNumber: string
  dateOfBirth: string
  isActive: boolean
  roles: Role[]
  refreshToken?: string | null
  otpCode?: string | null
  otpExpiresIn?: number | null
  resetPasswordToken?: string | null
  resetPasswordExpiresIn?: number | null
}
