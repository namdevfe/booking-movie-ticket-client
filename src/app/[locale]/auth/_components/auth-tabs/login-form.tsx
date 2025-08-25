'use client'

import { getLoginSchema } from '@/app/[locale]/auth/_components/auth-tabs/login-schema'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import authService from '@/services/auth-service'
import { LoginPayload } from '@/types/auth-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const t = useTranslations('AuthPage.login')
  const tValidation = useTranslations('validation')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginPayload>({
    resolver: zodResolver(getLoginSchema(tValidation))
  })

  const handleLogin = async (data: LoginPayload) => {
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
        }
      }
    } catch (error: any) {
      console.log('🚀error---->', error)
      toast.error(error?.message)
    }
  }

  return (
    <form className='p-[36px] bg-white' onSubmit={handleSubmit(handleLogin)}>
      <Input
        className='w-full'
        required
        type='text'
        label={t('fields.emailOrUsername.label')}
        placeholder={t('fields.emailOrUsername.placeholder')}
        {...register('emailOrUsername')}
        error={errors.emailOrUsername?.message}
      />
      <Input
        className='w-full'
        required
        type='password'
        label={t('fields.password.label')}
        placeholder={t('fields.password.placeholder')}
        {...register('password')}
        error={errors.password?.message}
      />

      {/* Bottom */}
      <div className='mt-[26px] w-full'>
        <Button className='ml-auto' href='/forgot-password' variant='link' size='lg'>
          {t('forgotPassword')}
        </Button>
        <Button type='submit' size='lg' className='!w-full !text-base'>
          <span>{t('submitButton')}</span>
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
