// usePinning.ts
import { useState } from "react"

export const usePinning = () => {
  const [isPinning, setIsPinning] = useState(false)
  const [pinnedPoints, setPinnedPoints] = useState<[number, number][]>([])

  const handlePinPoint = () => {
    setIsPinning(!isPinning)
  }
  const setPinPointNegative = () => {
    setIsPinning(false)
  }

  return {
    isPinning,
    pinnedPoints,
    setPinnedPoints,
    handlePinPoint,
    setPinPointNegative,
  }
}
