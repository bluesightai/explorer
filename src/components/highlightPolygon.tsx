import { Feature, Polygon } from "geojson"


export const brightPolygon = (bounding_box: number[][]): Feature<Polygon> => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [bounding_box]

    },
  }
}

export const darkMapWithBrightPolygon = (bounding_box: number[][]): Feature<Polygon> => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-180, -90],
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90],
        ],
        // Use the coordinates from bounding as a bright hole
        bounding_box
      ],
    },
  }
}