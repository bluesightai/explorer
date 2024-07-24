import { BoundingBoxResponse } from '../../hooks/useSupabase';
import LazyImage from './LazyImage';

const Carousel = ({ boxes, fetchImage }: { boxes: BoundingBoxResponse[], fetchImage: (box: BoundingBoxResponse) => Promise<string> }) => (
    <div className="carousel">
        {boxes.map((box, index) => (
            <LazyImage key={box.id} boxData={box} fetchImage={fetchImage} alt={`Target ${index}`} />
        ))}
    </div>
);

export default Carousel