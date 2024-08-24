import { BoundingBoxResponse } from "./supabaseTypes"
import { useSupabase } from "./useSupabase"
import { useState } from "react"

export const useSupabaseImagery = (tableName: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSupabaseImage = async (box: BoundingBoxResponse): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const imageUrl = await useSupabase().loadImageFromSupabase(tableName, box)
      return imageUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching image from Supabase:", err)
      return "https://via.placeholder.com/256" // Fallback to placeholder if there's an error
    } finally {
      setIsLoading(false)
    }
  }

  return { fetchSupabaseImage, isLoading, error }
}
