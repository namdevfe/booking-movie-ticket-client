'use client'

import LoginForm from '@/app/[locale]/(main)/auth/_components/auth-tabs/login-form'
import RegisterForm from '@/app/[locale]/(main)/auth/_components/auth-tabs/register-form'
import ResetPasswordModal from '@/app/[locale]/(main)/auth/_components/reset-password-modal'
import OtpModal from '@/components/common/otp-modal'
import authService from '@/services/auth-service'
import {
  LoginPayload,
  RegisterPayload,
  ResendOTPPayload,
  ResetPasswordPayload,
  VerifyEmailPayload
} from '@/types/auth-type'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './auth-tabs.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login } from '@/store/reducers/auth-slice'

const AuthTabs = () => {
  const t = useTranslations('AuthPage')
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const isLoginLoading = useAppSelector((state) => state.auth.isLoading.login)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [isOpenOTPModal, setIsOpenOTPModal] = useState<boolean>(false)
  const [emailRegistered, setEmailRegistered] = useState<string>('')
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false)
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState<boolean>(false)
  const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = useState<boolean>(false)
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState<boolean>(false)

  const email = searchParams.get('email')
  const resetPasswordToken = searchParams.get('resetPasswordToken')

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab)
  }

  const handleShowOTPModal = () => {
    setIsOpenOTPModal(true)
  }

  const handleCloseOTPModal = useCallback(() => {
    setIsOpenOTPModal(false)
  }, [])

  const handleLogin = async (data: LoginPayload, options?: { onSuccess?: () => void }) => {
    try {
      const res = await dispatch(login(data)).unwrap()

      if (res?.statusCode === 200 && res.data) {
        toast.success(res?.message)
        options?.onSuccess?.()
      }
    } catch (error: any) {
      if (error?.statusCode === 400) {
        setEmailRegistered(data.emailOrUsername)
        handleResendOTP(data.emailOrUsername)
      }
      toast.error(error?.message)
    }
  }

  const handleRegister = async (data: RegisterPayload, options?: { onSuccess?: () => void }) => {
    setIsRegisterLoading(true)
    const payload: Record<string, any> = { ...data }

    // Remove confirmPassword field
    delete payload.confirmPassword

    try {
      const res = await authService.register(payload as Omit<RegisterPayload, 'confirmPassword'>)
      if (res?.statusCode === 201 && !res.data?.isActive) {
        options?.onSuccess?.()
        setEmailRegistered(res.data?.email as string)
        handleShowOTPModal()
        toast.success(res.message)
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsRegisterLoading(false)
    }
  }

  const handleVerifyEmail = async (otpCode: string) => {
    setIsVerifyEmailLoading(true)
    try {
      const payload: VerifyEmailPayload = {
        email: emailRegistered,
        otpCode
      }

      const res = await authService.verifyEmail(payload)

      if (res?.statusCode === 200) {
        handleCloseOTPModal()
        setEmailRegistered('')
        toast.success(res.message)
      }
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsVerifyEmailLoading(false)
    }
  }

  const handleResendOTP = async (email: string) => {
    try {
      const payload: ResendOTPPayload = {
        email
      }
      const res = await authService.resendOTP(payload)
      if (res?.statusCode === 201) {
        handleShowOTPModal()
        toast.success(res.message)
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  const handleOpenResetPasswordModal = () => {
    setIsOpenResetPasswordModal(true)
  }

  const handleCloseResetPasswordModal = () => {
    setIsOpenResetPasswordModal(false)
  }

  const handleResetPassword = async (data: ResetPasswordPayload) => {
    if (email && resetPasswordToken) {
      setIsResetPasswordLoading(true)

      try {
        const payload = { password: data.password, email, resetPasswordToken }
        const res = await authService.resetPassword(payload)
        if (res?.statusCode === 200) {
          handleCloseResetPasswordModal()
          toast.success(res.message)
        }
      } catch (error: any) {
        toast.error(error?.message)
      } finally {
        setIsResetPasswordLoading(false)
      }
    }
  }

  useEffect(() => {
    if (email && resetPasswordToken) {
      handleOpenResetPasswordModal()
    }
  }, [email, resetPasswordToken])

  return (
    <>
      <div className={styles.authTabs}>
        {/* Tab List */}
        <ul className={styles.tabList}>
          <li
            className={`${styles.tabItem} ${
              activeTab === 'login' ? styles['tabItem--active'] : ''
            }`}
            onClick={() => handleTabChange('login')}
          >
            <h2>{t('login.title')}</h2>
          </li>
          <li
            className={`${styles.tabItem} ${
              activeTab === 'register' ? styles['tabItem--active'] : ''
            }`}
            onClick={() => handleTabChange('register')}
          >
            <h2>{t('register.title')}</h2>
          </li>
        </ul>

        {/* Tab Content */}
        {activeTab === 'login' && <LoginForm isLoading={isLoginLoading} onSubmit={handleLogin} />}
        {activeTab === 'register' && (
          <RegisterForm isLoading={isRegisterLoading} onSubmit={handleRegister} />
        )}
      </div>

      <OtpModal
        isOpen={isOpenOTPModal}
        isLoading={isVerifyEmailLoading}
        onResend={() => handleResendOTP(emailRegistered)}
        onSubmit={handleVerifyEmail}
        onClose={handleCloseOTPModal}
      />

      <ResetPasswordModal
        isOpen={isOpenResetPasswordModal}
        isLoading={isResetPasswordLoading}
        onSubmit={handleResetPassword}
        onClose={handleCloseResetPasswordModal}
      />
    </>
  )
}

export default AuthTabs
