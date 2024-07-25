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
  handleCleanSearch: (arg0: any) => void

}

const SceneCard: React.FC<SceneCardProps> = ({
  sliderValue,
  targetBoundingBoxes,
  resultBoundingBoxes,
  onTileClick,
  handleFindSimilar,
  setSliderValue,
  handleCleanSearch
}) => {
  const { fetchNaipImage } = useNaipImagery()



  return (
    <div className="scene-card">
      <Carousel onTileClick={onTileClick} boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />
      <button onClick={() => handleFindSimilar(targetBoundingBoxes)} className="carousel__container-button button">
        <span>
          <i className="fas fa-search"></i>
        </span>
        Find Similar
      </button>
      {resultBoundingBoxes.length && <Slider min={9} max={100} value={sliderValue} onChange={setSliderValue} />}
      {resultBoundingBoxes.length && (
        <ExpandableGrid
          onTileClick={onTileClick}
          boxes={resultBoundingBoxes}
          count={resultBoundingBoxes.length}
          fetchImage={fetchNaipImage}
        />
      )}


      {resultBoundingBoxes.length &&
        <button onClick={handleCleanSearch} className="clear-button">clear 🗑</button>
      }

    </div>
  )
}

export default SceneCard
