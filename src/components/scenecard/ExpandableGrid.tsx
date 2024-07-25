import { BoundingBoxResponse } from "../../hooks/useSupabase"
import "./ExpandableGrid.scss"
import LazyImage from "./LazyImage"

export const ExpandableGrid = ({
  boxes,
  count,
  fetchImage,
  onTileClick
}: {
  boxes: BoundingBoxResponse[]
  count: number
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  onTileClick: (boundingBox: [number, number, number, number]) => void;
}) => {
  // Always create an array of 9 elements
  const gridItems = Array(9)
    .fill(null)
    .map((_, index) => {
      if (index < boxes.length) {
        const { max_lat, min_lat, max_lon, min_lon } = boxes[index]
        return (
          <div
            key={boxes[index].id}
            onClick={() => onTileClick([min_lon, min_lat, max_lon, max_lat])}
            style={{ cursor: 'pointer' }}
          >
            <LazyImage
              boxData={boxes[index]}
              fetchImage={fetchImage}
              alt={`Similar ${index}`}
            />
          </div>
        )
      } else {
        // Render an empty placeholder for missing items
        return <div key={`empty-${index}`} className="image-placeholder"></div>
      }
    })

  return (
    <div className="expandable-grid">
      <div className="grid-header">
        <span>{count} similar found</span>
      </div>
      <div className="grid">{gridItems}</div>
    </div>
  )
}

export default ExpandableGrid