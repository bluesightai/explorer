import { useState } from "react";
import { BoundingBoxResponse, useSupabase } from "./useSupabase";

export const useMapInteractions = () => {
  const [isPinning, setIsPinning] = useState(false);
  const [pinnedPoint, setPinnedPoint] = useState<[number, number] | null>(null);
  const [targetBoundingBoxes, setTargetBoundingBoxes] = useState<
    BoundingBoxResponse[]
  >([]);
  const [resultBoundingBoxes, setResultBoundingBoxes] = useState<
    BoundingBoxResponse[]
  >([]);

  const { fetchBoundingBoxes, findSimilarTiles } = useSupabase();

  const handlePinPoint = () => {
    setIsPinning(!isPinning);
  };

  const handleMapClick = async (info: any) => {
    if (isPinning && info.coordinate) {
      const [longitude, latitude] = info.coordinate;
      setPinnedPoint([longitude, latitude]);
      setIsPinning(false);
      console.log("longitude", longitude, "latitude", latitude);
      const bbox = await fetchBoundingBoxes(latitude, longitude);
      if (bbox.length > 0) {
        setTargetBoundingBoxes(bbox);
      }
    }
  };

  const handleFindSimilar = async () => {
    if (targetBoundingBoxes) {
      const targetId = targetBoundingBoxes[0].id;
      const similarBoxes = await findSimilarTiles(targetId);
      setResultBoundingBoxes(similarBoxes);
    } else {
      throw Error("No target box set");
    }
    // Implement find similar functionality
    console.log("Find similar");
  };

  const handleShareFindings = () => {
    // Implement share findings functionality
    console.log("Share findings");
  };

  const handleCleanSearch = () => {
    setPinnedPoint(null);
    setIsPinning(false);
    setTargetBoundingBoxes([]);
    // Implement clean search functionality
    console.log("Clean search");
  };

  return {
    isPinning,
    pinnedPoint,
    targetBoundingBoxes,
    resultBoundingBoxes,
    handlePinPoint,
    handleMapClick,
    handleFindSimilar,
    handleShareFindings,
    handleCleanSearch,
    setTargetBoundingBoxes,
    setResultBoundingBoxes,
  };
};
