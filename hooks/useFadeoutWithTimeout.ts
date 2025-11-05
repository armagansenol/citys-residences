import { useEffect, useState } from 'react'

/**
 * Custom hook that manages a fadeout state with automatic timeout reset.
 * When triggered, sets the state to true, then automatically resets to false after the specified duration.
 *
 * @param timeout - Duration in milliseconds before automatically resetting to false (default: 3000)
 * @returns A tuple containing [isVisible, trigger] where:
 *   - isVisible: boolean state indicating if the fadeout should be visible
 *   - trigger: function to trigger the fadeout
 */
export function useFadeoutWithTimeout(timeout: number = 3000) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [isVisible, timeout])

  const trigger = () => {
    setIsVisible(true)
  }

  return [isVisible, trigger] as const
}
