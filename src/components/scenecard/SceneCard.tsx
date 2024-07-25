// SceneCard.tsx
import { useNaipImagery } from "../../hooks/useNaipImagery"
import { BoundingBoxResponse } from "../../hooks/useSupabase"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import "./SceneCard.scss"
import Slider from "./Slider"

interface SceneCardProps {
  targetBoundingBoxes: BoundingBoxResponse[]
  resultBoundingBoxes: BoundingBoxResponse[]
  sliderValue: number
  setSliderValue: (arg0: number) => void
  handleFindSimilar: (current_boxes: BoundingBoxResponse[]) => void
  onTileClick: (boundingBox: [number, number, number, number]) => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  sliderValue,
  targetBoundingBoxes,
  resultBoundingBoxes,
  onTileClick,
  handleFindSimilar,
}) => {
  const { fetchNaipImage } = useNaipImagery()
  console.log("IN scene card", sliderValue)
  console.log("targetBoundingBoxes", targetBoundingBoxes)
  console.log("targetBoundingBoxes lenght", targetBoundingBoxes.length)


  return (
    <div className="scene-card">
      <Carousel onTileClick={onTileClick} boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />
      <button onClick={() => handleFindSimilar(targetBoundingBoxes)} className="carousel__container-button button">
        <span>
          <i className="fas fa-search"></i>
        </span>
        Find Similar
      </button>

      {resultBoundingBoxes.length && (
        <ExpandableGrid
          onTileClick={onTileClick}
          boxes={resultBoundingBoxes}
          count={resultBoundingBoxes.length}
          fetchImage={fetchNaipImage}
        />
      )}
      {resultBoundingBoxes.length &&
        <button className="clear-button">clear 🗑</button>
      }
    </div>
  )
}

export default SceneCard
