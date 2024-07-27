// SceneCard.tsx
import React from 'react'
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { useNaipImagery } from "../../hooks/useNaipImagery"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import "./SceneCard.scss"
import Slider from "./Slider"
import FindButton from "./FindSimillarButton"

interface SceneCardProps {
  targetBoundingBoxes: BoundingBoxResponse[]
  resultBoundingBoxes: BoundingBoxResponse[]
  sliderValue: number
  isLoading: boolean
  setSliderValue: (arg0: number) => void
  handleFindSimilar: () => void
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleCleanSearch: (arg0: any) => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  sliderValue,
  targetBoundingBoxes,
  resultBoundingBoxes,
  onTileClick,
  handleFindSimilar,
  isLoading,
  setSliderValue,
  handleCleanSearch
}) => {
  const { fetchNaipImage } = useNaipImagery()

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue)
  }

  const handleSliderRelease = () => {
    if (resultBoundingBoxes.length > 0) {
      handleFindSimilar()
    }
  }

  if (targetBoundingBoxes.length < 1) {
    return null
  }

  return (
    <div className="scene-card">
      <Carousel onTileClick={onTileClick} boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />

      {resultBoundingBoxes.length > 0 ? (
        <Slider
          min={1}
          max={1000}
          value={sliderValue}
          onChange={handleSliderChange}
          onRelease={handleSliderRelease}
          isLoading={isLoading}
        />
      ) :

        <FindButton handleFindSimilar={handleFindSimilar} isLoading={isLoading} />

      }

      {resultBoundingBoxes.length > 0 && (
        <ExpandableGrid
          onTileClick={onTileClick}
          boxes={resultBoundingBoxes}
          count={resultBoundingBoxes.length}
          fetchImage={fetchNaipImage}
        />
      )}

      {resultBoundingBoxes.length > 0 && (
        <button onClick={handleCleanSearch} className="clear-button">
          clear 🗑
        </button>
      )}
    </div>
  )
}

export default SceneCard