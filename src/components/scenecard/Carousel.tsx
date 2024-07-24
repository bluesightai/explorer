import { BoundingBoxResponse } from "../../hooks/useSupabase"
import "./Carousel.css"
import LazyImage from "./LazyImage"
import React from "react"

// We'll create this CSS file

interface CarouselProps {
  boxes: BoundingBoxResponse[]
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
}

const Carousel: React.FC<CarouselProps> = ({ boxes, fetchImage }) => (
  <div className="carousel-container">
    <div className="carousel">
      {boxes.map((box, index) => (
        <div key={box.id} className="carousel-item">
          <LazyImage boxData={box} fetchImage={fetchImage} alt={`Target ${index}`} />
        </div>
      ))}
    </div>
  </div>
)

export default Carousel
