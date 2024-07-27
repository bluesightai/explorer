import { BoundingBoxResponse } from "./supabaseTypes"
import { useSupabase } from "./useSupabase"
import { useState } from "react"

export const useMapInteractions = () => {
  const [isPinning, setIsPinning] = useState(false)
  const [pinnedPoints, setPinnedPoints] = useState<[number, number][]>([])
  const [targetBoundingBoxes, setTargetBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [resultBoundingBoxes, setResultBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [sliderValue, setSliderValue] = useState(9)

  const { fetchBoundingBoxes, findSimilarTiles } = useSupabase()

  const handlePinPoint = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    event.preventDefault()

    setIsPinning(!isPinning)
  }

  const handleMapClick = async (info: any, _: any) => {
    if (isPinning && info.coordinate) {
      const [longitude, latitude] = info.coordinate
      if (!pinnedPoints) {
        // If pinnedPoint is empty, initialize it with the first coordinate
        setPinnedPoints([[longitude, latitude]])
      } else {
        // If pinnedPoint already exists, add the new coordinate to the array
        setPinnedPoints([...pinnedPoints, [longitude, latitude]])
      }
      const bboxes = await fetchBoundingBoxes(latitude, longitude)
      if (bboxes.length > 0) {
        const newIds = bboxes.map((item) => item.id)
        const filteredBoxes = targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
        const mergedBoxes = [...bboxes, ...filteredBoxes]

        setTargetBoundingBoxes(mergedBoxes)
      }
    }
  }

  const handleFindSimilar = async (current_boxes: BoundingBoxResponse[]) => {
    if (targetBoundingBoxes) {
      const targetIds = current_boxes.map((item) => item.id)
      console.log("targetIds", targetIds, sliderValue)

      const similarBoxes = await findSimilarTiles(targetIds, sliderValue)
      console.log("similarBoxes", similarBoxes)
      setResultBoundingBoxes(similarBoxes)
    } else {
      throw Error("No target box set")
    }
  }

  const handleShareFindings = () => {
    // Implement share findings functionality
    console.log("Share findings")
  }

  const handleCleanSearch = () => {
    setPinnedPoints([])
    setIsPinning(true)
    setTargetBoundingBoxes([])
    setResultBoundingBoxes([])
  }

  return {
    isPinning,
    pinnedPoints,
    targetBoundingBoxes,
    resultBoundingBoxes,
    handlePinPoint,
    handleMapClick,
    handleFindSimilar,
    handleShareFindings,
    handleCleanSearch,
    setTargetBoundingBoxes,
    setResultBoundingBoxes,
    sliderValue,
    setSliderValue,
  }
}
