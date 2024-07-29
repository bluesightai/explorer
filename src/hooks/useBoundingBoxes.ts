// useBoundingBoxes.ts
import { useAppState } from "./AppContext"
import { useSupabase } from "./useSupabase"

export const useBoundingBoxes = () => {
  const { state, dispatch } = useAppState()
  const { fetchBoundingBoxes, findSimilarTiles, findSimilarIndex } = useSupabase()

  const handleFetchBoundingBoxes = async (latitude: number, longitude: number) => {
    const bboxes = await fetchBoundingBoxes(latitude, longitude)
    if (bboxes.length > 0) {
      const newIds = bboxes.map((item) => item.id)
      const filteredBoxes = state.targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
      const mergedBoxes = [...bboxes, ...filteredBoxes]
      dispatch({ type: "SET_TARGET_BOXES", payload: mergedBoxes })
    }
  }

  const handleFindSimilar = async () => {
    if (state.targetBoundingBoxes.length > 0) {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const targetIds = state.targetBoundingBoxes.map((item) => item.id)
        const similarBoxes =
          state.areaId === 5
            ? await findSimilarTiles(targetIds, state.sliderValue)
            : await findSimilarIndex(targetIds, state.sliderValue, state.areaId, state.negativeIDs)
        dispatch({ type: "SET_RESULT_BOXES", payload: similarBoxes })
      } catch (error) {
        console.error("Error finding similar tiles:", error)
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }
  }

  return {
    handleFetchBoundingBoxes,
    handleFindSimilar,
  }
}
