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

export const inverseCaliforniaPolygon = (bounding_box: number[][]): Feature<Polygon> => {
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
        // Use the coordinates from californiaPolygon as a hole
        bounding_box
      ],
    },
  }
}