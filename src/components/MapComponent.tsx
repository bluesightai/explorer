
import { useAppState } from "../hooks/AppContext"
import { useBoundingBoxes } from "../hooks/useBoundingBoxes"
import { useMapState } from "../hooks/useMapState"
import { mapboxToken, style_url } from "../hooks/useNaipImagery"
import { usePinning } from "../hooks/usePinning"
import { calculateCenterAndZoom, isPointInCalifornia } from "../utils/mapUtils"
import SceneCard from "./scenecard/SceneCard"
import { DeckProps } from "@deck.gl/core"
import { MapboxOverlay } from "@deck.gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useCallback } from "react"
import { Map, Popup, ViewStateChangeEvent, useControl } from "react-map-gl"
import SearchBox from "./input/SearchBox"
import { createMapLayers } from "./layers/layers"
import ControlWidget from "./control/ControlWidget"

function DeckGLOverlay(props: DeckProps) {
  // @ts-ignore
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapComponent() {
  const { viewState, setViewState, popupInfo, setPopupInfo } = useMapState()
  const { isPinning, pinnedPoints, setPinnedPoints, handlePinPoint } = usePinning()
  const { state, dispatch } = useAppState()
  const { handleFetchBoundingBoxes, handleFindSimilar } = useBoundingBoxes()

  const handleClick = useCallback(
    (info: any) => {
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
    },
    [isPinning, pinnedPoints, setPinnedPoints, handleFetchBoundingBoxes, setPopupInfo],
  )

  const handleTileClick = useCallback(
    (bbox: [number, number, number, number]) => {
      setViewState((prevState) => ({
        ...prevState,
        ...calculateCenterAndZoom(bbox),
      }))
    },
    [setViewState],
  )

  // const searchAreaGeometry = useSearchArea(state.areaId)

  const layers = state.mode.type == 'image' ? createMapLayers(state.mode.targetBoundingBoxes, state.resultBoundingBoxes, viewState.zoom) : createMapLayers([], state.resultBoundingBoxes, viewState.zoom)

  const handleSearchAndCancelPin = useCallback(() => {
    handleFindSimilar()
    handlePinPoint()
  }, [handleFindSimilar, handlePinPoint])

  const handleCleanSearch = useCallback(() => {
    dispatch({ type: "SET_TEXT", payload: '' })
    dispatch({ type: "SET_RESULT_BOXES", payload: [] })
  }, [dispatch])

  return (
    <Map
      logoPosition={"bottom-right"}
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

      <ControlWidget />

      <SceneCard
        onTileClick={handleTileClick}
        handleFindSimilar={handleSearchAndCancelPin}
        handleCleanSearch={handleCleanSearch}
      />


      <SearchBox isPinning={isPinning} handlePinPoint={handlePinPoint} />
    </Map>
  )
}
