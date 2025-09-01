'use client'

import LoginForm from '@/app/[locale]/auth/_components/auth-tabs/login-form'
import RegisterForm from '@/app/[locale]/auth/_components/auth-tabs/register-form'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import OtpModal from '@/components/common/otp-modal'
import authService from '@/services/auth-service'
import { LoginPayload, RegisterPayload, ResendOTPPayload, VerifyEmailPayload } from '@/types/auth-type'
import { toast } from 'react-toastify'
import styles from './auth-tabs.module.scss'

const AuthTabs = () => {
  const t = useTranslations('AuthPage')
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [isOpenOTPModal, setIsOpenOTPModal] = useState<boolean>(false)
  const [emailRegistered, setEmailRegistered] = useState<string>('')
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false)
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState<boolean>(false)

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
    setIsLoginLoading(true)
    try {
      const payload: Record<string, any> = { password: data.password }
      const isLoginWithEmail = data.emailOrUsername.includes('@')

      if (isLoginWithEmail) {
        payload.email = data.emailOrUsername
      } else {
        payload.username = data.emailOrUsername
      }

      const res = await authService.login(payload as LoginPayload & ({ email?: string } | { username?: string }))

      if (res?.statusCode === 200 && res.data?.accessToken) {
        const { accessToken, refreshToken } = res.data

        // Save token to localStorage for client component
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        // Save token to cookies for server component
        const saveTokenToCookiesRes = await authService.saveTokenToCookies(res.data)

        if (saveTokenToCookiesRes?.statusCode === 200) {
          toast.success(res.message)
          options?.onSuccess?.()
        }
      }
    } catch (error: any) {
      // Handle account not activated
      if (error?.statusCode === 400) {
        setEmailRegistered(data.emailOrUsername)
        handleResendOTP(data.emailOrUsername)
      }

      toast.error(error?.message)
    } finally {
      setIsLoginLoading(false)
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

  return (
    <>
      <div className={styles.authTabs}>
        {/* Tab List */}
        <ul className={styles.tabList}>
          <li
            className={`${styles.tabItem} ${activeTab === 'login' ? styles['tabItem--active'] : ''}`}
            onClick={() => handleTabChange('login')}
          >
            <h2>{t('login.title')}</h2>
          </li>
          <li
            className={`${styles.tabItem} ${activeTab === 'register' ? styles['tabItem--active'] : ''}`}
            onClick={() => handleTabChange('register')}
          >
            <h2>{t('register.title')}</h2>
          </li>
        </ul>

        {/* Tab Content */}
        {activeTab === 'login' && <LoginForm isLoading={isLoginLoading} onSubmit={handleLogin} />}
        {activeTab === 'register' && <RegisterForm isLoading={isRegisterLoading} onSubmit={handleRegister} />}
      </div>

      <OtpModal
        isOpen={isOpenOTPModal}
        isLoading={isVerifyEmailLoading}
        onResend={() => handleResendOTP(emailRegistered)}
        onSubmit={handleVerifyEmail}
        onClose={handleCloseOTPModal}
      />
    </>
  )
}

export default AuthTabs
