// useNaipImagery.ts
import { mapboxToken, user_name } from "../config"
import { BoundingBoxResponse } from "./supabaseTypes"
import { useState } from "react"

export const useNaipImagery = (style_id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNaipImage = async (box: BoundingBoxResponse): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      // Construct the bounding box string
      const bbox = `${box.min_lon},${box.min_lat},${box.max_lon},${box.max_lat}`

      console.log(bbox)

      const timestamp = Date.now()
      const url = `https://api.mapbox.com/styles/v1/${user_name}/${style_id}/static/[${bbox}]/256x256?access_token=${mapboxToken}&attribution=true&cache=${timestamp}`

      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.log("We are in placeholder not good")
      return "https://via.placeholder.com/256" // Fallback to placeholder if there's an error
    } finally {
      setIsLoading(false)
    }
  }

  return { fetchNaipImage, isLoading, error }
}
