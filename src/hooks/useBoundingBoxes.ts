// useBoundingBoxes.ts
import { useAppState } from "./AppContext"
import { useSupabase } from "./useSupabase"

export const useBoundingBoxes = () => {
  const { state, dispatch } = useAppState()
  const { fetchBoundingBoxes, fetchClipBoxes, findSimilarClip } = useSupabase()

  const handleFetchBoundingBoxes = async (latitude: number, longitude: number) => {
    const bboxes = await fetchBoundingBoxes(state.config.table_name, latitude, longitude)
    if (state.mode.type != "image") {
      throw Error("We should be in image mode")
    }
    if (bboxes.length > 0) {
      const newIds = bboxes.map((item) => item.id)
      const filteredBoxes = state.mode.targetBoundingBoxes.filter((item) => !newIds.includes(item.id))
      const mergedBoxes = [...bboxes, ...filteredBoxes]
      dispatch({ type: "SET_TARGET_BOXES", payload: mergedBoxes })
    }
  }

  const handleTextSearch = async (query: string) => {
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
      const negativeBoxes = state.negativeBoxes
      const negativeIDs = negativeBoxes.map((item) => item.id)

      const result = await fetchClipBoxes(state.config.table_name, flat, state.sliderValue, negativeIDs)
      dispatch({ type: "SET_RESULT_BOXES", payload: result })

      // Process the response data here
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const handleFindSimilar = async () => {
    const mode = state.mode
    const mode_type = mode.type
    dispatch({ type: "SET_LOADING", payload: true })

    if (mode_type == "text") {
      const query = mode.query.trim()
      if (query.length < 3) {
        dispatch({ type: "SET_LOADING", payload: false })
        dispatch({ type: "SET_RESULT_BOXES", payload: [] })
        return
      }
      handleTextSearch(mode.query)
    } else {
      try {
        const negativeIDs = state.negativeBoxes.map((item) => item.id)
        const targetIds = mode.targetBoundingBoxes.map((item) => item.id)
        const similarBoxes = await findSimilarClip(state.config.table_name, targetIds, state.sliderValue, negativeIDs)

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
