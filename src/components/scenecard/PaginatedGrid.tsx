import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import LazyImage from './LazyImage'; // Import the new LazyImage component
import { BoundingBoxResponse } from '../layers/GridLayer';
import "./PaginatedGrid.scss"

interface PaginatedGridProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void;
  boxes: BoundingBoxResponse[];
  fetchImage: (box: BoundingBoxResponse) => string;
}

const itemsPerPage = 9; // 3x3 grid

const PaginatedGrid: React.FC<PaginatedGridProps> = ({ onTileClick, boxes, fetchImage }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = boxes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(boxes.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % boxes.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="paginated-grid">
      <div className="grid-container">
        {currentItems.map((box, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => onTileClick([box.min_lon, box.min_lat, box.max_lon, box.max_lat])}
            style={{ cursor: 'pointer' }}
          >
            <LazyImage
              src={fetchImage(box)}
              alt={`Grid item ${index}`}
            />
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
};

export default PaginatedGrid;