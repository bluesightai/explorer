import { useAppState } from "../hooks/AppContext"
import { useBoundingBoxes } from "../hooks/useBoundingBoxes"
import { useMapState } from "../hooks/useMapState"
import { usePinning } from "../hooks/usePinning"
import { calculateCenterAndZoom, isPointInCalifornia } from "../utils/mapUtils"
import ClusteringCard from "./clusteringcard/ClusteringCard"
import { Config, get_style_url, mapboxToken } from "../config"
import ControlWidget from "./control/ControlWidget"
import SearchBox from "./input/SearchBox"
import { createMapLayers } from "./layers/layers"
import SceneCard from "./scenecard/SceneCard"
import { DeckProps } from "@deck.gl/core"
import { MapboxOverlay } from "@deck.gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { useCallback, useState } from "react"
import { Map, Popup, ViewStateChangeEvent, useControl } from "react-map-gl"

function selectByIndices<T extends { id: number }>(list: T[], indices: number[]): T[] {
  return list.filter((item) => indices.includes(item.id))
}



function DeckGLOverlay(props: DeckProps) {
  // @ts-ignore
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapComponent() {
  const { isPinning, pinnedPoints, setPinnedPoints, handlePinPoint } = usePinning()
  const [isDragging, setDragging] = useState(false)
  const { state, dispatch } = useAppState()

  const { viewState, setViewState, popupInfo, setPopupInfo } = useMapState()


  const { handleFetchBoundingBoxes, handleFindSimilar } = useBoundingBoxes()

  const handleClick = useCallback(
    (info: any) => {
      if (!info.coordinate) return

      const [longitude, latitude] = info.coordinate
      if (isPointInCalifornia(bounding_box, longitude, latitude)) {
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
  const bounding_box = state.config.polygon

  const layers =
    state.mode.type == "image"
      ? createMapLayers(
        state.visibleBoundingBoxes
          ? selectByIndices(state.mode.targetBoundingBoxes, state.visibleBoundingBoxes)
          : state.mode.targetBoundingBoxes,
        state.visibleBoundingBoxes
          ? selectByIndices(state.resultBoundingBoxes, state.visibleBoundingBoxes)
          : state.resultBoundingBoxes,
        viewState.zoom,
      )
      : createMapLayers(
        [],
        state.visibleBoundingBoxes
          ? selectByIndices(state.resultBoundingBoxes, state.visibleBoundingBoxes)
          : state.resultBoundingBoxes,
        viewState.zoom,
      )

  const handleSearchAndCancelPin = useCallback(() => {
    handleFindSimilar()
    handlePinPoint()
  }, [handleFindSimilar, handlePinPoint])

  const handleCleanSearch = () => {
    handlePinPoint()
    dispatch({ type: "SET_TEXT", payload: "" })
    dispatch({ type: "SET_RESULT_BOXES", payload: [] })
  }
  const handleSetViewState = useCallback((config: Config) => {
    setViewState(prevState => ({
      ...prevState,
      latitude: config.initial_lat,
      longitude: config.initial_lon,
    }));
    dispatch({ type: "SET_TEXT", payload: "" })
    dispatch({ type: "SET_RESULT_BOXES", payload: [] })
  }, [setViewState, handleCleanSearch]);
  return (
    <Map
      logoPosition={"bottom-right"}
      {...viewState}
      mapStyle={get_style_url(state.config.style_id)}
      mapboxAccessToken={mapboxToken}
      interactive={true}
      attributionControl={false}
      cursor={isDragging ? "grabbing" : isPinning ? "crosshair" : "pointer"}
      onMove={(e: ViewStateChangeEvent) => setViewState(e.viewState)}
    >
      <DeckGLOverlay
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        layers={layers}
        onClick={handleClick}
      />

      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          Clicking outside Bay Area is not allowed.
        </Popup>
      )}

      <ControlWidget setViewState={handleSetViewState} />


      <SceneCard
        onTileClick={handleTileClick}
        handleFindSimilar={handleSearchAndCancelPin}
        handleCleanSearch={handleCleanSearch}
      />

      <ClusteringCard
        onTileClick={handleTileClick}
        handleCleanSearch={handleCleanSearch}
        handleFindSimilar={handleSearchAndCancelPin}
      />

      <SearchBox isPinning={isPinning} handlePinPoint={handlePinPoint} />
    </Map>
  )
}
