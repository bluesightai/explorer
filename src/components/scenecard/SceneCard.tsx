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

const SceneCard: React.FC<SceneCardProps> = ({ handleFindSimilar, onTileClick, handleCleanSearch }) => {
  const { state, dispatch } = useAppState()
  const { fetchNaipImage } = useNaipImagery()
  const { handleTextSearch } = useBoundingBoxes();

  useEffect(() => {
    if (state.resultBoundingBoxes.length > 0 && !state.isRestoringSearch) {
      handleTextSearch()
    }
  }, [state.areaId, state.targetBoundingBoxes, state.negativeIDs])

  const removeBox = (toBeRemovedId: number) => {
    const newBoxes = state.targetBoundingBoxes.filter((item) => item.id != toBeRemovedId)
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
      handleTextSearch()
    }
  }

  if (state.targetBoundingBoxes.length < 1 && state.resultBoundingBoxes.length == 0) {
    return (
      null
      // <div className="scene-card">
      //   <AreaSelector areaId={state.areaId} setAreaId={handleAreaChange} />
      // </div>
    )
  }

  {/* <div className="select-area">
        <span className="select-area-title">Choose search area:</span>
        <AreaSelector areaId={state.areaId} setAreaId={handleAreaChange} />
        // <SaveSearchButton />
      </div> */}

  console.log("ttarget length is", state.targetBoundingBoxes.length)

  return (
    <div className="scene-card">

      {state.targetBoundingBoxes.length > 0 &&
        < Carousel
          removeBox={removeBox}
          onTileClick={onTileClick}
          boxes={state.targetBoundingBoxes}
          fetchImage={fetchNaipImage}
        />
      }
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
        < FindButton handleFindSimilar={handleFindSimilar} isLoading={state.isLoading} />
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
