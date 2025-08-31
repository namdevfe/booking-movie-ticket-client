'use client'

import { getRegisterSchema } from '@/app/[locale]/auth/_components/auth-tabs/register-schema'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import { RegisterPayload } from '@/types/auth-type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

interface RegisterFormProps {
  isLoading?: boolean
  onSubmit?: (data: RegisterPayload, options?: { onSuccess?: () => void }) => void
}

const RegisterForm = ({ isLoading = false, onSubmit }: RegisterFormProps) => {
  const t = useTranslations('AuthPage.register')
  const tValidation = useTranslations('validation')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterPayload>({
    resolver: zodResolver(getRegisterSchema(tValidation))
  })

  const handleRegister = async (data: RegisterPayload) => {
    onSubmit?.(data, {
      onSuccess: () => reset()
    })
  }

  return (
    <form className='p-[36px] bg-white' onSubmit={handleSubmit(handleRegister)}>
      <Input
        {...register('fullName')}
        className='w-full'
        required
        type='text'
        label={t('fields.fullName.label')}
        placeholder={t('fields.fullName.placeholder')}
        error={errors.fullName?.message}
      />
      <Input
        {...register('dateOfBirth')}
        className='w-full'
        required
        type='date'
        label={t('fields.birthday.label')}
        placeholder={t('fields.birthday.placeholder')}
        error={errors.dateOfBirth?.message}
      />
      <Input
        {...register('phoneNumber')}
        className='w-full'
        required
        type='text'
        label={t('fields.phoneNumber.label')}
        placeholder={t('fields.phoneNumber.placeholder')}
        error={errors.phoneNumber?.message}
      />
      <Input
        {...register('username')}
        className='w-full'
        required
        type='text'
        label={t('fields.username.label')}
        placeholder={t('fields.username.placeholder')}
        error={errors.username?.message}
      />
      <Input
        {...register('email')}
        className='w-full'
        required
        type='text'
        label={t('fields.email.label')}
        placeholder={t('fields.email.placeholder')}
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        className='w-full'
        required
        type='password'
        label={t('fields.password.label')}
        placeholder={t('fields.password.placeholder')}
        error={errors.password?.message}
      />
      <Input
        {...register('confirmPassword')}
        className='w-full'
        required
        type='password'
        label={t('fields.confirmPassword.label')}
        placeholder={t('fields.confirmPassword.placeholder')}
        error={errors.confirmPassword?.message}
      />

      {/* Bottom */}
      <div className='mt-[26px] w-full'>
        <Button type='submit' size='lg' className='!w-full !text-base' isLoading={isLoading}>
          <span>{t('submitButton')}</span>
        </Button>
        <div className='mt-[16px] flex items-center justify-center'>
          <p className='text-sm text-helperText'>{t('alreadyHaveAnAccount')}</p>
          <Button href='/auth' variant='link' size='lg'>
            {t('goToLogin')}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm
