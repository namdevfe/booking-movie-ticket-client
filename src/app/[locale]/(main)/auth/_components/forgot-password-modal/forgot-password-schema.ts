import en from '@/i18n/messages/en.json'
import { TranslationValues } from 'next-intl'
import z from 'zod'

export type IntlMessages = typeof en
type Messages = keyof IntlMessages['validation']

export const getForgotPasswordSchema = (t?: (key: Messages, object?: TranslationValues | undefined) => string) => {
  return z.object({
    email: z.email(t?.('emailInvalid')).trim().nonempty(t?.('required'))
  })
}
