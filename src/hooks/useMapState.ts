import { cali_config } from "../config"
import { MapCameraProps } from "@vis.gl/react-google-maps"
import { useState } from "react"

export const useMapState = () => {
  const INITIAL_VIEW_STATE: MapCameraProps = {
    center: { lat: cali_config.initial_lat, lng: cali_config.initial_lon },
    zoom: 10,
  }

  const [viewState, setViewState] = useState<MapCameraProps>(INITIAL_VIEW_STATE)
  const [popupInfo, setPopupInfo] = useState<{ longitude: number; latitude: number } | null>(null)

  return {
    viewState,
    setViewState,
    popupInfo,
    setPopupInfo,
  }
}
