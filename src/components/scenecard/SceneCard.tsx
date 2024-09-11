import { useAppState } from "../../hooks/AppContext"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useSupabaseImagery } from "../../hooks/useSupabaseImagery"
import Carousel from "./Carousel"
import Examples from "./ExamplesCard"
import ExpandableGrid from "./ExpandableGrid"
import FindButton from "./FindSimillarButton"
import NegativeCarousel from "./NegativeCarousel"
import "./SceneCard.scss"
import Slider from "./Slider"
import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useEffect } from "react"

interface SceneCardProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleCleanSearch: () => void
  handleFindSimilar: () => void
  isSceneCardCollapsed: boolean
  setIsSceneCardCollapsed: (isSceneCardCollapsed: boolean) => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  onTileClick,
  handleCleanSearch,
  isSceneCardCollapsed,
  setIsSceneCardCollapsed,
}) => {
  const { state, dispatch } = useAppState()
  const { fetchSupabaseImage } = useSupabaseImagery(
    state.largeObjects ? state.config.bucket_name : state.config.masks_bucket_name,
  )
  const { handleFindSimilar: findSimilar } = useBoundingBoxes()

  const showingExamples =
    (state.mode.type === "text" && state.mode.searched_for.length < 1) ||
    (state.mode.type === "image" && state.mode.targetBoundingBoxes.length < 1)

  useEffect(() => {
    if (!state.isRestoringSearch) {
      findSimilar()
    }
  }, [
    state.areaId,
    state.mode.type,
    state.negativeBoxes,
    state.isRestoringSearch,
    state.largeObjects,
    state.mode.type === "text" ? "" : state.mode.targetBoundingBoxes,
  ])

  const removeBox = (toBeRemovedId: number) => {
    if (state.mode.type !== "image") {
      throw Error("we should be in image mode")
    }
    const newBoxes = state.mode.targetBoundingBoxes.filter((item) => item.id !== toBeRemovedId)
    dispatch({ type: "SET_TARGET_BOXES", payload: newBoxes })
  }

  const removeNegativeBox = (toBeRemovedId: number) => {
    const newBoxes = state.negativeBoxes.filter((item) => item.id !== toBeRemovedId)
    dispatch({ type: "SET_NEGATIVE_BOXES", payload: newBoxes })
  }

  const setNegative = (negative_box: BoundingBoxResponse) => {
    const newNegatives = [negative_box, ...state.negativeBoxes]
    dispatch({ type: "SET_NEGATIVE_BOXES", payload: newNegatives })
  }

  const handleSliderChange = (newValue: number) => {
    dispatch({ type: "SET_SLIDER_VALUE", payload: newValue })
  }

  const handleSliderRelease = () => {
    if (state.resultBoundingBoxes.length > 0) {
      findSimilar()
    }
  }

  const toggleCollapse = () => {
    if (!showingExamples) {
      setIsSceneCardCollapsed(!isSceneCardCollapsed)
    }
  }

  return (
    <div className={`scene-card`}>
      {!showingExamples && (
        <div
          className="scene-card-header"
          onClick={toggleCollapse}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <span style={{ marginRight: "10px" }}>{isSceneCardCollapsed ? "Expand Results" : "Collapse Results"}</span>
          {isSceneCardCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </div>
      )}
      {(showingExamples || !isSceneCardCollapsed) && (
        <div className="">
          {showingExamples ? (
            <Examples handleFindSimilar={findSimilar} />
          ) : (
            <>
              <Carousel
                removeBox={removeBox}
                onTileClick={onTileClick}
                mode={state.mode}
                fetchImage={fetchSupabaseImage}
              />
              <NegativeCarousel
                removeBox={removeNegativeBox}
                onTileClick={onTileClick}
                fetchImage={fetchSupabaseImage}
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
              ) : state.mode.type === "image" ? (
                <FindButton handleFindSimilar={findSimilar} isLoading={state.isLoading} />
              ) : null}
              {state.resultBoundingBoxes.length > 0 && (
                <ExpandableGrid
                  setNegative={setNegative}
                  onTileClick={onTileClick}
                  boxes={state.resultBoundingBoxes}
                  count={state.resultBoundingBoxes.length}
                  fetchImage={fetchSupabaseImage}
                />
              )}
              {state.resultBoundingBoxes.length > 0 && (
                <button onClick={handleCleanSearch} className="clear-button">
                  Clear Search
                  <img src="./bin.svg" alt="bin" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SceneCard
