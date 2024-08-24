import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID, mapOptions } from "../../config"
import { useAppState } from "../../hooks/AppContext"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useMapState } from "../../hooks/useMapState"
import { usePinning } from "../../hooks/usePinning"
import { calculateCenterAndZoom, isPointInCalifornia, selectByIndices } from "../../utils/mapUtils"
import ClusteringCard from "../clusteringcard/ClusteringCard"
import ControlWidget from "../control/ControlWidget"
import SearchBox from "../input/SearchBox"
import { createMapLayers } from "../layers/layers"
import SceneCard from "../scenecard/SceneCard"
import DeckGlOverlay from "./DeckOverlay"
import { APIProvider, MapCameraChangedEvent } from "@vis.gl/react-google-maps"
import { Map } from "@vis.gl/react-google-maps"
import { useCallback } from "react"
import { Popup } from "react-map-gl"

export default function MapComponent() {
  const { isPinning, pinnedPoints, setPinnedPoints, handlePinPoint } = usePinning()
  const { state, dispatch } = useAppState()
  const { handleFetchBoundingBoxes, handleFindSimilar } = useBoundingBoxes()

  const { viewState, setViewState, popupInfo, setPopupInfo } = useMapState()

  const bounding_box = state.config.polygon

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

  const handleSetViewState = useCallback(
    (ev: MapCameraChangedEvent) => {
      setViewState(ev.detail)
      dispatch({ type: "SET_TEXT", payload: "" })
      dispatch({ type: "SET_RESULT_BOXES", payload: [] })
    },
    [dispatch, setViewState],
  )

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map //@ts-ignore
        options={mapOptions}
        mapTypeId={"satellite"}
        mapId={GOOGLE_MAP_ID}
        {...viewState}
        onCameraChanged={handleSetViewState}
      >
        <DeckGlOverlay layers={layers} onClick={handleClick} />
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

        <ControlWidget />

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
    </APIProvider>
  )
}
