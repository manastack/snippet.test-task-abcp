import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
      return
    }

    const timerId = setTimeout(() => {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }, interval)

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerId)
  }, [value, interval])

  return throttledValue
}
