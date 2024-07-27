import { BoundingBoxResponse } from "./supabaseTypes"
import { useSupabase } from "./useSupabase"
import { useCallback, useState } from "react"

export const useBoundingBoxes = () => {
  const [targetBoundingBoxes, setTargetBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [resultBoundingBoxes, setResultBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sliderValue, setSliderValue] = useState(9)

  const { fetchBoundingBoxes, findSimilarTiles } = useSupabase()

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

  const handleFindSimilar = useCallback(async () => {
    if (targetBoundingBoxes.length > 0) {
      setIsLoading(true)
      try {
        const targetIds = targetBoundingBoxes.map((item) => item.id)
        const similarBoxes = await findSimilarTiles(targetIds, sliderValue)
        setResultBoundingBoxes(similarBoxes)
      } catch (error) {
        console.error("Error finding similar tiles:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      console.error("No target box set")
    }
  }, [targetBoundingBoxes, sliderValue])

  return {
    targetBoundingBoxes,
    handleFindSimilar,
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
