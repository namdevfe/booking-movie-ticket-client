import en from '@/i18n/messages/en.json'
import { TranslationValues } from 'next-intl'
import z from 'zod'

export type IntlMessages = typeof en
type Messages = keyof IntlMessages['validation']

export const getLoginSchema = (t?: (key: Messages, object?: TranslationValues | undefined) => string) => {
  return z.object({
    emailOrUsername: z
      .string()
      .trim()
      .nonempty(t?.('required'))
      .refine(
        (val) => {
          const isEmailValid = z.email().safeParse(val).success
          const isUsernameValid = z.string().safeParse(val).success
          return isEmailValid || isUsernameValid
        },
        {
          path: ['emailOrUsername'],
          error: t?.('emailOrUsernameInvalid')
        }
      ),
    password: z.string().nonempty(t?.('required'))
  })
}
