'use client'

import { getLoginSchema } from '@/app/[locale]/(main)/auth/_components/auth-tabs/login-schema'
import ForgotPasswordModal from '@/app/[locale]/(main)/auth/_components/forgot-password-modal'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import { LoginPayload } from '@/types/auth-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormProps {
  isLoading?: boolean
  onSubmit?: (data: LoginPayload, options?: { onSuccess?: () => void }) => void
}

const LoginForm = ({ isLoading = false, onSubmit }: LoginFormProps) => {
  const t = useTranslations('AuthPage.login')
  const tValidation = useTranslations('validation')
  const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] = useState<boolean>(false)

  const handleOpenForgotPasswordModal = () => {
    setIsOpenForgotPasswordModal(true)
  }

  const handleCloseForgotPasswordModal = useCallback(() => {
    setIsOpenForgotPasswordModal(false)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginPayload>({
    resolver: zodResolver(getLoginSchema(tValidation))
  })

  const handleLogin = async (data: LoginPayload) => {
    onSubmit?.(data, {
      onSuccess: () => {
        reset()
      }
    })
  }

  return (
    <>
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
          <Button
            className='ml-auto'
            variant='link'
            size='lg'
            type='button'
            onClick={handleOpenForgotPasswordModal}
          >
            {t('forgotPassword')}
          </Button>
          <Button type='submit' size='lg' className='!w-full !text-base' isLoading={isLoading}>
            <span>{t('submitButton')}</span>
          </Button>
        </div>
      </form>

      <ForgotPasswordModal
        isOpen={isOpenForgotPasswordModal}
        onClose={handleCloseForgotPasswordModal}
      />
    </>
  )
}

export default LoginForm
