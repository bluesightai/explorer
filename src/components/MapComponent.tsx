// src/components/MapComponent.tsx
import { useCallback, useEffect } from "react"
import { Map, Popup, ViewStateChangeEvent, useControl } from "react-map-gl"
import { DeckProps } from "@deck.gl/core"
import { MapboxOverlay } from "@deck.gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"

import { mapboxToken, style_url } from "../hooks/useNaipImagery"
import { useMapState } from "../hooks/useMapState"
import { usePinning } from "../hooks/usePinning"
import { useBoundingBoxes } from "../hooks/useBoundingBoxes"
import ControlWidget from "./control/ControlWidget"
import SceneCard from "./scenecard/SceneCard"
import { calculateCenterAndZoom, isPointInCalifornia } from "../utils/mapUtils"
import { createMapLayers } from "./layers/layers"

function DeckGLOverlay(props: DeckProps) {
  // @ts-ignore
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapComponent() {
  const { viewState, setViewState, popupInfo, setPopupInfo } = useMapState()
  const { isPinning, pinnedPoints, setPinnedPoints, handlePinPoint } = usePinning()
  const {
    targetBoundingBoxes,
    resultBoundingBoxes,
    isLoading,
    sliderValue,
    setSliderValue,
    handleFetchBoundingBoxes,
    handleCleanSearch,
    handleFindSimilar,
  } = useBoundingBoxes()

  const handleClick = useCallback((info: any) => {
    if (!info.coordinate) return

    const [longitude, latitude] = info.coordinate
    if (isPointInCalifornia(longitude, latitude)) {
      if (isPinning) {
        setPinnedPoints([...pinnedPoints, [longitude, latitude]])
        handleFetchBoundingBoxes(latitude, longitude)
      }
    } else {
      setPopupInfo({ longitude, latitude })
    }
  }, [isPinning, pinnedPoints, setPinnedPoints, handleFetchBoundingBoxes, setPopupInfo])

  const handleTileClick = useCallback((bbox: [number, number, number, number]) => {
    setViewState((prevState) => ({
      ...prevState,
      ...calculateCenterAndZoom(bbox),
    }))
  }, [setViewState])

  useEffect(() => {
    if (targetBoundingBoxes.length === 0) {
      setPopupInfo(null)
    }
  }, [targetBoundingBoxes, setPopupInfo])

  const layers = createMapLayers(targetBoundingBoxes, resultBoundingBoxes)

  const handleSearchAndCancelPin = () => {
    handleFindSimilar()
    handlePinPoint()

  }

  return (
    <Map
      {...viewState}
      mapStyle={style_url}
      mapboxAccessToken={mapboxToken}
      interactive={true}
      attributionControl={false}
      onMove={(e: ViewStateChangeEvent) => setViewState(e.viewState)}
    >
      <DeckGLOverlay
        layers={layers}
        controller={true}
        getCursor={({ isDragging }) => (isDragging ? "grabbing" : "pointer")}
        onClick={handleClick}
      />

      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          Clicking outside California is not allowed.
        </Popup>
      )}

      <ControlWidget isPinning={isPinning} handlePinPoint={handlePinPoint} />

      <SceneCard
        isLoading={isLoading}
        handleCleanSearch={handleCleanSearch}
        handleFindSimilar={handleSearchAndCancelPin}
        onTileClick={handleTileClick}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        targetBoundingBoxes={targetBoundingBoxes}
        resultBoundingBoxes={resultBoundingBoxes}
      />
    </Map>
  )
}