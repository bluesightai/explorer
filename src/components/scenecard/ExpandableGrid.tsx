import { BoundingBoxResponse } from "../../hooks/useSupabase";
import LazyImage from "./LazyImage";
import './ExpandableGrid.css'
export const ExpandableGrid = ({ boxes, count, fetchImage }: {
    boxes: BoundingBoxResponse[],
    count: number,
    fetchImage: (box: BoundingBoxResponse) => Promise<string>
}) => {
    // Always create an array of 9 elements
    const gridItems = Array(9).fill(null).map((_, index) => {
        if (index < boxes.length) {
            return (
                <LazyImage
                    key={boxes[index].id}
                    boxData={boxes[index]}
                    fetchImage={fetchImage}
                    alt={`Similar ${index}`}
                />
            );
        } else {
            // Render an empty placeholder for missing items
            return <div key={`empty-${index}`} className="image-placeholder"></div>;
        }
    });

    return (
        <div className="expandable-grid">
            <div className="grid-header">
                <span>{count} similar found</span>
                <button>^</button>
            </div>
            <div className="grid">
                {gridItems}
            </div>
        </div>
    );
};

export default ExpandableGrid;