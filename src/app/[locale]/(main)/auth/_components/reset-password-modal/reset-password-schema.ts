import en from '@/i18n/messages/en.json'
import { TranslationValues } from 'next-intl'
import z from 'zod'

export type IntlMessages = typeof en
type Messages = keyof IntlMessages['validation']

export const getResetPasswordSchema = (t?: (key: Messages, object?: TranslationValues | undefined) => string) => {
  return z
    .object({
      password: z.string().nonempty(t?.('required')),
      confirmPassword: z.string().nonempty(t?.('required'))
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      error: t?.('passwordsDoNotMatch')
    })
}
