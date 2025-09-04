'use client'

import { getForgotPasswordSchema } from '@/app/[locale]/auth/_components/forgot-password-modal/forgot-password-schema'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import authService from '@/services/auth-service'
import { ForgotPasswordPayload } from '@/types/auth-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Modal = dynamic(() => import('@/components/common/modal'), { ssr: false })

interface ForgotPasswordModal {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal = ({ isOpen = false, onClose }: ForgotPasswordModal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const tValidation = useTranslations('validation')
  const tForgotPasswordModal = useTranslations('AuthPage.forgotPasswordModal')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(getForgotPasswordSchema(tValidation))
  })

  const handleForgotPassword = async (data: ForgotPasswordPayload) => {
    setIsLoading(true)
    try {
      const payload: ForgotPasswordPayload = { ...data }
      const res = await authService.forgotPassword(payload)

      if (res?.statusCode === 200) {
        reset()
        onClose()
        toast.success(tForgotPasswordModal('success'))
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error(tForgotPasswordModal('failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal innerClassName='min-w-[480px] px-[26px] py-[48px]' isOpen={isOpen} onClose={onClose}>
      <div className='text-black'>
        {/* Heading */}
        <div className='flex flex-col justify-center items-center'>
          <p className='text-[2.4rem]'>{tForgotPasswordModal('title')}</p>
          <small className='text-base'>{tForgotPasswordModal('description')}</small>
        </div>

        <form className='mt-[24px]' onSubmit={handleSubmit(handleForgotPassword)}>
          <Input
            {...register('email')}
            className='w-full'
            required
            label={tForgotPasswordModal('label')}
            placeholder={tForgotPasswordModal('placeholder')}
            error={errors.email?.message}
          />

          <Button className='mt-[24px] !w-full' type='submit' isLoading={isLoading}>
            {tForgotPasswordModal('sendButton')}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ForgotPasswordModal
