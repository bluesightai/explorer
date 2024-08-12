// useBoundingBoxes.ts
import { useAppState } from "./AppContext"
import { useSupabase } from "./useSupabase"

export const useBoundingBoxes = () => {
  const { state, dispatch } = useAppState()
  const { fetchBoundingBoxes, findSimilarTiles, findSimilarIndex, fetchClipBoxes } = useSupabase()

  const handleFetchBoundingBoxes = async (latitude: number, longitude: number) => {
    const bboxes = await fetchBoundingBoxes(latitude, longitude)
    if (bboxes.length > 0) {
      const newIds = bboxes.map((item) => item.id)
      const filteredBoxes = state.targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
      const mergedBoxes = [...bboxes, ...filteredBoxes]
      dispatch({ type: "SET_TARGET_BOXES", payload: mergedBoxes })
    }
  }

  const handleTextSearch = async () => {
    const query = state.query

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([query]), // Properly format the query as an array of strings
    }

    try {
      const response = await fetch("https://api.bluesight.ai/embeddings/text", options)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const { embeddings } = data
      const flat = embeddings.flat()
      const result = await fetchClipBoxes(flat, 500)
      dispatch({ type: "SET_RESULT_BOXES", payload: result })

      // Process the response data here
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    }
  }

  const handleFindSimilar = async () => {
    if (state.targetBoundingBoxes.length > 0) {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const targetIds = state.targetBoundingBoxes.map((item) => item.id)
        const similarBoxes =
          state.areaId === 5
            ? await findSimilarTiles(targetIds, state.sliderValue, state.negativeIDs)
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
    handleTextSearch,
    handleFetchBoundingBoxes,
    handleFindSimilar,
  }
}
