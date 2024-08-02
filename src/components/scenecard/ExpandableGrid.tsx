import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import "./ExpandableGrid.scss"
import LazyImage from "./LazyImage"
import React, { useState } from "react"

interface ExpandableGridProps {
  setNegativeId: (id: number) => void
  boxes: BoundingBoxResponse[]
  count: number
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  onTileClick: (boundingBox: [number, number, number, number]) => void
}

const ITEMS_PER_PAGE = 9
const GRID_ROWS = 3
const GRID_COLS = 3

const ExpandableGrid: React.FC<ExpandableGridProps> = ({ setNegativeId, boxes, count, fetchImage, onTileClick }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(boxes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleBoxes = boxes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const renderGridItem = (box: BoundingBoxResponse | null, index: number) => {
    if (box) {
      const { id, max_lat, min_lat, max_lon, min_lon } = box
      return (
        <div key={id} onClick={() => onTileClick([min_lon, min_lat, max_lon, max_lat])} className="grid-item">
          <LazyImage boxData={box} fetchImage={fetchImage} alt={`Similar ${startIndex + index}`} />
          <button
            className="negative-box-button"
            onClick={(e) => {
              e.stopPropagation()
              setNegativeId(id)
            }}
            title="Mark as negative example"
          >
            <img src="src/assets/icons/thumbs-down-solidd.svg" alt="thumbs down" className="negative-button-thumb" />
          </button>
        </div>
      )
    }
    return <div key={`empty-${index}`} className="grid-item image-placeholder"></div>
  }

  const renderGrid = () => {
    const grid = []
    for (let i = 0; i < GRID_ROWS; i++) {
      const row = []
      for (let j = 0; j < GRID_COLS; j++) {
        const index = i * GRID_COLS + j
        row.push(renderGridItem(visibleBoxes[index] || null, index))
      }
      grid.push(
        <div key={`row-${i}`} className="grid-row">
          {row}
        </div>,
      )
    }
    return grid
  }

  return (
    <div className="expandable-grid">
      <div className="grid-header">
        <span className="grid-header-count">{count}</span> <span>similar found</span>
      </div>
      <div className="grid">{renderGrid()}</div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <img src="src/assets/icons/previous.svg" alt="prev" />
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <img src="src/assets/icons/next.svg" alt="next" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ExpandableGrid
