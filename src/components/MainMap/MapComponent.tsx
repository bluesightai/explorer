import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID, mapOptions } from "../../config"
import { useAppState } from "../../hooks/AppContext"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useMapState } from "../../hooks/useMapState"
import { usePinning } from "../../hooks/usePinning"
import { calculateCenterAndZoom, isPointInCalifornia } from "../../utils/mapUtils"
// import ClusteringCard from "../clusteringcard/ClusteringCard"
import ControlWidget from "../control/ControlWidget"
import SearchBox from "../input/SearchBox"
import { createMapLayers } from "../layers/layers"
import SceneCard from "../scenecard/SceneCardWithTour"
import DeckGlOverlay from "./DeckOverlay"
import { APIProvider, MapCameraChangedEvent } from "@vis.gl/react-google-maps"
import { Map } from "@vis.gl/react-google-maps"
import { useCallback, useState } from "react"

// import { Popup } from "react-map-gl"

export function MapComponent() {
  const { isPinning, pinnedPoints, setPinnedPoints, handlePinPoint, setPinPointNegative } = usePinning()
  const { state, dispatch } = useAppState()
  const { handleFetchBoundingBoxes, handleFindSimilar } = useBoundingBoxes()
  // const { viewState, setViewState, popupInfo, setPopupInfo } = useMapState()
  const { viewState, setViewState, setPopupInfo } = useMapState()
  const [isSceneCardCollapsed, setIsSceneCardCollapsed] = useState(false)

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
      // only on mobile
      if (window.innerWidth <= 768) {
        setIsSceneCardCollapsed(true)
      }
      setViewState((prevState) => ({
        ...prevState,
        ...calculateCenterAndZoom(bbox),
      }))
    },
    [setViewState],
  )

  const layers =
    state.mode.type == "image"
      ? createMapLayers(state.mode.targetBoundingBoxes, state.resultBoundingBoxes, viewState.zoom)
      : createMapLayers([], state.resultBoundingBoxes, viewState.zoom)

  const handleSearchAndCancelPin = useCallback(() => {
    handleFindSimilar()
    handlePinPoint()
  }, [handleFindSimilar, handlePinPoint])

  const handleCleanSearch = () => {
    setPinPointNegative()
    dispatch({ type: "SET_TEXT", payload: "" })
    dispatch({ type: "SET_RESULT_BOXES", payload: [] })
  }

  const handleSetViewState = useCallback(
    (ev: MapCameraChangedEvent) => {
      setViewState(ev.detail)
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

        {/* {popupInfo && ( */}
        {/*   <Popup */}
        {/*     longitude={popupInfo.longitude} */}
        {/*     latitude={popupInfo.latitude} */}
        {/*     closeOnClick={false} */}
        {/*     onClose={() => setPopupInfo(null)} */}
        {/*   > */}
        {/*     Clicking outside Bay Area is not allowed. */}
        {/*   </Popup> */}
        {/* )} */}

        {window.innerWidth > 768 && <ControlWidget />}

        <SceneCard
          onTileClick={handleTileClick}
          handleFindSimilar={handleSearchAndCancelPin}
          handleCleanSearch={handleCleanSearch}
          isSceneCardCollapsed={isSceneCardCollapsed}
          setIsSceneCardCollapsed={setIsSceneCardCollapsed}
        />

        {/* <ClusteringCard
          onTileClick={handleTileClick}
          handleCleanSearch={handleCleanSearch}
          handleFindSimilar={handleSearchAndCancelPin}
        /> */}

        <SearchBox
          setPinPointNegative={setPinPointNegative}
          isPinning={isPinning}
          handlePinPoint={handlePinPoint}
          setIsSceneCardCollapsed={setIsSceneCardCollapsed}
        />
      </Map>
    </APIProvider>
  )
}
export default MapComponent
