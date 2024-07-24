import React, { useState, useEffect } from 'react';
import './SceneCard.css';
import { BoundingBoxResponse } from './useSupabase';
import { useNaipImagery } from './useNaipImagery';

interface SceneCardProps {
    referencePoint: [number, number];
    boundingBoxes: BoundingBoxResponse[];
}

const SceneCard: React.FC<SceneCardProps> = ({ referencePoint, boundingBoxes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { fetchNaipImage, isLoading, error } = useNaipImagery();

    useEffect(() => {
        if (boundingBoxes.length > 0) {
            fetchImage(boundingBoxes[currentIndex]);
        }
    }, [boundingBoxes, currentIndex]);

    const fetchImage = async (box: BoundingBoxResponse) => {
        const url = await fetchNaipImage(box);
        setImageUrl(url);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % boundingBoxes.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + boundingBoxes.length) % boundingBoxes.length);
    };

    if (boundingBoxes.length === 0) return null;

    return (
        <div className="scene-card">
            <h3>Similar NAIP Scenes</h3>
            <p>Reference Point: Lat {referencePoint[0]}, Lon {referencePoint[1]}</p>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {imageUrl && <img src={imageUrl} alt="NAIP Scene" />}
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <span>{`${currentIndex + 1} / ${boundingBoxes.length}`}</span>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default SceneCard;