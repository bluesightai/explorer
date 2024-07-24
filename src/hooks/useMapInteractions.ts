import { useState } from "react";
import { BoundingBoxResponse, useSupabase } from "./useSupabase";

export const useMapInteractions = () => {
  const [isPinning, setIsPinning] = useState(false);
  const [pinnedPoint, setPinnedPoint] = useState<[number, number] | null>(null);
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBoxResponse[]>([]);

  const { fetchBoundingBoxes } = useSupabase();

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
        setBoundingBoxes(bbox);
      }
    }
  };

  const handleFindSimilar = () => {
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
    setBoundingBoxes([]);
    // Implement clean search functionality
    console.log("Clean search");
  };

  return {
    isPinning,
    handlePinPoint,
    handleFindSimilar,
    handleShareFindings,
    handleCleanSearch,
    fetchBoundingBoxes,
    pinnedPoint,
    boundingBoxes,
    handleMapClick,
  };
};
