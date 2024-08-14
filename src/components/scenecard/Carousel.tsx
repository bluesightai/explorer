import type { Mode } from "../../hooks/AppContext"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import "./Carousel.scss"
import LazyImage from "./LazyImage"
import React from "react"

interface CarouselProps {
  mode: Mode
  removeBox: (id: number) => void
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  onTileClick: (boundingBox: [number, number, number, number]) => void
}

const Carousel: React.FC<CarouselProps> = ({ mode, removeBox, fetchImage, onTileClick }) => {
  if (mode.type == "text") {
    return (
      <span>
        You are searching for: <strong> {mode.query}</strong>
      </span>
    )
  }
  const boxes = mode.targetBoundingBoxes
  return (
    <div className="carousel__container">
      <span className="carousel__label">Pinned tiles:</span>
      <div className="carousel__container-pinned">
        <div className="carousel__wrapper">
          <div className="carousel">
            {boxes.map((box, index) => {
              const { id, max_lat, min_lat, max_lon, min_lon } = box

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
