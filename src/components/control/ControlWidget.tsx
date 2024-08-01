import { useAppState } from "../../hooks/AppContext"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { useSupabase } from "../../hooks/useSupabase"
import { Tables } from "../../supabase_types"
import "./ControlWidget.scss"
import { useEffect, useState } from "react"

type SavedSearches = Tables<"saved_searches">
const ControlWidget = ({ isPinning, handlePinPoint }: { isPinning: boolean; handlePinPoint: (arg0: any) => void }) => {
  const { supabase } = useSupabase()
  const { dispatch } = useAppState()
  const [savedSearches, setSavedSearches] = useState<SavedSearches[]>([])

  useEffect(() => {
    const fetchSavedSearches = async () => {
      const data = await getSaved()
      setSavedSearches(data)
    }
    fetchSavedSearches()
  }, [])

  const getSaved = async () => {
    const { data } = await supabase.from("saved_searches").select("*")
    return data || []
  }

  const handleSavedSearchClick = async (item: SavedSearches) => {
    // Call the database function
    const { data, error } = await supabase.rpc("get_complete_saved_search_data", {
      p_saved_search_id: item.id,
    })

    if (error) {
      console.error("Error fetching saved search data:", error)
      return
    }

    if (data && data.length > 0) {
      const { search_area_id, top_k, negative_ids } = data[0]
      const targetBoundingBoxes: BoundingBoxResponse[] = []
      const resultBoundingBoxes: BoundingBoxResponse[] = []
      console.log("Data is", data)

      data.forEach((box: any) => {
        const boundingBox: BoundingBoxResponse = {
          id: box.box_id,
          min_lat: box.min_lat,
          min_lon: box.min_lon,
          max_lat: box.max_lat,
          max_lon: box.max_lon,
        }

        if (box.is_target) {
          targetBoundingBoxes.push(boundingBox)
        } else {
          resultBoundingBoxes.push(boundingBox)
        }
      })

      dispatch({
        type: "RESTORE_SEARCH",
        payload: {
          negativeIDs: negative_ids,
          targetBoundingBoxes,
          resultBoundingBoxes,
          areaId: search_area_id,
          sliderValue: top_k,
        },
      })

      setTimeout(() => {
        dispatch({ type: "FINISH_RESTORE_SEARCH" })
      }, 1500)
    } else {
      console.error("No data returned for the saved search")
    }
  }

  return (
    <div className="control-widget">
      <button onClick={handlePinPoint} className={`control-button ${isPinning ? "active" : ""}`}>
        <img
          src="src/assets/icons/pin.svg"
          alt="pin icon"
          className={`control-button-icon ${isPinning ? "active" : ""}`}
        />
        {isPinning ? "Cancel Pin" : "Pin a Point"}
      </button>

      <div className="saved-searches">
        <span className="saved-searches-title">Example search:</span>
        <div className="saved-searches-buttons">
          {savedSearches.map((item, index) => (
            <button key={index} className="saved-searches-btn" onClick={() => handleSavedSearchClick(item)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ControlWidget
