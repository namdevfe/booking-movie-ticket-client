'use client'

import Button from '@/components/common/button'
import CountDown from '@/components/common/count-down'
import Input from '@/components/common/input'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
const Modal = dynamic(() => import('@/components/common/modal'), { ssr: false })

interface OtpModalProps {
  length?: number
  isOpen?: boolean
  onSubmit?: (otp: string) => void
  onResend?: () => void
  onClose?: () => void
}

const FIVE_MINUTES = 300

const OtpModal = ({ isOpen = false, length = 6, onSubmit, onResend, onClose }: OtpModalProps) => {
  const tOtpModal = useTranslations('AuthPage.otpModal')
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const [isCompleted, setIsCompleted] = useState<boolean>(true)
  const isDisabledVerifyOtpButton = otp.some((value) => !value)

  const handleCloseOTPModal = () => {
    setIsCompleted(true)
    setOtp(new Array(length).fill(''))
    onClose?.()
  }

  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move to next input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleOtpClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(0, 1)

    // Focus on previous input if current input is set to empty value of input
    if (!otp[index - 1] && index > 0) {
      inputRefs.current[otp.indexOf('')].focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').trim()

    // Allow only number
    if (!/^\d+$/.test(pasteData)) return

    // Allow only length digits
    const digits = pasteData.split('').slice(0, length)

    const newOtp = [...otp]

    // Bind data to otp input
    digits.forEach((digit, i) => {
      newOtp[i] = digit
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit
      }
    })

    setOtp(newOtp)

    // Focus on next input
    const nextIndex = digits.length < length ? digits.length : length - 1
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus()
    }
  }

  const handleOtpSubmit = () => {
    if (otp.length !== length) return
    onSubmit?.(otp.join(''))
    setIsCompleted(true)
    setOtp(new Array(length).fill(''))
  }

  // Focus on first input
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [isOpen])

  return (
    <Modal innerClassName='min-w-[480px] px-[26px] py-[48px]' isOpen={isOpen} onClose={handleCloseOTPModal}>
      <div className='text-black'>
        {/* OTP */}
        <div className='flex flex-col justify-center items-center'>
          <p className='text-[2.4rem]'>{tOtpModal('title')}</p>
          <small className='text-base'>{tOtpModal('description')}</small>
        </div>

        {/* OTP Input */}
        <div className='mt-[24px] w-full h-[40px] flex items-center justify-between gap-[20px]'>
          {otp.map((value, index) => (
            <Input
              rootClassName='!mt-0'
              className='w-[40px] h-full px-0 text-center'
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el
              }}
              value={value}
              onChange={(e) => handleOtpChange(index, e)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onClick={() => handleOtpClick(index)}
              onPaste={handleOtpPaste}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button className='mt-[24px] !w-full' disabled={isDisabledVerifyOtpButton} onClick={handleOtpSubmit}>
          {tOtpModal('verifyButton')}
        </Button>

        <div className='mt-[24px] flex items-center justify-center gap-[8px]'>
          {!isCompleted ? (
            <>
              <p>{tOtpModal('didNotGetTheCode')}</p>
              <Button
                variant='link'
                size='lg'
                onClick={() => {
                  setIsCompleted(true)
                  onResend?.()
                }}
              >
                {tOtpModal('resendButton')}
              </Button>
            </>
          ) : (
            <>
              <p>{tOtpModal('otpValidity')}</p>
              {isOpen && <CountDown value={FIVE_MINUTES} onComplete={() => setIsCompleted(false)} />}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default OtpModal
