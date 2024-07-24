import React, { useState, useEffect } from 'react';
import './SceneCard.css';
import { BoundingBoxResponse } from '../../hooks/useSupabase';
import { useNaipImagery } from '../../hooks/useNaipImagery';

interface SceneCardProps {
    referencePoint: [number, number];
    targetBoundingBoxes: BoundingBoxResponse[];
    resultBoundingBoxes: BoundingBoxResponse[];
}

const SceneCard: React.FC<SceneCardProps> = ({ referencePoint, targetBoundingBoxes, resultBoundingBoxes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isViewingTarget, setIsViewingTarget] = useState(true);
    const { fetchNaipImage, isLoading, error } = useNaipImagery();

    const currentBoundingBoxes = isViewingTarget ? targetBoundingBoxes : resultBoundingBoxes;

    useEffect(() => {
        if (currentBoundingBoxes.length > 0) {
            fetchImage(currentBoundingBoxes[currentIndex]);
        }
    }, [currentBoundingBoxes, currentIndex]);

    const fetchImage = async (box: BoundingBoxResponse) => {
        const url = await fetchNaipImage(box);
        setImageUrl(url);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentBoundingBoxes.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + currentBoundingBoxes.length) % currentBoundingBoxes.length);
    };

    const toggleViewMode = () => {
        setIsViewingTarget(!isViewingTarget);
        setCurrentIndex(0);
    };

    if (targetBoundingBoxes.length === 0 && resultBoundingBoxes.length === 0) return null;

    return (
        <div className="scene-card">
            <h3>{isViewingTarget ? "Target NAIP Scenes" : "Similar NAIP Scenes"}</h3>
            <p>Reference Point: Lat {referencePoint[0]}, Lon {referencePoint[1]}</p>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {imageUrl && <img src={imageUrl} alt="NAIP Scene" />}
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <span>{`${currentIndex + 1} / ${currentBoundingBoxes.length}`}</span>
                <button onClick={handleNext}>Next</button>
            </div>
            <button onClick={toggleViewMode}>
                {isViewingTarget ? "View Similar Scenes" : "View Target Scenes"}
            </button>
        </div>
    );
};

export default SceneCard;