import { BoundingBoxResponse, useSupabase } from "./useSupabase"
import { useState } from "react"

export const useMapInteractions = () => {
  const [isPinning, setIsPinning] = useState(false)
  const [pinnedPoints, setPinnedPoints] = useState<[number, number][]>([])
  const [targetBoundingBoxes, setTargetBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [resultBoundingBoxes, setResultBoundingBoxes] = useState<BoundingBoxResponse[]>([])
  const [sliderValue, setSliderValue] = useState(9)

  const { fetchBoundingBoxes, findSimilarTiles } = useSupabase()

  const handlePinPoint = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log("Clicked element:", event.target)
    event.stopPropagation()
    event.preventDefault()

    console.log("Clicking point", event)
    setIsPinning(!isPinning)
  }

  const handleMapClick = async (info: any, event: any) => {
    console.log("clicking map", info, event)
    if (isPinning && info.coordinate) {
      const [longitude, latitude] = info.coordinate
      if (!pinnedPoints) {
        // If pinnedPoint is empty, initialize it with the first coordinate
        setPinnedPoints([[longitude, latitude]])
      } else {
        // If pinnedPoint already exists, add the new coordinate to the array
        setPinnedPoints([...pinnedPoints, [longitude, latitude]])
      }
      setIsPinning(false)
      console.log("longitude", longitude, "latitude", latitude)
      const bboxes = await fetchBoundingBoxes(latitude, longitude)
      if (bboxes.length > 0) {
        const newIds = bboxes.map((item) => item.id)
        const filteredBoxes = targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
        const mergedBoxes = [...bboxes, ...filteredBoxes]

        setTargetBoundingBoxes(mergedBoxes)
      }
    }
  }

  const handleFindSimilar = async () => {
    console.log("We hit thhe handleFindSimilar", targetBoundingBoxes)

    if (targetBoundingBoxes) {
      const targetIds = targetBoundingBoxes.map((item) => item.id)
      console.log("targetIds", targetBoundingBoxes)

      const similarBoxes = await findSimilarTiles(targetIds, sliderValue)
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
    setIsPinning(false)
    setTargetBoundingBoxes([])
    // Implement clean search functionality
    console.log("Clean search")
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
