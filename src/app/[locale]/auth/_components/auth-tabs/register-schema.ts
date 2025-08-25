import en from '@/i18n/messages/en.json'
import { TranslationValues } from 'next-intl'
import z from 'zod'

export type IntlMessages = typeof en
type Messages = keyof IntlMessages['validation']

export const getRegisterSchema = (t?: (key: Messages, object?: TranslationValues | undefined) => string) => {
  return z
    .object({
      email: z.email(t?.('emailInvalid')).nonempty(t?.('required')),
      username: z.string().nonempty(t?.('required')),
      password: z.string().nonempty(t?.('required')),
      fullName: z.string().nonempty(t?.('required')),
      dateOfBirth: z
        .string()
        .nonempty(t?.('dateOfBirthRequired'))
        .refine((val) => !isNaN(Date.parse(val)), { message: t?.('dateOfBirthInvalid') }),
      phoneNumber: z.string().nonempty(t?.('required')),
      confirmPassword: z.string().nonempty(t?.('required'))
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      error: t?.('passwordsDoNotMatch')
    })
}
