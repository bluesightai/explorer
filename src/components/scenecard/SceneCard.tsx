import { useAppState } from "../../hooks/AppContext"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useNaipImagery } from "../../hooks/useNaipImagery"
// import AreaSelector from "./AreaSelector"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import FindButton from "./FindSimillarButton"
import "./SceneCard.scss"
import Slider from "./Slider"
import React, { useEffect } from "react"

interface SceneCardProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleCleanSearch: () => void
  handleFindSimilar: () => void
}

const SceneCard: React.FC<SceneCardProps> = ({ onTileClick, handleCleanSearch }) => {
  const { state, dispatch } = useAppState()
  const { fetchNaipImage } = useNaipImagery()
  const { handleFindSimilar } = useBoundingBoxes();

  useEffect(() => {
    if (state.resultBoundingBoxes.length > 0 && !state.isRestoringSearch) {
      handleFindSimilar();
    }
  }, [
    state.areaId,
    state.mode.type,
    state.negativeIDs,
    state.isRestoringSearch,
    state.mode.type === 'text' ? state.mode.query : state.mode.targetBoundingBoxes,
  ]);


  const removeBox = (toBeRemovedId: number) => {
    if (state.mode.type != 'image') {
      throw Error("we should be in image mode")
    }
    const newBoxes = state.mode.targetBoundingBoxes.filter((item) => item.id != toBeRemovedId)
    dispatch({ type: "SET_TARGET_BOXES", payload: newBoxes })
  }

  const setNegativeId = (negative_id: number) => {
    const oldNegatives = state.negativeIDs
    const newNegatives = [negative_id, ...oldNegatives]
    dispatch({ type: "SET_NEGATIVE_IDS", payload: newNegatives })
  }

  const handleSliderChange = (newValue: number) => {
    dispatch({ type: "SET_SLIDER_VALUE", payload: newValue })
  }
  // const handleAreaChange = (id: number) => {
  //   dispatch({ type: "SET_AREA_ID", payload: id })
  // }

  const handleSliderRelease = () => {
    if (state.resultBoundingBoxes.length > 0) {
      handleFindSimilar()
    }
  }

  if (state.mode.type == 'text' && state.mode.query.length < 1) {
    return null
  }
  if (state.mode.type == 'image' && state.mode.targetBoundingBoxes.length < 1) {
    return null
  }
  // TODO
  // handle Area selector if we use multiple partial indices


  return (
    <div className="scene-card">

      < Carousel
        removeBox={removeBox}
        onTileClick={onTileClick}
        mode={state.mode}
        fetchImage={fetchNaipImage}
      />
      {state.resultBoundingBoxes.length > 0 ? (
        <Slider
          min={1}
          max={1000}
          value={state.sliderValue}
          onChange={handleSliderChange}
          onRelease={handleSliderRelease}
          isLoading={state.isLoading}
        />
      ) : (
        state.mode.type === 'image' ? (
          <FindButton handleFindSimilar={handleFindSimilar} isLoading={state.isLoading} />
        ) : null
      )}

      {state.resultBoundingBoxes.length > 0 && (
        <ExpandableGrid
          setNegativeId={setNegativeId}
          onTileClick={onTileClick}
          boxes={state.resultBoundingBoxes}
          count={state.resultBoundingBoxes.length}
          fetchImage={fetchNaipImage}
        />
      )}

      {state.resultBoundingBoxes.length > 0 && (
        <button onClick={handleCleanSearch} className="clear-button">
          clear search
          <img src="./bin.svg" alt="bin" />
        </button>
      )}
    </div>
  )
}

export default SceneCard
