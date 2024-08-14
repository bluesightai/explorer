import { MapViewState } from "@deck.gl/core"
import { useState } from "react"

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 37.53126258079075,
  longitude: -122.0620083919965,
  zoom: 10,
  maxZoom: 16,
  maxPitch: 85,
  bearing: 0,
}

export const useMapState = () => {
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [popupInfo, setPopupInfo] = useState<{ longitude: number; latitude: number } | null>(null)

  return {
    viewState,
    setViewState,
    popupInfo,
    setPopupInfo,
  }
}
