// useNaipImagery.ts
import { BoundingBoxResponse } from "./useSupabase"
import { useCallback, useState } from "react"

export const mapboxToken = 'pk.eyJ1Ijoic3p5bW9uem15c2xvbnkiLCJhIjoiY2x5eDYxb2JqMWxkaTJrczZjZ3Nhd2hrZSJ9.jpzoW1-5ILOP-hIWtXBPxA'

const style_id = 'clz17ert500in01pf3em1aeor'
const user_name = 'szymonzmyslony'

export const style_url = `mapbox://styles/${user_name}/${style_id}`




export const useNaipImagery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  

  const fetchNaipImage = useCallback(async (box: BoundingBoxResponse): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      // Construct the bounding box string
      const bbox = `${box.min_lon},${box.min_lat},${box.max_lon},${box.max_lat}`


      const url = `https://api.mapbox.com/styles/v1/${user_name}/${style_id}/static/[${bbox}]/256x256?access_token=${mapboxToken}`

      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      return "https://via.placeholder.com/256" // Fallback to placeholder if there's an error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { fetchNaipImage, isLoading, error }
}