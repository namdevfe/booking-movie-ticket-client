'use client'

import { getResetPasswordSchema } from '@/app/[locale]/auth/_components/reset-password-modal/reset-password-schema'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import { ResetPasswordPayload } from '@/types/auth-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'

const Modal = dynamic(() => import('@/components/common/modal'), { ssr: false })

interface ResetPasswordModalProps {
  isOpen: boolean
  isLoading?: boolean
  onSubmit?: (data: ResetPasswordPayload, options?: { onSuccess?: () => void }) => void
  onClose: () => void
}

const ResetPasswordModal = ({ isOpen = false, isLoading = false, onSubmit, onClose }: ResetPasswordModalProps) => {
  const tValidation = useTranslations('validation')
  const tResetPasswordModal = useTranslations('AuthPage.resetPasswordModal')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(getResetPasswordSchema(tValidation))
  })

  const handleForgotPassword = async (data: ResetPasswordPayload) => {
    onSubmit?.(data, { onSuccess: () => reset() })
  }

  return (
    <Modal innerClassName='min-w-[480px] px-[26px] py-[48px]' isOpen={isOpen} onClose={onClose}>
      <div className='text-black'>
        {/* Heading */}
        <div className='flex flex-col justify-center items-center'>
          <p className='text-[2.4rem]'>{tResetPasswordModal('title')}</p>
          <small className='text-base'>{tResetPasswordModal('description')}</small>
        </div>

        <form className='mt-[24px]' onSubmit={handleSubmit(handleForgotPassword)}>
          <Input
            {...register('password')}
            type='password'
            className='w-full'
            required
            label={tResetPasswordModal('newPasswordLabel')}
            placeholder={tResetPasswordModal('newPasswordPlaceholder')}
            error={errors.password?.message}
          />

          <Input
            {...register('confirmPassword')}
            type='password'
            className='w-full'
            required
            label={tResetPasswordModal('confirmPasswordLabel')}
            placeholder={tResetPasswordModal('confirmPasswordPlaceholder')}
            error={errors.confirmPassword?.message}
          />

          <Button className='mt-[24px] !w-full' type='submit' isLoading={isLoading}>
            {tResetPasswordModal('resetButton')}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ResetPasswordModal
