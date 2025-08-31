'use client'

import { useEffect, useState } from 'react'

interface CountDownProps {
  value: number
  onComplete?: () => void
}

// Format as mm:ss
const formatTime = (secs: number) => {
  const minutes = Math.floor(secs / 60)
  const sec = secs % 60
  return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const CountDown = ({ value = 0, onComplete }: CountDownProps) => {
  const [count, setCount] = useState(value)

  useEffect(() => {
    if (count === 0) {
      onComplete?.()
      return
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [count, onComplete])

  return <div>{formatTime(count)}</div>
}

export default CountDown
