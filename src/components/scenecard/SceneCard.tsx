// SceneCard.tsx
import { useNaipImagery } from "../../hooks/useNaipImagery"
import { BoundingBoxResponse } from "../../hooks/useSupabase"
import Carousel from "./Carousel"
import ExpandableGrid from "./ExpandableGrid"
import "./SceneCard.css"
import Slider from "./Slider"

interface SceneCardProps {
    targetBoundingBoxes: BoundingBoxResponse[]
    resultBoundingBoxes: BoundingBoxResponse[]
    sliderValue: number
    setSliderValue: (arg0: number) => void
    onTileClick: (boundingBox: [number, number, number, number]) => void;

}

const SceneCard: React.FC<SceneCardProps> = ({
    setSliderValue,
    sliderValue,
    targetBoundingBoxes,
    resultBoundingBoxes,
    onTileClick
}) => {
    const { fetchNaipImage } = useNaipImagery()

    return (
        <div className="scene-card">
            <Carousel onTileClick={onTileClick} boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />
            <ExpandableGrid onTileClick={onTileClick} boxes={resultBoundingBoxes} count={resultBoundingBoxes.length} fetchImage={fetchNaipImage} />
            <Slider min={1} max={1000} value={sliderValue} onChange={setSliderValue} />
            <button className="clear-button">clear 🗑</button>
        </div>
    )
}

export default SceneCard
