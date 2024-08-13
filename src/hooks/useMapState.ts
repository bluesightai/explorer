import { MapViewState } from "@deck.gl/core"
import { useState } from "react"

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 37.759639,
  longitude: -122.427393,
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
