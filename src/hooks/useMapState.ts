import { cali_config } from "../config"
import { MapViewState } from "@deck.gl/core"
import { useState } from "react"

export const useMapState = () => {
  const INITIAL_VIEW_STATE: MapViewState = {
    latitude: cali_config.initial_lat,
    longitude: cali_config.initial_lon,
    zoom: 10,
    maxZoom: 16,
    maxPitch: 85,
    bearing: 0,
  }

  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
  const [popupInfo, setPopupInfo] = useState<{ longitude: number; latitude: number } | null>(null)

  return {
    viewState,
    setViewState,
    popupInfo,
    setPopupInfo,
  }
}
