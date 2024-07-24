// useNaipImagery.ts
import { BoundingBoxResponse } from "./useSupabase"
import { useCallback, useState } from "react"

export const useNaipImagery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNaipImage = useCallback(async (box: BoundingBoxResponse): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      // Calculate center of the bounding box
      const lat = (box.max_lat + box.min_lat) / 2
      const lon = (box.min_lon + box.max_lon) / 2

      // Convert lat/lon to tile coordinates
      const z = 16 // Max zoom level for NAIP tiles
      const x = Math.floor(((lon + 180) / 360) * Math.pow(2, z))
      const y = Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
          Math.pow(2, z),
      )

      const url = `https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/${z}/${y}/${x}`

      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      return "https://via.placeholder.com/300" // Fallback to placeholder if there's an error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { fetchNaipImage, isLoading, error }
}
