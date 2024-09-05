import { useAppState } from "../../hooks/AppContext"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import "./Carousel.scss"
import LazyImage from "./LazyImage"
import React from "react"

interface CarouselProps {
  removeBox: (id: number) => void
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  onTileClick: (boundingBox: [number, number, number, number]) => void
}

const Carousel: React.FC<CarouselProps> = ({ removeBox, fetchImage, onTileClick }) => {
  const { state } = useAppState()
  const boxes = state.negativeBoxes

  if (boxes.length < 1) {
    return null
  }

  return (
    <div className="carousel__container">
      <span className="carousel__label">Negative tiles:</span>
      <div className="carousel__container-pinned">
        <div className="carousel__wrapper">
          <div className="carousel">
            {boxes.map((box, index) => {
              const { id, min_lon, min_lat, max_lon, max_lat } = box

              return (
                <div key={id} className="carousel-item-wrapper">
                  <div onClick={() => onTileClick([min_lon, min_lat, max_lon, max_lat])} className="carousel-item">
                    <LazyImage boxData={box} fetchImage={fetchImage} alt={`Target ${index}`} />
                  </div>
                  <button
                    className="remove-box-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeBox(id)
                    }}
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
