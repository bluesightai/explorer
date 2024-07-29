// src/hooks/useSearchArea.ts
import { useSupabase } from "./useSupabase"
import { useEffect, useState } from "react"

export type SearchAreaGeometry = {
  type: "Feature"
  geometry: GeoJSON.Geometry
  properties: {
    id: number
    name: string | null
  }
}

export const useSearchArea = (areaId: number) => {
  const { supabase } = useSupabase()
  const [searchAreaGeometry, setSearchAreaGeometry] = useState<SearchAreaGeometry | null>(null)

  useEffect(() => {
    const fetchSearchArea = async () => {
      const { data, error } = await supabase.rpc("get_search_area_geojson", { area_id: areaId })

      if (error) {
        console.error("Error fetching search area:", error)
        return
      }

      if (data) {
        //   @ts-ignore
        setSearchAreaGeometry(data as SearchAreaGeometry)
      }
    }

    fetchSearchArea()
  }, [areaId])

  return searchAreaGeometry
}
