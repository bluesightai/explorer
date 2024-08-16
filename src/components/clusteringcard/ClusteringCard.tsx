import { useAppState } from "../../hooks/AppContext"
import { SimilarBox } from "../../hooks/supabaseTypes"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useNaipImagery } from "../../hooks/useNaipImagery"
import ExpandableGrid from "../scenecard/ExpandableGrid"
import "./ClusteringCard.scss"
import React, { useEffect, useState } from "react"

interface ClusteringCardProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleCleanSearch: () => void
  handleFindSimilar: () => void
}

// Constants
const TILE_SIZE_PIXELS = 224
const GSD = 0.6 // Ground Sample Distance in meters per pixel
const TILE_SIZE_METERS = TILE_SIZE_PIXELS * GSD

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000 // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Function to check if two bounding boxes are close or intersecting
function areBoxesClose(box1: SimilarBox, box2: SimilarBox): boolean {
  const center1 = {
    lat: (box1.min_lat + box1.max_lat) / 2,
    lon: (box1.min_lon + box1.max_lon) / 2,
  }
  const center2 = {
    lat: (box2.min_lat + box2.max_lat) / 2,
    lon: (box2.min_lon + box2.max_lon) / 2,
  }

  const distance = calculateDistance(center1.lat, center1.lon, center2.lat, center2.lon)
  return distance <= TILE_SIZE_METERS * 4
}

// Clustering function
function clusterBoundingBoxes(boxes: SimilarBox[]): SimilarBox[][] {
  const clusters: SimilarBox[][] = []
  const visited = new Set<number>()

  function expandCluster(box: SimilarBox, cluster: SimilarBox[]) {
    cluster.push(box)
    visited.add(box.id)

    for (const neighbor of boxes) {
      if (visited.has(neighbor.id)) continue
      if (areBoxesClose(box, neighbor)) {
        expandCluster(neighbor, cluster)
      }
    }
  }

  for (const box of boxes) {
    if (visited.has(box.id)) continue
    const cluster: SimilarBox[] = []
    expandCluster(box, cluster)
    clusters.push(cluster)
  }

  return clusters.sort((a, b) => b.length - a.length)
}

const ClusteringCard: React.FC<ClusteringCardProps> = ({ onTileClick, handleCleanSearch }) => {
  const { state, dispatch } = useAppState()
  const { fetchNaipImage } = useNaipImagery()
  const { handleFindSimilar } = useBoundingBoxes()
  const [expandedCluster, setExpandedCluster] = useState<number | null>(null)
  const [minClusterSize, setMinClusterSize] = useState<number>(1)

  useEffect(() => {
    if (!state.isRestoringSearch) {
      handleFindSimilar()
    }
  }, [
    state.areaId,
    state.mode.type,
    state.negativeIDs,
    state.isRestoringSearch,
    state.mode.type === "text" ? state.mode.query : state.mode.targetBoundingBoxes,
  ])

  const clusters = clusterBoundingBoxes(state.resultBoundingBoxes)
  const filteredClusters = clusters.filter((cluster) => cluster.length >= minClusterSize)

  useEffect(() => {
    const initialVisibleBoxIndexes = filteredClusters.flatMap((cluster) => cluster.map((box) => box.id))

    dispatch({ type: "SET_VISIBLE_BOXES", payload: initialVisibleBoxIndexes })
  }, [state.resultBoundingBoxes, minClusterSize])

  if (state.mode.type == "text" && state.mode.query.length < 1) {
    return null
  }
  if (state.mode.type == "image" && state.mode.targetBoundingBoxes.length < 1) {
    return null
  }

  const setNegativeId = (negative_id: number) => {
    const oldNegatives = state.negativeIDs
    const newNegatives = [negative_id, ...oldNegatives]
    dispatch({ type: "SET_NEGATIVE_IDS", payload: newNegatives })
  }

  const toggleCluster = (index: number) => {
    setExpandedCluster((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinClusterSize = parseInt(event.target.value)
    setMinClusterSize(newMinClusterSize)
    setExpandedCluster(null) // Close any open cluster when changing the slider

    const visibleBoxIndexes = filteredClusters
      .filter((cluster) => cluster.length >= newMinClusterSize)
      .flatMap((cluster) => cluster.map((box) => box.id))

    // Dispatch the visible box indexes
    dispatch({ type: "SET_VISIBLE_BOXES", payload: visibleBoxIndexes })
  }

  const maxClusterSize = Math.max(...clusters.map((cluster) => cluster.length))

  return (
    <div className="clustering-card">
      <div className="cluster-size-slider">
        <label htmlFor="cluster-size">Minimum cluster size: {minClusterSize}</label>
        <input
          type="range"
          id="cluster-size"
          min="1"
          max={maxClusterSize}
          value={minClusterSize}
          onChange={handleSliderChange}
        />
      </div>
      {filteredClusters.length > 0 && <h2>Results ({filteredClusters.length} clusters)</h2>}
      <div className="cluster-list">
        {filteredClusters.map((cluster, index) => (
          <div key={index} className="cluster-container">
            <button
              className={`cluster-button ${expandedCluster === index ? "expanded" : ""}`}
              onClick={() => toggleCluster(index)}
            >
              Cluster {index + 1} ({cluster.length} members)
            </button>
            {expandedCluster === index && (
              <ExpandableGrid
                setNegativeId={setNegativeId}
                boxes={cluster}
                count={cluster.length}
                fetchImage={fetchNaipImage}
                onTileClick={onTileClick}
                showDislikeButton={false}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClusteringCard
