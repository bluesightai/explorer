// BoundingBoxLayer.tsx
import { GeoJsonLayer } from "@deck.gl/layers"
import { Feature, Polygon } from "geojson"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"


type RGBA = [number, number, number, number];

interface BoundingBoxLayerProps {
  boundingBoxes: BoundingBoxResponse[],
  fillColor?: RGBA  // RGB array, e.g., [255, 0, 0] for red
}

export const BoundingBoxLayer = ({ boundingBoxes, fillColor }: BoundingBoxLayerProps) => {
  // Convert BoundingBoxResponse array to GeoJSON features
  const features: Feature<Polygon>[] = boundingBoxes.map((box) => ({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [box.min_lon, box.min_lat],
          [box.max_lon, box.min_lat],
          [box.max_lon, box.max_lat],
          [box.min_lon, box.max_lat],
          [box.min_lon, box.min_lat], // Close the polygon
        ],
      ],
    },
    properties: {
      id: box.id,
    },
  }))



  return new GeoJsonLayer({
    id: `bounding-box-layer-${boundingBoxes.length}`,
    data: {
      type: "FeatureCollection",
      features: features,
    },
    filled: true,
    getFillColor: fillColor,
    getLineWidth: 2,
    lineWidthMinPixels: 1,
    pickable: true,
    onClick: (info) => {
      console.log("Clicked bounding box:", info.object.properties.id)
    },
    autoHighlight: true,
    highlightColor: [255, 255, 0, 150], // Highlight color when hovered
  })
}