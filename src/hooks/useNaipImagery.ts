// useNaipImagery.ts
// import { mapboxToken, user_name } from "../config"
import { BoundingBoxResponse } from "./supabaseTypes"
import { useState } from "react"

export const useNaipImagery = (_style_id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNaipImage = async (box: BoundingBoxResponse): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      // Construct the bounding box string
      const bbox = `${box.min_lon},${box.min_lat},${box.max_lon},${box.max_lat}`

      const url = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/[${bbox}]/256x256?access_token=pk.eyJ1Ijoic3p5bW9uem15c2xvbnkiLCJhIjoiY2x5eDYxb2JqMWxkaTJrczZjZ3Nhd2hrZSJ9.jpzoW1-5ILOP-hIWtXBPxA`

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
