import { BoundingBoxResponse } from "./supabaseTypes"
import { useSupabase } from "./useSupabase"
import { useCallback, useState } from "react"

export const useBoundingBoxes = () => {
  const [targetBoundingBoxes, setTargetBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [resultBoundingBoxes, setResultBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sliderValue, setSliderValue] = useState(9)

  const { fetchBoundingBoxes } = useSupabase()

  const handleFetchBoundingBoxes = async (latitude: number, longitude: number) => {
    const bboxes = await fetchBoundingBoxes(latitude, longitude)
    if (bboxes.length > 0) {
      const newIds = bboxes.map((item) => item.id)
      const filteredBoxes = targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
      const mergedBoxes = [...bboxes, ...filteredBoxes]
      setTargetBoundingBoxes(mergedBoxes)
    }
  }

  const handleCleanSearch = () => {
    setTargetBoundingBoxes([])
    setResultBoundingBoxes([])
  }

  return {
    targetBoundingBoxes,
    resultBoundingBoxes,
    isLoading,
    sliderValue,
    setSliderValue,
    handleFetchBoundingBoxes,
    handleCleanSearch,
    setIsLoading,
    setResultBoundingBoxes,
  }
}
