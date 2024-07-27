// usePinning.ts
import { useState } from "react"

export const usePinning = () => {
  const [isPinning, setIsPinning] = useState(false)
  const [pinnedPoints, setPinnedPoints] = useState<[number, number][]>([])

  const handlePinPoint = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    event.preventDefault()
    setIsPinning(!isPinning)
  }

  return {
    isPinning,
    pinnedPoints,
    setPinnedPoints,
    handlePinPoint,
  }
}
