import { useState } from "react";
import { useSupabase } from "./useSupabase";

export const useMapInteractions = () => {
  const [isPinning, setIsPinning] = useState(false);
  const { fetchBoundingBoxes } = useSupabase();

  const handlePinPoint = () => {
    setIsPinning(!isPinning);
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
  };
};
