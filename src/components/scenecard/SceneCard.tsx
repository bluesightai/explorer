import React, { useEffect } from 'react'
import { useNaipImagery } from "../../hooks/useNaipImagery"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import "./SceneCard.scss"
import Slider from "./Slider"
import FindButton from "./FindSimillarButton"
import AreaSelector from './AreaSelector'
import { useAppState } from '../../hooks/AppContext'
// import SaveSearchButton from '../utilcomponents/SaveSearch'

interface SceneCardProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleFindSimilar: () => void
  handleCleanSearch: () => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  onTileClick,
  handleFindSimilar,
  handleCleanSearch
}) => {
  const { state, dispatch } = useAppState()
  const { fetchNaipImage } = useNaipImagery()

  useEffect(() => {
    console.log("We are in scene card", state.isRestoringSearch)
    if (state.resultBoundingBoxes.length > 0 && !state.isRestoringSearch) {
      handleFindSimilar();
    }
  }, [state.areaId, state.targetBoundingBoxes, state.negativeIDs, state.isRestoringSearch]);

  const removeBox = (toBeRemovedId: number) => {
    const newBoxes = state.targetBoundingBoxes.filter(item => item.id != toBeRemovedId)
    dispatch({ type: 'SET_TARGET_BOXES', payload: newBoxes })
  }

  const setNegativeId = (negative_id: number) => {
    const oldNegatives = state.negativeIDs
    const newNegatives = [negative_id, ...oldNegatives]
    dispatch({ type: 'SET_NEGATIVE_IDS', payload: newNegatives })
  }

  const handleSliderChange = (newValue: number) => {
    dispatch({ type: 'SET_SLIDER_VALUE', payload: newValue })
  }
  const handleAreaChange = (id: number) => {
    dispatch({ type: 'SET_AREA_ID', payload: id })
  }

  const handleSliderRelease = () => {
    if (state.resultBoundingBoxes.length > 0) {
      handleFindSimilar()
    }
  }


  if (state.targetBoundingBoxes.length < 1) {
    return <div className="scene-card"><AreaSelector areaId={state.areaId} setAreaId={handleAreaChange} /></div >
  }

  return (
    <div className="scene-card">
      <AreaSelector areaId={state.areaId} setAreaId={handleAreaChange} />
      {/* <SaveSearchButton /> */}

      <Carousel removeBox={removeBox} onTileClick={onTileClick} boxes={state.targetBoundingBoxes} fetchImage={fetchNaipImage} />

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
        <FindButton handleFindSimilar={handleFindSimilar} isLoading={state.isLoading} />
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
          clear 🗑
        </button>
      )}
    </div>
  )
}

export default SceneCard