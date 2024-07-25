import { BoundingBoxResponse } from "../../hooks/useSupabase"
import "./Carousel.scss"
import LazyImage from "./LazyImage"
import React from "react"

// We'll create this CSS file

interface CarouselProps {
  boxes: BoundingBoxResponse[]
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  onTileClick: (boundingBox: [number, number, number, number]) => void
}

const Carousel: React.FC<CarouselProps> = ({ boxes, fetchImage, onTileClick }) => (
  <div className="carousel__container">
    <div className="carousel__container-pinned">
      <span>PINNED:</span>
      <div className="carousel">
        {boxes.map((box, index) => {
          const { max_lat, min_lat, max_lon, min_lon } = box

          return (
            <div
              onClick={() => onTileClick([min_lon, min_lat, max_lon, max_lat])}
              key={box.id}
              className="carousel-item"
            >
              <LazyImage boxData={box} fetchImage={fetchImage} alt={`Target ${index}`} />
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

export default Carousel
