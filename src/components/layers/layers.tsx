import { BoundingBoxResponse, SimilarBox } from "../../hooks/supabaseTypes"
import { inverseCaliforniaPolygon } from "../californiaPolygon"
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
      id: "inverse-california-layer",
      data: inverseCaliforniaPolygon,
      filled: true,
      getFillColor: [0, 0, 0, 128],
      pickable: true,
    }),

    BoundingBoxLayer({
      borderColor: [0, 0, 255],
      fillColor: [0, 0, 255, 120], // This is blue
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
