import { useAppState } from "../../hooks/AppContext"
import { BoundingBoxResponse, SimilarBox } from "../../hooks/supabaseTypes"
import { darkMapWithBrightPolygon } from "../highlightPolygon"
import { BoundingBoxLayer } from "./BoundingBoxLayer"
import { HeatmapLayer } from "@deck.gl/aggregation-layers"
import { LayersList } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"

// Helper function to rescale similarity scores
const rescaleSimilarityScores = (scores: number[]): number[] => {
  const min = Math.min(...scores)
  const max = Math.max(...scores)
  return scores.map((score) => (score - min) / (max - min))
}

// Helper function to get the center of a bounding box
const getBoundingBoxCenter = (box: BoundingBoxResponse): [number, number] => {
  return [(box.min_lon + box.max_lon) / 2, (box.min_lat + box.max_lat) / 2]
}

const getHeatmapRadius = (zoom: number) => {
  const baseRadius = 30
  const scaleFactor = 0.5
  return baseRadius * Math.pow(2, (zoom - 10) * scaleFactor)
}

export const createMapLayers = (
  targetBoundingBoxes: BoundingBoxResponse[],
  resultBoundingBoxes: SimilarBox[],
  zoom: number,
): LayersList => {
  const { state } = useAppState()
  const bounding_box = state.config.polygon

  // Rescale similarity scores
  const similarityScores = resultBoundingBoxes.map((box) => box.similarity)
  const rescaledScores = rescaleSimilarityScores(similarityScores)

  // Prepare data for HeatmapLayer
  const heatmapData = resultBoundingBoxes.map((box, index) => ({
    position: getBoundingBoxCenter(box),
    weight: rescaledScores[index],
  }))

  const layers: LayersList = [
    new GeoJsonLayer({
      id: "highlight-layer",
      data: darkMapWithBrightPolygon(bounding_box),
      filled: true,
      getFillColor: [0, 0, 0, 128],
      pickable: true,
    }),

    BoundingBoxLayer({
      borderColor: [0, 0, 255],
      fillColor: [0, 0, 255, 50], // Blue with 50% opacity (128 is ~50% of 255)
      boundingBoxes: targetBoundingBoxes,
    }),

    new HeatmapLayer({
      id: "heatmap-layer",
      data: heatmapData,
      weightsTextureSize: 512,
      getWeight: (d) => d.weight,
      radiusPixels: getHeatmapRadius(zoom),

      colorRange: [
        [255, 255, 178],
        [254, 204, 92],
        [253, 141, 60],
        [240, 59, 32],
        [189, 0, 38],
      ],

      opacity: 0.4,
    }),
  ]

  return layers
}
