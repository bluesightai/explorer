// SceneCard.tsx
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { useNaipImagery } from "../../hooks/useNaipImagery"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import "./SceneCard.scss"
import Slider from "./Slider"

interface SceneCardProps {
  targetBoundingBoxes: BoundingBoxResponse[]
  resultBoundingBoxes: BoundingBoxResponse[]
  sliderValue: number
  isLoading: boolean
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
  isLoading,

  setSliderValue,
  handleCleanSearch
}) => {
  const { fetchNaipImage } = useNaipImagery()



  return (
    <div className="scene-card">
      <Carousel onTileClick={onTileClick} boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />
      <button
        onClick={() => handleFindSimilar(targetBoundingBoxes)}
        className="carousel__container-button button"
        disabled={isLoading}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <span>
              <i className="fas fa-search"></i>
            </span>
            Find Similar
          </>
        )}
      </button>
      {resultBoundingBoxes.length > 0 && (
        <Slider min={9} max={100} value={sliderValue} onChange={setSliderValue} />
      )}

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
