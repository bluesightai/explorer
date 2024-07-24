// SceneCard.tsx
import './SceneCard.css';
import { useNaipImagery } from '../../hooks/useNaipImagery';
import Carousel from './Carousel';
import ExpandableGrid from './ExpandableGrid';
import { BoundingBoxResponse } from '../../hooks/useSupabase';
import Slider from './Slider';

interface SceneCardProps {
    targetBoundingBoxes: BoundingBoxResponse[];
    resultBoundingBoxes: BoundingBoxResponse[];
    sliderValue: number;
    setSliderValue: (arg0: number) => void

}

const SceneCard: React.FC<SceneCardProps> = ({ setSliderValue, sliderValue, targetBoundingBoxes, resultBoundingBoxes }) => {

    const { fetchNaipImage } = useNaipImagery();

    return (
        <div className="scene-card">
            <Carousel boxes={targetBoundingBoxes} fetchImage={fetchNaipImage} />
            <ExpandableGrid
                boxes={resultBoundingBoxes}
                count={resultBoundingBoxes.length}
                fetchImage={fetchNaipImage}
            />
            <Slider min={1} max={1000} value={sliderValue} onChange={setSliderValue} />
            <button className="clear-button">clear 🗑</button>
        </div>
    );
};

export default SceneCard;